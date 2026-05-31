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
      'A physical assembly line, live computer vision, a 3D digital twin, and a robot arm — all wired into AI agents through MCP. Built in one day with an inadvisable amount of coffee.',
    watchDemo: 'Watch demo →',
    github: 'GitHub →',
    securityReview: 'Security review →',
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
  demo: {
    label: 'Demo',
    title: 'Stage pitch video',
    iframeTitle: 'Caffeinated Robo Ravers — Hackers & Ravers demo',
  },
  media: {
    label: 'Behind the build',
    title: 'The team on the floor',
    teamAlt: 'Caffeinated Robo Ravers at Hackers and Ravers',
    teamCaption: 'Caffeinated Robo Ravers — Hackers & Ravers, Wintercircus Ghent',
    videos: [
      { file: 'good-run-cropcamera.mp4', label: 'Good run — camera feed' },
      { file: 'good-run-digitaltwin.mp4', label: 'Good run — digital twin' },
      { file: 'badrun_cropcamera.mp4', label: 'Faulty part — camera feed' },
      { file: 'badrun_digitaltwin.mp4', label: 'Faulty part — digital twin' },
    ],
  },
  battle: {
    label: 'Builders Battle',
    title: 'From coffee machine to the podium',
    p1: 'The Builders Battle is for teams who want complete creative freedom. An AI judge shortlists two finalists, each gets a 3-minute stage pitch, and the audience picks the winner.',
    prizeTitle: 'Prize pool',
    prizes: 'Mac Minis · Limousine chauffeur · Team-building activity · Wintercircus memberships · Soda Straw licenses',
    p2Before: 'We made it to the podium as a finalist and took',
    p2Strong: 'second place',
    p2After: 'First place went to',
    p2End: '— well deserved.',
    p3: 'Our team came together completely organically — we started talking around the coffee machine, clicked immediately, and spent the rest of the day building. No plan, no pitch deck at the start. Just four builders who wanted to ship something real.',
    winnerName: 'Srikanth Ganta',
  },
  team: {
    label: 'The team',
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
    title: 'Explore the project',
    github: 'GitHub repository',
    youtube: 'YouTube demo',
    aikido: 'Aikido security review',
  },
}
