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

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost')
  const login = url.searchParams.get('login')

  if (!login) {
    res.status(400).json({ error: 'Missing login' })
    return
  }

  const token = process.env.GITHUB_TOKEN
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login } }),
  })

  const data = await response.text()
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200')
  res.status(response.status).end(data)
}
