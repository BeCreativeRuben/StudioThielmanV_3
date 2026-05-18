import { readFileSync, writeFileSync } from 'node:fs'

const path = 'src/components/Header.tsx'
let s = readFileSync(path, 'utf8')
const closeDiv = '          </' + 'div' + '>\n'

if (!s.includes('LanguageSwitcher className')) {
  s = s.replace(
    '            ))}\n          </div>\n',
    `            ))}\n            <LanguageSwitcher className={isScrolled ? 'text-text-primary' : 'text-white/90'} />\n${closeDiv}`
  )
}

s = s.replace(
  'className="hidden md:block"',
  'className="hidden md:flex items-center gap-3 shrink-0"'
)

writeFileSync(path, s)
console.log('LanguageSwitcher:', s.includes('LanguageSwitcher'))
