import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

const sizeMap: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', string> = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-xl',
  h6: 'text-xl',
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xl' | '2xl' | '3xl' | '4xl'
}

export default function Heading({
  as: Tag = 'h2',
  size,
  className,
  ...rest
}: HeadingProps) {
  const sizeClass = size ? `text-${size}` : sizeMap[Tag]
  return (
    <Tag {...rest} className={clsx('font-sans font-medium leading-tight', sizeClass, className)} />
  )
}
