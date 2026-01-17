import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { currentProjects } from '../data/currentProjects'
import Button from '../components/Button'

const statusColors = {
  'planning': 'bg-blue-100 text-blue-800 border-blue-200',
  'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'testing': 'bg-purple-100 text-purple-800 border-purple-200',
  'almost-done': 'bg-green-100 text-green-800 border-green-200'
}

const statusLabels = {
  'planning': 'Planning',
  'in-progress': 'In Progress',
  'testing': 'Testing',
  'almost-done': 'Almost Done'
}

export default function CurrentProjects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div className="absolute left-0 right-0 w-full bg-gray-900" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: '400px' }}></div>
        <div className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/80 to-black/40 z-0" style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: '400px' }}></div>
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-sm text-white/60 uppercase tracking-wider mb-4">WORK IN PROGRESS</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Current Projects</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            See what I'm building, learning, and planning. Transparency in progress and dedication.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-primary mb-2">{project.title}</h2>
                      <p className="text-body text-text-primary">{project.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-secondary">Progress</span>
                      <span className="text-sm font-semibold text-primary">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-cta"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">Technologies</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-2 py-1 bg-accent text-text-primary text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Started</div>
                      <div className="text-sm font-semibold text-primary">{project.startDate}</div>
                    </div>
                    {project.estimatedCompletion && (
                      <div>
                        <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Est. Completion</div>
                        <div className="text-sm font-semibold text-primary">{project.estimatedCompletion}</div>
                      </div>
                    )}
                  </div>

                  {/* Planned Features */}
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="w-full flex items-center justify-between mb-2 hover:opacity-70 transition-opacity"
                    >
                      <div className="text-xs text-text-secondary uppercase tracking-wider">
                        Planned Features ({project.plannedFeatures.length})
                      </div>
                      <svg
                        className={`w-4 h-4 text-text-secondary transition-transform ${expandedProject === project.id ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {expandedProject === project.id ? (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-1 overflow-hidden"
                        >
                          {project.plannedFeatures.map((feature, idx) => (
                            <li key={idx} className="text-sm text-text-primary flex items-start">
                              <span className="text-cta mr-2 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </motion.ul>
                      ) : (
                        <ul className="space-y-1">
                          {project.plannedFeatures.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-sm text-text-primary flex items-start">
                              <span className="text-cta mr-2 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                          {project.plannedFeatures.length > 3 && (
                            <li className="text-sm text-text-secondary">
                              +{project.plannedFeatures.length - 3} more features
                            </li>
                          )}
                        </ul>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Discovered & Learned - Only show when expanded */}
                  {expandedProject === project.id && project.discoveredItems.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="text-xs text-text-secondary uppercase tracking-wider mb-2">
                        Discovered & Learned
                      </div>
                      <ul className="space-y-1">
                        {project.discoveredItems.map((item, idx) => (
                          <li key={idx} className="text-sm text-text-primary flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">💡</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Notes */}
                  {project.notes && (
                    <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm text-text-primary italic">"{project.notes}"</p>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-cta transition-colors flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-cta transition-colors flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Interested in Collaborating?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Let's discuss how we can work together on your next project.
            </p>
            <Link to="/contact#contact-form">
              <Button variant="cta" size="lg">Get in Touch</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
