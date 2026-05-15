import TextLink from './TextLink'

const links = [
  { href: '#work',    label: 'Work' },
  { href: '#about-me',   label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className="fixed bottom-4 left-4 right-[80px] z-50 flex md:left-0 md:right-0 md:justify-center md:px-10 md:py-4 md:top-4 md:bottom-auto">
      <div
        className="flex items-center justify-evenly w-full md:w-auto md:justify-start md:gap-10 md:px-6 py-[9px] rounded-full backdrop-blur-[12px]"
        style={{
          backgroundColor: 'var(--color-nav-pill-bg)',
          fontFamily: 'var(--font-display)',
        }}
      >
        {links.map(({ href, label }) => (
          <TextLink key={href} href={href} className="font-medium">
            {label}
          </TextLink>
        ))}
      </div>
    </nav>
  )
}
