import type { LegalDocument } from '@/types'
import { SITE } from '../site'
import { ENTITY, JURISDICTION, WEBSITE, type LegalContent } from './shared'

const PRIVACY_POLICY: LegalDocument = {
  id: 'privacy',
  title: 'Privacy Policy',
  description: `How ${ENTITY} collects, uses and protects personal information.`,
  intro: [
    `This Privacy Policy explains how ${ENTITY} ("we", "us", "our") handles personal information when you visit ${WEBSITE} (the "Website") or contact us. We keep data collection to a minimum: the Website has no forms, no user accounts, no analytics and no advertising trackers.`,
  ],
  sections: [
    {
      heading: 'Who is responsible for your data',
      body: [
        `${ENTITY} is the controller of the personal information described in this policy. You can reach us about anything privacy-related using the details at the end of this page.`,
        'This policy covers the Website and enquiries you send us. Personal data we process while delivering services to clients is governed by the agreement signed with that client.',
      ],
    },
    {
      heading: 'Information we collect',
      body: [
        'Information you choose to send us. When you email us, call us or book a meeting, we receive the details you provide, such as your name, email address, phone number, company, and the content of your message or meeting notes.',
        'Technical information. Like any website, each visit sends technical data to our hosting provider so the page can be delivered and protected from abuse: IP address, browser and device type, the page requested, the referring page, and the date and time. This data appears in short-lived server logs. We do not use it to identify or profile you. Fonts are served from our own domain, so no request is made to third-party font services such as Google Fonts.',
        'Preferences stored on your device. If you switch between the light and dark theme, or between English and Spanish, your choice is saved in your browser\'s local storage under the keys "theme" and "lang". They never leave your device and are not sent to us. See our Cookie Policy for details.',
        'We do not knowingly collect sensitive personal information, and we ask you not to send it to us.',
      ],
    },
    {
      heading: 'How we use your information',
      body: [
        {
          list: [
            'To reply to your enquiry and schedule calls you request.',
            'To prepare proposals and, if you become a client, to enter into and perform our agreement with you.',
            'To keep the Website secure, available and working properly.',
            'To meet our legal, accounting and tax obligations, and to establish or defend legal claims.',
          ],
        },
        'We do not sell or rent your personal information, we do not share it for cross-context behavioral advertising, and we do not use it for automated decision-making or profiling.',
      ],
    },
    {
      heading: 'Legal bases (EEA, UK and similar laws)',
      body: [
        'Where data protection laws such as the GDPR or UK GDPR apply, we rely on the following legal bases:',
        {
          list: [
            'Steps prior to entering a contract, and performance of a contract, when you ask about or buy our services.',
            'Legitimate interests, to answer general messages, run our business and keep the Website secure, where those interests are not overridden by your rights.',
            'Legal obligation, where we must keep records or respond to lawful requests.',
            'Consent, where we ask for it. You can withdraw consent at any time.',
          ],
        },
      ],
    },
    {
      heading: 'Who we share it with',
      body: [
        'We share personal information only with service providers that help us operate, under contracts that require them to protect it:',
        {
          list: [
            'Vercel Inc., which hosts the Website and delivers it through its global network.',
            'Our email, calendar and scheduling providers, which store the messages and bookings you send us.',
            'Professional advisers such as accountants and lawyers, where needed.',
          ],
        },
        'We may also disclose information if required by law, to protect our rights or the safety of others, or as part of a merger or sale of our business, in which case this policy will continue to apply.',
        'If you follow a link to a third-party service (for example a booking page), that service\'s own privacy policy applies to what you share there.',
      ],
    },
    {
      heading: 'International transfers',
      body: [
        'Our providers may process data in countries other than yours, including the United States. Where required, transfers are protected by appropriate safeguards such as the European Commission\'s Standard Contractual Clauses or an adequacy decision.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        {
          list: [
            'Enquiries that do not lead to a project: up to 24 months after our last exchange, then deleted.',
            'Client and contract records: for as long as the law requires (often 6 to 10 years for accounting records).',
            'Hosting logs: for the limited period set by our hosting provider for security and troubleshooting.',
          ],
        },
      ],
    },
    {
      heading: 'Your rights',
      body: [
        'Depending on where you live, you may have the right to access the personal information we hold about you, correct it, delete it, restrict or object to its use, receive it in a portable format, and withdraw any consent you have given.',
        'If you are in Mexico, the Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP) gives you the rights of Access, Rectification, Cancellation and Opposition (ARCO rights), and you may also revoke your consent or limit the use and disclosure of your data. To exercise them, send a request to the contact details below with your name, a way to reply to you, a copy of an identification document, and a clear description of the data and the right you want to exercise. We will respond within the time limits set by that law.',
        'Residents of California and other US states with privacy laws have the right to know, delete and correct their personal information, and to not be discriminated against for exercising these rights. We do not sell or share personal information as those laws define it.',
        'To exercise a right, contact us using the details below. We will reply within the time required by law (usually one month) and may need to verify your identity first. You also have the right to complain to your local data protection authority.',
      ],
    },
    {
      heading: 'Security',
      body: [
        'The Website is served over HTTPS only, and we limit access to personal information to people who need it. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we take reasonable measures to protect your information.',
      ],
    },
    {
      heading: 'Children',
      body: [
        'The Website is intended for businesses and is not directed to children under 16. We do not knowingly collect their personal information. If you believe a child has sent us personal information, please contact us and we will delete it.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may update this policy from time to time. The "Last updated" date at the top shows when it last changed. Significant changes will be highlighted on the Website.',
      ],
    },
    { heading: 'Contact us', body: [{ contact: true }] },
  ],
}

const TERMS_OF_SERVICE: LegalDocument = {
  id: 'terms',
  title: 'Terms of Service',
  description: `The terms that apply when you use the ${SITE.name} website.`,
  intro: [
    `These Terms of Service ("Terms") govern your use of ${WEBSITE} (the "Website"), operated by ${ENTITY} ("we", "us", "our"). By using the Website, you agree to these Terms. If you do not agree, please do not use it.`,
  ],
  sections: [
    {
      heading: 'About the Website',
      body: [
        'The Website presents our agency and the services we offer: web design and development, technical SEO and analytics, and bespoke software. It is provided for general information only.',
        'Nothing on the Website is a binding offer. Any services we provide are governed by a separate written agreement (such as a proposal, statement of work or master services agreement). If that agreement conflicts with these Terms, the agreement prevails.',
      ],
    },
    {
      heading: 'Using the Website',
      body: [
        'You may browse the Website for lawful purposes. You agree not to:',
        {
          list: [
            'Use the Website in a way that breaks any law or infringes anyone\'s rights.',
            'Attempt to gain unauthorized access to the Website, its hosting or related systems, or disrupt their operation (including by load testing, vulnerability scanning or denial-of-service attempts without our written permission).',
            'Introduce malware or any harmful code.',
            'Copy, scrape or reuse substantial parts of the Website\'s content for commercial purposes without our permission.',
            'Impersonate us or misrepresent your affiliation with us.',
          ],
        },
      ],
    },
    {
      heading: 'Intellectual property',
      body: [
        `The Website and its content, including text, graphics, logos, design, interactive demos and code, are owned by ${ENTITY} or its licensors and are protected by intellectual property laws.`,
        'We grant you a limited, non-exclusive, non-transferable right to view and share links to the Website for personal or internal business purposes. All other rights are reserved. Third-party names and trademarks mentioned on the Website belong to their owners and do not imply endorsement.',
      ],
    },
    {
      heading: 'Examples, figures and demos',
      body: [
        'Metrics, case outcomes, performance scores and interactive demos on the Website are illustrative examples based on typical projects. They are not a promise or guarantee of results for your business. Actual results depend on your situation and are only committed to in a signed agreement.',
      ],
    },
    {
      heading: 'Contacting us',
      body: [
        'Sending us a message or booking a call does not create a client relationship or any obligation for either party. Please do not send confidential information until we have agreed on how it will be protected (for example, with a non-disclosure agreement).',
      ],
    },
    {
      heading: 'Third-party links and services',
      body: [
        'The Website may link to third-party websites and services, such as a scheduling tool. We do not control them and are not responsible for their content, availability or practices. Your use of them is subject to their own terms and policies.',
      ],
    },
    {
      heading: 'Disclaimer',
      body: [
        'The Website is provided "as is" and "as available". To the fullest extent permitted by law, we make no warranties of any kind, express or implied, including warranties of accuracy, merchantability, fitness for a particular purpose or non-infringement. We do not guarantee that the Website will be uninterrupted, error-free or free of harmful components.',
      ],
    },
    {
      heading: 'Limitation of liability',
      body: [
        `To the fullest extent permitted by law, ${ENTITY} will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data or goodwill, arising from your use of, or inability to use, the Website.`,
        'Nothing in these Terms limits or excludes liability that cannot be limited or excluded by law, including liability for fraud or for death or personal injury caused by negligence, or your statutory rights as a consumer.',
      ],
    },
    {
      heading: 'Indemnity',
      body: [
        `You agree to indemnify ${ENTITY} against claims, losses and costs (including reasonable legal fees) arising from your breach of these Terms or misuse of the Website.`,
      ],
    },
    {
      heading: 'Governing law',
      body: [
        `These Terms are governed by the laws of ${JURISDICTION}, without regard to conflict-of-law rules. The courts of that jurisdiction have exclusive jurisdiction over any dispute, except where mandatory consumer protection law gives you the right to bring proceedings in your country of residence.`,
      ],
    },
    {
      heading: 'Changes to these Terms',
      body: [
        'We may update these Terms from time to time. The "Last updated" date at the top shows when they last changed. Continuing to use the Website after a change means you accept the updated Terms.',
        'If any part of these Terms is found unenforceable, the rest remains in effect. Our failure to enforce a provision is not a waiver of it.',
      ],
    },
    { heading: 'Contact us', body: [{ contact: true }] },
  ],
}

const COOKIE_POLICY: LegalDocument = {
  id: 'cookies',
  title: 'Cookie Policy',
  description: `Which cookies and similar technologies the ${SITE.name} website uses.`,
  intro: [
    `This Cookie Policy explains how ${WEBSITE} (the "Website"), operated by ${ENTITY}, uses cookies and similar technologies. In short: the Website does not set any cookies, and it does not use analytics, advertising or tracking technologies.`,
  ],
  sections: [
    {
      heading: 'What cookies and similar technologies are',
      body: [
        'Cookies are small text files a website stores in your browser. Similar technologies, such as local storage, let a website save information on your device in other ways. They can be "strictly necessary" (needed for a feature you ask for) or optional (for example analytics or advertising), and they can be set by the website you visit (first-party) or by other companies (third-party).',
      ],
    },
    {
      heading: 'What we use',
      body: [
        'The Website uses only two first-party items in your browser\'s local storage, and only if you change the color theme or the language:',
        {
          table: {
            head: ['Name', 'Type', 'Purpose', 'Duration'],
            rows: [
              [
                'theme',
                'Local storage (first-party, strictly necessary)',
                'Remembers whether you chose the light or dark theme, so the page does not switch back on your next visit.',
                'Until you clear your browser data',
              ],
              [
                'lang',
                'Local storage (first-party, strictly necessary)',
                'Remembers whether you chose to view the Website in English or Spanish.',
                'Until you clear your browser data',
              ],
            ],
          },
        },
        'These values stay on your device. They are never sent to us or to anyone else, and they cannot be used to identify or track you.',
      ],
    },
    {
      heading: 'What we do not use',
      body: [
        {
          list: [
            'No analytics or statistics cookies (such as Google Analytics).',
            'No advertising, retargeting or social media pixels.',
            'No third-party embeds that set cookies (such as video players or chat widgets).',
          ],
        },
        'Our hosting provider, Vercel, processes technical request data to deliver the Website securely (see our Privacy Policy). We have not enabled any hosting analytics features that set cookies.',
      ],
    },
    {
      heading: 'Third-party websites',
      body: [
        'If you follow a link from the Website, for example to a scheduling page or a social network, that website may set its own cookies. Their use is governed by that website\'s cookie and privacy policies.',
      ],
    },
    {
      heading: 'Consent',
      body: [
        'Because the only items we store are strictly necessary to provide features you request (remembering your theme and language), no consent banner is required under the ePrivacy Directive, the GDPR or similar laws. If we ever add optional cookies such as analytics, we will ask for your consent before setting them and update this policy.',
      ],
    },
    {
      heading: 'How to manage or delete them',
      body: [
        'You can remove the stored preferences at any time by clearing this site\'s data in your browser settings (often under "Privacy", "Cookies and site data" or "Storage"). You can also block websites from storing data, although the Website will then not remember your theme or language. The Website works fully either way.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may update this Cookie Policy if the Website changes. The "Last updated" date at the top shows when it last changed.',
      ],
    },
    { heading: 'Contact us', body: [{ contact: true }] },
  ],
}

export const legalEn: LegalContent = {
  lastUpdated: 'October 4, 2026',
  documents: { privacy: PRIVACY_POLICY, terms: TERMS_OF_SERVICE, cookies: COOKIE_POLICY },
}
