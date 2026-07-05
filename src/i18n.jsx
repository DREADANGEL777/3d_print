import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations.js'

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    return saved === 'en' || saved === 'ua' ? saved : 'ua'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en'
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
