import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import {
  SubmissionOutcomeUnknownError,
  submitEnquiry,
} from '../services/enquiryService.js'

const workExperienceOptions = ['0-5 years', '6-10 years', 'more than 10 years']

const initialValues = {
  name: '',
  email: '',
  experience: '',
  phone: '',
  message: '',
}

function validate(values) {
  const errors = {}
  const digits = values.phone.replace(/\D/g, '')

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.experience) errors.experience = 'Please select your work experience.'
  if (digits.length < 7 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (!values.message.trim()) errors.message = 'Please enter a message.'

  return errors
}

function createSubmissionId() {
  if (!globalThis.crypto?.randomUUID) {
    throw new Error('This browser cannot create a secure request ID. Please use a current browser.')
  }

  return globalThis.crypto.randomUUID()
}

const ContactForm = forwardRef(function ContactForm(_props, ref) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submissionLock = useRef(false)
  const pendingRequest = useRef(null)
  const lastSavedPayload = useRef(null)
  const blockedPayload = useRef(null)

  useImperativeHandle(
    ref,
    () => ({
      requestExpertCVReview() {
        setValues((current) => ({
          ...current,
          message: current.message.trim()
            ? current.message
            : 'I would like to enquire about Expert CV Review.',
        }))
        setErrors((current) => ({ ...current, message: '' }))
        setStatus(null)
        document.getElementById('contact-title')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      },
    }),
    [],
  )

  function updateField(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setStatus(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (submissionLock.current) return

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please review the highlighted fields.' })
      return
    }

    const payload = { ...values }
    const fingerprint = JSON.stringify(payload)
    if (blockedPayload.current === fingerprint) {
      setStatus({
        type: 'error',
        message:
          'This enquiry may already be saved, but its confirmation could not be verified. Retry is blocked to avoid a duplicate; contact support.',
      })
      return
    }

    if (lastSavedPayload.current === fingerprint) {
      setStatus({ type: 'success', message: 'This enquiry has already been saved.' })
      return
    }

    submissionLock.current = true
    setIsSubmitting(true)
    setStatus({ type: 'pending', message: 'Sending your enquiry…' })

    try {
      if (pendingRequest.current?.fingerprint !== fingerprint) {
        pendingRequest.current = {
          fingerprint,
          id: createSubmissionId(),
        }
      }

      await submitEnquiry(payload, pendingRequest.current.id)
      lastSavedPayload.current = fingerprint
      pendingRequest.current = null
      setStatus({ type: 'success', message: 'Your enquiry was saved successfully.' })
    } catch (error) {
      if (error instanceof SubmissionOutcomeUnknownError) {
        blockedPayload.current = fingerprint
      }

      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'The enquiry could not be saved.',
      })
    } finally {
      submissionLock.current = false
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <div className="section-wrap contact-section__grid">
        <div className="contact-section__copy">
          <h2 id="contact-title">Enquiry Form</h2>
          <p>
            Ask us about the 8-week, self-paced programme for experienced
            professionals, including its learning path, capstone projects, mock
            interviews, CV preparation, and job application guidance.
            {' '}
            <a
              href="https://wa.me/919059039311"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us on WhatsApp: +91 90590 39311
            </a>
          </p>
        </div>
        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <div className="contact-form__fields">
            <div className="field">
              <label className="visually-hidden" htmlFor="contact-name">
                Name *
              </label>
              <input
                autoComplete="name"
                id="contact-name"
                name="name"
                placeholder="Your Name*"
                value={values.name}
                onChange={updateField}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
            </div>
            <div className="field">
              <label className="visually-hidden" htmlFor="contact-email">
                Email Address *
              </label>
              <input
                autoComplete="email"
                id="contact-email"
                name="email"
                type="email"
                placeholder="Email Address*"
                value={values.email}
                onChange={updateField}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
            </div>
            <div className="field">
              <label className="visually-hidden" htmlFor="contact-experience">
                Select total work experience
              </label>
              <select
                id="contact-experience"
                name="experience"
                value={values.experience}
                onChange={updateField}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.experience)}
                aria-describedby={errors.experience ? 'experience-error' : undefined}
                required
              >
                <option value="">Select total work experience</option>
                {workExperienceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.experience && (
                <span className="field-error" id="experience-error">{errors.experience}</span>
              )}
            </div>
            <div className="field">
              <label className="visually-hidden" htmlFor="contact-phone">
                Phone Number *
              </label>
              <input
                autoComplete="tel"
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="Phone Number*"
                value={values.phone}
                onChange={updateField}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                required
              />
              {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
            </div>
            <div className="field field--wide">
              <label className="visually-hidden" htmlFor="contact-message">
                Write Your Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="4"
                placeholder="Write Your Message*"
                value={values.message}
                onChange={updateField}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                required
              />
              {errors.message && (
                <span className="field-error" id="message-error">{errors.message}</span>
              )}
            </div>
          </div>
          <button className="button button--primary form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
          {status && (
            <p className={`form-status form-status--${status.type}`} role="status" aria-live="polite">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
})

export default ContactForm
