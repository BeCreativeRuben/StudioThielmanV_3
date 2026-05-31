export const hackersAndRaversEn = {
  seo: {
    title: 'Caffeinated Robo Ravers — Hackers & Ravers',
    description:
      '2nd place at Hackers & Ravers Builders Battle. Physical assembly line, computer vision, digital twin, and AI agents — built in one day.',
  },
  hero: {
    eventBadge: 'Hackers & Ravers',
    resultBadge: '2nd Place · Builders Battle',
    title: 'Caffeinated Robo Ravers',
    subtitle:
      'Four strangers at a coffee machine. One day to build. A robot arm, a digital twin, and a submission we almost missed by seconds.',
    watchDemo: 'Watch demo →',
    github: 'GitHub →',
    securityReview: 'Security review →',
  },
  origin: {
    label: 'How we met',
    title: 'Coffee machine → build crew',
    body: 'Our team came together completely organically — we started talking around the coffee machine, clicked immediately, and spent the rest of the day building. No plan, no pitch deck at the start. Just four builders who wanted to ship something real.',
  },
  built: {
    label: 'What we built',
    title: 'Factory floor → digital twin → AI action',
    p1: 'We bridged the gap between the factory floor and the agentic stack. A mock assembly line is monitored through computer vision, feeding part presence, defect state, and robot state live into a 3D digital twin. The SO101 robot arm closes the loop — agents don\'t just observe, they act in the physical world.',
    p2: 'Using Soda Straw as an MCP layer, you can query what\'s happening on the line, approve or reject flagged parts, and trigger the production line to move — straight from Claude, Cursor, or your agent of choice.',
    pillars: [
      {
        title: 'Vision / CV',
        owner: 'Sven',
        body: 'OpenCV camera feed with brightness/range threshold detection across 5 stations. Faulty parts are logged with image snapshots to PostgreSQL.',
      },
      {
        title: 'Digital twin',
        owner: 'Ruben',
        body: 'Three.js twin synced in real time — see station states, robot position, and production flow as it happens on the physical line.',
      },
      {
        title: 'Robot',
        owner: 'Joachim',
        body: 'SO101 robot arm executes routines on command — moving parts between stations and closing the loop between the digital and physical line.',
      },
      {
        title: 'Agent / MCP',
        owner: 'Lucas',
        body: 'Claude supervisor and Soda Straw MCP layer — query the line, review flagged parts, and trigger actions from Claude, Cursor, or your agent of choice.',
      },
    ],
  },
  media: {
    label: 'Live on the line',
    title: 'Good runs, bad runs',
    intro: 'Computer vision and the digital twin in action — a clean run side by side with a faulty part flagged on the line.',
    videos: [
      { file: 'good-run-cropcamera.mp4', label: 'Good run — camera feed' },
      { file: 'good-run-digitaltwin.mp4', label: 'Good run — digital twin' },
      { file: 'badrun_cropcamera.mp4', label: 'Faulty part — camera feed' },
      { file: 'badrun_digitaltwin.mp4', label: 'Faulty part — digital twin' },
    ],
  },
  deadline: {
    label: 'Submission',
    title: '5 seconds to spare',
    p1: 'Before we could pitch, we had to upload our demo to YouTube. The venue WiFi was terrible — the upload started fine, then YouTube switched to processing and estimated 10+ more minutes.',
    p2: 'With 50 seconds left on the clock, we gave up. Processing wasn\'t going to finish in time.',
    p3: 'Then, with 15 seconds remaining, the link finally came through. We pasted it in and hit submit — 5 seconds to spare.',
    p4: 'We celebrated like we\'d won the whole thing.',
    featured: { file: 'deadline_vid.mp4', label: 'The deadline — full moment' },
    moments: [
      { file: 'nohope_deadline.mp4', label: 'No hope — 50 seconds left' },
      { file: 'LASTSECOND_deadline.mp4', label: 'Last-second submit' },
      { file: 'Celebration_Deadline.mp4', label: 'Celebration' },
    ],
  },
  demo: {
    label: 'Demo',
    title: 'Stage pitch video',
    intro: 'The demo we almost didn\'t get in on time — the same upload that made it to YouTube with seconds left on the clock.',
    iframeTitle: 'Caffeinated Robo Ravers — Hackers & Ravers demo',
  },
  battle: {
    label: 'Builders Battle',
    title: 'From submission to the podium',
    p1: 'The Builders Battle is for teams who want complete creative freedom. An AI judge shortlists two finalists, each gets a 3-minute stage pitch, and the audience picks the winner.',
    prizeTitle: 'Prize pool',
    prizes: 'Mac Minis · Limousine chauffeur · Team-building activity · Wintercircus memberships · Soda Straw licenses',
    p2Before: 'We made it to the podium as a finalist and took',
    p2Strong: 'second place',
    p2After: 'First place went to',
    p2End: '— well deserved.',
    winnerName: 'Srikanth Ganta',
  },
  team: {
    label: 'The team',
    title: 'Caffeinated Robo Ravers',
    teamAlt: 'Caffeinated Robo Ravers at Hackers and Ravers',
    teamCaption: 'Caffeinated Robo Ravers — Hackers & Ravers, Wintercircus Ghent',
    linkedin: 'LinkedIn →',
    members: [
      { name: 'Sven Pissoort', role: 'Vision / CV' },
      { name: 'Ruben Thielman', role: 'Digital twin' },
      { name: 'Joachim Defour', role: 'Robot' },
      { name: 'Lucas Kustermans', role: 'Agent / MCP' },
    ],
  },
  explore: {
    title: 'Explore the project',
    github: 'GitHub repository',
    youtube: 'YouTube demo',
    aikido: 'Aikido security review',
  },
}
