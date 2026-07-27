import { useEffect, useRef } from 'react'
import './GithubActivity.css'
import { useGithubContributions } from './useGithubContributions'
import { useLanguage } from '../../i18n/LanguageContext'

function levelFor(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

export default function GithubActivity({ login }: { login: string }) {
  const { t, lang } = useLanguage()
  const { data, loading, error } = useGithubContributions(login)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [data])

  if (loading) return <div className="gh-activity gh-activity-skeleton" />
  if (error || !data) return <p className="gh-activity-error">{t.activity.error}</p>

  const monthFormatter = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { month: 'short' })
  let prevMonth = -1

  return (
    <div className="gh-activity">
      <div className="gh-activity-header">
        <h3 className="gh-activity-title">{t.activity.title}</h3>
        <span className="gh-activity-count">
          {t.activity.subtitle.replace('{count}', data.totalContributions.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US'))}
        </span>
      </div>

      <div className="gh-activity-scroll" ref={scrollRef}>
        <div className="gh-activity-graph">
          <div className="gh-activity-months">
            {data.weeks.map((week, i) => {
              const firstDate = new Date(`${week.contributionDays[0].date}T00:00:00`)
              const month = firstDate.getMonth()
              const show = month !== prevMonth
              prevMonth = month
              return (
                <span key={i} className="gh-month-label">
                  {show ? monthFormatter.format(firstDate) : ''}
                </span>
              )
            })}
          </div>
          <div className="gh-activity-weeks">
            {data.weeks.map((week, i) => (
              <div key={i} className="gh-activity-week">
                {week.contributionDays.map(day => (
                  <span
                    key={day.date}
                    className="gh-activity-day"
                    data-level={levelFor(day.contributionCount)}
                    title={`${day.contributionCount} · ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gh-activity-legend">
        <span>{t.activity.less}</span>
        {[0, 1, 2, 3, 4].map(level => (
          <span key={level} className="gh-activity-day" data-level={level} />
        ))}
        <span>{t.activity.more}</span>
      </div>
    </div>
  )
}
