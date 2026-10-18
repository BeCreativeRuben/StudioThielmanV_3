import type { InterestListContent } from './interestList.types'

export const masterclassNl: InterestListContent = {
  shell: {
    brandTag: 'MASTERCLASS AI',
    navCta: 'Inschrijven',
    backToTalks: 'AI-lezingen & workshops',
  },
  hero: {
    eyebrow: 'Masterclass AI · interesselijst',
    title: 'Masterclass AI: de volgende stap',
    nextLevel: 'Is de groepsworkshop niet voor u? Denkt u dat u al verder staat? Zet dan de volgende stap: de masterclass AI.',
    pitch:
      'Een verdiepende sessie in groep voor wie al veel met AI werkt. Op dezelfde dag als de groepsworkshop, datum volgt. Vlot om in te stappen, met genoeg diepgang voor gevorderden.',
  },
  promise: {
    title: 'Zo werkt het',
    text:
      'Laat je e-mail achter. Zodra er genoeg inschrijvingen zijn en de datum en locatie vastliggen, krijg je één mail met alle info.',
    noSpam: 'Je e-mail wordt alleen hiervoor gebruikt, geen nieuwsbrief, geen spam.',
  },
  learn: {
    label: 'WAT JE DOET',
    title: 'Wat je doet in de masterclass',
    items: [
      'Je eigen AI-agents bouwen en ze laten samenwerken als multi-agent team',
      'AI koppelen aan je tools: MCP-connectoren, API’s en automatiseringen',
      'Websites en apps bouwen met AI-coding-agents',
      'Geavanceerd prompten: de juiste context meegeven en de output kritisch evalueren',
      'AI lokaal draaien en laten werken op je eigen data',
    ],
  },
  audience: {
    label: 'VOOR WIE',
    text: 'Voor wie ChatGPT, Claude of andere AI-tools al dagelijks gebruikt en er meer uit wil halen.',
  },
  form: {
    title: 'Schrijf je in op de interesselijst',
    email: 'E-mail',
    firstName: 'Voornaam',
    optional: '(optioneel)',
    role: 'Ik gebruik AI',
    roleOptions: [
      { value: '', label: 'Kies…' },
      { value: 'daily', label: 'Dagelijks' },
      { value: 'weekly', label: 'Wekelijks' },
      { value: 'building', label: 'Ik bouw er al mee' },
    ],
    submit: 'Zet me op de lijst',
    submitting: 'Verzenden…',
    privacy: 'Door je in te schrijven ga je akkoord met de',
    privacyLink: 'privacyverklaring',
    errorEmail: 'Vul een geldig e-mailadres in',
    errorSubmit: 'Er ging iets mis en je staat nog niet op de lijst. Probeer opnieuw, of mail naar',
    successTitle: 'Je staat op de lijst.',
    successText:
      'Je krijgt één mail zodra de datum en locatie vastliggen. Er is een korte bevestiging onderweg naar je inbox.',
  },
  talksLink: {
    text: 'Voor bedrijven of scholen:',
    cta: 'bekijk AI-lezingen & workshops op maat',
  },
  backLink: {
    text: 'Liever eerst instappen?',
    cta: 'Bekijk de groepsworkshop',
    to: '/group-workshop',
  },
}
