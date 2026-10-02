import type { ContactFormValues } from '@/types'

/** Payload sent to the backend — the honeypot field is stripped. */
export type ContactPayload = Omit<ContactFormValues, 'website'> & { submittedAt: string }

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

/**
 * Sends the contact form.
 *
 * - With `VITE_CONTACT_ENDPOINT` set, POSTs JSON to that URL (works with Formspree, a
 *   serverless function, or your own API).
 * - Without it, simulates a network request so the UI can be developed end-to-end.
 *
 * TODO(launch): set VITE_CONTACT_ENDPOINT in the hosting provider's environment variables.
 */
export async function submitContact(values: ContactFormValues): Promise<void> {
  // Bots fill hidden fields; pretend success and drop the submission.
  if (values.website) return

  const { website: _honeypot, ...rest } = values
  void _honeypot
  const payload: ContactPayload = {
    ...rest,
    name: rest.name.trim(),
    email: rest.email.trim(),
    company: rest.company.trim(),
    message: rest.message.trim(),
    submittedAt: new Date().toISOString(),
  }

  if (!ENDPOINT) {
    if (import.meta.env.DEV) console.info('[contact] mock submission', payload)
    await new Promise((resolve) => setTimeout(resolve, 900))
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Contact request failed with status ${res.status}`)
}
