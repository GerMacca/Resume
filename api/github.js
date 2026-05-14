export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const path = url.searchParams.get('path')

  if (!path) {
    res.status(400).json({ error: 'Missing path' })
    return
  }

  const token = process.env.GITHUB_TOKEN
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  const data = await response.text()
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  res.status(response.status).end(data)
}
