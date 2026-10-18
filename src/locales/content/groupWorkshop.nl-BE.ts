import type { groupWorkshopEn } from './groupWorkshop.en'

export const groupWorkshopNl: typeof groupWorkshopEn = {
  shell: {
    brandTag: 'GROEPSWORKSHOP',
    navCta: 'Inschrijven',
    backToTalks: 'AI-lezingen & workshops',
  },
  hero: {
    eyebrow: 'Groepsworkshop · interesselijst',
    title: 'Hands-on AI-workshop in groep',
    pitch:
      'Een praktische workshop in groep waarin je zelf met AI aan de slag gaat. Geen hype en geen slides vol theorie: je doet het zelf en neemt meteen bruikbare dingen mee.',
  },
  promise: {
    title: 'Zo werkt het',
    text:
      'Laat je e-mail achter. Zodra er genoeg inschrijvingen zijn en de datum en locatie vastliggen, krijg je één mail met alle info.',
    noSpam: 'Je e-mail wordt alleen hiervoor gebruikt, geen nieuwsbrief, geen spam.',
  },
  learn: {
    label: 'WAT JE DOET',
    title: 'Wat je doet in de workshop',
    items: [
      'Hands-on werken met de AI-tools van vandaag (ChatGPT, Claude, Copilot en co)',
      'Prompts schrijven die sneller betere resultaten geven',
      'Je eigen eenvoudige AI-agent of automatisering bouwen',
      'AI toepassen op je eigen werk, studie of zaak',
    ],
  },
  audience: {
    label: 'VOOR WIE',
    text: 'Voor ondernemers, studenten, werknemers en iedereen die nieuwsgierig is naar AI.',
  },
  form: {
    title: 'Schrijf je in op de interesselijst',
    email: 'E-mail',
    firstName: 'Voornaam',
    optional: '(optioneel)',
    role: 'Ik ben',
    roleOptions: [
      { value: '', label: 'Kies…' },
      { value: 'entrepreneur', label: 'Ondernemer' },
      { value: 'student', label: 'Student' },
      { value: 'employee', label: 'Werknemer' },
      { value: 'other', label: 'Andere' },
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
}
