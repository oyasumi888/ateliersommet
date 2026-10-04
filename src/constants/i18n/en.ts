import type { Dictionary } from '@/types'

export const en: Dictionary = {
  meta: {
    title: 'Atelier Sommet — High-conversion web, technical SEO & bespoke software',
    description:
      'Atelier Sommet is a software development and technical marketing agency building high-converting landing pages, technical SEO & analytics, and bespoke ERP systems.',
  },

  common: {
    skipToContent: 'Skip to content',
    tagline: 'Engineering-grade marketing & software',
    responseTime: 'Within 1 business day',
    switchTheme: (next) => `Switch to ${next} theme`,
    languageButton: 'ES',
    switchLanguage: 'Ver en español',
  },

  nav: {
    links: { services: 'Services', demo: 'Capabilities', about: 'About', contact: 'Contact' },
    primaryLabel: 'Primary',
    mobileLabel: 'Mobile',
    bookCall: 'Book a call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'home',
  },

  hero: {
    eyebrow: 'Software & technical marketing agency',
    headline: 'Websites that convert. Software that scales.',
    subheadline:
      'We build high-converting landing pages, fix the technical SEO and analytics behind your growth, and engineer bespoke software that runs your operations — with the rigor of a product team.',
    primaryCta: 'Start a project',
    secondaryCta: 'Explore services',
    trustLine: 'Fixed-scope proposals · Software engineers only · You own all the code',
  },

  services: {
    eyebrow: 'What we do',
    title: 'Three disciplines. One accountable team.',
    description:
      'Most growth problems sit between marketing and engineering. We cover both sides, so nothing gets lost in the handoff.',
    tablistLabel: 'Services',
    deliverables: 'Deliverables',
    typicalStack: 'Typical stack',
    discuss: (service) => `Discuss your ${service} project`,
    items: {
      web: {
        shortTitle: 'High-Conversion Web',
        title: 'High-Conversion Web',
        summary:
          'Landing pages and marketing sites engineered for speed and persuasion. We design around your funnel, build on a modern stack, and keep it fast long after launch.',
        features: [
          {
            title: 'Conversion-led landing pages',
            description: 'Message hierarchy, offer framing and CTA placement driven by your funnel data — not templates.',
          },
          {
            title: 'Performance engineering',
            description: 'Core Web Vitals in the green: optimized media, code-splitting, edge caching and lean bundles.',
          },
          {
            title: 'Care & maintenance plans',
            description: 'Monthly updates, uptime monitoring, security patches and A/B iteration on a predictable retainer.',
          },
        ],
        deliverables: [
          'UX wireframes & UI design',
          'Responsive build (React / Next.js / Astro)',
          'CMS integration',
          'A/B testing setup',
          'Uptime & performance monitoring',
        ],
        metric: { value: '< 1.2s', label: 'median LCP on shipped pages' },
      },
      seo: {
        shortTitle: 'Technical SEO & Analytics',
        title: 'Technical SEO & Analytics',
        summary:
          'Data-driven growth starts with a healthy site and trustworthy numbers. We fix what search engines trip over and instrument what your team actually needs to measure.',
        features: [
          {
            title: 'Technical audits & site health',
            description:
              'Crawlability, indexation, structured data, internal linking and Core Web Vitals — prioritized by impact.',
          },
          {
            title: 'Analytics & tracking architecture',
            description: 'GA4, server-side tagging, consent mode and clean event schemas your team can trust.',
          },
          {
            title: 'Growth dashboards',
            description: 'Looker Studio or custom dashboards connecting traffic, leads and revenue in one view.',
          },
        ],
        deliverables: [
          'Technical SEO audit & roadmap',
          'Schema.org structured data',
          'GA4 / GTM implementation',
          'Conversion tracking & attribution',
          'Monthly reporting',
        ],
        metric: { value: '+62%', label: 'avg. organic sessions after 6 months' },
      },
      software: {
        shortTitle: 'Bespoke Software & ERP',
        title: 'Bespoke Software & ERP Systems',
        summary:
          'Custom business automation and internal tools built around how your company really works — replacing spreadsheets, glue scripts and tools that almost fit.',
        features: [
          {
            title: 'Tailored ERP modules',
            description:
              'Inventory, orders, invoicing, HR or production planning — scoped to your process, integrated with your stack.',
          },
          {
            title: 'Workflow automation',
            description: 'Integrations and background jobs that eliminate copy-paste work between your systems.',
          },
          {
            title: 'Internal tools & portals',
            description: 'Admin panels, client portals and dashboards with roles, audit logs and secure access.',
          },
        ],
        deliverables: [
          'Discovery & process mapping',
          'System architecture & data model',
          'Web application build',
          'Third-party integrations & APIs',
          'Training, docs & support',
        ],
        metric: { value: '20+ h', label: 'saved per employee each month' },
      },
    },
  },

  demo: {
    eyebrow: 'Capabilities',
    title: "Don't take our word for it — poke at it.",
    description:
      'This page is built with the same stack and standards we ship to clients. Try the live design-token switcher, or see how individual optimizations move Core Web Vitals.',
    chooseDemo: 'Choose a demo',
    themeLab: 'Theme lab',
    performanceLab: 'Performance lab',
    siteTheme: 'Site theme',
    siteThemeHint: 'Applies to the whole page and is remembered.',
    themes: { dark: 'Dark', light: 'Light' },
    accentToken: 'Accent token',
    accentHint: 'Swaps a single CSS variable.',
    cornerRadius: 'Corner radius',
    radii: { sharp: 'Sharp', soft: 'Soft', round: 'Round' },
    previewLabel: 'Theme preview',
    preview: {
      getStarted: 'Get started',
      badge: 'New · v2.0',
      headline: 'Know which campaigns actually pay off.',
      body: 'Server-side tracking, clean attribution and dashboards your CFO trusts.',
      startTrial: 'Start free trial',
      bookDemo: 'Book demo',
      channel: (n) => `Channel ${n}`,
    },
    optimizationsLegend: 'Optimizations',
    toggleOptimizations: 'Toggle optimizations',
    baseline: 'Baseline: a typical template site with unoptimized media and tag bloat.',
    optimizations: {
      images: { label: 'Modern images', detail: 'AVIF/WebP, responsive sizes, lazy loading' },
      split: { label: 'Code splitting', detail: 'Route-level chunks, tree-shaking' },
      third: { label: 'Third-party diet', detail: 'Defer tags, server-side tracking' },
      fonts: { label: 'Font strategy', detail: 'Subset, preload, size-adjust fallbacks' },
      edge: { label: 'Edge caching', detail: 'CDN, immutable assets, Brotli' },
    },
    metrics: {
      lcp: 'Largest Contentful Paint',
      tbt: 'Total Blocking Time',
      cls: 'Cumulative Layout Shift',
      weight: 'Page weight',
    },
    score: 'Performance',
    disclaimer:
      'Illustrative model based on typical audit results. We measure your real field data (CrUX) before quoting any gains.',
  },

  about: {
    eyebrow: 'About us',
    title: 'A small team of software engineers that treats marketing like engineering.',
    paragraphs: [
      'We are developers, designers and analysts who got tired of watching good businesses lose leads to slow pages, broken tracking and software that never quite fit. So we built an agency that works the way a strong product team does.',
      'Every engagement starts with measurement: what is converting, what is leaking, and what is costing your team hours. Then we ship in small, reviewable increments — typed code, automated checks, documented decisions — so you always know what you are paying for and you own everything we build.',
    ],
    howWeWork: 'How we work',
    team: 'The team',
    clientsSay: 'What clients say',
    /** TODO(launch): replace with real, verifiable numbers. */
    stats: [
      { value: '95+', label: 'Lighthouse performance target' },
      { value: '100%', label: 'Code ownership for clients' },
      { value: '< 24h', label: 'Response time' },
      { value: '3', label: 'Core disciplines, one team' },
    ],
    principles: {
      measure: {
        title: 'Measure first',
        description: 'Decisions come from your data — analytics, field performance and user behavior — not opinions.',
      },
      code: {
        title: 'Production-grade code',
        description: 'TypeScript, tests, code review and CI on every project, whether it is a landing page or an ERP.',
      },
      secure: {
        title: 'Secure by default',
        description: 'Least-privilege access, dependency hygiene and privacy-respecting analytics from day one.',
      },
      ownership: {
        title: 'No lock-in',
        description: 'You own the repositories, accounts and documentation. We stay because we add value.',
      },
    },
    /** TODO(launch): replace placeholder team members with real profiles. */
    members: [
      {
        name: 'Founder Name',
        role: 'Software Engineer & Founder',
        bio: 'Full-stack engineer focused on performance, architecture and business software.',
        initials: 'FN',
      },
      {
        name: 'Designer Name',
        role: 'Lead UI/UX Designer',
        bio: 'Designs conversion-focused interfaces and design systems that scale.',
        initials: 'DN',
      },
      {
        name: 'Analyst Name',
        role: 'Technical SEO & Analytics Lead',
        bio: 'Turns crawl data and analytics into prioritized growth roadmaps.',
        initials: 'AN',
      },
    ],
    /** Placeholder testimonials — replace with real, approved client quotes before launch. */
    testimonials: [
      {
        quote:
          'The new landing page loads instantly and our demo requests almost doubled in the first quarter. The handover docs were better than anything we had internally.',
        author: 'Client Name',
        role: 'Head of Marketing',
        company: 'B2B SaaS company',
        serviceId: 'web',
      },
      {
        quote:
          'They found indexation issues three previous agencies missed, and for the first time our analytics actually match our CRM.',
        author: 'Client Name',
        role: 'Growth Lead',
        company: 'E-commerce brand',
        serviceId: 'seo',
      },
      {
        quote:
          'Our order-to-invoice process went from four spreadsheets and a lot of copy-paste to one internal tool the whole team likes using.',
        author: 'Client Name',
        role: 'Operations Director',
        company: 'Manufacturing SME',
        serviceId: 'software',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: "Tell us what you're building.",
    description:
      'Share a few details and a software engineer, not a salesperson, will reply with next steps and, where it makes sense, a fixed-scope proposal.',
    emailUs: 'Email us',
    bookCall: 'Book a call',
    callUs: 'Call us',
    labels: { contact: 'Contact', email: 'Email', phone: 'Phone', location: 'Location', responseTime: 'Response time' },
    helpful:
      'Helpful to include: your company, what you need help with (web, SEO & analytics, or bespoke software), your timeline and, if you have one, a budget range.',
    privacyBefore: 'See our',
    privacyLink: 'privacy policy',
    privacyAfter: 'for how we handle your details.',
    devNote:
      'Dev note: no contact channel is configured. Set VITE_CONTACT_EMAIL, VITE_CONTACT_PHONE or VITE_CONTACT_BOOKING_URL in .env.local.',
    mailSubject: (site) => `Project enquiry: ${site}`,
    mailBody:
      'Hi,\n\nA few details about our project:\n\n- Company:\n- What we need help with:\n- Timeline:\n- Budget (optional):\n\nThanks!',
  },

  footer: {
    navigate: 'Navigate',
    services: 'Services',
    legal: 'Legal',
    rights: (year, site) => `© ${year} ${site}. All rights reserved.`,
    backToTop: 'Back to top',
  },

  legal: {
    links: { privacy: 'Privacy Policy', terms: 'Terms of Service', cookies: 'Cookie Policy' },
    backToSite: 'Back to site',
    documentsLabel: 'Legal documents',
    eyebrow: 'Legal',
    lastUpdated: 'Last updated',
    contactIntro: 'For questions about this policy or to exercise your rights, contact us:',
    contactFallbackBefore: 'You can also reach us through the channels listed in our',
    contactFallbackLink: 'contact section',
    contactLabels: { company: 'Company', email: 'Email', phone: 'Phone', address: 'Address' },
  },
}
