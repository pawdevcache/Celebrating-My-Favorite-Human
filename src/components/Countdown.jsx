import { useEffect, useState } from 'react'
import './Countdown.css'

/**
 * Counts down to the target date. Once that date has gone the countdown
 * stops for good — it does not roll forward to the same day next year,
 * because this page is about one particular birthday.
 */
function targetDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d, 0, 0, 0, 0)
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

/* 'before' while the day is still coming, 'today' on the day itself, and
   'after' once it has gone. Compared whole day to whole day, so the birthday
   reads as 'today' from midnight to midnight. Home reads this too, to title
   the band. */
export function birthdayState(dateStr) {
  const target = targetDate(dateStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (today.getTime() < target.getTime()) return 'before'
  if (today.getTime() === target.getTime()) return 'today'
  return 'after'
}

export default function Countdown({ date, label = 'until your birthday' }) {
  const [target] = useState(() => targetDate(date))
  const [t, setT] = useState(() => diff(target))
  const state = birthdayState(date)

  useEffect(() => {
    /* nothing left to count once the day has gone, and 'after' is the last
       state there is — so the ticker retires rather than run forever. */
    if (state === 'after') return undefined
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target, state])

  if (state === 'after') {
    return (
      <div className="cd cd--today">
        <p className="eyebrow">That was your day</p>
        <p className="cd__today-text display">Hope it was everything. 🎉</p>
        <p className="cd__label">
          The page is staying up. Come back whenever you want.
        </p>
      </div>
    )
  }

  if (state === 'today') {
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
