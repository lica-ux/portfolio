import { useEffect, useRef, useState } from 'react'

interface RevealImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  delay?: number
}

export default function RevealImage({ delay = 0, className = '', style, ...props }: RevealImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [visible, setVisible] = useState(false)
  const [noMotion, setNoMotion] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reducedMotion) {
      setNoMotion(true)
      setVisible(true)
      return
    }

    const el = imgRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // rAF ensures the initial opacity:0 is painted before transitioning
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

  return (
    <img
      ref={imgRef}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: noMotion ? 'none' : `opacity 0.8s ease ${delay}ms`,
        ...style,
      }}
      {...props}
    />
  )
}
