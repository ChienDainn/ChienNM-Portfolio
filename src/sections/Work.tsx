import { useEffect, useRef, useState } from 'react'
import { motionSafe, revealChildren } from '../lib/motion.ts'
import { WORK, type Project } from '../lib/data.ts'

export function Work() {
  const list = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = list.current
    if (!el) return
    return motionSafe(() => { revealChildren(el, 0.06) })
  }, [])

  return (
    <section id="work" className="px-6 py-24 md:px-12">
      <SectionHead num="02" title="Production work" note="Utop · since 2023" />
      <div ref={list} className="hairline-t">
        {WORK.map(p => <Row key={p.name} p={p} />)}
      </div>
    </section>
  )
}

export function SectionHead({ num, title, note }: { num: string; title: string; note?: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none">
        <span className="eyebrow mr-4 align-super">{num}</span>
        {title}
      </h2>
      {note && <p className="eyebrow">{note}</p>}
    </div>
  )
}

/* Mỗi dự án là một hàng mở được. Danh sách đóng cho phép quét nhanh toàn bộ;
   mở ra mới đọc chi tiết — nhà tuyển dụng thường chỉ quét. */
function Row({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="group border-b border-hairline">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open}
              className="flex w-full cursor-pointer flex-col gap-1 py-6 text-left
                         transition-colors duration-300 md:flex-row md:items-baseline md:gap-8">
        <span className="w-full md:w-[38%]">
          <span className="font-display block text-2xl leading-tight transition-transform
                           duration-300 group-hover:translate-x-1 md:text-3xl">
            {p.name}
          </span>
          {/* Nền tảng và phiên bản hiện ngay khi danh sách còn đóng: người lọc
              hồ sơ theo nền tảng không phải mở từng mục ra mới biết. */}
          {p.runtime && (
            <span className="text-faint mt-1 block font-mono text-2xs">{p.runtime}</span>
          )}
        </span>
        <span className="text-muted flex-1 text-sm">{p.kind}</span>
        <span className="eyebrow shrink-0">
          {open ? '— close' : '+ open'}
        </span>
      </button>

      {/* Không animate height: dùng grid-template-rows 0fr→1fr, mượt mà không
          buộc trình duyệt tính lại layout mỗi frame. */}
      <div className="grid transition-[grid-template-rows] duration-500 ease-out"
           style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="grid gap-6 pb-8 md:grid-cols-[38%_1fr] md:gap-8">
            <p className="text-muted text-sm leading-relaxed">{p.summary}</p>
            <div>
              {/* Dự án gồm nhiều app thì liệt kê ra — gộp một dòng là nói sai
                  quy mô, mà đây đúng là chỗ quy mô có ý nghĩa. */}
              {p.parts && (
                <ul className="mb-5 space-y-3">
                  {p.parts.map(part => (
                    <li key={part.name} className="border-l border-hairline pl-4">
                      <p className="text-brass font-mono text-2xs">{part.name}</p>
                      <p className="text-muted mt-0.5 text-sm leading-relaxed">{part.note}</p>
                    </li>
                  ))}
                </ul>
              )}
              <ul className="space-y-1.5 text-sm">
                {p.did.map(d => (
                  <li key={d} className="flex gap-3">
                    <span className="text-brass mt-2 h-px w-3 shrink-0 bg-current" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-2xs">
                {p.stack.map(s => <span key={s} className="text-faint">{s}</span>)}
                {p.scale && <span className="text-brass tnum">{p.scale}</span>}
              </p>

              {/* Link store nằm trong phần mở ra chứ không nằm trên hàng tiêu đề:
                  hàng đó là một <button>, lồng <a> vào trong là HTML sai và làm
                  hỏng điều hướng bàn phím. */}
              {p.links && (
                <div className="mt-4">
                  {/* Dự án nhúng thì link trỏ tới app của KHÁCH HÀNG, không phải
                      app của mình — nhãn phải nói rõ, nếu không là nhận vơ. */}
                  <p className="eyebrow mb-2">
                    {p.embedded ? 'My module ships inside' : 'Download'}
                  </p>
                  <p className="flex flex-wrap gap-2">
                    {p.links.ios && <StoreLink href={p.links.ios} store="App Store" />}
                    {p.links.android && <StoreLink href={p.links.android} store="Google Play" />}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Dấu hiệu nhận diện thật của hai kho thay cho mũi tên tải chung chung: người
   xem nhận ra kho bằng hình dáng trước khi kịp đọc chữ.
   Quả táo để một màu theo màu chữ; tam giác Google Play giữ đúng bốn màu
   thương hiệu — đây là chỗ duy nhất trong trang có màu ngoài bảng màu, và nó
   được phép vì logo sai màu thì không còn là logo.
   Vẫn giữ nguyên nhãn chữ: biểu tượng đứng một mình thì trình đọc màn hình
   không đọc ra được gì. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
      <path d="M17.05 12.66c-.03-2.73 2.23-4.04 2.33-4.1-1.27-1.86-3.25-2.11-3.96-2.14-1.68-.17-3.28 1-4.13 1-.85 0-2.17-.98-3.56-.95-1.83.03-3.52 1.06-4.46 2.7-1.9 3.3-.49 8.19 1.36 10.87.9 1.31 1.98 2.78 3.4 2.73 1.36-.06 1.88-.88 3.53-.88s2.11.88 3.55.85c1.47-.03 2.4-1.34 3.3-2.65 1.04-1.52 1.47-2.99 1.49-3.07-.03-.01-2.86-1.1-2.89-4.36ZM14.3 4.6c.75-.91 1.26-2.17 1.12-3.43-1.08.04-2.39.72-3.17 1.63-.7.8-1.31 2.09-1.15 3.32 1.21.09 2.44-.61 3.2-1.52Z" />
    </svg>
  )
}

function PlayMark() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
      <path d="M3.6 1.85a1.4 1.4 0 0 0-.35.96v18.38c0 .38.13.71.36.95l.07.06L13.9 12v-.24L3.67 1.79l-.07.06Z" fill="#00D2FF" />
      <path d="m17.3 15.4-3.4-3.4v-.24l3.4-3.41.08.05 4.04 2.3c1.16.65 1.16 1.72 0 2.38l-4.04 2.29-.08.04Z" fill="#FFCE00" />
      <path d="m17.38 15.36-3.48-3.48L3.6 22.15c.38.4 1.01.45 1.72.05l12.06-6.84Z" fill="#FF3A44" />
      <path d="M17.38 8.4 5.32 1.57C4.61 1.16 3.98 1.21 3.6 1.62L13.9 11.9l3.48-3.5Z" fill="#00E676" />
    </svg>
  )
}

function StoreLink({ href, store }: { href: string; store: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
       className="border-hairline text-muted inline-flex items-center gap-2 rounded-sm border
                  px-3 py-1.5 font-mono text-2xs transition-colors duration-200
                  hover:border-brass hover:text-bone">
      {store === 'App Store' ? <AppleMark /> : <PlayMark />}
      {store}
    </a>
  )
}
