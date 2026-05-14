import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

const githubProxy: Plugin = {
  name: 'github-proxy',
  configureServer(server) {
    server.middlewares.use('/api/github', async (req, res) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const path = url.searchParams.get('path') ?? ''
      const token = process.env.GITHUB_TOKEN

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
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), githubProxy],
})
