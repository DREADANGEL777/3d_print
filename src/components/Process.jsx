import { useLang } from '../i18n.jsx'

export default function Process() {
  const { t } = useLang()

  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">{t.process.title}</h2>
        <p className="section__subtitle">{t.process.subtitle}</p>

        <ol className="process">
          {t.process.steps.map((s) => (
            <li key={s.num} className="process__step">
              <div className="process__num">{s.num}</div>
              <h3 className="process__title">{s.title}</h3>
              <p className="process__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
