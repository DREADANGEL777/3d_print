import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const { t } = useLang()

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    // Ханіпот: боти ставлять галочку в прихованому полі — таку заявку не відправляємо
    if (form.botcheck.checked) return

    setStatus('sending')
    try {
      // Firebase завантажується лише при відправленні форми,
      // щоб не сповільнювати першу загрузку сторінки
      const [{ db }, { addDoc, collection, serverTimestamp }] = await Promise.all([
        import('../firebase.js'),
        import('firebase/firestore'),
      ])
      await addDoc(collection(db, 'leads'), {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim(),
        createdAt: serverTimestamp(),
      })
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('Firestore submit failed:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container contact">
        <Reveal className="contact__info" variant="left">
          <h2 className="section__title section__title--left">{t.contact.title}</h2>
          <p className="contact__lead">
            {t.contact.lead}
            <span className="contact__lead contact__lead-span">{t.contact.lead2}</span>
          </p>

          <ul className="contact__list">
            <li>
              <span className="contact__label">{t.contact.phoneLabel}</span>
              <a href="tel:+380671234567">+38 (067) 123-45-67</a>
            </li>
            <li>
              <span className="contact__label">{t.contact.emailLabel}</span>
              <a href="mailto:info@polyforge.ua">info@polyforge.ua</a>
            </li>
            {/* <li>
              <span className="contact__label">{t.contact.addressLabel}</span>
              <span>{t.contact.address}</span>
            </li> */}
            <li>
              <span className="contact__label">{t.contact.hoursLabel}</span>
              <span>{t.contact.hours}</span>
            </li>
          </ul>

          {/* <div className="contact__socials">
            {['Instagram', 'YouTube', 'TikTok', 'Behance', 'Facebook'].map((s) => (
              <a key={s} href="#" aria-label={s}>
                {s}
              </a>
            ))}
          </div> */}
        </Reveal>

        <Reveal variant="right" delay={120}>
          <form className="card contact__form" onSubmit={handleSubmit}>
            {status === "success" ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successText}</p>
              </div>
            ) : (
              <>
                <h3 className="contact__form-title">{t.contact.formTitle}</h3>

                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex="-1"
                  autoComplete="off"
                  className="contact__honeypot"
                  aria-hidden="true"
                />

                <label>
                  {t.contact.nameLabel}
                  <input type="text" name="name" placeholder={t.contact.namePlaceholder} required />
                </label>
                <label>
                  {t.contact.phoneFieldLabel}
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t.contact.phonePlaceholder}
                    required
                  />
                </label>
                <label>
                  {t.contact.messageLabel}
                  <textarea name="message" rows="4" placeholder={t.contact.messagePlaceholder} />
                </label>

                {status === "error" && <p className="contact__form-error">{t.contact.error}</p>}

                <button
                  type="submit"
                  className="btn btn--primary btn--full"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? t.contact.sending : t.contact.submit}
                </button>
                <p className="contact__form-note">{t.contact.note}</p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
