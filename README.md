# TECTRANZ Interview Preparation frontend

Responsive React + Vite frontend for the TECTRANZ Interview Preparation Program page.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Notes

- The page uses locally stored reference images from `public/images`.
- The header and footer use the supplied TECTRANZ logo.
- The enquiry form validates name, email, work experience, phone number, and message in the browser.
- The company logo links to the TECTRANZ website; programme and company navigation use local hash-based detail views.
- Blog and review pages show an empty state because approved articles and testimonials are not included in the project.
- Enquiry calls to action scroll to the existing form. No approved programme brochure or video asset is included.
- The live reference currently overflows horizontally on small viewports; this frontend stays responsive to meet the mobile-layout requirement.

## Enquiry submission endpoint

Form submissions are sent by `src/services/enquiryService.js`. The supplied Apps Script endpoint is configured locally in the Git-ignored `.env` file. Set the same variable in the deployment environment:

```env
VITE_ENQUIRY_API_URL=https://script.google.com/macros/s/AKfycbzVXCRqeboLV6wlZx_PgMcpCL-Um08PZzuHFJdFcfJbMmOh6sQUr957y4Deqj03MGm1Xw/exec
```

`.env` files are ignored by Git. Vite `VITE_` variables are public in the browser bundle: only put the endpoint URL here, never a service-account key, access token, or other private credential.

The Apps Script endpoint accepts JSON through `e.postData.contents`. Its `OPTIONS` preflight is not CORS-enabled, so the browser sends the JSON string with the CORS-safelisted `Content-Type: text/plain;charset=UTF-8`; this avoids a preflight while preserving the JSON request body. The browser follows Apps Script's redirect to `script.googleusercontent.com` and requires a readable CORS response. Do not change the request to `no-cors`, since an opaque response cannot confirm submission.

```json
{ "success": true, "message": "...", "submissionId": "the-request-id" }
```

The request contains `submissionId`, `name`, `email`, `phone`, `experience`, `message`, `submittedDate` (YYYY-MM-DD), and `submittedTime` (HH:mm:ss IST). It maps to sheet columns `Submission ID`, `Name`, `Email`, `Phone Number`, `Work Experience`, `Message`, `Submitted Date`, and `Submitted Time`. The frontend displays success only for a readable HTTP-success response whose `submissionId` exactly matches the request. A mismatch is treated as an uncertain save and blocks another send of the same form values to avoid creating a duplicate.

The Apps Script web app is reported as deployed as Version 4 on 11 November 2026. `apps-script/Code.gs` is a local source copy; changing this file does not update the deployed web app, and its exact correspondence with Version 4 has not been independently verified. This local source validates required fields, email, phone, work-experience choice, and field lengths; prefixes formula-like text values; and uses `LockService` while checking for and appending each ID. It uses the spreadsheet timezone for the saved date and time. The Apps Script endpoint is public; this code does not provide bot or abuse protection. Add server-verified CAPTCHA and suitable rate controls before production.

The frontend treats mismatched or otherwise ambiguous responses as potentially saved and blocks another send of the same form values for the current page session. Neither the local source nor mock tests independently verify rows in the live spreadsheet.
