import type { LegalDocument } from '@/types'
import { SITE } from '../site'
import { ENTITY, JURISDICTION_SET, WEBSITE, type LegalContent } from './shared'

const JURISDICTION = JURISDICTION_SET || `el país en el que ${ENTITY} está establecida`

const PRIVACY_POLICY: LegalDocument = {
  id: 'privacy',
  title: 'Aviso de privacidad',
  description: `Cómo ${ENTITY} recaba, usa y protege los datos personales.`,
  intro: [
    `Este Aviso de privacidad explica cómo ${ENTITY} ("nosotros") trata los datos personales cuando usted visita ${WEBSITE} (el "Sitio") o se pone en contacto con nosotros. Recabamos el mínimo de datos posible: el Sitio no tiene formularios, cuentas de usuario, herramientas de analítica ni rastreadores publicitarios.`,
  ],
  sections: [
    {
      heading: 'Responsable del tratamiento',
      body: [
        `${ENTITY} es responsable del tratamiento de los datos personales descritos en este aviso. Puede contactarnos sobre cualquier tema de privacidad con los datos que aparecen al final de esta página.`,
        'Este aviso cubre el Sitio y las consultas que nos envíe. Los datos personales que tratamos al prestar servicios a nuestros clientes se rigen por el contrato firmado con cada cliente.',
      ],
    },
    {
      heading: 'Datos que recabamos',
      body: [
        'Datos que usted decide enviarnos. Cuando nos escribe, nos llama o agenda una reunión, recibimos los datos que nos proporciona, como su nombre, correo electrónico, teléfono, empresa y el contenido de su mensaje o las notas de la reunión.',
        'Datos técnicos. Como en cualquier sitio web, cada visita envía datos técnicos a nuestro proveedor de hosting para poder mostrar la página y protegerla contra abusos: dirección IP, tipo de navegador y dispositivo, la página solicitada, la página de procedencia, y la fecha y hora. Estos datos quedan en registros del servidor de corta duración. No los usamos para identificarle ni para crear perfiles. Las tipografías se sirven desde nuestro propio dominio, por lo que no se hace ninguna solicitud a servicios de fuentes de terceros como Google Fonts.',
        'Preferencias guardadas en su dispositivo. Si cambia entre el tema claro y el oscuro, o entre inglés y español, su elección se guarda en el almacenamiento local de su navegador con las claves "theme" y "lang". Nunca salen de su dispositivo ni se nos envían. Consulte nuestra Política de cookies para más detalles.',
        'No recabamos intencionalmente datos personales sensibles y le pedimos que no nos los envíe.',
      ],
    },
    {
      heading: 'Para qué usamos sus datos',
      body: [
        {
          list: [
            'Para responder a su consulta y agendar las llamadas que solicite.',
            'Para preparar propuestas y, si se convierte en cliente, para celebrar y cumplir nuestro contrato con usted.',
            'Para mantener el Sitio seguro, disponible y funcionando correctamente.',
            'Para cumplir nuestras obligaciones legales, contables y fiscales, y para ejercer o defender reclamaciones legales.',
          ],
        },
        'No vendemos ni rentamos sus datos personales, no los compartimos para publicidad conductual y no los usamos para tomar decisiones automatizadas ni para elaborar perfiles.',
      ],
    },
    {
      heading: 'Bases legales (EEE, Reino Unido y leyes similares)',
      body: [
        'Cuando aplican leyes de protección de datos como el RGPD o el RGPD del Reino Unido, nos basamos en las siguientes bases legales:',
        {
          list: [
            'Medidas precontractuales y ejecución de un contrato, cuando pregunta por nuestros servicios o los contrata.',
            'Interés legítimo, para responder mensajes generales, operar nuestro negocio y mantener el Sitio seguro, siempre que sus derechos no prevalezcan sobre dicho interés.',
            'Obligación legal, cuando debemos conservar registros o atender requerimientos legítimos de autoridades.',
            'Consentimiento, cuando se lo pedimos. Puede retirarlo en cualquier momento.',
          ],
        },
      ],
    },
    {
      heading: 'Con quién compartimos sus datos',
      body: [
        'Solo compartimos datos personales con proveedores que nos ayudan a operar, bajo contratos que les obligan a protegerlos:',
        {
          list: [
            'Vercel Inc., que aloja el Sitio y lo distribuye a través de su red global.',
            'Nuestros proveedores de correo, calendario y agenda, que almacenan los mensajes y citas que nos envía.',
            'Asesores profesionales, como contadores y abogados, cuando sea necesario.',
          ],
        },
        'También podemos revelar datos si la ley lo exige, para proteger nuestros derechos o la seguridad de otras personas, o como parte de una fusión o venta de nuestro negocio, en cuyo caso este aviso seguirá aplicando.',
        'Si sigue un enlace a un servicio de terceros (por ejemplo, una página para agendar citas), el aviso de privacidad de ese servicio aplica a lo que comparta allí.',
      ],
    },
    {
      heading: 'Transferencias internacionales',
      body: [
        'Nuestros proveedores pueden tratar datos en países distintos al suyo, incluidos los Estados Unidos. Cuando se requiere, estas transferencias están protegidas con garantías adecuadas, como las Cláusulas Contractuales Tipo de la Comisión Europea o una decisión de adecuación.',
      ],
    },
    {
      heading: 'Cuánto tiempo conservamos sus datos',
      body: [
        {
          list: [
            'Consultas que no se convierten en proyecto: hasta 24 meses después de nuestro último intercambio; después se eliminan.',
            'Registros de clientes y contratos: durante el tiempo que exija la ley (a menudo de 5 a 10 años para registros contables).',
            'Registros del hosting: durante el periodo limitado que fija nuestro proveedor de hosting por motivos de seguridad y diagnóstico.',
          ],
        },
      ],
    },
    {
      heading: 'Sus derechos',
      body: [
        'Según el lugar donde viva, puede tener derecho a acceder a los datos personales que tenemos sobre usted, rectificarlos, cancelarlos o solicitar su eliminación, oponerse a su uso o limitarlo (derechos ARCO), recibirlos en un formato portable y retirar cualquier consentimiento que haya otorgado.',
        'Si se encuentra en México, la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) le otorga los derechos de Acceso, Rectificación, Cancelación y Oposición (derechos ARCO), y también puede revocar su consentimiento o limitar el uso y la divulgación de sus datos. Para ejercerlos, envíe una solicitud a los datos de contacto que aparecen abajo con su nombre, un medio para responderle, copia de una identificación oficial y una descripción clara de los datos y del derecho que desea ejercer. Le responderemos dentro de los plazos que establece dicha ley.',
        'Los residentes de California y de otros estados de EE. UU. con leyes de privacidad tienen derecho a saber, eliminar y corregir sus datos personales, y a no ser discriminados por ejercer estos derechos. No vendemos ni compartimos datos personales en los términos que definen esas leyes.',
        'Para ejercer un derecho, contáctenos con los datos que aparecen abajo. Le responderemos en el plazo que marque la ley y es posible que primero necesitemos verificar su identidad. También tiene derecho a presentar una queja ante la autoridad de protección de datos de su país.',
      ],
    },
    {
      heading: 'Seguridad',
      body: [
        'El Sitio se sirve únicamente por HTTPS y limitamos el acceso a los datos personales a las personas que lo necesitan. Ningún método de transmisión o almacenamiento es completamente seguro, por lo que no podemos garantizar una seguridad absoluta, pero tomamos medidas razonables para proteger sus datos.',
      ],
    },
    {
      heading: 'Menores de edad',
      body: [
        'El Sitio está dirigido a empresas y no a menores de 16 años. No recabamos intencionalmente sus datos personales. Si cree que un menor nos ha enviado datos personales, contáctenos y los eliminaremos.',
      ],
    },
    {
      heading: 'Cambios a este aviso',
      body: [
        'Podemos actualizar este aviso de vez en cuando. La fecha de "Última actualización" al inicio indica cuándo cambió por última vez. Los cambios importantes se destacarán en el Sitio.',
      ],
    },
    { heading: 'Contacto', body: [{ contact: true }] },
  ],
}

const TERMS_OF_SERVICE: LegalDocument = {
  id: 'terms',
  title: 'Términos de servicio',
  description: `Los términos que aplican al usar el sitio web de ${SITE.name}.`,
  intro: [
    `Estos Términos de servicio (los "Términos") regulan el uso de ${WEBSITE} (el "Sitio"), operado por ${ENTITY} ("nosotros"). Al usar el Sitio, usted acepta estos Términos. Si no está de acuerdo, le pedimos que no lo utilice.`,
  ],
  sections: [
    {
      heading: 'Sobre el Sitio',
      body: [
        'El Sitio presenta nuestra agencia y los servicios que ofrecemos: diseño y desarrollo web, SEO técnico y analítica, y software a la medida. Se ofrece únicamente con fines informativos.',
        'Nada de lo publicado en el Sitio constituye una oferta vinculante. Cualquier servicio que prestemos se rige por un contrato escrito independiente (como una propuesta, un alcance de trabajo o un contrato marco de servicios). Si ese contrato contradice estos Términos, prevalece el contrato.',
      ],
    },
    {
      heading: 'Uso del Sitio',
      body: [
        'Puede navegar por el Sitio con fines lícitos. Usted se compromete a no:',
        {
          list: [
            'Usar el Sitio de forma que infrinja cualquier ley o los derechos de otras personas.',
            'Intentar acceder sin autorización al Sitio, a su hosting o a sistemas relacionados, ni interrumpir su funcionamiento (incluidas pruebas de carga, escaneos de vulnerabilidades o intentos de denegación de servicio sin nuestro permiso por escrito).',
            'Introducir malware o cualquier código dañino.',
            'Copiar, extraer o reutilizar partes sustanciales del contenido del Sitio con fines comerciales sin nuestro permiso.',
            'Hacerse pasar por nosotros o falsear su relación con nosotros.',
          ],
        },
      ],
    },
    {
      heading: 'Propiedad intelectual',
      body: [
        `El Sitio y su contenido, incluidos textos, gráficos, logotipos, diseño, demos interactivas y código, son propiedad de ${ENTITY} o de sus licenciantes y están protegidos por las leyes de propiedad intelectual.`,
        'Le otorgamos un derecho limitado, no exclusivo e intransferible para ver el Sitio y compartir enlaces a él con fines personales o internos de su empresa. Nos reservamos todos los demás derechos. Los nombres y marcas de terceros mencionados en el Sitio pertenecen a sus titulares y no implican respaldo alguno.',
      ],
    },
    {
      heading: 'Ejemplos, cifras y demos',
      body: [
        'Las métricas, resultados de casos, puntuaciones de rendimiento y demos interactivas del Sitio son ejemplos ilustrativos basados en proyectos típicos. No son una promesa ni una garantía de resultados para su negocio. Los resultados reales dependen de su situación y solo se comprometen en un contrato firmado.',
      ],
    },
    {
      heading: 'Cuando nos contacta',
      body: [
        'Enviarnos un mensaje o agendar una llamada no crea una relación de cliente ni obligación alguna para ninguna de las partes. Le pedimos que no nos envíe información confidencial hasta que hayamos acordado cómo se protegerá (por ejemplo, con un acuerdo de confidencialidad).',
      ],
    },
    {
      heading: 'Enlaces y servicios de terceros',
      body: [
        'El Sitio puede enlazar a sitios y servicios de terceros, como una herramienta para agendar citas. No los controlamos y no somos responsables de su contenido, disponibilidad o prácticas. Su uso está sujeto a sus propios términos y políticas.',
      ],
    },
    {
      heading: 'Exclusión de garantías',
      body: [
        'El Sitio se ofrece "tal cual" y "según disponibilidad". En la medida máxima permitida por la ley, no otorgamos garantías de ningún tipo, expresas o implícitas, incluidas las de exactitud, comerciabilidad, idoneidad para un fin determinado o no infracción. No garantizamos que el Sitio funcione sin interrupciones, sin errores o libre de componentes dañinos.',
      ],
    },
    {
      heading: 'Limitación de responsabilidad',
      body: [
        `En la medida máxima permitida por la ley, ${ENTITY} no será responsable de daños indirectos, incidentales, especiales, consecuenciales o punitivos, ni de pérdidas de utilidades, ingresos, datos o reputación derivadas del uso del Sitio o de la imposibilidad de usarlo.`,
        'Nada en estos Términos limita o excluye la responsabilidad que la ley no permite limitar o excluir, incluida la responsabilidad por fraude, o por muerte o lesiones personales causadas por negligencia, ni sus derechos como consumidor.',
      ],
    },
    {
      heading: 'Indemnización',
      body: [
        `Usted se compromete a indemnizar a ${ENTITY} por reclamaciones, pérdidas y costos (incluidos honorarios legales razonables) derivados del incumplimiento de estos Términos o del mal uso del Sitio.`,
      ],
    },
    {
      heading: 'Ley aplicable',
      body: [
        `Estos Términos se rigen por las leyes de ${JURISDICTION}, sin considerar sus normas sobre conflicto de leyes. Los tribunales de esa jurisdicción serán los únicos competentes para resolver cualquier controversia, salvo cuando la legislación de protección al consumidor le dé derecho a acudir a los tribunales de su país de residencia.`,
      ],
    },
    {
      heading: 'Cambios a estos Términos',
      body: [
        'Podemos actualizar estos Términos de vez en cuando. La fecha de "Última actualización" al inicio indica cuándo cambiaron por última vez. Si sigue usando el Sitio después de un cambio, acepta los Términos actualizados.',
        'Si alguna parte de estos Términos resulta inaplicable, el resto sigue vigente. Que no exijamos el cumplimiento de una disposición no implica que renunciemos a ella.',
      ],
    },
    { heading: 'Contacto', body: [{ contact: true }] },
  ],
}

const COOKIE_POLICY: LegalDocument = {
  id: 'cookies',
  title: 'Política de cookies',
  description: `Qué cookies y tecnologías similares usa el sitio web de ${SITE.name}.`,
  intro: [
    `Esta Política de cookies explica cómo ${WEBSITE} (el "Sitio"), operado por ${ENTITY}, usa cookies y tecnologías similares. En resumen: el Sitio no instala ninguna cookie y no utiliza tecnologías de analítica, publicidad ni rastreo.`,
  ],
  sections: [
    {
      heading: 'Qué son las cookies y tecnologías similares',
      body: [
        'Las cookies son pequeños archivos de texto que un sitio web guarda en su navegador. Las tecnologías similares, como el almacenamiento local, permiten a un sitio guardar información en su dispositivo de otras formas. Pueden ser "estrictamente necesarias" (para una función que usted solicita) u opcionales (por ejemplo, de analítica o publicidad), y pueden ser instaladas por el sitio que visita (propias) o por otras empresas (de terceros).',
      ],
    },
    {
      heading: 'Qué usamos',
      body: [
        'El Sitio usa solo dos elementos propios en el almacenamiento local de su navegador, y únicamente si cambia el tema de color o el idioma:',
        {
          table: {
            head: ['Nombre', 'Tipo', 'Finalidad', 'Duración'],
            rows: [
              [
                'theme',
                'Almacenamiento local (propio, estrictamente necesario)',
                'Recuerda si eligió el tema claro u oscuro, para que la página no vuelva a cambiar en su siguiente visita.',
                'Hasta que borre los datos de su navegador',
              ],
              [
                'lang',
                'Almacenamiento local (propio, estrictamente necesario)',
                'Recuerda si eligió ver el Sitio en inglés o en español.',
                'Hasta que borre los datos de su navegador',
              ],
            ],
          },
        },
        'Estos valores permanecen en su dispositivo. Nunca se nos envían a nosotros ni a nadie más, y no pueden usarse para identificarle ni rastrearle.',
      ],
    },
    {
      heading: 'Qué no usamos',
      body: [
        {
          list: [
            'Ninguna cookie de analítica o estadística (como Google Analytics).',
            'Ningún píxel de publicidad, retargeting o redes sociales.',
            'Ningún contenido incrustado de terceros que instale cookies (como reproductores de video o widgets de chat).',
          ],
        },
        'Nuestro proveedor de hosting, Vercel, trata datos técnicos de las solicitudes para mostrar el Sitio de forma segura (consulte nuestro Aviso de privacidad). No hemos activado ninguna función de analítica del hosting que instale cookies.',
      ],
    },
    {
      heading: 'Sitios de terceros',
      body: [
        'Si sigue un enlace desde el Sitio, por ejemplo a una página para agendar citas o a una red social, ese sitio puede instalar sus propias cookies. Su uso se rige por las políticas de cookies y privacidad de ese sitio.',
      ],
    },
    {
      heading: 'Consentimiento',
      body: [
        'Como los únicos elementos que guardamos son estrictamente necesarios para ofrecer funciones que usted solicita (recordar su tema e idioma), no se requiere un aviso de consentimiento de cookies conforme a la Directiva ePrivacy, el RGPD o leyes similares. Si en algún momento agregamos cookies opcionales, como de analítica, le pediremos su consentimiento antes de instalarlas y actualizaremos esta política.',
      ],
    },
    {
      heading: 'Cómo gestionarlas o eliminarlas',
      body: [
        'Puede eliminar las preferencias guardadas en cualquier momento borrando los datos de este sitio en la configuración de su navegador (normalmente en "Privacidad", "Cookies y datos de sitios" o "Almacenamiento"). También puede impedir que los sitios guarden datos, aunque entonces el Sitio no recordará su tema ni su idioma. El Sitio funciona por completo en ambos casos.',
      ],
    },
    {
      heading: 'Cambios a esta política',
      body: [
        'Podemos actualizar esta Política de cookies si el Sitio cambia. La fecha de "Última actualización" al inicio indica cuándo cambió por última vez.',
      ],
    },
    { heading: 'Contacto', body: [{ contact: true }] },
  ],
}

export const legalEs: LegalContent = {
  lastUpdated: '4 de octubre de 2026',
  documents: { privacy: PRIVACY_POLICY, terms: TERMS_OF_SERVICE, cookies: COOKIE_POLICY },
}
