import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile, projects, skills } from './lib/data'

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useReveal() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduce() || !root.current) return
    const els = root.current.querySelectorAll<HTMLElement>('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          gsap.fromTo(e.target, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
          io.unobserve(e.target)
        }),
      { threshold: 0.12 },
    )
    els.forEach((el) => {
      el.style.opacity = '0'
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return root
}

const Section = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
  <section id={id} className="mx-auto max-w-5xl px-6 py-24 border-t border-line">
    <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-brass mb-10">{label}</p>
    {children}
  </section>
)

export default function App() {
  const root = useReveal()
  return (
    <div ref={root}>
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-ink/70 border-b border-line">
        <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between font-mono text-xs">
          <a href="#top" className="text-bone">{profile.name}</a>
          <div className="flex gap-6 text-mute">
            <a className="hover:text-brass" href="#work">Work</a>
            <a className="hover:text-brass" href="#skills">Skills</a>
            <a className="hover:text-brass" href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto max-w-5xl px-6 pt-40 pb-28">
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.2em] text-brass mb-6">{profile.role}</p>
          <h1 data-reveal className="font-serif text-5xl sm:text-7xl leading-[1.05] max-w-3xl">
            {profile.tagline}
          </h1>
          <p data-reveal className="mt-8 max-w-xl text-mute text-lg">{profile.intro}</p>
          <div data-reveal className="mt-10 flex gap-4 font-mono text-xs">
            <a href="#work" className="px-5 py-3 bg-brass text-ink hover:opacity-90">View work</a>
            <a href={`mailto:${profile.email}`} className="px-5 py-3 border border-line hover:border-brass">Email me</a>
          </div>
        </section>

        <Section id="work" label="Selected work">
          <div className="grid gap-px bg-line border border-line">
            {projects.map((p, i) => (
              <article key={p.title} data-reveal className="bg-ink p-8 grid md:grid-cols-[1fr_2fr] gap-6 hover:bg-panel transition-colors">
                <div>
                  <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-serif text-3xl mt-2">{p.title}</h3>
                  <p className="font-mono text-xs text-brass mt-2">{p.kind}</p>
                </div>
                <div>
                  <p className="text-bone/90">{p.summary}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-mute list-disc pl-5 marker:text-brass">
                    {p.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="font-mono text-[11px] px-2 py-1 border border-line text-mute">{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" label="Skills">
          <div className="grid sm:grid-cols-2 gap-10">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} data-reveal>
                <h3 className="font-serif text-2xl mb-4">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span key={s} className="font-mono text-xs px-3 py-1.5 border border-line">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" label="Contact">
          <h2 data-reveal className="font-serif text-4xl sm:text-5xl max-w-2xl">Have a product to build or fix? Let&apos;s talk.</h2>
          <div data-reveal className="mt-8 font-mono text-sm space-y-2">
            <p><a className="text-brass hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a></p>
            {profile.github && <p><a className="hover:text-brass" href={profile.github}>GitHub</a></p>}
            {profile.linkedin && <p><a className="hover:text-brass" href={profile.linkedin}>LinkedIn</a></p>}
          </div>
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-center font-mono text-xs text-mute">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  )
}
