import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

export default function Process() {
  const { t } = useLang()

  return (
    <section className="section">
      <div className="container">
        <Reveal as="h2" className="section__title" variant="blur">
          {t.process.title}
        </Reveal>
        <Reveal as="p" className="section__subtitle" delay={100}>
          {t.process.subtitle}
        </Reveal>

        <ol className="process">
          {t.process.steps.map((s, i) => (
            <Reveal as="li" key={s.num} className="process__step" delay={i * 110}>
              <div className="process__num">{s.num}</div>
              <h3 className="process__title">{s.title}</h3>
              <p className="process__text">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
