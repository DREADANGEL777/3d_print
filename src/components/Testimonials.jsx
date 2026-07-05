import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

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
        <Reveal as="h2" className="section__title" variant="blur">
          {t.testimonials.title}
        </Reveal>
        <Reveal as="p" className="section__subtitle" delay={100}>
          {t.testimonials.subtitle}
        </Reveal>

        <div className="reviews__grid">
          {t.testimonials.reviews.map((r, i) => (
            <Reveal
              as="blockquote"
              key={r.name}
              className="card review"
              variant={i % 2 === 0 ? 'left' : 'right'}
              delay={Math.floor(i / 2) * 120}
            >
              <Stars label={t.testimonials.starsAria} />
              <p className="review__text">{r.text}</p>
              <footer className="review__author">
                <span className="review__avatar">{r.name[0]}</span>
                <div>
                  <div className="review__name">{r.name}</div>
                  <div className="review__city">{r.city}</div>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
