import ModelSlider from "./ModelSlider.jsx"
import Reveal from "./Reveal.jsx"
import { useLang } from "../i18n.jsx"

const projectVisuals = [
  {
    year: "2026",
    gradient: "linear-gradient(135deg,#20314d,#30588c)",
    icon: "⚙️",
  },
  {
    year: "2026",
    gradient: "linear-gradient(135deg,#2b2b2b,#575757)",
    icon: "🐉",
  },
  {
    year: "2026",
    gradient: "linear-gradient(135deg,#29463b,#3b7d61)",
    icon: "📱",
  },
  {
    year: "2026",
    gradient: "linear-gradient(135deg,#493019,#8f5d29)",
    icon: "🔩",
  },
]

export default function Portfolio() {
  const { t } = useLang()

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <Reveal as="h2" className="section__title" variant="blur">
          {t.portfolio.title}
        </Reveal>
        <Reveal as="p" className="section__subtitle" delay={100}>
          {t.portfolio.subtitle}
        </Reveal>

        <Reveal variant="zoom" delay={150}>
          <ModelSlider />
        </Reveal>

        <div className="portfolio__grid">
          {t.portfolio.projects.map((p, i) => (
            <Reveal as="article" key={p.title} className="portfolio-card" delay={i * 90}>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
