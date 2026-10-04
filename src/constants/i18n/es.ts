import type { Dictionary } from '@/types'

export const es: Dictionary = {
  meta: {
    title: 'Atelier Sommet — Sitios web que convierten, SEO técnico y software a la medida',
    description:
      'Atelier Sommet es una agencia de desarrollo de software y marketing técnico: landing pages de alta conversión, SEO técnico y analítica, y sistemas ERP a la medida.',
  },

  common: {
    skipToContent: 'Saltar al contenido',
    tagline: 'Marketing y software con rigor de ingeniería',
    responseTime: 'En menos de 1 día hábil',
    switchTheme: (next) => `Cambiar al tema ${next === 'dark' ? 'oscuro' : 'claro'}`,
    languageButton: 'EN',
    switchLanguage: 'View in English',
  },

  nav: {
    links: { services: 'Servicios', demo: 'Capacidades', about: 'Nosotros', contact: 'Contacto' },
    primaryLabel: 'Principal',
    mobileLabel: 'Móvil',
    bookCall: 'Agenda una llamada',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    home: 'inicio',
  },

  hero: {
    eyebrow: 'Agencia de software y marketing técnico',
    headline: 'Sitios web que convierten. Software que escala.',
    subheadline:
      'Creamos landing pages de alta conversión, corregimos el SEO técnico y la analítica detrás de tu crecimiento, y desarrollamos software a la medida para operar tu negocio, con el rigor de un equipo de producto.',
    primaryCta: 'Inicia un proyecto',
    secondaryCta: 'Ver servicios',
    trustLine: 'Propuestas de alcance fijo · Solo ingenieros de software · El código es tuyo',
  },

  services: {
    eyebrow: 'Qué hacemos',
    title: 'Tres disciplinas. Un solo equipo responsable.',
    description:
      'La mayoría de los problemas de crecimiento están entre marketing e ingeniería. Cubrimos ambos lados para que nada se pierda en la entrega.',
    tablistLabel: 'Servicios',
    deliverables: 'Entregables',
    typicalStack: 'Stack habitual',
    discuss: (service) => `Hablemos de tu proyecto: ${service}`,
    items: {
      web: {
        shortTitle: 'Web de alta conversión',
        title: 'Web de alta conversión',
        summary:
          'Landing pages y sitios de marketing diseñados para la velocidad y la persuasión. Diseñamos en torno a tu embudo, construimos sobre un stack moderno y lo mantenemos rápido mucho después del lanzamiento.',
        features: [
          {
            title: 'Landing pages orientadas a conversión',
            description:
              'Jerarquía del mensaje, presentación de la oferta y ubicación de los CTA basadas en los datos de tu embudo, no en plantillas.',
          },
          {
            title: 'Ingeniería de rendimiento',
            description:
              'Core Web Vitals en verde: medios optimizados, división de código, caché en el edge y bundles ligeros.',
          },
          {
            title: 'Planes de soporte y mantenimiento',
            description:
              'Actualizaciones mensuales, monitoreo de disponibilidad, parches de seguridad e iteración A/B con una iguala predecible.',
          },
        ],
        deliverables: [
          'Wireframes UX y diseño UI',
          'Desarrollo responsivo (React / Next.js / Astro)',
          'Integración con CMS',
          'Configuración de pruebas A/B',
          'Monitoreo de disponibilidad y rendimiento',
        ],
        metric: { value: '< 1.2 s', label: 'LCP mediano en páginas entregadas' },
      },
      seo: {
        shortTitle: 'SEO técnico y analítica',
        title: 'SEO técnico y analítica',
        summary:
          'El crecimiento basado en datos empieza con un sitio sano y cifras confiables. Corregimos lo que frena a los buscadores y medimos lo que tu equipo realmente necesita.',
        features: [
          {
            title: 'Auditorías técnicas y salud del sitio',
            description:
              'Rastreo, indexación, datos estructurados, enlazado interno y Core Web Vitals, priorizados por impacto.',
          },
          {
            title: 'Arquitectura de analítica y medición',
            description:
              'GA4, etiquetado del lado del servidor, modo de consentimiento y esquemas de eventos limpios en los que tu equipo puede confiar.',
          },
          {
            title: 'Dashboards de crecimiento',
            description: 'Looker Studio o dashboards a la medida que conectan tráfico, leads e ingresos en una sola vista.',
          },
        ],
        deliverables: [
          'Auditoría de SEO técnico y hoja de ruta',
          'Datos estructurados Schema.org',
          'Implementación de GA4 / GTM',
          'Medición de conversiones y atribución',
          'Reportes mensuales',
        ],
        metric: { value: '+62%', label: 'sesiones orgánicas promedio a 6 meses' },
      },
      software: {
        shortTitle: 'Software a la medida y ERP',
        title: 'Software a la medida y sistemas ERP',
        summary:
          'Automatización y herramientas internas construidas según cómo funciona realmente tu empresa, para reemplazar hojas de cálculo, scripts improvisados y herramientas que casi encajan.',
        features: [
          {
            title: 'Módulos ERP a la medida',
            description:
              'Inventario, pedidos, facturación, RR. HH. o planeación de producción, adaptados a tu proceso e integrados con tus sistemas.',
          },
          {
            title: 'Automatización de flujos de trabajo',
            description: 'Integraciones y procesos en segundo plano que eliminan el copiar y pegar entre tus sistemas.',
          },
          {
            title: 'Herramientas internas y portales',
            description: 'Paneles de administración, portales de clientes y dashboards con roles, bitácoras y acceso seguro.',
          },
        ],
        deliverables: [
          'Descubrimiento y mapeo de procesos',
          'Arquitectura del sistema y modelo de datos',
          'Desarrollo de la aplicación web',
          'Integraciones con terceros y APIs',
          'Capacitación, documentación y soporte',
        ],
        metric: { value: '20+ h', label: 'ahorradas por empleado al mes' },
      },
    },
  },

  demo: {
    eyebrow: 'Capacidades',
    title: 'No nos creas a ciegas: pruébalo tú.',
    description:
      'Esta página está hecha con el mismo stack y los mismos estándares que entregamos a nuestros clientes. Prueba el selector de design tokens en vivo o mira cómo cada optimización mueve los Core Web Vitals.',
    chooseDemo: 'Elige una demo',
    themeLab: 'Laboratorio de tema',
    performanceLab: 'Laboratorio de rendimiento',
    siteTheme: 'Tema del sitio',
    siteThemeHint: 'Se aplica a toda la página y se recuerda.',
    themes: { dark: 'Oscuro', light: 'Claro' },
    accentToken: 'Token de acento',
    accentHint: 'Cambia una sola variable CSS.',
    cornerRadius: 'Radio de esquinas',
    radii: { sharp: 'Recto', soft: 'Suave', round: 'Redondo' },
    previewLabel: 'Vista previa del tema',
    preview: {
      getStarted: 'Comenzar',
      badge: 'Nuevo · v2.0',
      headline: 'Descubre qué campañas sí dan resultados.',
      body: 'Medición del lado del servidor, atribución limpia y dashboards en los que confía tu director financiero.',
      startTrial: 'Prueba gratis',
      bookDemo: 'Agenda una demo',
      channel: (n) => `Canal ${n}`,
    },
    optimizationsLegend: 'Optimizaciones',
    toggleOptimizations: 'Activa optimizaciones',
    baseline: 'Punto de partida: un sitio de plantilla típico con medios sin optimizar y exceso de etiquetas.',
    optimizations: {
      images: { label: 'Imágenes modernas', detail: 'AVIF/WebP, tamaños responsivos, carga diferida' },
      split: { label: 'División de código', detail: 'Chunks por ruta, tree-shaking' },
      third: { label: 'Dieta de terceros', detail: 'Etiquetas diferidas, medición en servidor' },
      fonts: { label: 'Estrategia de fuentes', detail: 'Subconjuntos, precarga, fallbacks con size-adjust' },
      edge: { label: 'Caché en el edge', detail: 'CDN, assets inmutables, Brotli' },
    },
    metrics: {
      lcp: 'Largest Contentful Paint',
      tbt: 'Total Blocking Time',
      cls: 'Cumulative Layout Shift',
      weight: 'Peso de la página',
    },
    score: 'Rendimiento',
    disclaimer:
      'Modelo ilustrativo basado en resultados típicos de auditoría. Medimos tus datos reales de campo (CrUX) antes de prometer cualquier mejora.',
  },

  about: {
    eyebrow: 'Nosotros',
    title: 'Un equipo pequeño de ingenieros de software que trata el marketing como ingeniería.',
    paragraphs: [
      'Somos desarrolladores, diseñadores y analistas cansados de ver buenos negocios perder clientes por páginas lentas, mediciones rotas y software que nunca terminaba de encajar. Así que creamos una agencia que trabaja como lo hace un buen equipo de producto.',
      'Cada proyecto empieza midiendo: qué convierte, dónde se pierde y qué le cuesta horas a tu equipo. Después entregamos en incrementos pequeños y revisables (código tipado, pruebas automáticas, decisiones documentadas) para que siempre sepas qué estás pagando y seas dueño de todo lo que construimos.',
    ],
    howWeWork: 'Cómo trabajamos',
    team: 'El equipo',
    clientsSay: 'Lo que dicen nuestros clientes',
    /** TODO(launch): replace with real, verifiable numbers. */
    stats: [
      { value: '95+', label: 'Meta de rendimiento en Lighthouse' },
      { value: '100%', label: 'Del código es del cliente' },
      { value: '< 24 h', label: 'Tiempo de respuesta' },
      { value: '3', label: 'Disciplinas, un solo equipo' },
    ],
    principles: {
      measure: {
        title: 'Primero medir',
        description:
          'Las decisiones salen de tus datos (analítica, rendimiento real y comportamiento de usuarios), no de opiniones.',
      },
      code: {
        title: 'Código de producción',
        description: 'TypeScript, pruebas, revisión de código y CI en cada proyecto, ya sea una landing page o un ERP.',
      },
      secure: {
        title: 'Seguro por defecto',
        description: 'Accesos mínimos necesarios, dependencias al día y analítica respetuosa de la privacidad desde el primer día.',
      },
      ownership: {
        title: 'Sin dependencia',
        description: 'Los repositorios, cuentas y documentación son tuyos. Nos quedamos porque aportamos valor.',
      },
    },
    /** Real team profiles go here; the block is hidden while the list is empty. */
    members: [],
    /** Only real, approved client quotes; the block is hidden while the list is empty. */
    testimonials: [],
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Cuéntanos qué estás construyendo.',
    description:
      'Compártenos algunos detalles y un ingeniero de software, no un vendedor, te responderá con los siguientes pasos y, cuando tenga sentido, una propuesta de alcance fijo.',
    emailUs: 'Escríbenos',
    bookCall: 'Agenda una llamada',
    callUs: 'Llámanos',
    labels: {
      contact: 'Contacto',
      email: 'Correo',
      phone: 'Teléfono',
      location: 'Ubicación',
      responseTime: 'Tiempo de respuesta',
    },
    helpful:
      'Es útil que incluyas: tu empresa, en qué necesitas ayuda (web, SEO y analítica, o software a la medida), tus tiempos y, si lo tienes, un rango de presupuesto.',
    privacyBefore: 'Consulta nuestro',
    privacyLink: 'aviso de privacidad',
    privacyAfter: 'para saber cómo tratamos tus datos.',
    devNote:
      'Nota de desarrollo: no hay ningún canal de contacto configurado. Define VITE_CONTACT_EMAIL, VITE_CONTACT_PHONE o VITE_CONTACT_BOOKING_URL en .env.local.',
    mailSubject: (site) => `Consulta de proyecto: ${site}`,
    mailBody:
      'Hola:\n\nAlgunos detalles de nuestro proyecto:\n\n- Empresa:\n- En qué necesitamos ayuda:\n- Tiempos:\n- Presupuesto (opcional):\n\n¡Gracias!',
  },

  footer: {
    navigate: 'Navegación',
    services: 'Servicios',
    legal: 'Legal',
    rights: (year, site) => `© ${year} ${site}. Todos los derechos reservados.`,
    backToTop: 'Volver arriba',
  },

  legal: {
    links: { privacy: 'Aviso de privacidad', terms: 'Términos de servicio', cookies: 'Política de cookies' },
    backToSite: 'Volver al sitio',
    documentsLabel: 'Documentos legales',
    eyebrow: 'Legal',
    lastUpdated: 'Última actualización',
    contactIntro: 'Si tienes preguntas sobre este documento o quieres ejercer tus derechos, contáctanos:',
    contactFallbackBefore: 'También puedes escribirnos por los medios que aparecen en nuestra',
    contactFallbackLink: 'sección de contacto',
    contactLabels: { company: 'Empresa', email: 'Correo', phone: 'Teléfono', address: 'Dirección' },
  },
}
