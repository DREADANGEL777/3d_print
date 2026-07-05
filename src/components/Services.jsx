import { useLang } from '../i18n.jsx'

export default function Services() {
  const { t } = useLang()

  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="section__title">{t.services.title}</h2>
        <p className="section__subtitle">{t.services.subtitle}</p>

        <div className="services__grid">
          {t.services.items.map((s) => (
            <article key={s.title} className="card service-card">
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__text">{s.text}</p>
              <a href="#contact" className="service-card__link">
                {t.services.order}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
