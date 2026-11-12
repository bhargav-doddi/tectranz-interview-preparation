import { useEffect, useRef, useState } from 'react'
import ContactForm from './components/ContactForm.jsx'
import ContentPage from './components/ContentPage.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ProgramPage from './components/ProgramPage.jsx'
import { getContentPage } from './content/siteContent.js'
import './App.css'

function App() {
  const [contentPage, setContentPage] = useState(() =>
    getContentPage(window.location.hash),
  )
  const contactFormRef = useRef(null)

  useEffect(() => {
    function syncLocation() {
      setContentPage(getContentPage(window.location.hash))
    }

    window.addEventListener('hashchange', syncLocation)
    syncLocation()

    return () => window.removeEventListener('hashchange', syncLocation)
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => {
      const targetId = contentPage
        ? 'content-page'
        : decodeURIComponent(window.location.hash.slice(1))
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    })
  }, [contentPage])

  return (
    <>
      <Header />
      <main>
        {contentPage ? (
          <ContentPage page={contentPage} />
        ) : (
          <>
            <section className="hero" aria-labelledby="hero-title">
              <div className="hero__inner">
                <h1 id="hero-title">AI Interview Preparation Program</h1>
                <p>
                  Prepare professionals for AI engineering and Generative AI
                  interviews through structured learning, practical projects,
                  resume preparation and mock interviews.
                </p>
                <div className="hero__actions">
                  <a className="button button--primary" href="#contact-title">
                    Apply Now
                  </a>
                </div>
              </div>
            </section>
            <ProgramPage
              onExpertCVReview={() =>
                contactFormRef.current?.requestExpertCVReview()
              }
            />
          </>
        )}
        <ContactForm ref={contactFormRef} />
      </main>
      <Footer />
    </>
  )
}

export default App
