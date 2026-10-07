import { useEffect, useRef } from 'react'
import { gsap, SplitText, motionSafe } from '../lib/motion.ts'
import { CONTACT, DOMAINS } from '../lib/data.ts'

export function Hero() {
  const head = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = head.current
    if (!el) return

    return motionSafe(() => {
      // Tách theo ký tự chỉ dành cho tiêu đề ngắn — tách cả đoạn văn là tạo ra
      // hàng nghìn thẻ và làm hỏng trình đọc màn hình.
      // Phải tách cả 'words': chỉ tách 'chars' thì mỗi ký tự là một thẻ rời và
      // trình duyệt được phép xuống dòng giữa chữ — câu này đã ngắt thành
      // "peop / le" trên bản chạy thật.
      const split = new SplitText(el, { type: 'words,chars' })
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from(split.chars, {
        opacity: 0, yPercent: 110, rotateX: -55,
        duration: 0.8, stagger: 0.012,
      })
        .from('[data-hero-line]', { opacity: 0, y: 16, duration: 0.6, stagger: 0.09 }, '-=0.45')
        .from('[data-hero-rule]', { scaleX: 0, duration: 0.9, ease: 'expo.inOut' }, '-=0.6')

      return () => { split.revert(); tl.kill() }
    })
  }, [])

  /* Không ép chiều cao nữa. Bản trước dùng min-h-[86svh] nên trên màn hình
     950px cao, phần hero cao 817px trong khi nội dung chỉ 555px — thừa 262px
     trống không vì lý do gì. Giờ để nội dung tự quyết chiều cao. */
  return (
    <header className="px-6 pb-16 pt-8 md:px-12 lg:py-24">
      {/* Cột chữ chặn ở 640px thay vì 1fr. Để 1fr thì cột rộng 816px trong khi
          tiêu đề chỉ tới 607px, dư 209px nằm im bên trong rồi cộng thêm khoảng
          cách 48px — hai cột cách nhau 257px, nhìn như hai mảng rời nhau.
          minmax(0,640px) vẫn co lại được ở màn hình hẹp hơn nên không tràn. */}
      <div className="xl:grid xl:grid-cols-[minmax(0,640px)_210px] xl:items-start xl:gap-12">
        <div>
          <p data-hero-line className="eyebrow mb-6">
            {CONTACT.city} — web developer at Utop
          </p>

          {/* Tên đã nằm ở cột trái rồi, nên đầu cột phải là câu tuyên bố chứ
              không lặp lại tên.
              Trần cỡ chữ nâng từ 5.5rem lên 7rem: ở 1512px thì 15ch chỉ chiếm
              607px trong cột 816px, chữ to hơn lấp được chỗ đó bằng chính nó
              thay vì phải độn thêm nội dung. */}
          <h1 ref={head}
              className="font-display max-w-[15ch] text-[clamp(2.5rem,6.5vw,5.5rem)]
                         leading-[0.95] tracking-[-0.02em]">
            I build the web people actually buy through.
          </h1>

          <div data-hero-rule className="my-8 h-px max-w-[60ch] origin-left bg-hairline" />

          <div className="max-w-[62ch] space-y-4">
            <p data-hero-line className="text-xl leading-snug md:text-2xl">
              Checkouts, loyalty points, CRM back offices — in{' '}
              <span className="text-brass">.NET</span> and{' '}
              <span className="text-brass">Angular</span>.
            </p>
            <p data-hero-line className="text-muted">
              Carrier webhooks, B2B stock, installation tickets, CRM portals. Most of what
              follows is work for real customers; the last one is mine.
            </p>
          </div>
        </div>

        <Domains />
      </div>
    </header>
  )
}

/* Ẩn dưới xl: trên điện thoại khối danh tính đã chiếm gần hết màn hình đầu,
   thêm nữa là đẩy câu tuyên bố xuống quá sâu. */
function Domains() {
  return (
    <div data-hero-line className="mt-14 hidden xl:mt-0 xl:block">
      <p className="eyebrow hairline-t pt-3">Domains shipped in</p>
      <ul className="mt-3 space-y-1.5">
        {DOMAINS.map(d => (
          <li key={d} className="text-muted flex gap-2.5 text-sm leading-snug">
            <span aria-hidden className="bg-brass mt-2 h-px w-2.5 shrink-0" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
