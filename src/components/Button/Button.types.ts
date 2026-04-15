import type { MouseEventHandler, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: ButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}
