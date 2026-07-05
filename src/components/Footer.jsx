import { useLang } from '../i18n.jsx'

const navOrder = ['services', 'technologies', 'pricing', 'portfolio', 'reviews', 'contact']

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#" className="logo">
            <span className="logo__mark">▲</span>
            Poly<span className="logo__accent">Forge</span>
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
          <a href="tel:+380671234567">+38 (067) 123-45-67</a>
          <a href="mailto:info@polyforge.ua">info@polyforge.ua</a>
          <span>{t.footer.address}</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>
          © {new Date().getFullYear()} PolyForge. {t.footer.rights}
        </span>
      </div>
    </footer>
  )
}
