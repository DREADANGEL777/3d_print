import ModelSlider from "./ModelSlider.jsx";
import Reveal from "./Reveal.jsx";
import { useLang } from "../i18n.jsx";
import model1 from "../assets/1-3d-model.png";
import model2 from "../assets/2-3d-model.png";
import model3 from "../assets/3-3d-model.png";
import model4 from "../assets/4-3d-model.png";

const projectVisuals = [
  {
    year: "2026",
    image: model1,
  },
  {
    year: "2026",
    image: model2,
  },
  {
    year: "2026",
    image: model3,
  },
  {
    year: "2026",
    image: model4,
  },
];

export default function Portfolio() {
  const { t } = useLang();

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <Reveal as="h2" className="section__title" variant="blur">
          {t.portfolio.title}
        </Reveal>
        <Reveal as="p" className="section__subtitle" delay={100}>
          {t.portfolio.subtitle}
        </Reveal>

        <Reveal variant="zoom" delay={150}>
          <ModelSlider />
        </Reveal>

        <div className="portfolio__grid">
          {t.portfolio.projects.map((p, i) => (
            <Reveal
              as="article"
              key={p.title}
              className="portfolio-card"
              delay={i * 90}
            >
              <div className="portfolio-card__image">
                <img
                  src={projectVisuals[i].image}
                  alt={p.title}
                  loading="lazy"
                />
              </div>
              <div className="portfolio-card__body">
                <div className="portfolio-card__meta">
                  <span>{p.category}</span>
                  <span>{projectVisuals[i].year}</span>
                </div>
                <h3 className="portfolio-card__title">{p.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
