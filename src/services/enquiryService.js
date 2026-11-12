const REQUEST_TIMEOUT_MS = 20000
const SUBMISSION_TIME_ZONE = 'Asia/Kolkata'

export class SubmissionOutcomeUnknownError extends Error {
  constructor() {
    super(
      'The enquiry may already be saved, but the endpoint did not provide a matching confirmation. Retry is blocked to avoid creating a duplicate.',
    )
    this.name = 'SubmissionOutcomeUnknownError'
  }
}

export class SubmissionIdMismatchError extends SubmissionOutcomeUnknownError {
  constructor() {
    super()
    this.message =
      'Apps Script reported success with a different Submission ID. The enquiry may already be saved; retry is blocked to avoid creating a duplicate.'
    this.name = 'SubmissionIdMismatchError'
  }
}

function getEndpoint() {
  const endpoint = import.meta.env.VITE_ENQUIRY_API_URL?.trim()

  if (!endpoint) {
    throw new Error(
      'Enquiry submission is not configured. Set VITE_ENQUIRY_API_URL to the approved save endpoint.',
    )
  }

  let url
  try {
    url = new URL(endpoint)
  } catch {
    throw new Error('VITE_ENQUIRY_API_URL must be an absolute HTTP or HTTPS URL.')
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('VITE_ENQUIRY_API_URL must use HTTP or HTTPS.')
  }

  return url.toString()
}

export async function submitEnquiry(fields, submissionId) {
  const endpoint = getEndpoint()
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  const submittedAt = new Date()
  const timeParts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: SUBMISSION_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(submittedAt)
      .map(({ type, value }) => [type, value]),
  )

  let response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify({
        submissionId,
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        experience: fields.experience,
        message: fields.message,
        submittedDate: `${timeParts.year}-${timeParts.month}-${timeParts.day}`,
        submittedTime: `${timeParts.hour}:${timeParts.minute}:${timeParts.second} IST`,
      }),
      signal: controller.signal,
      credentials: 'omit',
      mode: 'cors',
      redirect: 'follow',
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new SubmissionOutcomeUnknownError()
    }

    throw new SubmissionOutcomeUnknownError()
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) {
    throw new SubmissionOutcomeUnknownError()
  }

  let result
  try {
    result = await response.json()
  } catch {
    throw new SubmissionOutcomeUnknownError()
  }

  if (result?.success !== true) {
    throw new Error(
      result?.message || 'The Apps Script endpoint did not confirm that the enquiry was saved.',
    )
  }

  if (result.submissionId !== submissionId) {
    throw new SubmissionIdMismatchError()
  }

  return result
}
