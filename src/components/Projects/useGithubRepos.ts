import { useEffect, useState } from 'react'

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  topics: string[]
  language: string | null
  stargazers_count: number
  fork: boolean
  languages: string[]
}

const HEADERS = { Accept: 'application/vnd.github+json' }

const JS_LANGS = new Set(['JavaScript', 'TypeScript'])

// Maps package name → display label
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
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/contents/package.json`,
    { headers: HEADERS }
  )
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

export function useGithubRepos(username: string) {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: HEADERS,
    })
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`)
        return res.json()
      })
      .then(async (data: GithubRepo[]) => {
        const filtered = data.filter(r => !r.fork)

        const withLanguages = await Promise.all(
          filtered.map(async repo => {
            const [langsRes, frameworks] = await Promise.all([
              fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, { headers: HEADERS }),
              JS_LANGS.has(repo.language ?? '') ? getFrameworks(username, repo.name) : Promise.resolve([]),
            ])

            const langs: Record<string, number> = langsRes.ok ? await langsRes.json() : {}
            const baseLanguages = Object.keys(langs).filter(l => !['HTML', 'CSS', 'Shell'].includes(l))

            // Merge: frameworks first, then remaining base languages
            const merged = [...frameworks]
            for (const l of baseLanguages) {
              if (!merged.includes(l)) merged.push(l)
            }

            return { ...repo, languages: merged }
          })
        )

        setRepos(withLanguages)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [username])

  return { repos, loading, error }
}
