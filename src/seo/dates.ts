const MONTHS: Record<string, string> = {
  jan: '01',
  january: '01',
  januari: '01',
  feb: '02',
  february: '02',
  februari: '02',
  mar: '03',
  march: '03',
  mrt: '03',
  maart: '03',
  apr: '04',
  april: '04',
  may: '05',
  mei: '05',
  jun: '06',
  june: '06',
  juni: '06',
  jul: '07',
  july: '07',
  juli: '07',
  aug: '08',
  august: '08',
  augustus: '08',
  sep: '09',
  sept: '09',
  september: '09',
  oct: '10',
  october: '10',
  okt: '10',
  oktober: '10',
  nov: '11',
  november: '11',
  dec: '12',
  december: '12',
}

/** Blog dates are stored as "MAY 2026". Schema.org wants an ISO date. */
export function blogDateToIso(date: string): string | undefined {
  const match = date.trim().match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (!match) return undefined
  const month = MONTHS[match[1].toLowerCase()]
  if (!month) return undefined
  return `${match[2]}-${month}-01`
}
