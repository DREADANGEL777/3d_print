import { useLang } from '../i18n.jsx'

export default function Pricing() {
  const { t } = useLang()

  return (
    <section id="pricing" className="section section--alt">
      <div className="container">
        <h2 className="section__title">{t.pricing.title}</h2>
        <p className="section__subtitle">{t.pricing.subtitle}</p>

        <div className="pricing__grid">
          {t.pricing.plans.map((p) => (
            <article
              key={p.name}
              className={`card pricing-card ${p.featured ? 'pricing-card--featured' : ''}`}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
