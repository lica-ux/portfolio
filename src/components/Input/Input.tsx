import clsx from 'clsx'
import type { InputProps } from './Input.types'

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  disabled = false,
  value,
  onChange,
  error,
  className,
}: InputProps) {
  const errorId = `${id}-error`

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium font-sans"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          'min-h-[44px] px-3 py-2 rounded-md text-sm font-sans',
          'bg-neutral-0',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
          'disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed',
          error
            ? 'border-2 border-error'
            : 'border border-neutral-300',
        )}
      />
      {error && (
        <span id={errorId} className="text-sm text-error font-sans">
          {error}
        </span>
      )}
    </div>
  )
}
