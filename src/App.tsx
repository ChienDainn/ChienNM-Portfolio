import { useEffect } from 'react'
import { ScrollTrigger } from './lib/motion.ts'
import { Hero } from './sections/Hero.tsx'
import { Work } from './sections/Work.tsx'
import { Flow } from './sections/Flow.tsx'
import { Builds } from './sections/Builds.tsx'
import { Experience, Footer } from './sections/Rest.tsx'
import { Sidebar } from './sections/Sidebar.tsx'
import { Player } from './sections/Player.tsx'

export function App() {
  useEffect(() => {
    // Font web tải xong là chiều cao text đổi, mọi mốc ScrollTrigger lệch theo.
    // Đo lại một lần sau khi font sẵn sàng thay vì đoán bằng setTimeout.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <div className="grain" aria-hidden />
      <Player />
      {/* Chỉ hiện khi được focus bằng bàn phím — không chiếm chỗ khi dùng chuột. */}
      <a href="#experience"
         className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                    focus:rounded-sm focus:bg-brass focus:px-3 focus:py-2 focus:font-mono
                    focus:text-sm focus:text-ground">
        Skip to content
      </a>
      {/* Hai cột từ lg trở lên: trái là danh tính dính cố định, phải là nội dung
          cuộn. Dưới lg thì cột trái xếp lên trên như một khối thường. */}
      <div className="mx-auto max-w-[1500px] lg:grid lg:grid-cols-[minmax(280px,330px)_1fr]">
        <Sidebar />
        <main id="main" className="min-w-0">
          <Hero />
          <Experience />
          <Work />
          <Flow />
          <Builds />
          <Footer />
        </main>
      </div>
    </>
  )
}
