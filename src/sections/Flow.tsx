import { useEffect, useRef } from 'react'
import { gsap, motionSafe, ScrollTrigger } from '../lib/motion.ts'

/* Một webhook giao hàng từ hãng vận chuyển đi vào UShop. Sơ đồ rút gọn từ phần
 * sửa webhook VNPost: khoá applock để các instance không xử lý trùng.
 *
 * Bản trước ghim mục này lại và gắn tiến trình vào vị trí cuộn (scrub). Cuộn
 * ngược lên là gói tin chạy giật lùi và các dòng log biến mất — trông như lỗi
 * render. Cách đó còn thêm 220% chiều cao cuộn giả chỉ để xem một hình.
 * Giờ chỉ chạy một lần khi lọt vào màn hình rồi đứng yên. */
export function Flow() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    return motionSafe(
      () => {
        const tl = gsap.timeline({ paused: true })

        tl.from('[data-node]', { opacity: 0, y: 18, duration: 0.4, stagger: 0.12 })

        // Gói tin đi bằng toạ độ cx thay vì MotionPath: đường đi là đường thẳng
        // nên không cần thêm plugin nào.
        tl.fromTo('[data-packet]',
          { attr: { cx: 88 }, opacity: 0 },
          { attr: { cx: 300 }, opacity: 1, duration: 0.9, ease: 'none' }, 0.4)
          .to('[data-packet]', { attr: { cx: 512 }, duration: 0.9, ease: 'none' })
          .to('[data-packet]', { opacity: 0, duration: 0.2 })
          .from('[data-logrow]', { opacity: 0, x: -14, duration: 0.4, stagger: 0.18 }, '-=0.3')
          .from('[data-caption]', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4')

        // Chạy đúng một lần khi mục lọt vào màn hình, rồi đứng ở trạng thái
        // cuối vĩnh viễn. Cuộn ngược lên không đụng gì tới nó.
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 70%',
          once: true,
          onEnter: () => tl.play(),
        })

        return () => { st.kill(); tl.kill() }
      },
      () => {
        // Giảm chuyển động: hiện luôn trạng thái cuối, không ghim, không cuộn giả.
        gsap.set('[data-node], [data-logrow], [data-caption]', { opacity: 1, y: 0, x: 0 })
        gsap.set('[data-packet]', { opacity: 0 })
      },
    )
  }, [])

  return (
    <div ref={root} id="flow" className="px-6 py-24 md:px-12">
      <p className="eyebrow mb-8">03 — how a delivery webhook lands</p>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 640 260" className="block h-auto w-full min-w-[560px]"
             role="img" aria-label="A carrier webhook travels through a locked handler into UShop, and each item is logged as applied, de-duplicated or ignored">
          <line data-wire x1="88" y1="70" x2="552" y2="70"
                stroke="var(--color-hairline)" strokeWidth="1.5" />

          <g data-node>
            <rect x="16" y="46" width="72" height="48" rx="6"
                  fill="var(--color-surface)" stroke="var(--color-hairline)" />
            <text x="52" y="76" textAnchor="middle" fill="var(--color-bone)"
                  style={{ font: '500 12px var(--font-sans)' }}>carrier</text>
          </g>

          <g data-node>
            <rect x="252" y="40" width="96" height="60" rx="6"
                  fill="var(--color-surface-2)" stroke="var(--color-brass)" />
            <text x="300" y="66" textAnchor="middle" fill="var(--color-brass)"
                  style={{ font: '500 12px var(--font-sans)' }}>handler</text>
            <text x="300" y="84" textAnchor="middle" fill="var(--color-faint)"
                  style={{ font: '400 10px var(--font-mono)' }}>applock · dedup</text>
          </g>

          <g data-node>
            <rect x="552" y="46" width="76" height="48" rx="6"
                  fill="var(--color-surface)" stroke="var(--color-hairline)" />
            <text x="590" y="70" textAnchor="middle" fill="var(--color-bone)"
                  style={{ font: '500 12px var(--font-sans)' }}>UShop</text>
            <text x="590" y="85" textAnchor="middle" fill="var(--color-faint)"
                  style={{ font: '400 10px var(--font-mono)' }}>order status</text>
          </g>

          <circle data-packet cx="88" cy="70" r="5" fill="var(--color-brass)" />

          <line x1="300" y1="100" x2="300" y2="132"
                stroke="var(--color-hairline)" strokeWidth="1.5" strokeDasharray="3 4" />

          {[
            ['200', 'POST /webhook  status 14 Delivered', 'applied'],
            ['200', 'POST /webhook  repeated call', 'dedup'],
            ['200', 'POST /webhook  foreign SaleOrderCode', 'ignored'],
          ].map(([code, path, ms], i) => (
            <g data-logrow key={path}>
              <rect x="120" y={140 + i * 34} width="400" height="26" rx="4"
                    fill="var(--color-surface)" stroke="var(--color-hairline)" />
              <text x="134" y={157 + i * 34}
                    fill={code === '500' ? 'var(--color-rust)' : 'var(--color-brass)'}
                    style={{ font: '500 11px var(--font-mono)' }}>{code}</text>
              <text x="170" y={157 + i * 34} fill="var(--color-bone)"
                    style={{ font: '400 11px var(--font-mono)' }}>{path}</text>
              <text x="504" y={157 + i * 34} textAnchor="end" fill="var(--color-faint)"
                    style={{ font: '400 11px var(--font-mono)' }}>{ms}</text>
            </g>
          ))}
        </svg>
      </div>

      <p data-caption className="text-muted mt-10 max-w-[60ch] text-sm leading-relaxed">
        A simplified view of a fix I made on UShop. The carrier can call the same webhook
        more than once, and several app instances can receive it at the same time. A SQL
        Server application lock serialises the status update, repeated calls are
        recognised, and items that belong to another order source are skipped — so a
        customer gets one delivery notification, not three.
      </p>
    </div>
  )
}
