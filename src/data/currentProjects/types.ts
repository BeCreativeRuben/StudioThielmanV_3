export interface CurrentProject {
  id: string
  title: string
  description: string
  status: 'planning' | 'in-progress' | 'testing' | 'almost-done' | 'completed'
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
  liveUrlText?: string
  notes?: string
}
