import { useEffect, useRef } from 'react'
import { motionSafe, revealChildren } from '../lib/motion.ts'
import { NAME, ROLES, WORK } from '../lib/data.ts'
import { SectionHead } from './Work.tsx'

function useReveal<T extends HTMLElement>(stagger = 0.08) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return motionSafe(() => { revealChildren(el, stagger) })
  }, [stagger])
  return ref
}

/* Kỹ năng, học vấn, ngôn ngữ và mục liên hệ đã chuyển sang cột trái. Cột phải
   chỉ còn những gì liên quan tới việc đã làm. */
export function Experience() {
  const list = useReveal<HTMLOListElement>()
  return (
    <section id="experience" className="px-6 py-24 md:px-12">
      <SectionHead num="01" title="Experience" />
      {/* Dòng thời gian: đường dọc chạy suốt, mỗi mốc một chấm. Đường kẻ nằm ở
          ::before của khối bao nên không cần thẻ rỗng chỉ để vẽ. */}
      <ol ref={list}
          className="relative before:absolute before:bottom-2 before:left-[3px]
                     before:top-2 before:w-px before:bg-hairline">
        {ROLES.map(r => {
          // Dự án nào thuộc vai trò nào lấy thẳng từ trường client của WORK,
          // không khai báo tay ở hai nơi rồi lệch nhau.
          const shipped = WORK.filter(p => p.client.includes(r.company))
          return (
            <li key={r.company} className="relative pb-9 pl-7 last:pb-0">
              <span aria-hidden
                    className="border-brass bg-ground absolute left-0 top-[7px] h-[7px] w-[7px]
                               rounded-full border" />
              {/* Cùng lỗi đã sửa ở hero: để 1fr thì cột chữ kéo dài 726px trong khi
                  đoạn văn chỉ tới 469px (bị chặn ở 58ch), nên cột "Shipped here"
                  bị đẩy ra xa 297px. Chặn cột chữ ở 500px cho vừa đúng bề rộng
                  chữ thật.
                  Đổi luôn ngưỡng lg -> xl: ở 1024px thì chia đôi chỉ còn 250px
                  cho đoạn văn, quá hẹp để đọc. */}
              <div className="xl:grid xl:grid-cols-[minmax(0,500px)_280px] xl:items-start xl:gap-10">
                <div>
                  <p className="tnum text-faint font-mono text-2xs">{r.from ? `${r.from} — ${r.to}` : r.to}</p>
                  <h3 className="font-display mt-1.5 text-2xl leading-none">{r.company}</h3>
                  <p className="text-brass mt-1 text-sm">{r.title} · {r.place}</p>
                  <p className="text-muted mt-2 max-w-[58ch] text-sm leading-relaxed">{r.note}</p>
                </div>

                <div className="mt-5 xl:mt-0">
                  <p className="eyebrow hairline-t pt-3">
                    Shipped here · {shipped.length}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {shipped.map(p => (
                      <li key={p.name} className="text-muted text-sm leading-snug">
                        {p.name}
                        <span className="text-faint"> — {p.kind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="hairline-t mx-6 flex flex-wrap items-center justify-between gap-4 py-8 font-mono text-2xs text-faint md:mx-12">
      <p>{NAME}</p>
      <p className="tnum">© {new Date().getFullYear()}</p>
    </footer>
  )
}
