import { useLang } from '../i18n.jsx'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero__title">
            {t.hero.titleStart}
            <span className="text-accent">{t.hero.titleAccent}</span>
          </h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#portfolio" className="btn btn--ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__cube">
            <div className="cube">
              <div className="cube__face cube__face--front" />
              <div className="cube__face cube__face--back" />
              <div className="cube__face cube__face--right" />
              <div className="cube__face cube__face--left" />
              <div className="cube__face cube__face--top" />
              <div className="cube__face cube__face--bottom" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hero__stats">
          {t.hero.stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
