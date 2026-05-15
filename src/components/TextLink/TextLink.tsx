import { Link } from 'react-router-dom'
import type { TextLinkProps } from './TextLink.types'

export default function TextLink({ href, to, children, target, rel, className: extraClass }: TextLinkProps) {
  const className = `link-text inline-block px-1 py-2 text-[16px] font-normal leading-[1.4] focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap${extraClass ? ` ${extraClass}` : ''}`
  const style = { color: 'var(--color-nav-text)' }

  if (to) {
    return (
      <Link to={to} className={className} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target={target} rel={rel} className={className} style={style}>
      {children}
    </a>
  )
}
