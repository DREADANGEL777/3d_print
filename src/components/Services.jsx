import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

export default function Services() {
  const { t } = useLang()

  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal as="h2" className="section__title" variant="blur">
          {t.services.title}
        </Reveal>
        <Reveal as="p" className="section__subtitle" delay={100}>
          {t.services.subtitle}
        </Reveal>

        <div className="services__grid">
          {t.services.items.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              className="card service-card"
              delay={(i % 4) * 90}
            >
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__text">{s.text}</p>
              <a href="#contact" className="service-card__link">
                {t.services.order}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
