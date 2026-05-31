import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '../i18n/LocaleProvider'

const MEDIA_BASE = '/images/portfolio/hackers-and-ravers'
const asset = (file: string) => `${MEDIA_BASE}/${file}`
const TEAM_PHOTO = asset('team.webp')

const LINKS = {
  demo: 'https://youtu.be/JwwF4Un7YaU',
  github: 'https://github.com/DtecIndustries/caffeinated-robots',
  aikido: 'https://app.aikido.dev/agentic-review/f19e79f4-29d3-80b0-8cc3-ed0df02f7227',
  winner: 'https://www.linkedin.com/in/srikanth-ganta/',
}

const TEAM_LINKEDIN: Record<string, string> = {
  'Sven Pissoort': 'https://www.linkedin.com/in/sven-pissoort-855817134/',
  'Ruben Thielman': 'https://www.linkedin.com/in/ruben-thielman-6a8963256/',
  'Joachim Defour': 'https://www.linkedin.com/in/joachim-defour/',
  'Lucas Kustermans': 'https://www.linkedin.com/in/lucas-kustermans/',
}

function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-primary underline underline-offset-4 hover:text-text-secondary transition-colors ${className}`}
    >
      {children}
    </a>
  )
}

export default function HackersAndRavers() {
  const { messages } = useLocale()
  const h = messages.hackersAndRavers

  return (
    <div>
      <section className="relative py-20 md:py-32 overflow-hidden -mt-20 pt-20">
        <div
          className="absolute left-0 right-0 w-full bg-gray-900"
          style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        />
        <div
          className="absolute left-0 right-0 w-full bg-gradient-to-r from-black/85 to-black/50 z-0"
          style={{ top: '-80px', bottom: 0, height: 'calc(100% + 80px)', minHeight: 'calc(100vh + 80px)' }}
        />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-white/20">
              {h.hero.eventBadge}
            </span>
            <span className="bg-cta text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {h.hero.resultBadge}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{h.hero.title}</h1>
          <p className="text-xl text-white/85 max-w-2xl mx-auto mb-8">{h.hero.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <ExternalLink href={LINKS.demo} className="text-white hover:text-white/80 no-underline">
              {h.hero.watchDemo}
            </ExternalLink>
            <ExternalLink href={LINKS.github} className="text-white hover:text-white/80 no-underline">
              {h.hero.github}
            </ExternalLink>
            <ExternalLink href={LINKS.aikido} className="text-white hover:text-white/80 no-underline">
              {h.hero.securityReview}
            </ExternalLink>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.built.label}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{h.built.title}</h2>
            <p className="text-body-lg text-text-primary leading-relaxed mb-6">{h.built.p1}</p>
            <p className="text-body-lg text-text-primary leading-relaxed">{h.built.p2}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {h.built.pillars.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-accent rounded-xl p-6 border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-h4 font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-body-sm text-text-secondary mb-3">{item.owner}</p>
                <p className="text-body text-text-primary">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.demo.label}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">{h.demo.title}</h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <iframe
              src="https://www.youtube.com/embed/JwwF4Un7YaU"
              title={h.demo.iframeTitle}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.media.label}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">{h.media.title}</h2>
          <figure className="rounded-xl overflow-hidden shadow-lg mb-10">
            <img src={TEAM_PHOTO} alt={h.media.teamAlt} className="w-full h-auto object-cover" />
            <figcaption className="text-body-sm text-text-secondary px-4 py-3 bg-accent text-center">
              {h.media.teamCaption}
            </figcaption>
          </figure>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {h.media.videos.map((video) => (
              <div key={video.file} className="rounded-xl overflow-hidden shadow-md bg-black">
                <video controls playsInline preload="metadata" className="w-full aspect-video object-cover">
                  <source src={asset(video.file)} type="video/mp4" />
                </video>
                <p className="text-body-sm text-text-secondary px-4 py-3 bg-accent">{video.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.battle.label}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{h.battle.title}</h2>
          <p className="text-body-lg text-text-primary leading-relaxed mb-6">{h.battle.p1}</p>
          <div className="bg-white rounded-xl border border-border p-6 mb-8">
            <h3 className="text-h4 font-semibold text-primary mb-3">{h.battle.prizeTitle}</h3>
            <p className="text-body text-text-primary">{h.battle.prizes}</p>
          </div>
          <p className="text-body-lg text-text-primary leading-relaxed mb-4">
            {h.battle.p2Before} <strong>{h.battle.p2Strong}</strong>. {h.battle.p2After}{' '}
            <ExternalLink href={LINKS.winner}>{h.battle.winnerName}</ExternalLink> {h.battle.p2End}
          </p>
          <p className="text-body-lg text-text-primary leading-relaxed">{h.battle.p3}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-text-secondary uppercase tracking-wider mb-4">{h.team.label}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">{h.team.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {h.team.members.map((member) => (
              <a
                key={member.name}
                href={TEAM_LINKEDIN[member.name]}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-border p-5 hover:border-primary hover:shadow-md transition-all"
              >
                <div>
                  <div className="font-semibold text-primary group-hover:underline">{member.name}</div>
                  <div className="text-body-sm text-text-secondary">{member.role}</div>
                </div>
                <span className="text-text-secondary group-hover:text-primary transition-colors">{h.team.linkedin}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{h.explore.title}</h2>
          <div className="flex flex-wrap justify-center gap-6 text-body">
            <ExternalLink href={LINKS.github} className="text-white hover:text-white/80 no-underline">
              {h.explore.github}
            </ExternalLink>
            <ExternalLink href={LINKS.demo} className="text-white hover:text-white/80 no-underline">
              {h.explore.youtube}
            </ExternalLink>
            <ExternalLink href={LINKS.aikido} className="text-white hover:text-white/80 no-underline">
              {h.explore.aikido}
            </ExternalLink>
          </div>
        </div>
      </section>
    </div>
  )
}
