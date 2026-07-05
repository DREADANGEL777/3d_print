import ModelSlider from './ModelSlider.jsx'
import { useLang } from '../i18n.jsx'

const projectVisuals = [
  {
    year: '2026',
    gradient: 'linear-gradient(135deg, #2d2416 0%, #4a3413 100%)',
    icon: '🏎️',
  },
  {
    year: '2025',
    gradient: 'linear-gradient(135deg, #1f2a1f 0%, #2e4420 100%)',
    icon: '🗿',
  },
  {
    year: '2025',
    gradient: 'linear-gradient(135deg, #2a1f2a 0%, #44203c 100%)',
    icon: '🍫',
  },
  {
    year: '2025',
    gradient: 'linear-gradient(135deg, #16222d 0%, #133a4a 100%)',
    icon: '🏆',
  },
]

export default function Portfolio() {
  const { t } = useLang()

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="section__title">{t.portfolio.title}</h2>
        <p className="section__subtitle">{t.portfolio.subtitle}</p>

        <ModelSlider />

        <div className="portfolio__grid">
          {t.portfolio.projects.map((p, i) => (
            <article key={p.title} className="portfolio-card">
              <div
                className="portfolio-card__image"
                style={{ background: projectVisuals[i].gradient }}
              >
                <span className="portfolio-card__icon" aria-hidden="true">
                  {projectVisuals[i].icon}
                </span>
              </div>
              <div className="portfolio-card__body">
                <div className="portfolio-card__meta">
                  <span>{p.category}</span>
                  <span>{projectVisuals[i].year}</span>
                </div>
                <h3 className="portfolio-card__title">{p.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
