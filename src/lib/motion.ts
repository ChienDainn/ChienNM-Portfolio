import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

/* Chỉ có ở bản dev: mở gsap ra window để kiểm bằng devtools — ví dụ
   `__gsap.globalTimeline.progress(1)` để nhảy tới trạng thái cuối. Bản build
   không có dòng này (Vite loại bỏ theo import.meta.env.DEV). */
if (import.meta.env.DEV) {
  ;(window as unknown as Record<string, unknown>).__gsap = gsap
}

/** Mọi animation không thiết yếu đi qua đây. Người bật "giảm chuyển động" thì
 *  nhận luôn trạng thái cuối, không phải bản animation chạy nhanh hơn. */
export function motionSafe(build: () => void, fallback?: () => void) {
  const mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    build()
  })
  mm.add('(prefers-reduced-motion: reduce)', () => {
    fallback?.()
  })
  return () => mm.revert()
}

/** Hiện dần khi cuộn tới. Độ dịch nhỏ (24px) để đọc như một lần mờ dần chứ
 *  không phải một cú trượt — trượt nhiều là mệt mắt trên trang dài. */
export function revealChildren(el: HTMLElement, stagger = 0.08) {
  return gsap.from(el.children, {
    opacity: 0,
    y: 24,
    duration: 0.5,
    stagger,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%' },
  })
}

export function revealSelf(el: HTMLElement) {
  return gsap.from(el, {
    opacity: 0,
    y: 12,
    duration: 0.35,
    ease: 'power1.out',
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
  })
}
