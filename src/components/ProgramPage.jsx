import { useState } from 'react'

const facts = [
  {
    image: '33793133_2384-1-scaled-e1768560616588-removebg-preview.png',
    label: 'Working professionals',
  },
  {
    image: '88659884_14356__1_-removebg-preview.png',
    label: 'Experienced practitioners',
  },
  {
    image: '415589612_0f8af105-4e69-4060-937d-a74b83f359e9-removebg-preview.png',
    label: 'Professionals in analytics',
  },
  {
    image: '13925426_Robot_and_man_working_at_computers_together-removebg-preview.png',
    label: 'AI, Machine Learning and Software Engineering Professionals',
  },
]

const highlights = [
  'Capstone Projects: option to work on 4 industry-relevant projects',
  'Mock interviews with AI/ML experts',
  'Placement assistance',
  'Standout CV creation guided and reviewed by experts',
  'Detailed feedback and a plan of action for interview preparation',
  'Salary negotiation guidelines',
  'Job application guidance and support',
  'Revision of key AI technical interview topics and questions',
  'Document with 300+ most asked questions and answers',
]

const learningItems = [
  {
    title: 'Artificial Intelligence Fundamentals',
    description:
      'Review core AI concepts and how to explain their use in practical systems.',
  },
  {
    title: 'Machine Learning Fundamentals',
    description:
      'Revisit common learning approaches, model choices, and evaluation concepts.',
  },
  {
    title: 'Deep Learning',
    description:
      'Build interview-ready understanding of deep learning concepts and applications.',
  },
  {
    title: 'Generative AI',
    description:
      'Discuss generative AI capabilities, use cases, and application considerations.',
  },
  {
    title: 'Large Language Models (LLMs)',
    description:
      'Prepare to explain LLM concepts and their role in AI-powered applications.',
  },
  {
    title: 'Prompt Engineering',
    description:
      'Practise describing prompt design and iteration for language-model tasks.',
  },
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    description:
      'Understand how retrieval can provide relevant context to generated responses.',
  },
  {
    title: 'Vector Databases',
    description:
      'Review the role of vector representations and similarity search in AI systems.',
  },
  {
    title: 'AI Agents and Agentic AI',
    description:
      'Explore agent patterns, tool use, and considerations for task-oriented systems.',
  },
  {
    title: 'AI Application Development',
    description:
      'Connect models and supporting components into usable AI applications.',
  },
  {
    title: 'Model Deployment and MLOps',
    description:
      'Review deployment, serving, monitoring, and operational considerations.',
  },
  {
    title: 'Practical AI Projects',
    description:
      'Practise explaining project choices, implementation, and business context.',
  },
  {
    title: 'AI Technical Interview Preparation',
    description:
      'Apply problem-solving and communication strategies to technical interview rounds.',
  },
]

const learningPath = [
  {
    title: 'Build the foundations',
    description:
      'Review AI, machine-learning, deep-learning, and Generative AI fundamentals.',
  },
  {
    title: 'Explore AI application components',
    description:
      'Work through LLMs, prompt engineering, RAG, vector databases, and AI agents.',
  },
  {
    title: 'Connect concepts to practical work',
    description:
      'Prepare to discuss AI applications, deployment considerations, and project decisions.',
  },
  {
    title: 'Prepare for interview conversations',
    description:
      'Practise problem-solving, project explanation, and technical interview questions.',
  },
  {
    title: 'Refine your application approach',
    description:
      'Use CV review, mock-interview feedback, and job-application guidance to plan next steps.',
  },
]

const interviewSupport = [
  {
    label: 'Mock interviews with AI/ML experts',
    image: '20822846_NA_October_10-1-scaled-e1770097789347-1024x615.jpg',
  },
  {
    label: 'Preparation for technical interview rounds',
    image: 'business_finance_illustration_concept_4-1-scaled-e1770097897490-1024x882.jpg',
  },
  {
    label: 'Preparation for managerial interview rounds',
    image: '392241584_68dffb8e-ec21-4f5b-9646-e13d6080a9cc__1_-removebg-preview.png',
  },
  {
    label: 'Preparation for stakeholder-facing rounds',
    image: '3y_adgmopbj41o6asj6dtp6qobecdilue8-1-scaled-e1770097736282-1024x937.jpg',
  },
  {
    label: 'Detailed feedback on interview performance',
    image: '21302421_05_Server_Kotak-1-scaled-e1768559375516-1024x737.jpg',
  },
  {
    label: 'A plan of action for interview preparation',
    image: 'vnu_l528_02-1-scaled-e1770097857647-1024x666.jpg',
  },
]

const recruiterLogos = [
  'halliburton.png',
  'mG.png',
  'allianz.png',
  'par.png',
  'tcs.png',
  'scatter.png',
  'wells-fargo.png',
  'bithub.png',
  'accenture.png',
  'info.png',
  'bar.png',
  'cog.png',
  'lt.png',
  'ds.png',
  'garrett.png',
  'gwc.png',
  'essex.png',
]

const aiRecruiterLogos = [
  'OpenAI-Logo.png',
  'Meta-Logo.png',
  'Nvidia-Logo.png',
  'amazon-logo.png',
  'Microsoft-Logo.png',
  'IBM-Logo.png',
  'Apple-Logo.png',
  'Tesla-Logo.png',
  'Notion-Logo.png',
  'Dropbox-Logo.png',
  'Google-Logo.png',
  'SalesForce-Logo.png',
  'Intel-Logo.png',
  'PWC-Logo.png',
  'Anthropic-Logo.png',
]

const faqs = [
  {
    question: 'What is the AI Interview Preparation Program?',
    answer:
      'It is a programme for experienced professionals preparing for AI interviews. It covers interview decision-making, problem-solving, project explanation, and technical, managerial, and stakeholder-facing interview rounds.',
  },
  {
    question: 'Who is the programme for?',
    answer:
      'It is intended for experienced professionals preparing for AI roles, including practitioners with backgrounds in analytics, machine learning, software engineering, or AI.',
  },
  {
    question: 'Are there formal prerequisites?',
    answer:
      'The programme information describes it for experienced professionals but does not publish a formal prerequisites checklist. Use the enquiry form to discuss whether it fits your background and goals.',
  },
  {
    question: 'What does the curriculum cover?',
    answer:
      'The learning path on this page covers AI and machine-learning fundamentals, deep learning, Generative AI, LLMs, prompt engineering, RAG, vector databases, AI agents, application development, deployment and MLOps, practical projects, and technical interview preparation.',
  },
  {
    question: 'Does the programme cover AI and Generative AI technologies?',
    answer:
      'The curriculum includes AI, Generative AI, LLMs, RAG, vector databases, AI agents, AI application development, and model deployment concepts. The programme information does not specify a required vendor or technology stack.',
  },
  {
    question: 'Are practical or capstone projects included?',
    answer:
      'The programme information lists an option to work on four industry-relevant capstone projects. The choice to work on them is optional.',
  },
  {
    question: 'Are mock interviews included?',
    answer:
      'Mock interviews with AI/ML experts are listed among the programme highlights, along with feedback and a preparation plan.',
  },
  {
    question: 'Does the programme help with technical interviews?',
    answer:
      'It covers technical, managerial, and stakeholder-facing interview rounds, along with decision-making, problem-solving, and explaining project and business context.',
  },
  {
    question: 'Is resume or CV preparation included?',
    answer:
      'The programme information lists CV creation guidance and expert review.',
  },
  {
    question: 'What career guidance is listed?',
    answer:
      'Job-application guidance and salary-negotiation guidelines are listed among the programme highlights.',
  },
  {
    question: 'Does the programme include placement assistance?',
    answer:
      'Placement assistance is listed among the programme highlights. This is not a placement guarantee.',
  },
  {
    question: 'How long is the programme?',
    answer:
      'The programme information describes self-paced learning over eight weeks.',
  },
  {
    question: 'Can an organization enquire about team learning?',
    answer:
      'Organizations can use the enquiry form to discuss their team’s AI interview preparation or learning needs. Programme scope and arrangements should be confirmed directly with TECTRANZ.',
  },
]

function HighlightIcon({ index }) {
  return (
    <span className="highlight__icon" aria-hidden="true">
      <img src={`/icons/highlight-${index + 1}.svg`} alt="" loading="lazy" />
    </span>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.1 16.2 4.9 12l-1.4 1.4 5.6 5.6L21 7.1l-1.4-1.4z" />
    </svg>
  )
}

function ProgramIntro() {
  return (
    <section className="program-intro" id="program-overview">
      <div className="section-wrap">
        <div className="program-intro__grid">
          <div className="program-video" aria-label="Programme video unavailable">
            <div className="program-video__speaker">
              <strong>Video unavailable</strong>
              <span>No approved TECTRANZ programme video is available</span>
            </div>
          </div>
          <div className="program-intro__copy">
            <h2 className="section-title">Programme Overview</h2>
            <h3>AI Interview Preparation for Working Professionals</h3>
            <p>
              This programme is designed for working professionals preparing
              for AI engineering and Generative AI interviews, including
              software engineers, machine learning practitioners, analytics
              professionals and experienced technology professionals
              transitioning into AI roles.
            </p>
            <p>
              It focuses on how experienced professionals are evaluated in
              interviews, including decision-making, problem-solving, project
              explanation, and business context, not just technical recall.
            </p>
            <p>
              Preparation covers technical, managerial, and stakeholder-facing
              interview rounds.
            </p>
            <div className="program-intro__actions">
              <a className="button button--primary" href="#contact-title">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Facts() {
  return (
    <section className="facts" aria-label="Program information">
      <div className="section-wrap">
        <h2 className="section-title">Who Is This Programme For?</h2>
        <div className="facts__grid">
          {facts.map(({ image, label }) => (
            <article className="fact" key={label}>
              <img src={`/images/${image}`} alt="" />
              <h3>{label}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="highlights">
      <div className="section-wrap">
        <h2 className="section-title">Programme Highlights</h2>
        <h3 className="section-title">Capstone Projects</h3>
        <p>
          Option to work on four industry-relevant capstone projects.
        </p>
        <div className="highlights__grid">
          {highlights.map((highlight, index) => (
            <article className="highlight" key={highlight}>
              <HighlightIcon index={index} />
              <h3>{highlight}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Learning() {
  return (
    <section className="learning">
      <div className="section-wrap">
        <h2 className="section-title">Learning Path and Curriculum</h2>
        <div className="learning__grid">
          <img
            className="learning__image"
            src="/images/38355817_BInk-C_Tech-21_Tale-10-1-1024x1024.jpg"
            alt=""
          />
          <ul className="learning__list">
            {learningItems.map((item) => (
              <li key={item.title}>
                <CheckIcon />
                <span>
                  <strong>{item.title}</strong>
                  <br />
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function LearningPath() {
  return (
    <section className="learning-path">
      <div className="section-wrap">
        <h2 className="section-title">
          Learning Path
        </h2>
        <div className="learning-path__steps">
          {learningPath.map((step, index) => (
            <article className="path-step" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="learning-path__cta">
          <a className="button button--primary" href="#contact-title">
            Enroll Now
          </a>
        </div>
      </div>
    </section>
  )
}

function WhyProgram() {
  return (
    <section className="why">
      <div className="section-wrap">
        <h2 className="section-title">Mock Interviews</h2>
        <div className="why__grid">
          {interviewSupport.map(({ label, image }) => (
            <article className="why-item" key={label}>
              <img src={`/images/${image}`} alt="" loading="lazy" />
              <h3>{label}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoMarquee({ logos, reverse = false }) {
  const loopedLogos = [...logos, ...logos]

  return (
    <div className={`logo-marquee${reverse ? ' logo-marquee--reverse' : ''}`}>
      <div className="logo-marquee__track">
        {loopedLogos.map((logo, index) => (
          <span className="recruiter-logo" key={`${logo}-${index}`}>
            <img src={`/images/${logo}`} alt="" loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Recruiters() {
  return (
    <section className="recruiters">
      <div className="section-wrap">
        <h2>Career Guidance and Placement Assistance</h2>
        <p>
          The programme lists placement assistance, job application guidance,
          salary negotiation guidelines, and support from industry experts.
        </p>
        <h2>Examples of Companies in the AI Sector</h2>
        <p>
          Company logos are shown for general industry context and do not imply
          affiliation, endorsement, or placement outcomes.
        </p>
      </div>
      <LogoMarquee logos={recruiterLogos} />
      <LogoMarquee logos={aiRecruiterLogos} reverse />
    </section>
  )
}

function Enrollment({ onExpertCVReview }) {
  return (
    <section className="enrollment">
      <div className="enrollment__card">
        <p className="enrollment__eyebrow">RESUME PREPARATION</p>
        <h2>Resume and CV Preparation</h2>
        <p className="enrollment__old-price">
          Standout CV creation guided and reviewed by experts
        </p>
        <button
          className="enrollment__offer"
          type="button"
          onClick={onExpertCVReview}
        >
          Expert CV Review
        </button>
        <p className="enrollment__note">Detailed feedback and a plan of action for interview preparation.</p>
        <div className="enrollment__actions">
          <a className="button button--primary" href="#contact-title">
            Enroll Now
          </a>
        </div>
      </div>
    </section>
  )
}

function FAQs() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faqs">
      <div className="section-wrap faqs__content">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index
            const answerId = `faq-answer-${index}`

            return (
              <article className="faq" key={question}>
                <button
                  className="faq__question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="faq__question-text">{question}</span>
                  <span className="faq__chevron" aria-hidden="true">
                    ⌄
                  </span>
                </button>
                <div
                  className={`faq__answer${isOpen ? ' faq__answer--open' : ''}`}
                  id={answerId}
                  aria-hidden={!isOpen}
                >
                  <div className="faq__answer-inner">
                    <p>{answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="faqs__cta">
          <a className="button button--primary" href="#contact-title">
            Enroll Now
          </a>
        </div>
      </div>
    </section>
  )
}

function ProgramPage({ onExpertCVReview }) {
  return (
    <>
      <ProgramIntro />
      <Facts />
      <Highlights />
      <Learning />
      <LearningPath />
      <WhyProgram />
      <Recruiters />
      <Enrollment onExpertCVReview={onExpertCVReview} />
      <FAQs />
    </>
  )
}

export default ProgramPage
