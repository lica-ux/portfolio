const links = [
  { href: '#work',    label: 'Work' },
  { href: '#about',   label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 md:px-10 py-4 md:top-4 md:bottom-auto">
      <div
        className="flex items-center gap-10 px-6 py-4 rounded-full backdrop-blur-[12px]"
        style={{
          backgroundColor: 'var(--color-nav-pill-bg)',
          fontFamily: 'var(--font-display)',
        }}
      >
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-base font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: 'var(--color-nav-text)' }}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
