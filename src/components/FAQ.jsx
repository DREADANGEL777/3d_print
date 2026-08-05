import { useState } from "react";
import "./FAQ.css";
import Reveal from "./Reveal";
import { useLang } from "../i18n";

export default function FAQ() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  const items = [
    {
      q: t.faq.q1,
      a: t.faq.a1,
    },
    {
      q: t.faq.q2,
      a: t.faq.a2,
    },
    {
      q: t.faq.q3,
      a: t.faq.a3,
    },
    {
      q: t.faq.q4,
      a: t.faq.a4,
    },
    {
      q: t.faq.q5,
      a: t.faq.a5,
    },
    {
      q: t.faq.q6,
      a: t.faq.a6,
    },
    {
      q: t.faq.q7,
      a: t.faq.a7,
    },
    {
      q: t.faq.q8,
      a: t.faq.a8,
    },
  ];

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <Reveal>
          <h3 className="section__eyebrow">FAQ</h3>
        </Reveal>

        <Reveal>
          <h2 className="faq-title">{t.faq.title}</h2>
        </Reveal>

        <Reveal>
          <p className="faq-subtitle">{t.faq.subtitle}</p>
        </Reveal>

        <div className="faq__list">
          {items.map((item, index) => (
            <div
              key={index}
              className={`faq__item ${active === index ? "active" : ""}`}
            >
              <button
                className="faq__question"
                onClick={() => setActive(active === index ? -1 : index)}
              >
                <span>{item.q}</span>

                <span className="faq__icon">
                  {active === index ? "−" : "+"}
                </span>
              </button>

              <div
                className="faq__answer"
                style={{
                  maxHeight: active === index ? "250px" : "0px",
                }}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
