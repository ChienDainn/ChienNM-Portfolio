// Toàn bộ nội dung portfolio nằm ở đây — sửa file này là đủ.

export const profile = {
  name: 'Chien NM',
  role: 'Full-stack Web Developer',
  tagline: 'I build e-commerce, loyalty and CRM platforms that run in production.',
  intro:
    'Web developer at Utop, working across .NET / ABP microservices, nopCommerce, Angular and React. I ship payment and logistics integrations, admin portals and the pipelines behind them.',
  email: 'chiennm@utop.io',
  location: 'Vietnam',
  github: '', // điền link GitHub nếu muốn hiện
  linkedin: '', // điền link LinkedIn nếu muốn hiện
}

export type Project = {
  title: string
  kind: string
  summary: string
  highlights: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    title: 'UShop',
    kind: 'E-commerce / B2C',
    summary:
      'Vietnamese online store built on nopCommerce, extended with a large set of local payment, shipping and invoicing plugins.',
    highlights: [
      'Payment gateways: VnPay, Momo, ZaloPay, Airpay, Payoo, HDBank, Fundiin',
      'Logistics: ViettelPost, NhatTin, J&T, NinjaVan, Ship60, DHL',
      'E-invoice, one-touch ordering, Firebase push, product variants, REST API plugin',
      'Per-store settings such as hiding order ratings on order history',
    ],
    stack: ['ASP.NET Core', 'C#', 'nopCommerce', 'SQL Server', 'Docker'],
  },
  {
    title: 'UShop B2B',
    kind: 'E-commerce / Wholesale',
    summary:
      'Wholesale branch of UShop with its own B2B inventory, validated on save and deducted when a wholesale order is placed.',
    highlights: [
      'Separate B2B stock with validation and warning popups in the admin product page',
      'Wholesale order flow that deducts B2B stock',
      'Shares the payment and shipping plugin ecosystem with UShop',
    ],
    stack: ['ASP.NET Core', 'C#', 'nopCommerce', 'Razor', 'SQL Server'],
  },
  {
    title: 'CLD Loyalty Platform & Portal',
    kind: 'Loyalty / Multi-merchant',
    summary:
      'Loyalty system with member tiers, engagement slots, submissions and partner referrals, plus an Angular admin portal.',
    highlights: [
      'Engagement Slot list with Partner Referral column and search-by option',
      'Member tier enrichment in paged queries',
      'Excel exports with client-timezone conversion',
      'Azure DevOps pipelines and CI/CD',
    ],
    stack: ['.NET', 'ABP', 'Angular', 'Azure DevOps'],
  },
  {
    title: 'MAISON Loyalty',
    kind: 'Loyalty / Mobile & Web',
    summary:
      'Loyalty API, mobile API, background consumer and agent jobs, and an admin portal deployed on Kubernetes.',
    highlights: [
      'Loyalty API, Mobile API, message Consumer and Agent Job services',
      'Typesense-backed search and two-level address API review',
      'Helm / k8s manifests, nginx, e2e and load tests',
    ],
    stack: ['.NET', 'Angular', 'Kubernetes', 'Helm', 'Typesense'],
  },
  {
    title: 'FPT CX Suite',
    kind: 'CRM / CX / SaaS',
    summary:
      'Multi-tenant CRM and customer-experience platform built as microservices on ABP Framework.',
    highlights: [
      '1,900+ commits across SaaS modules and dynamic forms',
      'Event-driven integration with RabbitMQ, realtime features, Elasticsearch search',
      'OpenIddict auth, PostgreSQL, Redis, gateways for web and mobile',
    ],
    stack: ['.NET 9', 'ABP 9', 'Angular 20', 'PostgreSQL', 'RabbitMQ', 'Redis', 'Elasticsearch'],
  },
  {
    title: 'Utop CRM for Cadivi',
    kind: 'CRM / Enterprise',
    summary: 'Customer-relationship management system and portal for Cadivi, with Angular frontend and .NET backend.',
    highlights: ['CRM backend and Cadivi portal', 'Data migrations and database scripts', 'GitLab and Azure pipelines'],
    stack: ['.NET', 'Angular', 'SQL', 'Azure Pipelines'],
  },
  {
    title: 'Reactivities',
    kind: 'Learning project',
    summary: 'Social events app: clean-architecture .NET 9 API with a React 19 client.',
    highlights: ['Domain / Application / Persistence / Infrastructure layers', 'React 19 client', 'Docker compose dev setup'],
    stack: ['.NET 9', 'React 19', 'EF Core', 'Docker'],
  },
]

export const skills: Record<string, string[]> = {
  Backend: ['C#', '.NET 9', 'ASP.NET Core', 'ABP Framework', 'EF Core', 'MassTransit', 'RabbitMQ'],
  Frontend: ['Angular', 'React', 'TypeScript', 'Tailwind CSS', 'Razor'],
  Data: ['SQL Server', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Typesense'],
  'DevOps & Tools': ['Docker', 'Kubernetes / Helm', 'Azure DevOps', 'GitLab CI', 'Git'],
}
