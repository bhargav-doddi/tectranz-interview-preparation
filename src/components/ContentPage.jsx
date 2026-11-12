function ContentPage({ page }) {
  return (
    <section
      className="program-intro"
      id="content-page"
      aria-labelledby="content-page-title"
    >
      <div className="section-wrap">
        <h1 className="section-title" id="content-page-title">
          {page.title}
        </h1>
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {page.topics && (
          <>
            <h2 className="section-title">Key Topics</h2>
            <ul className="learning__list">
              {page.topics.map((topic) => (
                <li key={topic}>
                  <span aria-hidden="true">✓</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            <h2 className="section-title">Practical Skills and Learning Outcome</h2>
            <p>{page.outcome}</p>
          </>
        )}
        {page.kind === 'programme' && (
          <a className="button button--primary" href="#program-overview">
            Back to Interview Preparation
          </a>
        )}
        {page.kind === 'programme' && (
          <a className="button button--primary" href="#contact-title">
            Enquire About This Programme
          </a>
        )}
        {page.hash === '#for-enterprises' && (
          <a className="button button--primary" href="#contact-title">
            Enquire About Team Learning
          </a>
        )}
      </div>
    </section>
  )
}

export default ContentPage
