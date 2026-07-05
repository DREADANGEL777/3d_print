import { useLang } from '../i18n.jsx'

export default function Technologies() {
  const { t } = useLang()

  return (
    <section id="technologies" className="section section--alt">
      <div className="container">
        <h2 className="section__title">{t.technologies.title}</h2>
        <p className="section__subtitle">{t.technologies.subtitle}</p>

        <div className="tech__grid">
          {t.technologies.items.map((tech) => (
            <article key={tech.name} className="card tech-card">
              <div className="tech-card__badge">{tech.name}</div>
              <h3 className="tech-card__title">{tech.full}</h3>
              <div className="tech-card__accuracy">
                {t.technologies.accuracy} <strong>{tech.accuracy}</strong>
              </div>
              <p className="tech-card__text">{tech.text}</p>
            </article>
          ))}
        </div>

        <div className="tech__note card">
          <strong>{t.technologies.noteStrong}</strong>
          {t.technologies.noteText}
        </div>
      </div>
    </section>
  )
}
