import { useEffect, useRef, useState } from 'react'
import type { StatsSectionProps, StatState } from './StatsSection.types'

const STATS = [
  { value: '6+', label: 'years in product design' },
  { value: '25+', label: 'products shipped' },
  { value: '2', label: 'led to acquisitions' },
  { value: '2', label: 'design awards' },
]

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
    // Scroll-based detection for desktop: trigger based on text center position.
    // Text is vertically centered in each 100svh div, so textCenter = rect.top + rect.height/2.
    // Fade in when textCenter crosses 70%vh (30% from bottom).
    // Fade out when textCenter crosses 30%vh (30% from top).
    const checkDesktopPositions = () => {
      const vh = window.innerHeight
      desktopRefs.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const textCenter = rect.top + rect.height / 2
        let next: StatState
        if (textCenter >= vh * 0.3 && textCenter <= vh * 0.7) {
          next = 'visible'
        } else if (textCenter < vh * 0.3) {
          next = 'above'
        } else {
          next = 'below'
        }
        setDesktopStates(prev => {
          if (prev[i] === next) return prev
          const updated = [...prev]
          updated[i] = next
          return updated
        })
      })
    }

    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(checkDesktopPositions)
    }

    checkDesktopPositions()
    window.addEventListener('scroll', onScroll, { passive: true })

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
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      mobileObservers.forEach(o => o?.disconnect())
    }
  }, [])

  return (
    <section id="stats" className="snap-start snap-always bg-[var(--color-bg)]">
      {/* Desktop layout */}
      <div
        className="hidden md:flex"
        style={{ minHeight: `${STATS.length * 100}svh` }}
      >
        {/* Left: image */}
        <div className="w-1/2 sticky top-0 p-4 md:p-10" style={{ height: '100svh' }}>
          <div className="relative w-full h-full overflow-hidden rounded-[2px]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: scroll phases */}
        <div
          className="w-1/2 flex flex-col"
          data-testid="stats-right-col"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={el => { desktopRefs.current[i] = el }}
              className="flex items-center px-[10%] snap-start snap-always"
              style={{ height: '100svh' }}
              data-testid="stat-row-desktop"
            >
              <div
                data-testid="stat-text"
                className="flex flex-col stat-transition"
                style={{
                  opacity: desktopStates[i] === 'visible' ? 1 : 0,
                  transform:
                    desktopStates[i] === 'visible'
                      ? 'translateY(0)'
                      : desktopStates[i] === 'above'
                      ? 'translateY(-24px)'
                      : 'translateY(24px)',
                }}
              >
                <span
                  className="font-semibold leading-none tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)', fontSize: '160px' }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-medium tracking-[-0.01em] mt-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-hero-subtitle)', fontSize: '28px' }}
                >
                  {stat.label}
                </span>
              </div>
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
              key={stat.label}
              ref={el => { mobileRefs.current[i] = el }}
              className="px-6 border-b last:border-b-0 flex items-center min-h-[60vh]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div
                data-testid="stat-text"
                className="flex flex-col stat-transition"
                style={{
                  opacity: mobileVisible[i] ? 1 : 0,
                  transform: mobileVisible[i] ? 'translateY(0)' : 'translateY(24px)',
                }}
              >
                <span
                  className="font-semibold leading-none tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-nav-text)', fontSize: '80px' }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-medium tracking-[-0.01em] mt-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-hero-subtitle)', fontSize: '16px' }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
