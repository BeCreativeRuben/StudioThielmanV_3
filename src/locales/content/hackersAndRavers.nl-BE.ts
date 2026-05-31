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
      'Vier vreemden aan de koffiemachine. Eén dag om te bouwen. Een robotarm, een digital twin, en een inzending die we net niet te laat misten.',
    watchDemo: 'Bekijk demo →',
    github: 'GitHub →',
    securityReview: 'Security review →',
  },
  origin: {
    label: 'Hoe we samenkwamen',
    title: 'Koffiemachine → build crew',
    body: 'Ons team kwam volledig organisch samen — we begonnen te praten aan de koffiemachine, klikten meteen, en bouwden de rest van de dag door. Geen plan, geen pitch deck aan het begin. Gewoon vier builders die iets echts wilden shippen.',
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
  media: {
    label: 'Live op de lijn',
    title: 'Goede runs, slechte runs',
    intro: 'Computer vision en de digital twin in actie — een schone run naast een defect onderdeel dat op de lijn wordt gemarkeerd.',
    videos: [
      { file: 'good-run-cropcamera.mp4', label: 'Goede run — camerafeed' },
      { file: 'good-run-digitaltwin.mp4', label: 'Goede run — digital twin' },
      { file: 'badrun_cropcamera.mp4', label: 'Defect onderdeel — camerafeed' },
      { file: 'badrun_digitaltwin.mp4', label: 'Defect onderdeel — digital twin' },
    ],
  },
  deadline: {
    label: 'Inzending',
    title: '5 seconden marge',
    p1: 'Voor we konden pitchen, moesten we onze demo uploaden naar YouTube. De WiFi op locatie was verschrikkelijk — de upload startte goed, maar YouTube schakelde over naar verwerking en schatte nog 10+ minuten.',
    p2: 'Met 50 seconden op de klok gaven we het op. De verwerking zou nooit op tijd klaar zijn.',
    p3: 'Toen, met nog 15 seconden over, kwam de link eindelijk door. We plakten hem erin en drukten op submit — 5 seconden marge.',
    p4: 'Daarna vierden we alsof we alles gewonnen hadden.',
    featured: { file: 'deadline_vid.mp4', label: 'De deadline — volledig moment' },
    moments: [
      { file: 'nohope_deadline.mp4', label: 'Geen hoop — 50 seconden over' },
      { file: 'LASTSECOND_deadline.mp4', label: 'Submit op het laatste moment' },
      { file: 'Celebration_Deadline.mp4', label: 'Viering' },
    ],
  },
  demo: {
    label: 'Demo',
    title: 'Stage pitch video',
    intro: 'De demo die we bijna te laat indienden — dezelfde upload die met seconden marge op YouTube belandde.',
    iframeTitle: 'Caffeinated Robo Ravers — Hackers & Ravers demo',
  },
  battle: {
    label: 'Builders Battle',
    title: 'Van inzending tot podium',
    p1: 'De Builders Battle is voor teams die volledige creatieve vrijheid willen. Een AI-jury selecteert twee finalisten, elk krijgt een stage pitch van 3 minuten, en het publiek kiest de winnaar.',
    prizeTitle: 'Prijzen',
    prizes: 'Mac Mini\'s · Limousine chauffeur · Teambuilding · Wintercircus-lidmaatschappen · Soda Straw-licenties',
    p2Before: 'We haalden het podium als finalist en werden',
    p2Strong: 'tweede',
    p2After: 'Eerste plaats ging naar',
    p2End: '— verdiend.',
    winnerName: 'Srikanth Ganta',
  },
  team: {
    label: 'Het team',
    title: 'Caffeinated Robo Ravers',
    teamAlt: 'Caffeinated Robo Ravers op Hackers and Ravers',
    teamCaption: 'Caffeinated Robo Ravers — Hackers & Ravers, Wintercircus Gent',
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
