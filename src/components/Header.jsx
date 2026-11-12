import { useState } from 'react'
import { technicalProgrammes } from '../content/siteContent.js'

const navigation = [
  ['Home', '#hero-title'],
  ['For Enterprises', '#for-enterprises'],
  ['Reviews', '#reviews'],
  ['Blogs', '#blogs'],
  ['About Us', '#about-us'],
  ['Contact', '#contact-title'],
]

function NavigationLink({ label, href, onClick }) {
  if (!href) {
    return (
      <a
        aria-disabled="true"
        tabIndex={-1}
        title="This destination is not available on this website."
      >
        {label}
      </a>
    )
  }

  return (
    <a href={href} onClick={onClick}>
      {label}
    </a>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          className="site-header__brand"
          href="#hero-title"
          aria-label="TECTRANZ home"
        >
          <img src="/images/tectranz-logo.png" alt="TECTRANZ" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label="Main navigation">
          <ul className="main-nav__list">
            {navigation.slice(0, 1).map(([label, href]) => (
              <li key={label}>
                <NavigationLink
                  label={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                />
              </li>
            ))}
            <li className="main-nav__programs">
              <button
                type="button"
                aria-expanded={programsOpen}
                onClick={() => setProgramsOpen((open) => !open)}
              >
                Programs <span aria-hidden="true">⌄</span>
              </button>
              <ul className={`program-menu${programsOpen ? ' program-menu--open' : ''}`}>
                {technicalProgrammes.map(({ id, title }) => (
                  <li key={id}>
                    <NavigationLink
                      label={title}
                      href={`#programme-${id}`}
                      onClick={() => {
                        setMenuOpen(false)
                        setProgramsOpen(false)
                      }}
                    />
                  </li>
                ))}
                <li>
                  <NavigationLink
                    label="Interview Preparation for AI"
                    href="#program-overview"
                    onClick={() => {
                      setMenuOpen(false)
                      setProgramsOpen(false)
                    }}
                  />
                </li>
              </ul>
            </li>
            {navigation.slice(1).map(([label, href]) => (
              <li key={label}>
                <NavigationLink
                  label={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                />
              </li>
            ))}
            <li className="main-nav__mobile-cta">
              <a
                className="button button--primary"
                href="#contact-title"
                onClick={() => setMenuOpen(false)}
              >
                Enroll Now
              </a>
            </li>
          </ul>
        </nav>
        <a
          className="site-header__cta button button--primary"
          href="#contact-title"
        >
          Enroll Now
        </a>
      </div>
    </header>
  )
}

export default Header
