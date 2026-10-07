/* Âm thanh nền tổng hợp bằng Web Audio — không có file mp3 nào, nên không tốn
   băng thông và không dính bản quyền. Mỗi "track" là một tổ hợp lớp âm:
   gió, mưa, chim, tiếng gõ phím, dế, drone.

   Trình duyệt chỉ cho phát sau một cú chạm của người dùng, nên AudioContext
   được tạo trong start(), không tạo sẵn. */

type Nodes = { ctx: AudioContext; master: GainNode; timers: number[]; noise: AudioBuffer }

export interface Track { name: string; hint: string; build: (n: Nodes) => void }

const rand = (a: number, b: number) => a + Math.random() * (b - a)

function noiseBuffer(ctx: AudioContext) {
  const len = ctx.sampleRate * 2
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  return buf
}

/** Nguồn nhiễu lặp qua một bộ lọc. */
function filteredNoise(n: Nodes, type: BiquadFilterType, freq: number, gain: number, q = 0.7) {
  const src = n.ctx.createBufferSource()
  src.buffer = n.noise
  src.loop = true
  const f = n.ctx.createBiquadFilter()
  f.type = type
  f.frequency.value = freq
  f.Q.value = q
  const g = n.ctx.createGain()
  g.gain.value = gain
  src.connect(f).connect(g).connect(n.master)
  src.start()
  return { f, g }
}

function lfo(n: Nodes, rate: number, depth: number, target: AudioParam) {
  const o = n.ctx.createOscillator()
  o.frequency.value = rate
  const g = n.ctx.createGain()
  g.gain.value = depth
  o.connect(g).connect(target)
  o.start()
}

/** Chạy fn lặp lại ở những khoảng thời gian ngẫu nhiên cho tới khi dừng. */
function every(n: Nodes, min: number, max: number, fn: () => void) {
  const tick = () => {
    fn()
    n.timers.push(window.setTimeout(tick, rand(min, max) * 1000))
  }
  n.timers.push(window.setTimeout(tick, rand(min, max) * 1000))
}

function wind(n: Nodes, level: number) {
  const { f, g } = filteredNoise(n, 'lowpass', 420, level)
  lfo(n, 0.07, level * 0.6, g.gain)
  lfo(n, 0.05, 160, f.frequency)
}

function rain(n: Nodes, level: number) {
  filteredNoise(n, 'bandpass', 3200, level, 0.5)
  filteredNoise(n, 'highpass', 6000, level * 0.25)
  // giọt nước lẻ
  every(n, 0.15, 0.7, () => {
    const t = n.ctx.currentTime
    const src = n.ctx.createBufferSource()
    src.buffer = n.noise
    const f = n.ctx.createBiquadFilter()
    f.type = 'bandpass'
    f.frequency.value = rand(1800, 5200)
    f.Q.value = 6
    const g = n.ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(level * rand(0.5, 1.4), t + 0.004)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
    src.connect(f).connect(g).connect(n.master)
    src.start(t, rand(0, 1.5), 0.1)
  })
}

function birds(n: Nodes, min: number, max: number) {
  every(n, min, max, () => {
    const t0 = n.ctx.currentTime
    const base = rand(2200, 4200)
    const notes = Math.floor(rand(2, 5))
    for (let i = 0; i < notes; i++) {
      const t = t0 + i * rand(0.08, 0.14)
      const o = n.ctx.createOscillator()
      o.type = 'sine'
      o.frequency.setValueAtTime(base * rand(0.9, 1.1), t)
      o.frequency.exponentialRampToValueAtTime(base * rand(1.2, 1.6), t + 0.07)
      const g = n.ctx.createGain()
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.025, t + 0.015)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
      o.connect(g).connect(n.master)
      o.start(t)
      o.stop(t + 0.1)
    }
  })
}

/** Tiếng gõ phím: từng cụm 4–12 phím, nghỉ giữa các cụm. */
function typing(n: Nodes, level: number) {
  const key = (t: number) => {
    const src = n.ctx.createBufferSource()
    src.buffer = n.noise
    const f = n.ctx.createBiquadFilter()
    f.type = 'bandpass'
    f.frequency.value = rand(1500, 3200)
    f.Q.value = 2.5
    const g = n.ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(level * rand(0.6, 1.2), t + 0.002)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045)
    src.connect(f).connect(g).connect(n.master)
    src.start(t, rand(0, 1.5), 0.06)
  }
  every(n, 2.5, 7, () => {
    const t0 = n.ctx.currentTime
    const count = Math.floor(rand(4, 12))
    let t = t0
    for (let i = 0; i < count; i++) {
      t += rand(0.07, 0.2)
      key(t)
    }
  })
}

function crickets(n: Nodes, hz: number, pulse: number) {
  const o = n.ctx.createOscillator()
  o.type = 'sine'
  o.frequency.value = hz
  const g = n.ctx.createGain()
  g.gain.value = 0
  o.connect(g).connect(n.master)
  // chớp bật/tắt nhanh để thành tiếng "rrr"
  const am = n.ctx.createOscillator()
  am.type = 'square'
  am.frequency.value = pulse
  const ag = n.ctx.createGain()
  ag.gain.value = 0.006
  am.connect(ag).connect(g.gain)
  const bias = n.ctx.createConstantSource()
  bias.offset.value = 0.006
  bias.connect(g.gain)
  o.start()
  am.start()
  bias.start()
}

/** Drone thấp để tập trung: hai sóng lệch nhẹ và bộ lọc chậm. */
function drone(n: Nodes) {
  const f = n.ctx.createBiquadFilter()
  f.type = 'lowpass'
  f.frequency.value = 500
  const g = n.ctx.createGain()
  g.gain.value = 0.05
  f.connect(g).connect(n.master)
  for (const hz of [55, 55.4, 82.4, 110.2]) {
    const o = n.ctx.createOscillator()
    o.type = 'triangle'
    o.frequency.value = hz
    const og = n.ctx.createGain()
    og.gain.value = hz < 90 ? 0.5 : 0.22
    o.connect(og).connect(f)
    o.start()
  }
  lfo(n, 0.04, 220, f.frequency)
}

export const TRACKS: Track[] = [
  { name: 'coding in the rain', hint: 'rain · keyboard', build: n => { rain(n, 0.05); wind(n, 0.04); typing(n, 0.16) } },
  { name: 'morning forest', hint: 'wind · birds', build: n => { wind(n, 0.12); birds(n, 1.5, 5.5) } },
  { name: 'rain on the window', hint: 'rain', build: n => { rain(n, 0.09); wind(n, 0.05) } },
  { name: 'night crickets', hint: 'crickets · wind', build: n => { wind(n, 0.06); crickets(n, 4150, 26); crickets(n, 4650, 31) } },
  { name: 'deep focus', hint: 'drone', build: n => { drone(n); wind(n, 0.02) } },
]

export interface Engine { stop: () => void }

export function start(track: Track): Engine {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ctx = new Ctx()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)
  const nodes: Nodes = { ctx, master, timers: [], noise: noiseBuffer(ctx) }
  track.build(nodes)
  master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 1.2) // fade in

  return {
    stop() {
      nodes.timers.forEach(clearTimeout)
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
      window.setTimeout(() => void ctx.close(), 350)
    },
  }
}
