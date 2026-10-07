# Chien NM — Portfolio

Trang cá nhân của Chien NM, Full-stack Web Developer. React 19 + Vite + Tailwind v4 + GSAP.

Bố cục và hệ thống chuyển động dựa trên [tritdx-portfolio](https://github.com/TriTran1911/tritdx-portfolio) của Tri Tran; toàn bộ nội dung, sơ đồ và tài sản cá nhân đã được thay bằng của Chien NM.

## Chạy

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # ra dist/
```

## Sửa nội dung

Chỉ sửa `src/lib/data.ts` (kinh nghiệm, dự án, kỹ năng, liên hệ). Muốn hiện ảnh đại diện thì đặt `public/portrait.jpg`; hiện LinkedIn / số điện thoại / CV thì điền trong `CONTACT`.

Sơ đồ mục 03 nằm ở `src/sections/Flow.tsx`.

## Deploy

Site tĩnh. Cloudflare Pages hoặc GitHub Pages: build command `npm run build`, output `dist`. File `public/_headers` dành cho Cloudflare Pages.

## Chuyển động

Mọi animation đi qua `motionSafe()` trong `src/lib/motion.ts`; người bật "giảm chuyển động" nhận trạng thái cuối ngay lập tức. `index.html` có khối `<noscript>` ép hiện lại nội dung khi không có JS.
