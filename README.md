# Chien NM — Portfolio

Portfolio một trang của Chien NM, Full-stack Web Developer (.NET / ABP, nopCommerce, Angular, React).

## Tech stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- GSAP (hiệu ứng reveal, tôn trọng `prefers-reduced-motion`)
- Fonts: Instrument Serif, Inter Tight, JetBrains Mono

## Cấu trúc

```
src/
  App.tsx        # layout và các section (Hero, Work, Skills, Contact)
  index.css      # theme Tailwind (màu, font) và lớp grain
  lib/data.ts    # TOÀN BỘ nội dung: profile, projects, skills
index.html
```

Muốn đổi nội dung (thông tin cá nhân, dự án, kỹ năng, link GitHub/LinkedIn) chỉ cần sửa `src/lib/data.ts`.

## Chạy local

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # output vào dist/
npm run preview  # xem thử bản build
```

## Deploy

Site tĩnh, deploy được lên Cloudflare Pages hoặc GitHub Pages:

- Build command: `npm run build`
- Output directory: `dist`
