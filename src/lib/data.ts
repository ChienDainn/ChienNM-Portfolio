/* Nội dung tách khỏi giao diện: sửa CV sau này chỉ sửa file này.
   Các con số lấy từ chính repo trên máy (đếm plugin, đếm commit), không phỏng đoán. */

export interface Role {
  company: string
  title: string
  place: string
  /** Bỏ trống nếu chưa muốn ghi ngày bắt đầu. */
  from: string
  to: string
  note: string
}

export const ROLES: Role[] = [
  {
    company: 'Utop',
    title: 'Web Developer',
    place: 'Vietnam',
    from: '',
    to: 'Present',
    note: 'Build and maintain e-commerce, loyalty and CRM systems for retail and enterprise customers — from the API and database to Angular admin portals and the CI/CD pipelines that ship them.',
  },
]

export interface Project {
  name: string
  client: string
  kind: string
  runtime?: string
  links?: { ios?: string; android?: string }
  embedded?: boolean
  repo?: string
  stack: string[]
  summary: string
  did: string[]
  scale?: string
  parts?: { name: string; note: string }[]
}

export const WORK: Project[] = [
  {
    name: 'UShop',
    client: 'Utop',
    kind: 'B2C e-commerce — carrier webhooks and logistics',
    runtime: 'nopCommerce 4.20 · ASP.NET Core',
    stack: ['C#', 'nopCommerce', 'SQL Server', 'Razor', 'Docker'],
    summary:
      'A Vietnamese online store on nopCommerce with a large in-house plugin set — payment gateways, couriers, e-invoicing. A long-lived codebase with thousands of commits from a team; my work is maintenance and reliability on the logistics side.',
    did: [
      'VNPost delivery webhooks: stopped duplicate Zalo/SMS failure notifications, and serialised status updates across app instances with SQL Server sp_getapplock',
      'Ignored webhook items with a missing or foreign SaleOrderCode; added diagnostic logging',
      'ViettelPost: fixed the token request, sent unit_of_measures from product detail, parsed quantity as decimal',
      'Per-store setting to hide order ratings on order history; Store column in the order Excel export',
    ],
    scale: '54 commits · Aug–Oct 2026',
  },
  {
    name: 'UShop B2B',
    client: 'Utop',
    kind: 'Wholesale stock on the same codebase',
    runtime: 'nopCommerce 4.20 · ASP.NET Core',
    stack: ['C#', 'nopCommerce', 'Razor', 'SQL Server'],
    summary:
      'Wholesale customers share the UShop codebase but draw from a separate B2B stock pool. I built that pool end to end.',
    did: [
      'Added a B2B quantity to ProductWarehouseInventory — domain, admin model and view',
      'Validation and popups on product save when B2B stock goes negative or exceeds available stock',
      'Deducted B2B stock when a wholesale order is placed and when a wholesale shipment ships; applied the split to storefront stock',
      'Touched ProductService, OrderProcessingService and ShoppingCartService, behind pull requests and a revert/reapply release cycle',
    ],
    scale: '38 commits',
  },
  {
    name: 'FPT CX Suite',
    client: 'Utop',
    kind: 'Multi-tenant CRM / CX on microservices',
    runtime: '.NET 9 · ABP 9.3 · Angular 20',
    stack: ['.NET 9', 'ABP', 'Angular 20', 'PostgreSQL', 'RabbitMQ', 'Redis', 'Elasticsearch', 'OpenIddict'],
    summary:
      'A SaaS CRM and customer-experience platform: about 15 services behind web and mobile YARP gateways, CRM core, marketing, CDP, chat and an integration hub. The main deployment is a healthcare CRM — patient records, appointments, leads.',
    did: [
      'CRM core: medical-record validation, treatment orders, appointment auto-fill and time display, customer detail, timezone fixes',
      'Auth: LDAP forgot/reset-password flow, HRM and LDAP user sync screens',
      'Marketing: Facebook Ads update, landing-page connections and their permissions, raw-lead Excel export',
      'IntegrationHub: ticket event handling with HIS sync, logging and booking payloads sent to the hospital system',
    ],
    scale: '1,944 commits · 971 non-merge · Jul 2025 – Jun 2026',
  },
  {
    name: 'GEIC',
    client: 'Utop',
    kind: 'Installation ticketing, notifications and integrations',
    runtime: '.NET 9 · ABP 9.3 · Angular 18 · React Native',
    stack: ['.NET 9', 'ABP', 'Angular', 'React Native', 'Helm', 'Docker'],
    summary:
      'A dealer-installation programme built on the same ABP suite: web portals for admins and dealers, a mobile app for technicians, and an integration layer to enterprise systems.',
    did: [
      'Installation tickets: multi-select filters, rescheduling with pause reason and code, acceptance record treated as a contract appendix, accessory and serial extraction, export',
      'Notifications: technician assignment alerts, idempotent handling and de-duplication, device-token logout fixes',
      'CaseCRM package upgrade / downgrade APIs and the Angular flow with manual signing',
      'IntegrationHub request and response contracts for the ticketing partner and portal orders',
    ],
    scale: '791 commits',
  },
  {
    name: 'CLD Loyalty',
    client: 'Utop',
    kind: 'Multi-merchant loyalty platform and portal',
    runtime: '.NET 9 · ABP 9.3 · Angular 14',
    stack: ['.NET 9', 'ABP', 'PostgreSQL', 'Angular 14', 'Quartz', 'Azure DevOps'],
    summary:
      'A large loyalty and engagement platform: a dozen services, eleven gateways, per-service job hosts and an Angular admin portal, with many contributors. I joined recently for focused fixes and features.',
    did: [
      'Partner Referral column and search-by option in the Engagement Slot list',
      'Enriched member tier names in paged member queries',
      'Excel exports for submissions and engagement registrations converted to the client’s timezone',
    ],
    scale: '7 commits · Sep 2026',
  },
  {
    name: 'MAISON Loyalty',
    client: 'Utop',
    kind: 'Loyalty, cashback and point-validity platform',
    runtime: 'ABP Zero · .NET Core · Angular · Kubernetes',
    stack: ['.NET Core', 'ABP Zero', 'Angular', 'RabbitMQ', 'Typesense', 'k6', 'Helm'],
    summary:
      'A loyalty backend with a back-office portal, mobile API, RabbitMQ consumer and Hangfire agent jobs, deployed through Helm and ArgoCD.',
    did: [
      'k6 load test for the purchase-agent cashback API: ramp from 10 to 400 virtual users, thresholds on p95 latency and failure rate',
      'Review of the two-level address migration (province → ward) for every address API the mobile app calls, including an N+1 request pattern',
      'Typesense search documentation and web-versus-app filter rules',
      'Point-expiry (coin validity) task breakdowns and a local service launcher',
    ],
  },
]

export const BUILDS: Project[] = [
  {
    name: 'Reactivities',
    client: 'Mine — learning project',
    kind: 'Social events app',
    stack: ['.NET 9', 'React 19', 'EF Core', 'Docker'],
    summary:
      'Built while learning clean architecture: a .NET 9 API split into Domain, Application, Persistence and Infrastructure, with a React 19 client.',
    did: [
      'Clean-architecture solution with a separate Domain layer',
      'React 19 client talking to the API',
      'Docker compose dev setup',
    ],
  },
]

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['C#', '.NET 9', 'ASP.NET Core', 'ABP Framework', 'EF Core', 'MassTransit', 'RabbitMQ'] },
  { group: 'Frontend', items: ['Angular', 'React', 'TypeScript', 'Tailwind CSS', 'Razor'] },
  { group: 'Data', items: ['SQL Server', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Typesense'] },
  { group: 'Shipping', items: ['Docker', 'Kubernetes / Helm', 'Azure DevOps', 'GitLab CI', 'Git'] },
]

/** Để trống thì Sidebar tự ẩn mục Education. */
export const EDUCATION: { school: string; detail: string; place: string; years: string }[] = []

export const CONTACT = {
  github: 'github.com/ChienDainn',
  /** Điền 'linkedin.com/in/...' để hiện icon. */
  linkedin: '',
  /** Đặt file vào public/ rồi điền, ví dụ '/chiennm-cv.pdf'. */
  cv: '',
  email: 'chiennm@utop.io',
  /** Điền số điện thoại để hiện icon. */
  phone: '',
  city: 'Vietnam',
  languages: 'Vietnamese · English',
}

export const NAME = 'Chien NM'
export const TITLE = 'Full-stack Web Developer'
export const INITIALS = 'CN'

export const ABOUT =
  'Web developer at Utop. E-commerce, loyalty and CRM back offices — the web ' +
  'systems people actually transact through. I work across .NET, ABP and ' +
  'nopCommerce backends and Angular portals, mostly inside large codebases ' +
  'with many hands: find the cause, fix it safely, ship it.'

export const FOCUS: string[] = [
  'Backend services — .NET, ABP, nopCommerce',
  'Webhooks, logistics and integrations',
  'Admin portals in Angular',
  'CI/CD and Kubernetes delivery',
]

/* Rút từ chính WORK phía trên: UShop (bán lẻ), CLD/MAISON (loyalty),
   FPT CX (CRM y tế), GEIC (lắp đặt). */
export const DOMAINS: string[] = [
  'Retail e-commerce',
  'Loyalty & rewards',
  'Logistics',
  'Healthcare CRM',
  'Installation & field service',
]
