import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <Reveal as="p" className="hero__eyebrow" variant="down">
            {t.hero.eyebrow}
          </Reveal>
          <Reveal as="h1" className="hero__title" variant="blur" delay={100}>
            {t.hero.titleStart}
            <span className="text-accent">{t.hero.titleAccent}</span>
          </Reveal>
          <Reveal as="p" className="hero__subtitle" delay={220}>
            {t.hero.subtitle}
          </Reveal>
          <Reveal className="hero__actions" delay={340}>
            <a href="#contact" className="btn btn--primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#portfolio" className="btn btn--ghost">
              {t.hero.ctaSecondary}
            </a>
          </Reveal>
        </div>

        <Reveal className="hero__visual" variant="zoom" delay={400} aria-hidden="true">
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
        </Reveal>
      </div>

      <div className="container">
        <Reveal className="hero__stats" variant="up" delay={480}>
          {t.hero.stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label} <br /> {s.label2}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
