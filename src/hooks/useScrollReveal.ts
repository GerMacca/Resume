import { useEffect } from 'react'

// Observa todas as `.section` e adiciona `.reveal-visible` quando entram
// na viewport, disparando a animação de entrada definida no App.css.
export function useScrollReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll('.section')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach(s => s.classList.add('reveal-visible'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])
}
