import { useEffect, useState } from 'react'

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  fork: boolean
  languages: string[]
  allLanguages: string[]
  og_image_url: string
}

const githubFetch = (path: string) =>
  fetch(`/api/github?path=${encodeURIComponent(path)}`)

const JS_LANGS = new Set(['JavaScript', 'TypeScript'])

const PKG_MAP: Record<string, string> = {
  react: 'React',
  'react-dom': 'React',
  next: 'Next.js',
  nuxt: 'Nuxt',
  vue: 'Vue',
  svelte: 'Svelte',
  '@sveltejs/kit': 'SvelteKit',
  angular: 'Angular',
  '@angular/core': 'Angular',
  vite: 'Vite',
  express: 'Express',
  typescript: 'TypeScript',
  fastify: 'Fastify',
  'react-query': 'React Query',
  '@tanstack/react-query': 'React Query',
  prisma: 'Prisma',
  mongoose: 'Mongoose',
  axios: 'Axios',
  tailwindcss: 'Tailwind',
}

async function getFrameworks(username: string, repoName: string): Promise<string[]> {
  const res = await githubFetch(`/repos/${username}/${repoName}/contents/package.json`)
  if (!res.ok) return []

  const { content } = await res.json()
  const pkg = JSON.parse(atob(content.replace(/\n/g, '')))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  const found: string[] = []
  for (const name of Object.keys(deps)) {
    const label = PKG_MAP[name]
    if (label && !found.includes(label)) found.push(label)
  }
  return found
}

// Cache persistente: evita refazer a cascata de requests (e estourar o
// rate limit do GitHub) em visitas repetidas dentro do TTL.
const CACHE_KEY = 'gh-repos-cache-v1'
const CACHE_TTL = 30 * 60 * 1000 // 30 min

interface RepoCache {
  username: string
  time: number
  repos: GithubRepo[]
}

function readCache(username: string): { repos: GithubRepo[]; fresh: boolean } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cache: RepoCache = JSON.parse(raw)
    if (cache.username !== username || !Array.isArray(cache.repos)) return null
    return { repos: cache.repos, fresh: Date.now() - cache.time < CACHE_TTL }
  } catch {
    return null
  }
}

function writeCache(username: string, repos: GithubRepo[]) {
  try {
    const cache: RepoCache = { username, time: Date.now(), repos }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // localStorage cheio ou indisponível — segue sem cache
  }
}

async function loadRepos(username: string): Promise<GithubRepo[]> {
  const res = await githubFetch(`/users/${username}/repos?per_page=100&sort=updated`)
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`)

  const data: GithubRepo[] = await res.json()
  const filtered = data.filter(r => !r.fork)

  const repos = await Promise.all(
    filtered.map(async repo => {
      // Falha em detalhes (403 de rate limit, etc.) não derruba o repo:
      // cai no fallback com a linguagem principal da listagem.
      const [langsRes, frameworks] = await Promise.all([
        githubFetch(`/repos/${username}/${repo.name}/languages`).catch(() => null),
        JS_LANGS.has(repo.language ?? '')
          ? getFrameworks(username, repo.name).catch(() => [] as string[])
          : Promise.resolve([] as string[]),
      ])

      const langs: Record<string, number> = langsRes?.ok ? await langsRes.json() : {}
      const baseLanguages = Object.keys(langs).filter(l => !['HTML', 'CSS', 'Shell'].includes(l))
      const allBaseLanguages = Object.keys(langs).filter(l => l !== 'Shell')

      const merged = [...frameworks]
      for (const l of baseLanguages) {
        if (!merged.includes(l)) merged.push(l)
      }

      const mergedAll = [...frameworks]
      for (const l of allBaseLanguages) {
        if (!mergedAll.includes(l)) mergedAll.push(l)
      }

      if (merged.length === 0 && repo.language) merged.push(repo.language)
      if (mergedAll.length === 0 && repo.language) mergedAll.push(repo.language)

      return {
        ...repo,
        languages: merged,
        allLanguages: mergedAll,
        og_image_url: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
      }
    })
  )

  writeCache(username, repos)
  return repos
}

// Cache em nível de módulo: vários componentes usam o hook, mas a cascata
// de requests ao GitHub roda uma única vez por sessão.
let cachePromise: Promise<GithubRepo[]> | null = null
let cacheUsername: string | null = null

export function useGithubRepos(username: string) {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!cachePromise || cacheUsername !== username) {
      const cached = readCache(username)
      cacheUsername = username

      if (cached?.fresh) {
        // Cache fresco: nenhuma request é feita
        cachePromise = Promise.resolve(cached.repos)
      } else {
        cachePromise = loadRepos(username).catch(err => {
          // Rate limit / rede fora: serve o cache antigo se existir
          if (cached) return cached.repos
          throw err
        })
      }
    }

    cachePromise
      .then(data => {
        if (cancelled) return
        setRepos(data)
        setLoading(false)
      })
      .catch(err => {
        if (cacheUsername === username) cachePromise = null
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [username])

  return { repos, loading, error }
}
