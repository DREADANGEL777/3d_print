import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

const cardVariants = ['left', 'zoom', 'right']

export default function Pricing() {
  const { t } = useLang()

  return (
    <section id="pricing" className="section section--alt">
      <div className="container">
        <Reveal as="h2" className="section__title" variant="blur">
          {t.pricing.title}
        </Reveal>
        <Reveal as="p" className="section__subtitle" delay={100}>
          {t.pricing.subtitle}
        </Reveal>

        <div className="pricing__grid">
          {t.pricing.plans.map((p, i) => (
            <Reveal
              as="article"
              key={p.name}
              className={`card pricing-card ${p.featured ? 'pricing-card--featured' : ''}`}
              variant={cardVariants[i % cardVariants.length]}
              delay={i * 120}
            >
              {p.featured && <div className="pricing-card__tag">{t.pricing.featured}</div>}
              <h3 className="pricing-card__name">{p.name}</h3>
              <div className="pricing-card__price">
                {p.price} <span>{p.unit}</span>
              </div>
              <ul className="pricing-card__features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${p.featured ? 'btn--primary' : 'btn--ghost'}`}>
                {t.pricing.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
