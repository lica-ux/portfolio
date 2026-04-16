import { useEffect, useRef, useState } from 'react'
import type { StatsSectionProps, StatState } from './StatsSection.types'

const STATS = ['6+ years', '30+ products', '2 acquisitions', '2 design awards']

export default function StatsSection({ imageSrc, imageAlt }: StatsSectionProps) {
  const [desktopStates, setDesktopStates] = useState<StatState[]>(
    STATS.map(() => 'below')
  )
  const [mobileVisible, setMobileVisible] = useState<boolean[]>(
    STATS.map(() => false)
  )
  const desktopRefs = useRef<(HTMLDivElement | null)[]>([])
  const mobileRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const desktopObservers = desktopRefs.current.map((el, i) => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          setDesktopStates(prev => {
            const next = [...prev]
            if (entry.isIntersecting) {
              next[i] = 'visible'
            } else if (entry.boundingClientRect.top < 0) {
              next[i] = 'above'
            } else {
              next[i] = 'below'
            }
            return next
          })
        },
        { threshold: 0.5 }
      )
      observer.observe(el)
      return observer
    })

    const mobileObservers = mobileRefs.current.map((el, i) => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMobileVisible(prev => {
              const next = [...prev]
              next[i] = true
              return next
            })
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      return observer
    })

    return () => {
      desktopObservers.forEach(o => o?.disconnect())
      mobileObservers.forEach(o => o?.disconnect())
    }
  }, [])

  return (
    <section id="stats" className="bg-[var(--color-bg)]">
      {/* Desktop layout */}
      <div
        className="hidden md:flex"
        style={{ minHeight: `${STATS.length * 100}svh` }}
      >
        {/* Left: sticky image */}
        <div className="w-1/2 sticky top-0 overflow-hidden" style={{ height: '100svh' }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: scroll phases */}
        <div className="w-1/2 flex flex-col">
          {STATS.map((stat, i) => (
            <div
              key={stat}
              ref={el => { desktopRefs.current[i] = el }}
              className="flex items-center px-[10%]"
              style={{ height: '100svh' }}
            >
              <span
                data-testid="stat-text"
                className="text-[64px] font-semibold leading-none tracking-[-0.02em]"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-nav-text)',
                  opacity: desktopStates[i] === 'visible' ? 1 : 0,
                  transform:
                    desktopStates[i] === 'visible'
                      ? 'translateY(0)'
                      : desktopStates[i] === 'above'
                      ? 'translateY(-24px)'
                      : 'translateY(24px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                {stat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          {STATS.map((stat, i) => (
            <div
              key={stat}
              ref={el => { mobileRefs.current[i] = el }}
              className="px-6 py-12 border-b last:border-b-0"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <span
                data-testid="stat-text"
                className="text-[40px] font-semibold leading-none tracking-[-0.02em]"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-nav-text)',
                  opacity: mobileVisible[i] ? 1 : 0,
                  transform: mobileVisible[i] ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                {stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
