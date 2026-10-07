import { useEffect, useState } from 'react'
import { ABOUT, CONTACT, EDUCATION, FOCUS, INITIALS, NAME, SKILLS, TITLE } from '../lib/data.ts'

/* Cột trái dính cố định: danh tính, đường liên hệ và mọi thông tin nền —
   kỹ năng, học vấn, ngôn ngữ. Cột phải chỉ còn dự án, đúng cách một CV
   bài bản chia: ai / làm được gì ở bên này, đã làm gì ở bên kia.

   Dưới lg thì nó xếp thành khối thường ở đầu trang. Vì giờ cột này dài hơn
   nhiều, các mục phụ thu lại thành <details> trên điện thoại — không thì
   phần giới thiệu bị đẩy quá xa xuống dưới. */
export function Sidebar() {
  return (
    <aside className="border-hairline lg:sticky lg:top-0 lg:h-svh lg:self-start lg:border-r">
      <div className="lg:flex lg:h-full lg:flex-col lg:overflow-y-auto
                      px-6 pb-10 pt-10 md:px-10 lg:px-8 lg:pb-8">
        <Identity />

        {/* Mục lục chỉ có ích khi cột trái dính một chỗ. Trên điện thoại nó chỉ
            đẩy nội dung xuống. */}
        <nav className="mt-8 hidden lg:block" aria-label="Sections">
          <ul className="space-y-0.5">
            <NavLink href="#experience" n="01" label="Experience" />
            <NavLink href="#work" n="02" label="Production work" />
            <NavLink href="#flow" n="03" label="How a webhook lands" />
            <NavLink href="#builds" n="04" label="Things I built" />
          </ul>
        </nav>

        <div className="hairline-t mt-8 pt-6">
          <p className="eyebrow mb-3">About</p>
          <p className="text-muted max-w-[46ch] text-sm leading-relaxed">{ABOUT}</p>
        </div>

        <Panel title="Focus">
          <ul className="space-y-2">
            {FOCUS.map(f => (
              <li key={f} className="text-muted flex gap-2.5 text-sm leading-snug">
                <span aria-hidden className="bg-brass mt-2 h-px w-2.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Skills">
          <div className="space-y-3">
            {SKILLS.map(g => (
              <div key={g.group}>
                <p className="text-brass font-mono text-2xs">{g.group}</p>
                <p className="text-muted mt-0.5 text-sm leading-snug">{g.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </Panel>

        {EDUCATION.length > 0 && (
          <Panel title="Education">
            <div className="space-y-3">
              {EDUCATION.map(e => (
                <div key={e.school}>
                  <p className="text-sm leading-snug">{e.school}</p>
                  <p className="text-muted mt-0.5 text-sm leading-snug">{e.detail}</p>
                  <p className="text-faint tnum mt-0.5 font-mono text-2xs">
                    {e.place} · {e.years}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        )}

        <Panel title="Languages">
          <p className="text-muted text-sm">{CONTACT.languages}</p>
        </Panel>

        <p className="text-faint mt-auto hidden pt-8 font-mono text-2xs lg:block">
          {CONTACT.city}
        </p>
      </div>
    </aside>
  )
}

/** Từ lg trở lên cột đủ dài để mở sẵn tất cả; dưới lg thì gập lại.
 *  Dựng hai nhánh riêng thay vì điều khiển thuộc tính `open`: <details> có
 *  trạng thái riêng của trình duyệt, ép `open` từ React sẽ chặn người dùng
 *  tự đóng mở. */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  if (desktop) {
    return (
      <div className="hairline-t mt-6 pt-6">
        <p className="eyebrow mb-3">{title}</p>
        {children}
      </div>
    )
  }

  return (
    <details className="hairline-t group mt-5 pt-5">
      <summary className="eyebrow flex cursor-pointer list-none items-center justify-between
                          [&::-webkit-details-marker]:hidden">
        {title}
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor"
             strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
             className="transition-transform duration-200 group-open:rotate-180">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  )
}

function Identity() {
  return (
    <div>
      {/* Điện thoại: ảnh và tên nằm ngang cho gọn chiều cao. Từ lg trở lên cột
          hẹp và dài nên xếp dọc lại. */}
      <div className="flex items-center gap-4 lg:block">
        <Portrait />
        <div className="lg:mt-5">
          <h1 className="font-display text-3xl leading-none">{NAME}</h1>
          <p className="text-brass mt-1.5 text-sm">{TITLE}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <IconLink href={`mailto:${CONTACT.email}`} label="Email">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor"
               strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="3.5" width="12" height="9" rx="1" />
            <path d="m2.6 4.5 5.4 4 5.4-4" />
          </svg>
        </IconLink>
        {CONTACT.phone && (
          <IconLink href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} label="Phone">
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor"
                 strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 2.5 6 2l1.5 3L6 6.2c.6 1.7 2.1 3.2 3.8 3.8L11 8.5 14 10l-.5 2c-.2.8-1 1.3-1.8 1.1C7.2 12.2 3.8 8.8 2.9 4.3c-.2-.8.3-1.6 1.1-1.8Z" />
            </svg>
          </IconLink>
        )}
        {/* Dấu hiệu nhận diện chính thức của GitHub và LinkedIn: vẽ tay xấp xỉ
            thì ra hình méo, mà đây là thứ người xem nhận ra bằng hình dáng. */}
        <IconLink href={`https://${CONTACT.github}`} label="GitHub">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
          </svg>
        </IconLink>
        {CONTACT.linkedin && (
          <IconLink href={`https://${CONTACT.linkedin}`} label="LinkedIn">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
              <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2.4 21h5.2V9.8H2.4V21Zm7.3 0h5.2v-6.2c0-3 3.6-3.3 3.6 0V21h5.2v-8c0-6.4-7-6.2-8.8-3v-.2H9.7V21Z" />
            </svg>
          </IconLink>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {/* Trỏ thẳng vào mail: mục "get in touch" ở cột phải đã bỏ, neo #contact
            không còn tồn tại. */}
        <a href={`mailto:${CONTACT.email}`}
           className="bg-brass text-ground rounded-sm px-3.5 py-2 font-mono text-2xs
                      transition-opacity duration-200 hover:opacity-85">
          Get in touch
        </a>
        {CONTACT.cv && (
          <a href={CONTACT.cv} download
             className="border-hairline text-muted rounded-sm border px-3.5 py-2 font-mono text-2xs
                        transition-colors duration-200 hover:border-brass hover:text-bone">
            Download CV
          </a>
        )}
      </div>
    </div>
  )
}

/* Ảnh chân dung là tuỳ chọn: chưa có file thì hiện chữ tắt, không vỡ bố cục
   và không để lại ô ảnh hỏng.
   Thử lần lượt .jpg rồi .png — nếu chỉ chấp nhận một đuôi thì lưu nhầm đuôi
   kia là ảnh im lặng không hiện, mà lỗi đó rất khó đoán ra. */
const SOURCES = ['/portrait.jpg', '/portrait.png']

function Portrait() {
  const [i, setI] = useState(0)
  return (
    <div className="border-hairline ring-brass/25 h-20 w-20 shrink-0 overflow-hidden rounded-full
                    border ring-1 ring-offset-2 ring-offset-ground">
      {i < SOURCES.length ? (
        <img src={SOURCES[i]} alt={NAME} width={80} height={80}
             className="h-full w-full object-cover" onError={() => setI(n => n + 1)} />
      ) : (
        <div className="bg-surface font-display text-muted flex h-full w-full items-center
                        justify-center text-2xl leading-none">
          {INITIALS}
        </div>
      )}
    </div>
  )
}

function NavLink({ href, n, label }: { href: string; n: string; label: string }) {
  return (
    <li>
      <a href={href}
         className="text-muted group flex items-baseline gap-3 py-1.5 text-sm
                    transition-colors duration-200 hover:text-bone">
        <span className="eyebrow group-hover:text-brass transition-colors duration-200">{n}</span>
        {label}
      </a>
    </li>
  )
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} title={label}
       target={href.startsWith('http') ? '_blank' : undefined}
       rel={href.startsWith('http') ? 'noreferrer' : undefined}
       className="border-hairline text-faint flex h-9 w-9 items-center justify-center rounded-sm
                  border transition-colors duration-200 hover:border-brass hover:text-brass">
      {children}
    </a>
  )
}
