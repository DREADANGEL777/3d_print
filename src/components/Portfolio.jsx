import { useState } from "react";
import ModelSlider from "./ModelSlider.jsx";
import Reveal from "./Reveal.jsx";
import { useLang } from "../i18n.jsx";

import model1 from "../assets/y.webp";
import model2 from "../assets/photo-frames.webp";
import model3 from "../assets/t.webp";
import model4 from "../assets/i.webp";

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

  const [selectedModel, setSelectedModel] = useState(0);

  const openModel = (i) => {
    setSelectedModel(i);

    document.querySelector(".model-slider")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

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
          <ModelSlider index={selectedModel} onChange={setSelectedModel} />
        </Reveal>

        <div className="portfolio__grid">
          {t.portfolio.projects.map((p, i) => (
            <Reveal
              as="article"
              key={p.title}
              className="portfolio-card"
              delay={i * 90}
            >
              <div
                className="portfolio-card__image"
                onClick={() => openModel(i)}
                style={{ cursor: "pointer" }}
              >
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
