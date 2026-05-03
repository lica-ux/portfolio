import { Link } from 'react-router-dom'
import ChevronLeft from '../icons/chevron_left.svg?react'
import CaseHero from '../components/CaseHero'
import CaseIntro from '../components/CaseIntro'
import RevealImage from '../components/RevealImage'
import OtherProjects from '../components/OtherProjects'
import Footer from '../components/Footer'
import gradientImage from '../images/gradient.webp'
import sejfaMock2 from '../images/Sejfa_mock2.webp'
import sejfa1 from '../images/Sejfa1.png'
import sejfa2 from '../images/Sejfa2.png'
import sejfa3 from '../images/Sejfa3.png'
import sejfa4 from '../images/Sejfa4.png'
import bookyHero from '../images/BookyHero.png'
import booky4 from '../images/Booky4.mov'

// TODO: replace with local .webp images per case
const placeholderImage = 'https://www.figma.com/api/mcp/asset/71cd43ec-3dfb-420e-90fd-11aedaa8f51c'

const heroImages: Record<string, string> = {
  sejfa: sejfaMock2,
  booky: bookyHero,
}

interface CasePageProps {
  slug: string
}

export default function CasePage({ slug }: CasePageProps) {
  return (
    <>
    <main className="snap-start snap-always min-h-[100svh] px-4 md:px-10 pt-6 flex flex-col">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-base font-medium font-display focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nav-text)] pb-6"
        style={{ color: 'var(--color-hero-subtitle)' }}
      >
        <ChevronLeft width={20} height={20} className="[&_path]:fill-[currentColor]" aria-hidden="true" />
        Home
      </Link>
      <CaseHero imageSrc={heroImages[slug] ?? placeholderImage} imageAlt="" />
      <CaseIntro
        title={slug === 'sejfa' ? 'Sejfa' : slug === 'booky' ? 'Booky' : 'Baribuddy'}
        tags={slug === 'sejfa' ? ['Home insurance', 'Mobile app', 'Website'] : slug === 'booky' ? ['Website', 'Backoffice', 'Automation'] : ['Health', 'Behaviour design']}
        headline={slug === 'sejfa'
          ? 'Making insurance relevant to a generation that ignores it'
          : slug === 'booky'
          ? 'More than a redesign. We solved the wrong problem.'
          : "Turning around a declining health app.\nFrom 200 to 50 000 users and a company acquisition"}
        metaLines={slug === 'sejfa'
          ? [
              'Client: Sejfa / Länsförsäkringar',
              'Role: Sole designer',
              'Year: 2022 - ongoing',
              'Result: 10 000 users & 2 awards',
            ]
          : slug === 'booky'
          ? [
              'Client: Booky',
              'Role: Lead designer',
              'Year: 2022',
              'Result: 80% of manual work automated',
            ]
          : [
              'Client: Baricol / FitForMe',
              'Role: Sole designer',
              'Year: 2021 - 2024',
              'Result: 50 000 active users & acquisition',
            ]}
      />
    </main>

    <section
      className="snap-start snap-always relative flex flex-col justify-center gap-6 py-24 md:py-48 px-4 md:px-10 min-h-[100svh]"
      style={{ backgroundColor: '#FFE8DB' }}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          alt=""
          src={gradientImage}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      </div>
      <p
        className="relative text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px] whitespace-pre-line"
        style={{ color: 'var(--color-hero-subtitle)' }}
      >
        {slug === 'sejfa'
          ? <>Länsförsäkringar wanted to reach young adults who do not think about insurance and do not see the value in it.{'\n\n'}It is easy to ignore until something goes wrong.{'\n\n'}The challenge was to make something people do not care about feel simple enough to adopt and trustworthy enough to rely on.</>
          : slug === 'booky'
          ? <>A solo founder came to us wanting a visual refresh for her platform connecting speakers, moderators, and entertainers with event bookers. In our first meeting it became clear the real problem wasn't visual. Her entire workflow was manual, consuming all of her waking hours. We told her straight: this isn't sustainable, especially if you want to grow.</>
          : <>Baricol makes supplements for people who've had gastric bypass surgery. After the procedure, the body absorbs certain vitamins and minerals significantly worse, meaning patients need to supplement every day for the rest of their lives.{'\n\n'}They had an app, but it had started life as a general journal with no daily behaviour to anchor it. Users downloaded it, came back a few times, and disappeared. They came to us to understand why.</>
        }
      </p>
    </section>

    <section className="snap-start snap-always flex flex-col md:flex-row p-4 md:p-10 pb-12 md:min-h-[100svh] gap-6 md:gap-10">
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:flex-1 rounded-[2px] overflow-hidden z-10">
        <RevealImage src={slug === 'sejfa' ? sejfa1 : placeholderImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="md:flex-1 flex flex-col gap-4 md:justify-center">
        <h2 className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]" style={{ color: 'var(--color-nav-text)' }}>
          {slug === 'sejfa' ? 'Designing a brand within a brand' : slug === 'booky' ? 'Reframing the brief before touching Figma' : 'Starting with the people who left'}
        </h2>
        <p className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line" style={{ color: 'var(--color-hero-subtitle)' }}>
          {slug === 'sejfa'
            ? `Sejfa could not feel like a lighter version of LF. It needed its own identity.\n\nI defined and drove a visual direction that was bold, colourful, and deliberately playful. The goal was to position Sejfa as a distinct alternative rather than a corporate extension.\n\nWe framed it as a cheeky little sister to LF's traditional brand. Something recognisable on its own terms and designed to stand out in a category where everything tends to look the same.`
            : slug === 'booky'
            ? `She was immediately on board. We shifted from redesign to product transformation, figuring out how much of her work could be handed off to the platform itself. The answer was most of it. Profiles could apply to be listed, manage their own pages, and handle their own bookings. Charlotte's job became approving applications and sending invoices.`
            : `The most useful conversations were with users who had already stopped. What came back wasn't a list of missing features. It was a motivation problem. There was no compelling reason to open the app tomorrow if you'd already opened it today.\n\nThe real design challenge wasn't functionality. It was making a daily health behaviour feel worth maintaining.`
          }
        </p>
      </div>
    </section>

    <section className="snap-start snap-always flex flex-col md:flex-row-reverse px-4 md:px-10 p-4 md:p-10 pb-12 md:min-h-[100svh] gap-6 md:gap-10">
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:flex-1 rounded-[2px] overflow-hidden z-10">
        <RevealImage src={slug === 'sejfa' ? sejfa2 : placeholderImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="md:flex-1 flex flex-col gap-4 md:justify-center">
        <h2 className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]" style={{ color: 'var(--color-nav-text)' }}>
          {slug === 'sejfa' ? 'Working within constraints, not against them' : slug === 'booky' ? 'Designing for two very different users' : 'Designing for the actual user, not the clinical default'}
        </h2>
        <p className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line" style={{ color: 'var(--color-hero-subtitle)' }}>
          {slug === 'sejfa'
            ? `The product relied on a third-party backend that limited what we could build. We lost features as fundamental as push notifications.\n\nInstead of fighting those constraints, I focused on making the core experience as clear and effective as possible within them.\n\nThe onboarding flow was validated through an external user study conducted with University of Gothenburg students. The results showed strong clarity, flow, and understanding of the information presented.`
            : slug === 'booky'
            ? `The platform needed to work for three distinct people: the public user browsing for talent, the profiles managing their own presence, and Charlotte overseeing everything. I designed a dual-role backoffice where Charlotte sees the full picture and can moderate, while profiles only see their own listings and incoming gigs. Same system, two completely different experiences depending on who's logged in.`
            : `The core audience was women over 40 recovering from a major medical procedure. The obvious direction would have been clean and clinical. I went the other way — warm, inviting, and built for someone who deserved an experience that felt genuinely on their side. User feedback confirmed it landed.`
          }
        </p>
      </div>
    </section>

    <section className="snap-start snap-always flex flex-col md:flex-row p-4 md:p-10 pb-12 md:min-h-[100svh] gap-6 md:gap-10">
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:flex-1 rounded-[2px] overflow-hidden z-10">
        <RevealImage src={slug === 'sejfa' ? sejfa3 : placeholderImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="md:flex-1 flex flex-col gap-4 md:justify-center">
        <h2 className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]" style={{ color: 'var(--color-nav-text)' }}>
          {slug === 'sejfa' ? 'Integrating AI into the claims experience' : slug === 'booky' ? 'Building a flow that doesn\'t need the founder' : 'Building the habit loop'}
        </h2>
        <p className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line" style={{ color: 'var(--color-hero-subtitle)' }}>
          {slug === 'sejfa'
            ? `As the product matured, I helped introduce AI into the claims flow.\n\nInstead of filling out forms, users describe what happened in their own words. The system identifies missing information and asks follow-up questions. This guides users to a complete claim without requiring prior knowledge.\n\nMy focus was on making the experience genuinely simpler, not just different. A large part of the work was navigating legal and technical boundaries around what the AI could and could not handle.`
            : slug === 'booky'
            ? `The trickiest part wasn't the design, it was defining the logic. When a user matches with a profile, a dedicated space opens for negotiating timing, confirming the gig, and agreeing on price, all of which feeds directly into invoicing. The goal was a process complete enough that Charlotte didn't need to be involved at any point between introduction and payment. Getting that flow right took iteration.`
            : `I designed the product around one non-negotiable behaviour: logging supplements daily. Completing that action unlocks relevant content. Missing it triggers a gentle end-of-day reminder.\n\nOn top of that I added weight tracking, a post-op food journey with doctor-approved recipes, and social challenges tied to goals users already had from their doctors. The challenges addressed something users told us directly: they wanted to feel less alone in this.`
          }
        </p>
      </div>
    </section>

    {slug === 'booky' && (
    <section className="snap-start snap-always flex flex-col md:flex-row-reverse px-4 md:px-10 p-4 md:p-10 pb-12 md:min-h-[100svh] gap-6 md:gap-10">
      <div className="relative w-full aspect-[4/3] md:aspect-auto md:flex-1 rounded-[2px] overflow-hidden z-10">
        <RevealImage src={placeholderImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="md:flex-1 flex flex-col gap-4 md:justify-center">
        <h2 className="font-display font-normal text-[22px] md:text-[34px] leading-[1.15] tracking-[-0.02em]" style={{ color: 'var(--color-nav-text)' }}>
          A font decision that saved the client money
        </h2>
        <p className="text-base md:text-[20px] leading-[1.4] whitespace-pre-line" style={{ color: 'var(--color-hero-subtitle)' }}>
          The brand agency behind Booky's new visual identity had recommended a premium display font. I found a Google Fonts alternative with the same character and proposed the switch. Same feel, no licensing cost. Small decision, right call.
        </p>
      </div>
    </section>
    )}

    {/* TODO: replace with local .webp (max 2080×2080px, max 940kb) */}
    <section className="snap-start snap-always py-4 md:py-10 px-4 md:px-10 flex flex-col min-h-[100svh]">
      <div className="relative w-full flex-1 rounded-[2px] overflow-hidden">
        {slug === 'booky' ? (
          <video
            src={booky4}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <RevealImage
            src={slug === 'sejfa' ? sejfa4 : placeholderImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>
    </section>

    <section className="snap-start snap-always flex flex-col justify-center gap-6 py-24 md:py-48 px-4 md:px-10 min-h-[100svh]">
      <p
        className="text-[20px] md:text-[32px] font-normal leading-[1.1] w-3/4 max-w-[1080px] whitespace-pre-line"
        style={{ color: 'var(--color-hero-subtitle)' }}
      >
        {slug === 'sejfa'
          ? `Sejfa launched and scaled within its target group. It established itself as a clear alternative in a traditionally conservative category.\n\n• Scaled to ~10,000 customers\n• Won ITC Diamond Award for innovative technology\n• Won Swedish Design Prize, public vote, Best Digital App\n• Ongoing responsibility for UX and UI across app and website since 2022`
          : slug === 'booky'
          ? `Charlotte went from managing every profile, match, and conversation manually to essentially only needing to invoice clients after the event. She's since become a mother and still runs Booky on her own.\n\n• Automated ~80% of the client's manual workload\n• Eliminated the need for additional staff\n• Profiles on the platform have more than doubled since launch\n• The bold, immediately recognisable visual identity remains unchanged`
          : `FitForMe, a Dutch supplements company, acquired Baricol to enter the Nordic market. Rather than growing organically, they bought a company that had built a loyal user base through its app. Baribuddy was cited as a central reason the acquisition made strategic sense.\n\nThe app had grown from roughly 200 to 50 000 active users. I continued as sole designer post-acquisition, brought in for improvements as the product matured.`
        }
      </p>
    </section>

    <OtherProjects currentSlug={slug} />
    <Footer />
    </>
  )
}
