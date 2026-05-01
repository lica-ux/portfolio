import type { CaseIntroProps } from './CaseIntro.types'

export default function CaseIntro({ title, tags, headline, metaLines }: CaseIntroProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-start justify-between gap-4 py-10 md:py-14">
        <p
          className="font-display font-normal leading-[0.94] text-[48px] md:text-[104px]"
          style={{ color: 'var(--color-nav-text)' }}
        >
          {title}
        </p>
        <div className="flex gap-1 items-start pt-2 shrink-0">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center justify-center px-2 py-2 rounded-full border text-[14px] font-medium lowercase tracking-[-0.02em]"
              style={{
                borderColor: 'var(--color-nav-text)',
                color: 'var(--color-nav-text)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 pb-20 md:pb-52">
        <p
          className="md:flex-1 font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em] md:max-w-[640px]"
          style={{ color: 'var(--color-nav-text)' }}
        >
          {headline}
        </p>
        <div
          className="text-base md:text-[24px] leading-[1.24] md:flex-1"
          style={{ color: 'var(--color-hero-subtitle)' }}
        >
          {metaLines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
