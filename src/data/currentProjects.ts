export interface CurrentProject {
  id: string
  title: string
  description: string
  status: 'planning' | 'in-progress' | 'testing' | 'almost-done'
  progress: number // 0-100
  category: string
  technologies: string[]
  plannedFeatures: string[]
  discoveredItems: string[] // Things discovered/learned
  todoItems: string[] // Things planned to do
  startDate: string
  estimatedCompletion?: string
  githubUrl?: string
  liveUrl?: string
  notes?: string
}

export const currentProjects: CurrentProject[] = [
  {
    id: 'project-1',
    title: 'Studio Thielman Website',
    description: 'Building out the complete Studio Thielman website with portfolio, services, and client management features.',
    status: 'in-progress',
    progress: 75,
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    plannedFeatures: [
      'Portfolio showcase with detail pages',
      'Service packages with pricing',
      'Contact form with multi-step process',
      'Admin dashboard for submissions',
      'Chat widget integration'
    ],
    discoveredItems: [
      'Best practices for portfolio detail pages',
      'Dynamic routing with React Router',
      'Iframe embedding best practices'
    ],
    todoItems: [
      'Add more portfolio projects',
      'Implement blog section',
      'Add client testimonials',
      'Optimize images and performance',
      'Add analytics tracking'
    ],
    startDate: 'Jan 2025',
    estimatedCompletion: 'Feb 2025',
    notes: 'Making great progress on the core features!'
  },
  {
    id: 'project-2',
    title: 'AI Integration Platform',
    description: 'Exploring AI integrations and automation workflows for business solutions.',
    status: 'planning',
    progress: 25,
    category: 'AI & Automation',
    technologies: ['Python', 'OpenAI API', 'N8N', 'React'],
    plannedFeatures: [
      'AI chatbot integration',
      'Workflow automation',
      'Custom AI assistants',
      'Data analysis tools'
    ],
    discoveredItems: [
      'OpenAI API capabilities',
      'N8N workflow automation',
      'AI prompt engineering basics'
    ],
    todoItems: [
      'Research best AI models for use cases',
      'Design workflow architecture',
      'Build prototype chatbot',
      'Test automation scenarios',
      'Create documentation'
    ],
    startDate: 'Jan 2025',
    estimatedCompletion: 'Mar 2025',
    notes: 'Early planning phase - exciting possibilities!'
  },
  {
    id: 'project-3',
    title: 'MoosDesigns Website',
    description: 'Website for MoosDesigns, a 3D printing business. Planned release beginning of February.',
    status: 'planning',
    progress: 0,
    category: 'Web Development',
    technologies: [],
    plannedFeatures: [],
    discoveredItems: [],
    todoItems: [],
    startDate: 'Jan 2026',
    estimatedCompletion: 'Feb 2026'
  },
  {
    id: 'project-4',
    title: 'Accounting Software',
    description: 'Accounting software solution for a specific niche.',
    status: 'in-progress',
    progress: 50,
    category: 'Software Development',
    technologies: [],
    plannedFeatures: [],
    discoveredItems: [],
    todoItems: [],
    startDate: 'Jan 2026',
    estimatedCompletion: 'Mar 2026'
  },
  {
    id: 'project-5',
    title: 'E-Commerce Platform Integrations',
    description: 'E-Commerce platform integrations for 3 clients.',
    status: 'planning',
    progress: 25,
    category: 'E-Commerce',
    technologies: [],
    plannedFeatures: [],
    discoveredItems: [],
    todoItems: [],
    startDate: 'Feb 2026',
    estimatedCompletion: 'Mar 2026'
  },
  {
    id: 'project-6',
    title: 'Car Detailing Website',
    description: 'Website for car detailing business.',
    status: 'planning',
    progress: 10,
    category: 'Web Development',
    technologies: [],
    plannedFeatures: [],
    discoveredItems: [],
    todoItems: [],
    startDate: 'Feb 2026',
    estimatedCompletion: 'Mar 2026'
  }
]

export const getCurrentProjectById = (id: string): CurrentProject | undefined => {
  return currentProjects.find(project => project.id === id)
}
