import type { PortfolioItem } from './types'

// Nieuwste eerst (op lanceringsdatum)
export const portfolioItemsNl: PortfolioItem[] = [
  {
    slug: 'la-vie-nomade',
    title: 'ERPA — La Vie Nomade',
    package: 'Pro Max',
    description:
      'Frequentie als veld — custom brand platform met gefaseerde lancering, ledenzone en verborgen interacties.',
    longDescription:
      'ERPA La Vie Nomade is een merk- en communityplatform rond klank, frequentie en heling — geworteld in Het Sas van Gent. Geen standaard bedrijfssite, maar een levend digitaal veld: traag, ademend, met verborgen lagen voor wie blijft luisteren.',
    clientType: 'Brand platform · Community · Boekingen',
    date: 'APR 2026',
    liveUrl: 'https://lavienomade.com',
    keyFeatures: [],
    screenshots: ['/images/portfolio/ERPA/Erpa Source Lovable edit.jpeg'],
    packageFitExplanation: '',
    results:
      'Een productie-klaar merkplatform dat verder groeit in vier fases — van fluistering tot volledige community met boekingen en magazine — zonder opnieuw te bouwen. De site voelt als ERPA: geen lawaai, wel resonantie.',
    caseStudy: {
      subtitle: 'Een website die zich gedraagt als een frequentie',
      meta: [{ label: 'URL', value: 'lavienomade.com', href: 'https://lavienomade.com' }],
      sections: [
        {
          title: 'Waar ik mee startte',
          paragraphs: [
            'ERPA is geen merk dat je uitlegt met vijf bullet points. Voordat ik één pagina type, zat ik eerst in het gevoel: goud op zwart, traag scrollen, stilte tussen secties. Het doel was niet "informatie tonen" maar een frequentie neerzetten — iets dat aanvoelt als je de praktijk in Het Sas binnenstapt.',
            'De uitdaging was duidelijk: dit merk leeft in sfeer, ritme en vertrouwen. De site moest gefaseerd openen, een exclusieve ledenzone dragen, later boekingen en magazine mogelijk maken, en werken in acht talen — van Gent naar een internationaal publiek. Alles zonder het gevoel van rust te breken.',
          ],
        },
        {
          title: 'Eerst fluisteren, dan openen',
          paragraphs: [
            'Ik bouwde de site bewust in twee tempo\'s. De whisper-fase kwam eerst: alleen een countdown, een e-mailveld, geen menu. Bezoekers kunnen zich inschrijven, maar het merk blijft gesloten tot het moment klopt.',
            'Pas wanneer ERPA klaar was om volledig zichtbaar te worden, schakelde ik de live site vrij — oorsprongverhaal, zeven velden (kunst, sport, gastronomie, hospitality, wellbeing, B2B), een levende reistijdlijn, teasers naar winkel en magazine. De whisper blijft onderdeel van het verhaal; het merk "stemt af" voordat het volledig opengaat.',
          ],
        },
        {
          title: 'Motion als onderdeel van het merk',
          paragraphs: [
            'Ik wilde niet "animaties toevoegen" achteraf. Scroll-reactieve golven, magnetische hover-states en een loading-portal bij binnenkomst zitten in de eerste scroll-ervaring ingebouwd. Smooth scroll geeft het ademende tempo; motion reageert op waar de bezoeker is, niet op wat ik wil laten zien.',
            'Optioneel kan je een 432 Hz-geluidspad activeren. En voor wie blijft kijken: verborgen lagen — een Morse-quote, een adem-moment, een reactie wanneer je het monogram lang indrukt. Geen gimmicks; het merk beloont wie blijft luisteren.',
          ],
        },
        {
          title: 'Maison de Resonance',
          paragraphs: [
            'De ledenzone was het meest delicate stuk. Ik wilde geen klassiek login-scherm, maar een ritueel: toegang aanvragen, wachten op goedkeuring, binnenkomen via magic link. Elke member krijgt een persoonlijke lidkaart met een unieke frequentie.',
            'Van daaruit kunnen ze sessies boeken — alles verbonden met dezelfde rust en hetzelfde ritme als de publieke site. Ik bouwde het admin-paneel zodat ERPA zelf leden kan goedkeuren, slots kan beheren en boekingen kan opvolgen zonder technische tussenstap.',
          ],
        },
        {
          title: 'Alles wat erachter zit',
          paragraphs: [
            'Achter de sfeer zit een volledig werkend platform. Ik zette ledenbeheer, boekingsslots, wachtlijsten en betalingen op — boekingen, lidmaatschap, donaties — met bevestigingsmails die dezelfde toon aanhouden als de site.',
            'Contactformulieren, wachtlijsten en portal-signups sturen automatisch bevestigingen. Rate limiting en captcha waar het nodig is, zodat het veld open blijft maar beschermd. Alles end-to-end: concept, UX, frontend, backend, database, betalingen, e-mailflows, admin en deploy.',
          ],
        },
        {
          title: 'Meertalig van Gent naar de wereld',
          paragraphs: [
            'ERPA wil internationaal resoneren. Ik bouwde de content in acht talen — NL, EN, FR, ES, AR, JA, RU, PT — via vertaalbestanden en MDX. Geen zware CMS waar content vastzit; wel iets dat per fase kan meegroeien zonder de architectuur te breken.',
          ],
        },
        {
          title: 'Gefaseerd groeien',
          paragraphs: [
            'Ik structureerde het platform in vier fases: whisper, live, community, magazine. Elke fase schakelt features vrij zonder de basis te breken. Wat vandaag live staat, is fase één en twee; de rest groeit mee met het merk — zonder opnieuw te beginnen.',
          ],
        },
      ],
    },
  },
  {
    slug: 'de-storme-design',
    title: 'De Storme Design - Interieurarchitectuur',
    package: 'Growth',
    description: 'Een website voor een interieurarchitect, volledig opgebouwd rond het tonen van resultaten en het maximaliseren van de zichtbaarheid van het atelier.',
    longDescription: 'De Storme Design had een portfolio-first website nodig waarbij het werk voor zich spreekt. We focusten op sterke beelden, projecthighlights en vindbaarheid, zodat potentiële klanten meteen de kwaliteit van de interieurs van het atelier zien. Het resultaat is een verfijnde, beeldgedreven ervaring die het juiste publiek aantrekt en nieuwe opdrachten ondersteunt.',
    clientType: 'Interieurarchitectuur',
    date: 'APR 2026',
    liveUrl: 'https://destormedesign.be',
    keyFeatures: [
      'Portfolio- en projectshowcase',
      'Beeldgedreven galerijlayouts',
      'Verhaal en expertise van het atelier',
      'SEO-gerichte structuur',
      'Responsief op alle apparaten',
      'Contact- en aanvraagintegratie'
    ],
    screenshots: [
      '/images/portfolio/destormedesign/hero-home.webp',
      '/images/portfolio/destormedesign/brand-mark.webp',
    ],
    packageFitExplanation: 'De website van een interieurarchitect staat of valt met presentatie. Growth gaf De Storme Design de visuele flexibiliteit, vloeiende interacties en gestructureerde portfoliosecties die nodig zijn om online te concurreren - zonder onnodige backendcomplexiteit.',
    results: 'Sterkere online zichtbaarheid met een portfolio dat afgeronde interieurs centraal stelt'
  },
  {
    slug: 'tr-car-detail',
    title: 'TR Car Detail - Mobiele detailing & boekingen',
    package: 'Growth',
    description: 'Een mobiele autodetailingdienst die klanten thuis bezoekt. De site werkt als virtueel visitekaartje en boekingssysteem in één.',
    longDescription: 'TR Car Detail brengt professionele detailing naar de deur van de klant. Hun website is tegelijk een digitaal visitekaartje en een praktisch boekingskanaal: diensten uitleggen, vertrouwen opbouwen en het eenvoudig maken om contact op te nemen of een afspraak in te plannen. Elke sectie is afgestemd op helderheid en conversie op mobiel, waar de meeste bezoekers binnenkomen.',
    clientType: 'Automobieldiensten',
    date: 'APR 2026',
    liveUrl: 'https://www.trcardetail.be',
    keyFeatures: [
      'Layout als virtueel visitekaartje',
      'Online boekingssysteem',
      'Dienstenshowcase',
      'Mobile-first design',
      'Contact- en afspraakflows',
      'Merkbpresentatie die vertrouwen opbouwt'
    ],
    screenshots: ['/images/portfolio/trcardetail/about-story.webp'],
    packageFitExplanation: 'TR Car Detail combineert presentatie met functionaliteit - precies waar Growth voor bedoeld is. Het boekingssysteem en gestructureerde dienstenpagina\'s gaan verder dan Starter, terwijl alles gericht en snel blijft voor een lokale dienstverlener.',
    results: 'Eén website die het bedrijf vertegenwoordigt en boekingen vastlegt van mobiele klanten'
  },
  {
    slug: 'binnenhof',
    title: 'Binnenhof - Schoolcommunicatieplatform',
    package: 'Growth',
    description: 'Gebouwd voor Michiel Lippens - een schoolcommunicatieplatform om de communicatie tussen school en ouders te verbeteren, met focus op taalbarrières en leerstoornissen.',
    longDescription: 'Gebouwd voor Michiel Lippens is Binnenhof een schoolcommunicatieplatform met een duidelijke missie: het makkelijker maken voor scholen en ouders om verbonden te blijven, vooral waar taalbarrières of leerstoornissen extra wrijving veroorzaken. De interface geeft prioriteit aan helderheid, toegankelijkheid en rechttoe-rechtaan berichten, zodat belangrijke updates elke familie bereiken, niet alleen wie traditionele kanalen gemakkelijk vindt.',
    clientType: 'Onderwijs',
    date: 'APR 2026',
    liveUrl: 'https://binnenhof-mvp.vercel.app',
    keyFeatures: [
      'Berichten tussen school en ouders',
      'Toegankelijke, duidelijke UI',
      'Ondersteuning voor diverse gezinsbehoeften',
      'Gestructureerde informatielevering',
      'Rolgebaseerde communicatieflows',
      'Mobielvriendelijke toegang'
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop&q=80'
    ],
    packageFitExplanation: 'Binnenhof gaat verder dan een statische schoolsite: het vroeg om doordachte UX voor echte communicatie-uitdagingen. Het Growth-pakket bood de interactieve, gebruikersgerichte basis om een platform te prototypen dat taalbarrières en toegankelijkheid in het onderwijs aanpakt.',
    results: 'Duidelijkere school-oudercommunicatie ontworpen voor inclusiviteit en dagelijks gebruik'
  },
  {
    slug: 'party-up',
    title: 'PartyUp — Verhuur van feestartikelen',
    package: 'Growth',
    description: 'Een high-end verhuurservice voor feestartikelen had een website nodig waar klanten eenvoudig verhuuritems kunnen browsen en vinden.',
    longDescription: 'PartyUp biedt premium feestartikelen te huur. We bouwden een website die hun catalogus centraal stelt en klanten helpt de juiste items voor hun evenement te ontdekken en te vinden zonder frictie. Een strakke presentatie, duidelijke categorieën en een professionele uitstraling passen bij de high-end positionering van het merk.',
    clientType: 'Evenementverhuur',
    date: 'FEB 2026',
    liveUrl: 'https://party-up.be',
    keyFeatures: [
      'Product- en verhuurcatalogus',
      'Duidelijk browsen per categorie',
      'High-end merkbpresentatie',
      'Mobielvriendelijke layout',
      'Contact- en aanvraagflows',
      'Snelle, moderne frontend'
    ],
    screenshots: [
      '/images/portfolio/party-up/hero-home.webp',
      '/images/portfolio/party-up/brand-mark.webp',
    ],
    packageFitExplanation: 'PartyUp had dynamische, verfijnde pagina\'s en een gestructureerde manier nodig om inventaris te tonen - een natuurlijke match voor het Growth-pakket. Meer dan een simpele landingspagina ondersteunt de site echte bedrijfsdoelen: klanten helpen de juiste verhuuritems online te vinden en aan te vragen.',
    results: 'Klanten kunnen feestverhuuritems verkennen en vinden via een professionele, merkconforme website'
  },
  {
    slug: 'battle-dashboard',
    title: 'BattleDashboard - Custom dashboard met adminpaneel',
    package: 'Growth',
    description: 'Een publieke demo van een custom klantdashboard dat we bouwden. Het live systeem bevat gevoelige data, dus deze versie toont de interface en functies zonder echte informatie bloot te leggen.',
    longDescription: 'BattleDashboard begon als een echt klantproject: een custom intern dashboard met adminpaneel, statistiekentracking en dynamische datavisualisatie. Omdat de productieomgeving gevoelige bedrijfsdata bevat, maakten we deze publieke demo om te tonen wat we leverden - dezelfde structuur en mogelijkheden, met veilige voorbeelddata in plaats van echte gegevens. De demo omvat gebruikersbeheer, analytics-weergaven, interactieve grafieken en een responsieve admininterface.',
    clientType: 'Klantdemo',
    date: 'JAN 2025',
    liveUrl: 'https://becreativeruben.github.io/BattleDashboard_DEMO/',
    githubUrl: 'https://github.com/BeCreativeRuben/BattleDashboard_DEMO',
    keyFeatures: [
      'Publieke demo van een echte klantbuild',
      'Adminpaneel met gebruikersbeheer',
      'Statistiekendashboard',
      'Dynamische datavisualisatie',
      'Interactieve grafieken en diagrammen',
      'Responsieve admininterface'
    ],
    screenshots: [
      '/images/portfolio/battle-dashboard/banner.png'
    ],
    packageFitExplanation: 'Deze demo weerspiegelt een Growth-tier klantlevering: dynamisch contentbeheer, geavanceerde interacties en CMS-achtige functionaliteit. Het toont hoe bedrijven content en data kunnen beheren zonder technische kennis, met realtime updates en interactieve elementen die verder gaan dan simpele statische pagina\'s.',
    results: 'Een deelbare demo die onze dashboardmogelijkheden bewijst terwijl de vertrouwelijke productiedata van de klant beschermd blijft'
  },
  {
    slug: 'chromattic',
    title: 'Chromattic - Muziekbandportfolio',
    package: 'Starter',
    description: 'Een indrukwekkend portfolio voor een muziekband met releases, tourdata en mediagalerijen. Gebouwd met strak design en vloeiende animaties zodat de muziek centraal staat.',
    longDescription: 'Chromattic is een professionele portfolio-website voor een muziekband die de kracht van het Starter-pakket demonstreert. De site heeft een mooi one-page design met meerdere secties: hero, releases, tourkalender, mediagalerij, bandbiografie en contactinformatie. De website is volledig responsief en zorgt voor een perfecte ervaring op alle apparaten, van smartphone tot desktop.',
    clientType: 'Muziekband',
    date: 'DEC 2024',
    liveUrl: 'https://chromattic.rocks',
    githubUrl: 'https://github.com/BeCreativeRuben/Chrommatic',
    keyFeatures: [
      'Responsief one-page design',
      'Showcase van muziekreleases',
      'Tourdatakalender',
      'Mediagalerij (foto\'s & video\'s)',
      'Bandbiografiesectie',
      'Contact- en socialmediaintegratie',
      'Vloeiende scrollanimaties',
      'SEO-geoptimaliseerd'
    ],
    screenshots: [
      '/images/portfolio/chromattic/logo.jpg'
    ],
    packageFitExplanation: 'Dit project toont perfect wat het Starter-pakket kan. Het laat zien hoe een professionele website met meerdere secties kan worden gebouwd met statische pagina\'s, responsief design en eenvoudige animaties. De site bevat alles wat een band nodig heeft: werk tonen, tourinformatie en contactgegevens. Gebouwd met moderne technologieën (React, Vite, Tailwind CSS) bewijst het dat Starter-websites mooi én functioneel kunnen zijn zonder complexe backends of geavanceerde functies.',
    results: 'Professionele online aanwezigheid voor de band met een naadloze gebruikerservaring'
  }
]
