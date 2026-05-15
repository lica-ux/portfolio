import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ChevronUp from '../../icons/chevron_up.svg?react'

const pillStyle = {
  backgroundColor: 'var(--color-nav-pill-bg)',
  color: 'var(--color-nav-text)',
  fontFamily: 'var(--font-display)',
}

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) {
      setVisible(true)
      return
    }

    setVisible(false)
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [pathname])

  if (!visible) return null

  return (
    <>
      {/* Mobile: round icon-only button */}
      <a
        href="#"
        className="md:hidden fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-[12px] focus-visible:outline-2 focus-visible:outline-offset-2"
        style={pillStyle}
        aria-label="Scroll to top"
      >
        <ChevronUp width={20} height={20} aria-hidden="true" className="[&_path]:fill-[currentColor]" />
      </a>

      {/* Desktop: pill with text */}
      <a
        href="#"
        className="hidden md:flex fixed bottom-4 right-4 z-50 items-center gap-[4px] px-[12px] py-[8px] rounded-full text-[16px] font-medium leading-[1.4] whitespace-nowrap backdrop-blur-[12px] focus-visible:outline-2 focus-visible:outline-offset-2"
        style={pillStyle}
        aria-label="Scroll to top"
      >
        To top
        <ChevronUp width={16} height={16} aria-hidden="true" className="[&_path]:fill-[currentColor]" />
      </a>
    </>
  )
}
