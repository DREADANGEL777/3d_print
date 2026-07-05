import { useEffect, useRef } from 'react'

/**
 * Обгортка для scroll-анімацій: елемент отримує клас .is-visible,
 * коли потрапляє у вʼюпорт (один раз).
 *
 * variant: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur'
 * delay:   затримка появи в мс (для стаґеру карток)
 * as:      HTML-тег обгортки ('div', 'article', 'li', ...)
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Після завершення анімації знімаємо reveal-класи, щоб не заважати
    // hover-ефектам карток (у них власні transition на transform)
    let timer
    const finish = () => {
      clearTimeout(timer)
      el.classList.remove('reveal', `reveal--${variant}`, 'is-visible')
      el.style.transitionDelay = ''
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          el.addEventListener('transitionend', finish, { once: true })
          timer = setTimeout(finish, delay + 1000) // запасний варіант
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clearTimeout(timer)
      el.removeEventListener('transitionend', finish)
    }
  }, [variant, delay])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
