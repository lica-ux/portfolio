import clsx from 'clsx'
import type { ButtonProps } from './Button.types'

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center',
        'min-h-[44px] min-w-[44px] px-6 py-3',
        'rounded-md font-sans text-sm font-medium leading-normal',
        'border border-transparent cursor-pointer',
        'transition-colors duration-100 ease-out',
        'motion-reduce:transition-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
        'disabled:cursor-not-allowed',
        variant === 'primary' && [
          'bg-primary-600 text-neutral-0 border-primary-600',
          'hover:bg-primary-700 hover:border-primary-700',
          'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:border-neutral-200',
        ],
        variant === 'secondary' && [
          'bg-neutral-0 text-primary-600 border-primary-600',
          'hover:bg-primary-50',
          'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:border-neutral-200',
        ],
      )}
    >
      {children}
    </button>
  )
}
