import { useEffect, useRef } from 'react'
import { motionSafe, revealSelf } from '../lib/motion.ts'
import { BUILDS, type Project } from '../lib/data.ts'
import { SectionHead } from './Work.tsx'

export function Builds() {
  return (
    <section id="builds" className="px-6 py-24 md:px-12">
      <SectionHead num="04" title="Things I built for myself" note="2026" />
      <p className="text-muted mb-12 max-w-[62ch] text-sm leading-relaxed">
        Client work shows what I can be asked to do. This is what I build when nobody asks.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {BUILDS.map(p => <Card key={p.name} p={p} />)}
      </div>
    </section>
  )
}

function Card({ p }: { p: Project }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return motionSafe(() => { revealSelf(el) })
  }, [])

  /* Con trỏ kéo theo một vùng sáng nhẹ. Chỉ dùng biến CSS chứ không animate
     background trực tiếp — trình duyệt không phải tính lại layout. */
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <article ref={ref} onMouseMove={onMove}
             className="group relative overflow-hidden rounded-lg border border-hairline
                        bg-surface p-6 transition-colors duration-300 hover:border-faint md:p-8">
      <span aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity
                       duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(340px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--color-brass) 8%, transparent), transparent 70%)',
            }} />

      <p className="eyebrow mb-3">{p.client}</p>
      <h3 className="font-display text-3xl leading-none md:text-4xl">{p.name}</h3>
      <p className="text-brass mt-2 font-mono text-2xs">{p.kind}</p>

      <p className="text-muted mt-5 text-sm leading-relaxed">{p.summary}</p>

      <ul className="mt-6 space-y-2 text-sm">
        {p.did.map(d => (
          <li key={d} className="flex gap-3">
            <span className="text-brass mt-2 h-px w-3 shrink-0 bg-current" />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <p className="hairline-t mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 font-mono text-2xs">
        {p.stack.map(s => <span key={s} className="text-faint">{s}</span>)}
      </p>
      {p.scale && <p className="text-brass tnum mt-2 font-mono text-2xs">{p.scale}</p>}

      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer"
           className="border-hairline text-muted relative z-10 mt-5 inline-flex items-center gap-2
                      rounded-sm border px-3 py-1.5 font-mono text-2xs transition-colors
                      duration-200 hover:border-brass hover:text-bone">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden>
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
          </svg>
          Source on GitHub
        </a>
      )}
    </article>
  )
}
