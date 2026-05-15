import { useEffect, useRef, useState } from 'react'

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'li' | 'div'

interface RevealTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TagName
  delay?: number
}

export default function RevealText({ as = 'p', delay = 0, className = '', style, ...rest }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [noMotion, setNoMotion] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reducedMotion) {
      setNoMotion(true)
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setVisible(true))
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: noMotion ? 'none' : `opacity 1.0s ease ${delay}ms, transform 1.1s ease ${delay}ms`,
        ...style,
      }}
      {...rest}
    />
  )
}
