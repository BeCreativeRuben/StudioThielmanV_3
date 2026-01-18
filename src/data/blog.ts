export interface BlogSection {
  type: 'heading' | 'paragraph' | 'image'
  content: string
  level?: number // For headings (2 = h2, 3 = h3, etc.)
  alt?: string // For images
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  featuredImage?: string
  sections: BlogSection[]
  cta: {
    text: string
    link: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'waarom-website-online-zichtbaarheid-niet-meer-mogen-ontbreken',
    title: 'Waarom een website en online zichtbaarheid echt niet meer mogen ontbreken voor je zaak',
    excerpt: 'Stel je voor: iemand in jouw buurt heeft dringend een loodgieter, kapper of webdesigner nodig. Wat doet die persoon? Juist, smartphone bovenhalen, "loodgieter nabij" intikken en scrollen door Google Maps. Als jij daar niet tussenstaat, ziet die klant je concurrent wél. Simpel zat.',
    date: 'JAN 2026',
    featuredImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop&q=80', // Business person using smartphone
    sections: [
      {
        type: 'paragraph',
        content: 'Stel je voor: iemand in jouw buurt heeft dringend een loodgieter, kapper of webdesigner nodig. Wat doet die persoon? Juist, smartphone bovenhalen, "loodgieter nabij" intikken en scrollen door Google Maps. Als jij daar niet tussenstaat, ziet die klant je concurrent wél. Simpel zat.'
      },
      {
        type: 'heading',
        content: 'Iedereen zoekt online',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Belgen leven online. Of het nu gaat om een snelle lunch bestellen of een nieuw huis laten bouwen, de zoektocht begint digitaal. Zonder site of Maps-profiel speel je verstoppertje met potentiële klanten die letterlijk om de hoek wonen.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop&q=80', // Google Maps on smartphone
        alt: 'Google Maps zoekresultaten voor lokale bedrijven'
      },
      {
        type: 'heading',
        content: 'Het voelt gewoon vertrouwd',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Een verzorgde website met echte foto\'s, reviews en contactinfo? Dat straalt betrouwbaarheid uit. Mensen denken: "Oké, deze zaak ziet er goed uit, ik bel ze." Online is king.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&q=80', // Person working on laptop with coffee
        alt: 'Tevreden klant aan laptop'
      },
      {
        type: 'heading',
        content: 'Leads vallen gewoon binnen',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Google Maps is goud voor lokale zaakvoerders. Mensen die "webshop laten bouwen Brussel" zoeken, zijn vaak al half overtuigd. Ze klikken, bellen of sturen bericht, en hop, afspraak in de agenda. Geen cold calls nodig, ze komen vanzelf.'
      },
      {
        type: 'heading',
        content: 'Groei zonder stress',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Zet SEO een beetje juist en je Maps-profiel op punt, en klanten stromen binnen zonder dat je elk jaar fortuinen aan ads spendeert. Het bouwt zich op: 1 enthousiaste klant deelt je link, de volgende vind je via google, en zo groeit je klantenbestand vanzelf.'
      }
    ],
    cta: {
      text: 'Laat me jouw online présence fixen – contacteer Studio Tilman vandaag nog!',
      link: '/contact'
    }
  }
]

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug)
}

export const getLatestBlogPost = (): BlogPost | undefined => {
  return blogPosts.length > 0 ? blogPosts[0] : undefined
}
