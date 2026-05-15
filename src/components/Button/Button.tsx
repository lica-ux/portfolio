import type { ButtonProps } from './Button.types'

export default function Button({ href, children, target, rel, className }: ButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center justify-center px-4 py-3 rounded-full border text-[20px] font-medium leading-[1.1] whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 transition-opacity duration-100 hover:opacity-70 motion-reduce:transition-none${className ? ` ${className}` : ''}`}
      style={{
        borderColor: 'var(--color-nav-text)',
        color: 'var(--color-nav-text)',
        fontFamily: 'var(--font-display)',
      }}
    >
      {children}
    </a>
  )
}
