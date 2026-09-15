import { useEffect, useState } from 'react'
import './Countdown.css'

/**
 * Counts down to the target date. If the date has already passed this year,
 * it automatically rolls forward to the same day next year — so the site keeps
 * working every birthday without anyone editing it.
 */
function nextOccurrence(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const now = new Date()
  let target = new Date(y, m - 1, d, 0, 0, 0, 0)
  while (target.getTime() < now.getTime() - 86400000) {
    target = new Date(target.getFullYear() + 1, m - 1, d, 0, 0, 0, 0)
  }
  return target
}

function diff(target) {
  const ms = target.getTime() - Date.now()
  if (ms <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    done: false,
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  }
}

function isBirthdayToday(target) {
  const now = new Date()
  return (
    now.getDate() === target.getDate() && now.getMonth() === target.getMonth()
  )
}

export default function Countdown({ date, label = 'until your birthday' }) {
  const [target] = useState(() => nextOccurrence(date))
  const [t, setT] = useState(() => diff(target))
  const today = isBirthdayToday(target)

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (today) {
    return (
      <div className="cd cd--today">
        <p className="eyebrow">The day is here</p>
        <p className="cd__today-text display">It's today. 🎉</p>
        <p className="cd__label">
          Go be completely, loudly happy. That's an order.
        </p>
      </div>
    )
  }

  const units = [
    { v: t.days, l: t.days === 1 ? 'day' : 'days' },
    { v: t.hours, l: 'hours' },
    { v: t.minutes, l: 'minutes' },
    { v: t.seconds, l: 'seconds' },
  ]

  return (
    <div className="cd">
      <div className="cd__grid">
        {units.map((u, i) => (
          <div key={u.l} className="cd__unit">
            <div className="cd__box">
              <span
                className="cd__value"
                key={`${u.l}-${u.v}`}
                style={{ animationDelay: `${i * 20}ms` }}
              >
                {String(u.v).padStart(2, '0')}
              </span>
            </div>
            <span className="cd__unit-label">{u.l}</span>
          </div>
        ))}
      </div>
      <p className="cd__label">{label}</p>
    </div>
  )
}
