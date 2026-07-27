import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

const githubProxy = (token: string | undefined): Plugin => ({
  name: 'github-proxy',
  configureServer(server) {
    server.middlewares.use('/api/github', async (req, res) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const path = url.searchParams.get('path') ?? ''

      try {
        const response = await fetch(`https://api.github.com${path}`, {
          headers: {
            Accept: 'application/vnd.github+json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
        const data = await response.text()
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
      } catch {
        res.statusCode = 500
        res.end(JSON.stringify({ error: 'Proxy error' }))
      }
    })
  },
})

const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }
`

// GraphQL é o único jeito de obter o calendário de contribuições
// (a REST API não expõe esse dado), por isso é um proxy separado do de cima.
const githubContributionsProxy = (token: string | undefined): Plugin => ({
  name: 'github-contributions-proxy',
  configureServer(server) {
    server.middlewares.use('/api/github-contributions', async (req, res) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const login = url.searchParams.get('login') ?? ''

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login } }),
        })
        const data = await response.text()
        res.statusCode = response.status
        res.setHeader('Content-Type', 'application/json')
        res.end(data)
      } catch {
        res.statusCode = 500
        res.end(JSON.stringify({ error: 'Proxy error' }))
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega .env / .env.local para que GITHUB_TOKEN funcione no dev
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      githubProxy(env.GITHUB_TOKEN),
      githubContributionsProxy(env.GITHUB_TOKEN),
    ],
  }
})
