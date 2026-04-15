import type { ChangeEventHandler } from 'react'

export interface InputProps {
  id: string
  label: string
  type?: 'text' | 'email' | 'password' | 'search'
  placeholder?: string
  disabled?: boolean
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  error?: string
  className?: string
}
