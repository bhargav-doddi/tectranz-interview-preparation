import { technicalProgrammes } from '../content/siteContent.js'

const companyUrl = 'https://www.tectranz.com'

const courseLinks = [
  ...technicalProgrammes.map(({ id, title }) => [
    title,
    `#programme-${id}`,
  ]),
  ['Interview Preparation for AI', '#program-overview'],
]

const quickLinks = [
  ['Home', '#hero-title'],
  ['For Enterprises', '#for-enterprises'],
  ['About Us', '#about-us'],
  ['Blogs', '#blogs'],
  ['Reviews', '#reviews'],
  ['Privacy & Refund Policy', null],
  ['Terms & Condition', null],
]

function FooterLinks({ title, links }) {
  return (
    <div className="footer-column">
      <h2>{title}</h2>
      <ul>
        {links.map(([label, href]) => (
          <li key={label}>
            {href ? (
              <a href={href}>
                <span aria-hidden="true">›</span> {label}
              </a>
            ) : (
              <a
                aria-disabled="true"
                tabIndex={-1}
                title="This destination is not available on this website."
              >
                <span aria-hidden="true">›</span> {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap site-footer__main">
        <div className="footer-about">
          <a className="logo-placeholder logo-placeholder--footer" href={companyUrl} aria-label="TECTRANZ home">
            <img src="/images/tectranz-logo.png" alt="TECTRANZ" />
          </a>
          <p>
            TECTRANZ helps experienced professionals prepare for AI interviews.
            The programme focuses on decision-making, problem-solving, project
            explanation, and business context.
          </p>
        </div>
        <FooterLinks title="Our Programs" links={courseLinks} />
        <FooterLinks title="Quick Links" links={quickLinks} />
        <div className="footer-column footer-contact">
          <h2>Get in touch!</h2>
          <p>
            <span aria-hidden="true">⌖</span>
            <span>
              Tectranz, Hitech City, Madhapur, Hyderabad – 500081, Telangana,
              India.
            </span>
          </p>
          <a href="mailto:ssr.ai@internship.com">
            <span aria-hidden="true">✉</span> ssr.ai@internship.com
          </a>
          <a
            href="https://wa.me/919059039311"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with TECTRANZ on WhatsApp at +91 90590 39311"
          >
            <span aria-hidden="true">
              <img src="/images/whatsapp.png" alt="" width="18" height="18" />
            </span>
            WhatsApp: +91 90590 39311
          </a>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="section-wrap">
          Copyright © 2026 <a href={companyUrl}>TECTRANZ</a> | All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
