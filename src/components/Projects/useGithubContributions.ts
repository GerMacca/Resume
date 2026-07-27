import { useEffect, useState } from 'react'

export interface ContributionDay {
  date: string
  contributionCount: number
  weekday: number
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface ContributionsData {
  totalContributions: number
  weeks: ContributionWeek[]
}

const CACHE_KEY = 'gh-contributions-cache-v1'
const CACHE_TTL = 6 * 60 * 60 * 1000 // 6h — o calendário muda no máximo uma vez por dia

interface Cache {
  login: string
  time: number
  data: ContributionsData
}

function readCache(login: string): { data: ContributionsData; fresh: boolean } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cache: Cache = JSON.parse(raw)
    if (cache.login !== login || !cache.data) return null
    return { data: cache.data, fresh: Date.now() - cache.time < CACHE_TTL }
  } catch {
    return null
  }
}

function writeCache(login: string, data: ContributionsData) {
  try {
    const cache: Cache = { login, time: Date.now(), data }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // localStorage cheio ou indisponível — segue sem cache
  }
}

async function loadContributions(login: string): Promise<ContributionsData> {
  const res = await fetch(`/api/github-contributions?login=${encodeURIComponent(login)}`)
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`)

  const { data, errors } = await res.json()
  const calendar = data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) throw new Error(errors?.[0]?.message ?? 'No contribution data')

  const result: ContributionsData = {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  }
  writeCache(login, result)
  return result
}

// Cache em nível de módulo: evita refazer a request em remounts dentro da mesma sessão.
let cachePromise: Promise<ContributionsData> | null = null
let cacheLogin: string | null = null

export function useGithubContributions(login: string) {
  const [data, setData] = useState<ContributionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!cachePromise || cacheLogin !== login) {
      const cached = readCache(login)
      cacheLogin = login

      if (cached?.fresh) {
        cachePromise = Promise.resolve(cached.data)
      } else {
        cachePromise = loadContributions(login).catch(err => {
          if (cached) return cached.data
          throw err
        })
      }
    }

    cachePromise
      .then(result => {
        if (cancelled) return
        setData(result)
        setLoading(false)
      })
      .catch(err => {
        if (cacheLogin === login) cachePromise = null
        if (cancelled) return
        setError(err.message)
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [login])

  return { data, loading, error }
}
