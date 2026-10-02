import type { ContactFormErrors, ContactFormField, ContactFormValues } from '@/types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const MESSAGE_MIN = 20
export const MESSAGE_MAX = 2000

type Validator = (values: ContactFormValues) => string | undefined

/**
 * One validator per field. Return an error message, or `undefined` when valid.
 * Keep these pure so the same rules can be reused server-side later.
 */
const validators: Partial<Record<ContactFormField, Validator>> = {
  name: ({ name }) => {
    const v = name.trim()
    if (!v) return 'Please tell us your name.'
    if (v.length < 2) return 'Name must be at least 2 characters.'
    if (v.length > 100) return 'Name must be under 100 characters.'
  },
  email: ({ email }) => {
    const v = email.trim()
    if (!v) return 'Please enter your email address.'
    if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.'
  },
  company: ({ company }) => {
    if (company.trim().length > 120) return 'Company name must be under 120 characters.'
  },
  service: ({ service }) => {
    if (!service) return 'Please choose what you need help with.'
  },
  message: ({ message }) => {
    const v = message.trim()
    if (!v) return 'Please tell us a bit about your project.'
    if (v.length < MESSAGE_MIN) return `Please write at least ${MESSAGE_MIN} characters.`
    if (v.length > MESSAGE_MAX) return `Please keep it under ${MESSAGE_MAX} characters.`
  },
  consent: ({ consent }) => {
    if (!consent) return 'Please agree so we can reply to you.'
  },
}

export function validateField(field: ContactFormField, values: ContactFormValues): string | undefined {
  return validators[field]?.(values)
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  for (const field of Object.keys(validators) as ContactFormField[]) {
    const error = validateField(field, values)
    if (error) errors[field] = error
  }
  return errors
}
