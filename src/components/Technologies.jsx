import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

const cardVariants = ['left', 'up', 'right']

export default function Technologies() {
  const { t } = useLang()

  return (
    <section id="technologies" className="section section--alt">
      <div className="container">
        <Reveal as="h2" className="section__title" variant="blur">
          {t.technologies.title}
        </Reveal>
        <Reveal as="p" className="section__subtitle" delay={100}>
          {t.technologies.subtitle}
        </Reveal>

        <div className="tech__grid">
          {t.technologies.items.map((tech, i) => (
            <Reveal
              as="article"
              key={tech.name}
              className="card tech-card"
              variant={cardVariants[i % cardVariants.length]}
              delay={i * 120}
            >
              <div className="tech-card__badge">{tech.name}</div>
              <h3 className="tech-card__title">{tech.full}</h3>
              <div className="tech-card__accuracy">
                {t.technologies.accuracy} <strong>{tech.accuracy}</strong>
              </div>
              <p className="tech-card__text">{tech.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="tech__note card" variant="zoom" delay={150}>
          <strong>{t.technologies.noteStrong}</strong>
          {t.technologies.noteText}
        </Reveal>
      </div>
    </section>
  )
}
