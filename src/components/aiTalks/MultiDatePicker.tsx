import { useEffect, useMemo, useRef, useState } from 'react'

/** Local-date helpers. Dates are stored as 'YYYY-MM-DD' strings (local time, no timezone drift). */
const pad = (n: number) => String(n).padStart(2, '0')
export const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const fromIso = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const addMonths = (d: Date, n: number) => {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1)
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last))
}
const startOfToday = () => {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}
/** Monday = 0 … Sunday = 6 */
const mondayIndex = (d: Date) => (d.getDay() + 6) % 7

/** Formats ISO dates like "di 14 okt 2026" (nl-BE) or "Tue 14 Oct 2026" (en). */
export function formatDates(dates: string[], locale: string) {
  const fmt = new Intl.DateTimeFormat(locale === 'nl-BE' ? 'nl-BE' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  return [...dates].sort().map((s) => fmt.format(fromIso(s)).replace(/,/g, '').replace(/\.(?=\s|$)/g, ''))
}

export type MultiDatePickerLabels = {
  calendarLabel: string
  prevMonth: string
  nextMonth: string
  selected: string
  none: string
  remove: string
  clear: string
  max: string
}

type Props = {
  value: string[]
  onChange: (dates: string[]) => void
  locale: string
  labels: MultiDatePickerLabels
  maxDates?: number
  describedBy?: string
}

/**
 * Small dependency-free multi-date calendar (WAI-ARIA grid pattern):
 * click / Enter / Space toggles a date, arrows move by day/week, Home/End to week start/end,
 * PageUp/PageDown change month. Past dates are disabled. Monday-first.
 */
export default function MultiDatePicker({ value, onChange, locale, labels, maxDates = 12, describedBy }: Props) {
  const today = useMemo(startOfToday, [])
  const intlLocale = locale === 'nl-BE' ? 'nl-BE' : 'en-GB'
  const [focusDate, setFocusDate] = useState<Date>(() => (value[0] ? fromIso([...value].sort()[0]) : today))
  const [hasFocusInGrid, setHasFocusInGrid] = useState(false)
  const [limitHit, setLimitHit] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const month = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1)
  const selected = useMemo(() => new Set(value), [value])

  const monthLabel = new Intl.DateTimeFormat(intlLocale, { month: 'long', year: 'numeric' }).format(month)
  const weekdayFmt = new Intl.DateTimeFormat(intlLocale, { weekday: 'short' })
  const weekdayLongFmt = new Intl.DateTimeFormat(intlLocale, { weekday: 'long' })
  const dayLabelFmt = new Intl.DateTimeFormat(intlLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  // 2024-01-01 is a Monday
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2024, 0, 1 + i))

  const gridStart = addDays(month, -mondayIndex(month))
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const weeks = Math.ceil((mondayIndex(month) + daysInMonth) / 7)
  const cells = Array.from({ length: weeks * 7 }, (_, i) => addDays(gridStart, i))

  const isPast = (d: Date) => d < today
  const minMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const canPrev = month > minMonth

  const pendingFocus = useRef(false)
  useEffect(() => {
    if (!pendingFocus.current) return
    pendingFocus.current = false
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-iso="${toIso(focusDate)}"]`)?.focus()
  }, [focusDate])

  const moveFocus = (d: Date) => {
    pendingFocus.current = true
    setFocusDate(d < today ? today : d)
  }

  const toggle = (d: Date) => {
    if (isPast(d)) return
    const iso = toIso(d)
    if (selected.has(iso)) {
      setLimitHit(false)
      onChange(value.filter((v) => v !== iso))
    } else if (value.length >= maxDates) {
      setLimitHit(true)
    } else {
      setLimitHit(false)
      onChange([...value, iso].sort())
    }
    setFocusDate(d)
  }

  const onKeyDown = (e: React.KeyboardEvent, d: Date) => {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(d, -1),
      ArrowRight: () => addDays(d, 1),
      ArrowUp: () => addDays(d, -7),
      ArrowDown: () => addDays(d, 7),
      Home: () => addDays(d, -mondayIndex(d)),
      End: () => addDays(d, 6 - mondayIndex(d)),
      PageUp: () => addMonths(d, e.shiftKey ? -12 : -1),
      PageDown: () => addMonths(d, e.shiftKey ? 12 : 1),
    }
    if (map[e.key]) {
      e.preventDefault()
      moveFocus(map[e.key]())
    }
  }

  const navBtn =
    'h-9 w-9 inline-flex items-center justify-center rounded-md border border-white/15 text-white/80 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-30 disabled:hover:bg-transparent'

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-white/15 bg-black/60 overflow-hidden w-full max-w-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden="true" />
          <span className="ml-1 font-mono text-[11px] text-white/60">$ cal --multi</span>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <button type="button" className={navBtn} onClick={() => setFocusDate(addMonths(focusDate, -1) < today ? today : addMonths(focusDate, -1))} disabled={!canPrev} aria-label={labels.prevMonth}>
              <span aria-hidden="true">‹</span>
            </button>
            <div className="font-mono text-sm text-white capitalize" aria-live="polite" id="ai-talks-cal-month">
              {monthLabel}
            </div>
            <button type="button" className={navBtn} onClick={() => setFocusDate(addMonths(focusDate, 1))} aria-label={labels.nextMonth}>
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <div role="grid" aria-labelledby="ai-talks-cal-month" aria-multiselectable="true" aria-describedby={describedBy} ref={gridRef}
            onFocus={() => setHasFocusInGrid(true)} onBlur={() => setHasFocusInGrid(false)}>
            <div role="row" className="grid grid-cols-7">
              {weekdays.map((w) => (
                <div key={w.getDay()} role="columnheader" aria-label={weekdayLongFmt.format(w)} className="py-1 text-center font-mono text-[11px] uppercase text-white/60">
                  {weekdayFmt.format(w).replace('.', '').slice(0, 2)}
                </div>
              ))}
            </div>
            {Array.from({ length: weeks }, (_, w) => (
              <div role="row" key={w} className="grid grid-cols-7">
                {cells.slice(w * 7, w * 7 + 7).map((d) => {
                  const iso = toIso(d)
                  const inMonth = d.getMonth() === month.getMonth()
                  const past = isPast(d)
                  const isSel = selected.has(iso)
                  const isToday = iso === toIso(today)
                  const isFocus = iso === toIso(focusDate)
                  if (!inMonth) return <div role="gridcell" key={iso} aria-hidden="true" className="h-10" />
                  return (
                    <div role="gridcell" key={iso} aria-selected={isSel} className="p-0.5">
                      <button
                        type="button"
                        data-iso={iso}
                        tabIndex={isFocus ? 0 : -1}
                        disabled={past}
                        aria-pressed={isSel}
                        aria-label={dayLabelFmt.format(d)}
                        onClick={() => toggle(d)}
                        onKeyDown={(e) => onKeyDown(e, d)}
                        className={[
                          'h-10 w-full rounded-md font-mono text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
                          past ? 'text-white/25 cursor-not-allowed line-through decoration-white/20' : isSel ? 'bg-white text-black font-semibold' : 'text-white/85 hover:bg-white/10',
                          isToday && !isSel ? 'ring-1 ring-inset ring-white/40' : '',
                          isFocus && hasFocusInGrid && !isSel ? 'bg-white/10' : '',
                        ].join(' ')}
                      >
                        {d.getDate()}
                      </button>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite">
        <div className="sr-only">{labels.selected}: {value.length ? formatDates(value, locale).join(', ') : labels.none}</div>
        {limitHit && <p className="text-sm text-amber-200">{labels.max}</p>}
        {value.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={labels.selected}>
            {value.map((iso, i) => {
              const text = formatDates([iso], locale)[0]
              return (
                <li key={iso} className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 pl-3 pr-1 py-1 font-mono text-xs text-white">
                  {text}
                  <button
                    type="button"
                    onClick={() => {
                      setLimitHit(false)
                      onChange(value.filter((v) => v !== iso))
                    }}
                    aria-label={`${labels.remove} ${text}`}
                    className="ml-1 h-6 w-6 inline-flex items-center justify-center rounded-full text-white/70 hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    data-chip-index={i}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </li>
              )
            })}
            {value.length > 1 && (
              <li>
                <button type="button" onClick={() => { setLimitHit(false); onChange([]) }} className="rounded-full px-3 py-1 font-mono text-xs text-white/70 underline underline-offset-4 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  {labels.clear}
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
