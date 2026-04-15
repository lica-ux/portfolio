import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

const sizeMap = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
} as const

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'label' | 'li'
  size?: keyof typeof sizeMap
  /** Use when as="label" to associate with a form field */
  htmlFor?: string
}

export default function Text({
  as: Tag = 'p',
  size = 'base',
  className,
  ...rest
}: TextProps) {
  return (
    <Tag {...rest} className={clsx('font-sans leading-normal', sizeMap[size], className)} />
  )
}
