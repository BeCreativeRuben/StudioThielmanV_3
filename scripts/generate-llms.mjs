import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')

function mustInclude(source, needle, file) {
  if (!source.includes(needle)) {
    throw new Error(`llms.txt: expected "${needle}" in ${file}`)
  }
}

const packages = read('src/locales/content/packages.en.ts')
const talks = read('src/locales/content/aiTalks.en.ts')
const workshops = read('src/locales/content/workshops.en.ts')
const group = read('src/locales/en.ts')

for (const needle of ['€25/month', '+ €150 startup', '€40/month', '+ €250 startup', 'Price to be determined']) {
  mustInclude(packages, needle, 'packages.en.ts')
}
for (const needle of [
  "price: '€450'",
  "price: '€500'",
  '+€50 per extra person',
  "price: '€900'",
  "price: '€250'",
  '€1,000 excl. VAT',
  'From €150 excl. VAT',
  'anywhere in Flanders (from Lokeren and the Waasland to Ghent, Antwerp and Brussels) and in the Netherlands. Online is possible in consultation.',
]) {
  mustInclude(talks, needle, 'aiTalks.en.ts')
}
for (const needle of ['€500 for up to 8 people', '+€50 per extra person', '€1,000 for the two days', 'Max. 15 people']) {
  mustInclude(workshops, needle, 'workshops.en.ts')
}
mustInclude(group, 'One email when the date and location are set.', 'en.ts')

const nap = 'Pereboomsteenweg 49, 9180 Lokeren · +32 493 50 56 41 · info@studiothielman.com · KBO 1034.790.654'

const pages = [
  ['Home', 'https://studiothielman.com/', 'https://studiothielman.com/nl'],
  ['Packages', 'https://studiothielman.com/packages', 'https://studiothielman.com/nl/packages'],
  ['Portfolio', 'https://studiothielman.com/portfolio', 'https://studiothielman.com/nl/portfolio'],
  ['Blog', 'https://studiothielman.com/blog', 'https://studiothielman.com/nl/blog'],
  ['How it works', 'https://studiothielman.com/how-it-works', 'https://studiothielman.com/nl/how-it-works'],
  ['Reviews', 'https://studiothielman.com/reviews', 'https://studiothielman.com/nl/reviews'],
  ['About', 'https://studiothielman.com/about', 'https://studiothielman.com/nl/about'],
  ['Contact', 'https://studiothielman.com/contact', 'https://studiothielman.com/nl/contact'],
  ['Workshops', 'https://studiothielman.com/workshops', 'https://studiothielman.com/nl/workshops'],
  ['In-company AI training', 'https://studiothielman.com/workshops/incompany', 'https://studiothielman.com/nl/workshops/incompany'],
  ['1:1 AI training', 'https://studiothielman.com/workshops/1-1', 'https://studiothielman.com/nl/workshops/1-1'],
  ['AI talks', 'https://studiothielman.com/ai-talks', 'https://studiothielman.com/nl/ai-talks'],
  ['Group workshop interest list', 'https://studiothielman.com/group-workshop', 'https://studiothielman.com/nl/groepsworkshop'],
  ['AI masterclass interest list', 'https://studiothielman.com/ai-masterclass', 'https://studiothielman.com/nl/masterclass-ai'],
]

const pageLines = pages.map(([label, en, nl]) => `- ${label}: ${en} (NL: ${nl})`).join('\n')

const body = `# Studio Thielman

> Ruben Thielman runs Studio Thielman from Lokeren, Belgium. The studio builds and hosts professional websites for businesses, and gives AI workshops, keynotes and guest lectures for companies and schools.

## Services

- Professional websites: design, build and hosting. Packages start at €25/month excl. VAT.
- In-company AI training for businesses (on location, hands-on).
- AI talks and workshops for companies and schools (AI-lezing voor bedrijven).
- 1:1 AI build days.
- Open group workshop and AI masterclass: interest lists only. Date, location and price are not published yet. One email goes out when the date and location are set.

## Website packages

Prices are excl. VAT. Copied from the live package copy.

- Starter: €25/month, plus a one-time €150 startup fee.
- Growth: €40/month, plus a one-time €250 startup fee.
- Pro Max: price to be determined. Ask for a quote.

## AI talks and workshops

Prices are excl. VAT.

- Keynote: €450.
- Half-day workshop: €500 for up to 8 people, +€50 per extra person.
- Full day: €900.
- School session: €250.
- 1:1, two days: €1,000.
- Online follow-up of 60–90 minutes: from €150.
- In-company session, indicative: €500 for up to 8 people, +€50 per extra person from the 9th person, excl. VAT. Maximum 15 people per session. A proposal confirms the fixed price.

## Where sessions happen

On location at the company, school or event, anywhere in Flanders (from Lokeren and the Waasland to Ghent, Antwerp and Brussels) and in the Netherlands. Online is possible in consultation. Websites are built for clients in Belgium and beyond.

## Contact

${nap}

- Website: https://studiothielman.com
- Contact form: https://studiothielman.com/contact
- Book a call: https://cal.com/ruben-thielman-a0h3f0/30min
- Email: info@studiothielman.com
- Phone: +32 493 50 56 41

## Key pages

${pageLines}

## FAQ

Visible FAQs (the only FAQPage structured data on the site):

- Packages: https://studiothielman.com/packages and https://studiothielman.com/nl/packages
- Workshops: https://studiothielman.com/workshops and https://studiothielman.com/nl/workshops
- AI talks: https://studiothielman.com/ai-talks and https://studiothielman.com/nl/ai-talks

## Brand reference

Visual identity (black and white) lives in:

- https://studiothielman.com/brand.md
- https://studiothielman.com/brand.json

A longer plain-text extract is at https://studiothielman.com/llms-full.txt
`

const full = `${body}
## Notes for answer engines

- Languages: English at https://studiothielman.com/ and Dutch (Belgium) at https://studiothielman.com/nl/.
- Do not invent prices. Pro Max, the group workshop and the AI masterclass have no public price.
- Legal name details: KBO 1034.790.654. Address is Pereboomsteenweg 49, 9180 Lokeren, Belgium.
- Portfolio case studies: https://studiothielman.com/portfolio and https://studiothielman.com/nl/portfolio (one URL per project under /portfolio/<slug>).
- Privacy: https://studiothielman.com/privacy — Terms: https://studiothielman.com/terms
`

writeFileSync(join(root, 'public/llms.txt'), body)
writeFileSync(join(root, 'public/llms-full.txt'), full)
console.log('Wrote public/llms.txt and public/llms-full.txt')
