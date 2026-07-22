import { useLang } from "../i18n.jsx";
import Reveal from "./Reveal.jsx";

const navOrder = [
  "services",
  "technologies",
  "pricing",
  "portfolio",
  "reviews",
  "contact",
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <Reveal className="container footer__inner">
        <div className="footer__brand">
          <a href="#" className="logo">
            <span className="logo__mark">▲</span>
            Fergoti<span className="logo__accent"></span>
          </a>
          <p>{t.footer.tagline}</p>
        </div>

        <nav className="footer__nav">
          {navOrder.map((key) => (
            <a key={key} href={`#${key}`}>
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href="tel:+380671234567">+38 (068) 791-83-19</a>
          <a href="mailto:info@polyforge.ua">3dprintadmin42@gmail.com</a>
          {/* <span>{t.footer.address}</span> */}
        </div>
      </Reveal>
      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} Fergoti. {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
