import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { submitContact } from '@/lib/submitContact'
import { validateContactForm, validateField } from '@/lib/validation'
import type { ContactFormErrors, ContactFormField, ContactFormValues, FormStatus } from '@/types'

export const INITIAL_CONTACT_VALUES: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
  consent: false,
  website: '',
}

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

/**
 * Contact form state machine: values, per-field errors (shown after blur or submit),
 * and submission status. Validation rules live in `lib/validation.ts`.
 */
export function useContactForm(initial: ContactFormValues = INITIAL_CONTACT_VALUES) {
  const [values, setValues] = useState<ContactFormValues>(initial)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<ContactFormField, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (e: ChangeEvent<FieldElement>) => {
    const field = e.target.name as ContactFormField
    const value = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const next = { ...values, [field]: value } as ContactFormValues
    setValues(next)
    // Re-validate live only once the user has left the field, to avoid nagging while typing.
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const handleBlur = (e: FocusEvent<FieldElement>) => {
    const field = e.target.name as ContactFormField
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])))

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitContact(values)
      setStatus('success')
      setValues(initial)
      setTouched({})
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return { values, errors, status, handleChange, handleBlur, handleSubmit }
}
