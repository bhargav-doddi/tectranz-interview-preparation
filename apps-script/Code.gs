const SPREADSHEET_ID = '13k24Vnz8GGvtUw0RK5uT3fqNH41wMo8lKWsYFVKsrQY'
const SHEET_NAME = 'Enquiries'
const WORK_EXPERIENCE_OPTIONS = ['0-5 years', '6-10 years', 'more than 10 years']
const MAX_FIELD_LENGTHS = {
  name: 200,
  email: 254,
  phone: 30,
  experience: 50,
  message: 5000,
}

function doGet() {
  return jsonResponse({
    success: true,
    message: 'TECTRANZ form integration is running.',
  })
}

function doPost(e) {
  const lock = LockService.getScriptLock()

  try {
    lock.waitLock(10000)

    const data = readRequestData(e)
    const submission = validateSubmission(data)
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)

    if (!spreadsheet) {
      throw new Error('The active spreadsheet is unavailable.')
    }

    const sheet = spreadsheet.getSheetByName(SHEET_NAME)

    if (!sheet) {
      throw new Error(`The ${SHEET_NAME} sheet was not found.`)
    }

    if (hasSubmissionId(sheet, submission.submissionId)) {
      return jsonResponse({
        success: true,
        message: 'This enquiry was already received.',
        submissionId: submission.submissionId,
        duplicate: true,
      })
    }

    const submittedAt = new Date()
    const timezone = spreadsheet.getSpreadsheetTimeZone()
    const submittedDate = Utilities.formatDate(submittedAt, timezone, 'yyyy-MM-dd')
    const submittedTime = Utilities.formatDate(submittedAt, timezone, 'HH:mm:ss')

    sheet.appendRow([
      submission.submissionId,
      safeCell(submission.name),
      safeCell(submission.email),
      safeCell(submission.phone),
      safeCell(submission.experience),
      safeCell(submission.message),
      submittedDate,
      submittedTime,
    ])

    return jsonResponse({
      success: true,
      message: 'Enquiry submitted successfully.',
      submissionId: submission.submissionId,
    })
  } catch (error) {
    if (error instanceof RequestValidationError) {
      return jsonResponse({ success: false, message: error.message })
    }

    console.error(error)
    return jsonResponse({
      success: false,
      message: 'Unable to save the enquiry. Please try again later.',
    })
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock()
    }
  }
}

function readRequestData(e) {
  const contents = e && e.postData && e.postData.contents

  if (!contents) {
    return (e && e.parameter) || {}
  }

  try {
    return JSON.parse(contents)
  } catch {
    throw new RequestValidationError('Invalid request body.')
  }
}

function validateSubmission(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new RequestValidationError('Invalid request body.')
  }

  const submissionId = String(data.submissionId || '').trim()
  const name = String(data.name || '').trim()
  const email = String(data.email || '').trim()
  const phone = String(data.phone || '').trim()
  const experience = String(data.experience || data.workExperience || '').trim()
  const message = String(data.message || '').trim()

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(submissionId)) {
    throw new RequestValidationError('A valid Submission ID is required.')
  }

  if (!name || !email || !phone || !experience || !message) {
    throw new RequestValidationError('All form fields are required.')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new RequestValidationError('Invalid email address.')
  }

  if (Object.entries({ name, email, phone, experience, message }).some(
    ([field, value]) => value.length > MAX_FIELD_LENGTHS[field],
  )) {
    throw new RequestValidationError('One or more fields exceed the maximum length.')
  }

  const phoneDigits = phone.replace(/\D/g, '')
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    throw new RequestValidationError('Invalid phone number.')
  }

  if (!WORK_EXPERIENCE_OPTIONS.includes(experience)) {
    throw new RequestValidationError('Invalid work experience selection.')
  }

  return { submissionId, name, email, phone, experience, message }
}

function hasSubmissionId(sheet, submissionId) {
  const lastRow = sheet.getLastRow()

  if (lastRow === 0) {
    return false
  }

  return sheet
    .getRange(1, 1, lastRow, 1)
    .getDisplayValues()
    .some(([savedId]) => savedId === submissionId)
}

function safeCell(value) {
  const text = String(value)

  return /^[\s\u0000-\u001f\uFEFF]*[=+\-@]/.test(text) ? `'${text}` : text
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
}

class RequestValidationError extends Error {}
