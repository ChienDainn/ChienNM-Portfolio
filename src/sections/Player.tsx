import { useEffect, useRef, useState } from 'react'
import { start, TRACKS, type Engine } from '../lib/ambient.ts'

/* Trình phát âm thanh nền nhỏ ở góc dưới phải. Mặc định tắt: trình duyệt chặn
   tự phát, và người xem portfolio không muốn bị bật tiếng bất ngờ. */
export function Player() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const engine = useRef<Engine | null>(null)

  // Chạy lại mỗi khi đổi bài hoặc bật/tắt; cleanup dừng bài đang phát.
  useEffect(() => {
    if (!playing) return
    const track = TRACKS[idx]
    if (!track) return
    engine.current = start(track)
    return () => { engine.current?.stop(); engine.current = null }
  }, [playing, idx])

  const step = (d: number) => setIdx(i => (i + d + TRACKS.length) % TRACKS.length)
  const track = TRACKS[idx]

  const btn = 'text-faint hover:text-brass flex h-7 w-7 items-center justify-center rounded-sm transition-colors duration-200'

  return (
    <div role="group" aria-label="Ambient sound"
         className="bg-surface border-hairline fixed bottom-4 right-4 z-40 flex items-center gap-3
                    rounded-md border py-2 pl-3 pr-2 shadow-lg shadow-black/40">
      <div className="min-w-[8.5rem]">
        <p className="eyebrow">{playing ? 'Now playing' : 'Ambient'}</p>
        <p className="text-bone mt-0.5 text-xs leading-none">{track?.name}</p>
      </div>
      <div className="flex items-center">
        <button className={btn} onClick={() => step(-1)} aria-label="Previous sound">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden><path d="M3 3h1.5v10H3zM13 3v10L5.5 8z" /></svg>
        </button>
        <button className={`${btn} ${playing ? 'text-brass' : ''}`} onClick={() => setPlaying(p => !p)}
                aria-label={playing ? 'Pause ambient sound' : 'Play ambient sound'} aria-pressed={playing}>
          {playing ? (
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden><path d="M4 3h3v10H4zM9 3h3v10H9z" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden><path d="M4 2.5v11l9-5.5z" /></svg>
          )}
        </button>
        <button className={btn} onClick={() => step(1)} aria-label="Next sound">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden><path d="M11.500 3H13v10h-1.500zM3 3v10l7.500-5z" /></svg>
        </button>
      </div>
    </div>
  )
}
