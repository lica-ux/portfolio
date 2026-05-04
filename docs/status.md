# status.md — Project snapshot

# The only file Claude reads at session start.

# Claude updates this at the end of every session.

LAST UPDATED: 2026-05-04 (session 1)

---

## In progress

NONE

## Completed this session (2026-05-04, session 1)

- **Sejfa case page — bilder** — Sejfa1–4 placerade i rätt sektioner: "Designing a brand within a brand" (Sejfa1), "Working within constraints" (Sejfa2), "Integrating AI" (Sejfa3), helbredd-sektion (Sejfa4). Alla är PNG/PNG-format — ska konverteras till .webp inför produktion
- **Booky case page — bilder** — BookyHero i CaseHero; Booky1–3 i content-sektioner; Booky4.mp4 som video-element i "A font decision that saved the client money"; Booky5 i helbredd-sektion
- **Baribuddy case page — bilder** — Baribuddy1 ("Starting with the people who left"), Baribuddy2 ("Designing for the actual user"), Baribuddy3 ("Building the habit loop"), Baribuddy4 (helbredd-sektion)
- **Booky metaData** — År ändrat till 2022, roll ändrad från "Sole designer" till "Lead designer"
- **Obs:** Booky4.mp4 kräver .mp4-format — fungerar i Chrome. Alla PNG/JPG-bilder ska konverteras till .webp max 940kb inför produktion

## Completed this session (2026-05-03, session 3)

- **Sejfa case page — full content** — CaseIntro: title, tags (home insurance / mobile app / website), headline, metaLines (client Sejfa/Länsförsäkringar, year 2022-ongoing, result 10 000 users & 2 awards); peach section; three content sections (brand within a brand, constraints, AI claims); closing text with bullet points
- **Booky case page — full content** — CaseIntro: title, tags (website / backoffice / automation), headline, metaLines (result: 80% of manual work automated); peach section; four content sections (reframing the brief, two user types, founder-free flow, font decision); closing text with bullet points
- All content is slug-conditional — Baribuddy content unchanged

## Completed this session (2026-05-03, session 2)

- **MoreWork gradient** — gradient-bild täcker nu hela sektionens scroll-höjd + `min-h-full` säkerställer täckning på stora skärmar där innehållet är kortare än `100svh`
- **Favicon** — `Favicon.png` kopierad till `public/favicon.png`, `index.html` uppdaterad
- **AboutMe: vertikal centrering** — `justify-center` lagt till på båda snap-sektionerna
- **AboutMe: text max-width** — `max-w-[1024px]` på bio-texten
- **StatsSection: number-variant** — ny `variant="number"` prop; vänster sida visar nu sticky siffra (20vw, fade cross-fade) istället för bild; höger sida visar etikett (3vw) med befintlig scroll-animation; `id`-prop gjord valfri
- **StatsSection: ersatt med number-variant** — bildsektionen borttagen, number-varianten är nu den enda `id="stats"`

## Completed this session (2026-05-03)

- **AboutMe section** — `src/components/AboutMe/` (Figma node 5893-4512)
  - Split into two `snap-start snap-always min-h-[100svh]` sections
  - Section 1: "About me" heading + bio text (24px desktop) + portrait (3:4, 30vw) with RevealImage
  - Section 2: knitting image (square, flex-1) + hobby text (24px desktop) with RevealImage
  - Added to `Home.tsx` above `<Footer />`
  - Body text updated to final copy
  - Colors: `--color-nav-text` + `--color-hero-subtitle` — pass WCAG AA
  - Images: Figma CDN TODOs — must be replaced with local .webp before production

- **Footer: full-screen height on desktop**
  - `<footer>` gets `md:min-h-[100svh] md:flex md:flex-col`
  - Contact section gets `md:flex-1 md:justify-center md:pt-0 md:pb-0`
  - Footer bar stays pinned at bottom

- **MoreWork: inner scroll + snap-always**
  - `md:h-[100svh] md:overflow-y-auto snap-always` — sektionen är exakt 100svh, innehållet scrollar inuti
  - Gradient-div flyttad inuti scroll-containern så den täcker hela scroll-höjden
  - `gap-y` ökad på desktop: `md:gap-y-20 lg:gap-y-28` (mobil behåller `gap-y-16`)

## Completed this session (2026-05-01, session 5)

- **CasePage: full snap-scroll implementation** — alla sektioner i CasePage har nu `snap-start snap-always`; sektionerna bröts ut ur `<main>` till fragment-siblings så att varje `<section>` är en top-level snap-target; `<main>` innehåller nu bara back-link + CaseHero + CaseIntro
- **OtherProjects: snap + padding-fix** — `snap-start snap-always` lagt till; negativa marginaler borttagna (sektionen är nu utanför `<main>:s` padding); egna `px-4 md:px-10` padding tillagda
- **Verifierat i browser** — OtherProjects visar Booky + Sejfa med bilder; Footer nåbar; snap fungerar igenom hela sidan utan trapping

## Completed this session (2026-05-01, session 4)

- **Footer: Projects column** — ny nav-kolumn med Baribuddy, Booky, Sejfa och "More work" (→ `/#more-work`); alla tre kolumner lika breda via `min-w-0`; "Lisa Caspersson" max 40% bred
- **Footer: Navigation** — lade till "Home" (→ `/`) överst i listan
- **Footer: hover-animation** — `underline decoration-transparent hover:decoration-current transition-colors duration-200` på alla footer-länkrader; `motion-reduce:transition-none` inkluderat
- **CasePage: Footer** — `<Footer />` tillagd i botten av CasePage (utanför `<main>`, wrapper-fragment)

## Completed this session (2026-05-01, session 3)

- **OtherProjects section** — `src/components/OtherProjects/` (Figma node 5890-4903)
  - New bottom-of-case section showing the other 2 major projects (Baribuddy / Booky / Sejfa)
  - Dynamic filtering: excludes the current slug, always shows the other 2
  - Layout: heading left + 2 cards right (flex-wrap) — cards use same portrait+title+description style as SelectedWork
  - Added to `CasePage.tsx` as last section; `slug` prop was previously unused (`_slug`) — now wired through
  - Images: reusing same Figma CDN URLs as SelectedWork (TODO: replace with local .webp)
  - WCAG: semantic `<section aria-label>`, keyboard-accessible links, focus-visible rings

## Completed this session (2026-05-01, session 2)

- **RevealImage rewrite** — ersatt CSS animation + dynamiska klasser med React state + CSS `transition`; mer tillförlitligt i produktionsbyggen; `delay` prop använder nu `transition-delay`; tester uppdaterade (8 st, alla gröna); `img-reveal`/`img-revealed` CSS-klasser borttagna från `index.css`

- **SelectedWork layout** — bytt från `flex-wrap` till `flex-col md:flex-row` (eliminerar fult 2+1-läge på mellanbrea skärmar)

- **CaseHero bildformat** — `aspect-[4/3]` på mobil (liggande), `md:h-[640px]` på desktop

- **CasePage content-bilder** — `aspect-[4/3]` på mobil (var tidigare `h-[56vw]`), konsekvent med CaseHero

- **CasePage showcase-sektion** — ny sektion i botten med app-screenshots (Figma node 5888-4855); full-bredd med `px-4 md:px-10` padding, `min-h-[100svh]`, `rounded-[2px]`, fade-in via RevealImage; TODO: ersätt Figma CDN-bild med lokal .webp

- **CasePage avslutningstext** — ny sista sektion (vanlig bakgrund, ingen gradient) med acquisitions-text om FitForMe/Baricol

## Completed this session (2026-05-01)

- **Image reveal animation** — `RevealImage` komponent i `src/components/RevealImage/`; scroll-triggrad blur+fade (0.8s) via IntersectionObserver (threshold 15%); stagger på SelectedWork (0/150/300ms); `prefers-reduced-motion` hanterat i både CSS och JS; applicerat på: hero, StatsSection (desktop+mobil), CaseHero, SelectedWork, CasePage (3 content-sektioner); dekorativa bakgrunder (`gradient.webp`) lämnade orörda; 8 tester, alla gröna

- **Nav dold på case-sidor** — `src/App.tsx` använder `useLocation` + `Layout`-komponent; nav visas ej när path börjar med `/work/`
- **CaseIntro layout** — headline + meta sida vid sida på md+, staplade på mobil (`flex-col md:flex-row`); pillrar uppdaterade (py-[6px], border rgba(73,17,41,0.3))
- **Baribuddy-innehåll** — headline, tags (Health / Behaviour design), metaLines och peach-sektion uppdaterade med faktiskt innehåll
- **Tre content-sektioner på CasePage** — bild+text-layout (`flex-row` / `flex-row-reverse`) med `min-h-[100svh]`, 40px/16px padding; titlar: "Starting with the people who left", "Designing for the actual user, not the clinical default", "Building the habit loop"

## Completed this session (2026-04-29)

- **CaseIntro component** — `src/components/CaseIntro/` (Figma node 5887-4833)
  - Props: title, tags (pills), headline, metaLines
  - Responsive typography: title 48px→104px, headline 22px→34px, meta 16px→24px
  - WCAG AA: nav-text + hero-subtitle on bg — pass

- **Mobile bottom nav** — `src/components/Nav.tsx`
  - Nav pill moves to `bottom-4` on mobile, stays at `md:top-4` on desktop
  - Single className change, no extra components
  - 3 Nav tests passing



- **Case page template** — `src/pages/CasePage.tsx`
  - Empty subpage template for Selected Work cases
  - Routes: `/work/baribuddy`, `/work/booky`, `/work/sejfa` registered in `App.tsx`
  - Back link "← Selected work" → `/` using `--color-hero-subtitle` + `font-display`
  - WCAG AA: `focus-visible:outline-[var(--color-nav-text)]` on back link
  - SelectedWork cards now wrapped in `<Link>` with matching focus ring
  - `Project` type extended with `slug: string`
  - 3 new tests, all passing (49/50 total — StatsSection pre-existing failure unrelated)
  - Content sections to be added from Figma in next session

## Completed this session (2026-04-28)

- **SelectedWork section** — `src/components/SelectedWork/` (Figma node 5885-4596)
  - "Selected work" heading + 3 project cards (Baribuddy, Booky, Sejfa) with portrait images
  - Full viewport height (`min-h-[100svh]`), images stretch to fill via `flex-1` (no fixed aspect ratio)
  - `min-w-[240px]` cards, `snap-start` added to fix scroll-snap past StatsSection
  - Images using temporary Figma CDN URLs — must be replaced with local `.webp` files before production
  - Added as `id="work"` section at bottom of `Home.tsx` (after StatsSection)
  - WCAG AA: all contrasts pass, semantic HTML, no interactive elements
  - figma-map.md + wcag-checklist.md updated

- **MoreWork section** — `src/components/MoreWork/` (Figma node 5885-4603)
  - "More work, briefly." heading + 9 project cards with tag pills and descriptions
  - CSS grid: 1 col mobile → 2 col tablet → 3 col desktop max
  - Peach background (`--color-about-bg`) + gradient overlay, uses `--color-nav-text` + `--color-hero-subtitle`
  - WCAG: muted text uses `--color-hero-subtitle` (5.5:1) instead of Figma's rgba(125,46,68,0.7) (3.78:1 fail)

- **Footer** — `src/components/Footer/` (Figma node 5885-4663)
  - Contact section: "Contact" heading, subtitle, Email + Linkedin pill buttons
  - Footer bar: divider with `px-4 md:px-10`, "Lisa Caspersson" name, Let's talk + Navigation link columns
  - Peach background + gradient, all existing tokens, `snap-start`
  - WCAG AA: all interactive elements keyboard accessible, focus-visible rings, semantic `<nav>` + `<ul>`

- **About section** — full viewport height (`min-h-[100svh]`)

## Completed this session (2026-04-17, continued)

- **StatsSection scroll-snap (Approach A)** — page-level `scroll-snap-type: y proximity` on `html` (desktop, `@media min-width: 768px`); each stat row has `snap-start snap-always`; sticky left image and tall 400svh layout preserved; no scroll-trap (right column is normal block flow)

---

## Completed this session (2026-04-17)

- **StatsSection scroll transition fix** — replaced `IntersectionObserver` with scroll event listener + `getBoundingClientRect` for reliable 30%-from-top/bottom fade triggers
- **Image swap** — `DSC03053-Enhanced-NR (1).webp` added to `src/images/`, used in both hero and StatsSection
- **About section background** — `gradient.webp` (scaled to 2080×2080) at 30% opacity, `#FFE8DB` base color
- **StatsSection image padding** — sticky image now has `p-4 md:p-10` + `rounded-[2px]` matching hero section

## Known — not blocking

- `<title>` updated to "Lisa Caspersson — Product Designer and Product Lead" ✅
- Missing `favicon.ico`, `apple-touch-icon.png`, `og-image.png`
- `hero.png` was removed from `src/images/` (non-compliant PNG)

---

## Completed this session

- **Tailwind CSS v4 migration** — replaced `src/variables/` token system with Tailwind v4 `@theme {}` blocks in `src/index.css`
  - All token files deleted (`colors.ts`, `spacing.ts`, `radius.ts`, `typografi.ts`, `animations.ts`, `breakpoints.ts`, `theme.ts`)
  - Dark mode via `data-theme="dark"` on `<html>` using `@custom-variant dark`
  - `ThemeProvider` + `useTheme()` hook in `src/context/ThemeContext.tsx`
  - Theme toggle button added to `Nav`
  - `Button` component migrated to Tailwind utility classes

- **Typography primitives** — `src/components/Typography/`
  - `Heading` (h1–h6, size xl/2xl/3xl/4xl, element defaults, native HTML attrs)
  - `Text` (p/span/label/li, size sm/base/lg, htmlFor support, native HTML attrs)
  - WCAG AA compliant

- **Input component** — `src/components/Input/`
  - Props: id, label, type, placeholder, disabled, value, onChange, error, className
  - WCAG AA: visible label, focus-visible ring, aria-invalid + aria-describedby, 44px tap target
  - Error state uses both color and text message

- **ComponentShowcase** — `src/components/ComponentShowcase/`
  - `ComponentShowcase` (title, description, children) + `ShowcaseRow` (label, children)
  - Documentation utility for `/components` page

- **`/components` page** updated to use ComponentShowcase with all new components

- **Test infrastructure** — `bun test` + `@testing-library/react` + `@happy-dom/global-registrator`
  - 41 tests across 6 files, all passing

- **StatsSection** — `src/components/StatsSection/`
  - Scroll-driven stats section: sticky bild desktop, fade in/out per stat via IntersectionObserver
  - 4 stats: "6+ years", "30+ products", "2 acquisitions", "2 design awards"
  - Mobil: bild överst, stats staplade med fade-in
  - `prefers-reduced-motion` hanterat via `.stat-transition` i `index.css`
  - Inbyggd i `Home.tsx` efter About-sektionen
  - 5 tester, WCAG AA godkänt (45 tester totalt)

---

## Blocked

NONE

---

## Open conflicts

NONE

---

## Key decisions

- Token system: Tailwind v4 `@theme {}` in `src/index.css` — no more `src/variables/`
- Dark mode: `data-theme="dark"` on `<html>`, not `prefers-color-scheme` (explicit toggle only)
- No localStorage persistence for theme — teams add per-project if needed
- Test runner: `bun test` (not Vitest) with `@happy-dom/global-registrator` for DOM env
- `@testing-library/react` requires explicit `afterEach(cleanup)` with Happy DOM

---

## Notes for next session

NONE
