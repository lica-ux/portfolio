import { useEffect, useRef } from 'react'

interface RevealImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  delay?: number
}

export default function RevealImage({ delay = 0, className = '', style, ...props }: RevealImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reducedMotion) {
      el.classList.add('img-revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => el.classList.add('img-revealed'))
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      className={`img-reveal ${className}`}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...props}
    />
  )
}
