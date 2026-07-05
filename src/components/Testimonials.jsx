import { useLang } from '../i18n.jsx'

function Stars({ label }) {
  return (
    <div className="review__stars" aria-label={label}>
      {'★★★★★'}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLang()

  return (
    <section id="reviews" className="section section--alt">
      <div className="container">
        <h2 className="section__title">{t.testimonials.title}</h2>
        <p className="section__subtitle">{t.testimonials.subtitle}</p>

        <div className="reviews__grid">
          {t.testimonials.reviews.map((r) => (
            <blockquote key={r.name} className="card review">
              <Stars label={t.testimonials.starsAria} />
              <p className="review__text">{r.text}</p>
              <footer className="review__author">
                <span className="review__avatar">{r.name[0]}</span>
                <div>
                  <div className="review__name">{r.name}</div>
                  <div className="review__city">{r.city}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
