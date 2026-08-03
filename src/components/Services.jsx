import { useLang } from "../i18n.jsx";
import Reveal from "./Reveal.jsx";

import img1 from "../assets/1-service.webp";
import img2 from "../assets/2-service.webp";
import img3 from "../assets/3-service.webp";
import img4 from "../assets/4-service.webp";
import img5 from "../assets/5-service.webp";
import img6 from "../assets/6-service.webp";
import img7 from "../assets/7-service.webp";
import img8 from "../assets/8-service.webp";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function Services() {
  const { t } = useLang();

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
              <div className="service-card__image">
                <img src={images[i]} alt={s.title} loading="lazy" />
              </div>

              <div className="service-card__content">
                <h3 className="service-card__title">{s.title}</h3>

                <p className="service-card__text">{s.text}</p>

                <a href="#contact" className="service-card__link">
                  {t.services.order}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
