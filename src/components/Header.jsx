import { useState } from 'react'
import { useLang } from '../i18n.jsx'

const navOrder = ['services', 'technologies', 'pricing', 'portfolio', 'reviews', 'contact']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLang()

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="logo">
          <span className="logo__mark">▲</span>
          Poly<span className="logo__accent">Forge</span>
        </a>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          {navOrder.map((key) => (
            <a key={key} href={`#${key}`} onClick={() => setMenuOpen(false)}>
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang-switch" role="group" aria-label="Language">
            <button
              type="button"
              className={`lang-switch__btn ${lang === 'ua' ? 'lang-switch__btn--active' : ''}`}
              onClick={() => setLang('ua')}
            >
              UA
            </button>
            <button
              type="button"
              className={`lang-switch__btn ${lang === 'en' ? 'lang-switch__btn--active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <a href="tel:+380671234567" className="header__phone">
            +38 (067) 123-45-67
          </a>
          <a href="#contact" className="btn btn--primary btn--sm">
            {t.header.order}
          </a>
          <button
            className="burger"
            aria-label={t.header.menu}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
