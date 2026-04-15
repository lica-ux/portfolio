import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/',           label: 'Home' },
  { to: '/components', label: 'Components' },
  { to: '/tokens',     label: 'Tokens' },
  { to: '/about',      label: 'About' },
]

export default function Nav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
      <div className="flex gap-6">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              clsx('text-sm font-medium rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
                isActive
                  ? 'text-primary-600'
                  : 'text-[var(--color-text)] hover:text-primary-600'
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="px-3 py-1.5 rounded-md text-sm border border-[var(--color-border)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </nav>
  )
}
