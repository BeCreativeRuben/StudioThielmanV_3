export const hackersAndRaversNl = {
  seo: {
    title: 'Caffeinated Robo Ravers — Hackers & Ravers',
    description:
      'Tweede plaats op Hackers & Ravers Builders Battle. Fysieke assemblagelijn, computer vision, digital twin en AI-agents — gebouwd in één dag.',
  },
  hero: {
    eventBadge: 'Hackers & Ravers',
    resultBadge: '2e plaats · Builders Battle',
    title: 'Caffeinated Robo Ravers',
    subtitle:
      'Een fysieke assemblagelijn, live computer vision, een 3D digital twin en een robotarm — allemaal gekoppeld aan AI-agents via MCP. Gebouwd in één dag met een onverantwoordelijke hoeveelheid koffie.',
    watchDemo: 'Bekijk demo →',
    github: 'GitHub →',
    securityReview: 'Security review →',
  },
  built: {
    label: 'Wat we bouwden',
    title: 'Factory floor → digital twin → AI-actie',
    p1: 'We overbrugden de kloof tussen de factory floor en de agentic stack. Een mock assemblagelijn wordt gemonitord via computer vision en stuurt part presence, defect status en robot state live door naar een 3D digital twin. De SO101-robotarm sluit de loop — agents observeren niet alleen, ze handelen in de fysieke wereld.',
    p2: 'Via Soda Straw als MCP-laag kan je opvragen wat er op de lijn gebeurt, gemarkeerde onderdelen goed- of afkeuren, en de productielijn laten bewegen — rechtstreeks vanuit Claude, Cursor of je agent naar keuze.',
    pillars: [
      {
        title: 'Vision / CV',
        owner: 'Sven',
        body: 'OpenCV-camerafeed met brightness/range threshold detection over 5 stations. Defecte onderdelen worden gelogd met imagesnapshots in PostgreSQL.',
      },
      {
        title: 'Digital twin',
        owner: 'Ruben',
        body: 'Three.js twin gesynchroniseerd in real time — zie station states, robotpositie en productieflow terwijl het gebeurt op de fysieke lijn.',
      },
      {
        title: 'Robot',
        owner: 'Joachim',
        body: 'SO101-robotarm voert routines uit op commando — verplaatst onderdelen tussen stations en sluit de loop tussen digitaal en fysiek.',
      },
      {
        title: 'Agent / MCP',
        owner: 'Lucas',
        body: 'Claude supervisor en Soda Straw MCP-laag — bevraag de lijn, review gemarkeerde onderdelen en trigger acties vanuit Claude, Cursor of je agent naar keuze.',
      },
    ],
  },
  demo: {
    label: 'Demo',
    title: 'Stage pitch video',
    iframeTitle: 'Caffeinated Robo Ravers — Hackers & Ravers demo',
  },
  media: {
    label: 'Achter de schermen',
    title: 'Het team op de vloer',
    teamAlt: 'Caffeinated Robo Ravers op Hackers and Ravers',
    teamCaption: 'Caffeinated Robo Ravers — Hackers & Ravers, Wintercircus Gent',
    videos: [
      { file: 'good-run-cropcamera.mp4', label: 'Goede run — camerafeed' },
      { file: 'good-run-digitaltwin.mp4', label: 'Goede run — digital twin' },
      { file: 'badrun_cropcamera.mp4', label: 'Defect onderdeel — camerafeed' },
      { file: 'badrun_digitaltwin.mp4', label: 'Defect onderdeel — digital twin' },
    ],
  },
  battle: {
    label: 'Builders Battle',
    title: 'Van koffiemachine tot podium',
    p1: 'De Builders Battle is voor teams die volledige creatieve vrijheid willen. Een AI-jury selecteert twee finalisten, elk krijgt een stage pitch van 3 minuten, en het publiek kiest de winnaar.',
    prizeTitle: 'Prijzen',
    prizes: 'Mac Mini\'s · Limousine chauffeur · Teambuilding · Wintercircus-lidmaatschappen · Soda Straw-licenties',
    p2Before: 'We haalden het podium als finalist en werden',
    p2Strong: 'tweede',
    p2After: 'Eerste plaats ging naar',
    p2End: '— verdiend.',
    p3: 'Ons team kwam volledig organisch samen — we begonnen te praten aan de koffiemachine, klikten meteen, en bouwden de rest van de dag door. Geen plan, geen pitch deck aan het begin. Gewoon vier builders die iets echts wilden shippen.',
    winnerName: 'Srikanth Ganta',
  },
  team: {
    label: 'Het team',
    title: 'Caffeinated Robo Ravers',
    linkedin: 'LinkedIn →',
    members: [
      { name: 'Sven Pissoort', role: 'Vision / CV' },
      { name: 'Ruben Thielman', role: 'Digital twin' },
      { name: 'Joachim Defour', role: 'Robot' },
      { name: 'Lucas Kustermans', role: 'Agent / MCP' },
    ],
  },
  explore: {
    title: 'Ontdek het project',
    github: 'GitHub repository',
    youtube: 'YouTube demo',
    aikido: 'Aikido security review',
  },
}
