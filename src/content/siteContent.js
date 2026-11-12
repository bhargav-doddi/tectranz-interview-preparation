export const technicalProgrammes = [
  {
    id: 'genai-llm-application-engineering',
    title: 'GenAI & LLM Application Engineering',
    overview:
      'A technical learning track covering the concepts and components used to build applications with generative AI and large language models.',
    topics: [
      'Generative AI fundamentals',
      'Large language model application development',
      'Prompt engineering',
      'Retrieval-Augmented Generation (RAG)',
      'Vector databases',
      'AI agents',
    ],
    outcome:
      'Practise explaining how these components fit together in an AI application and discuss practical implementation choices.',
  },
  {
    id: 'mlops-ai-infrastructure-engineering',
    title: 'MLOps & AI Infrastructure Engineering',
    overview:
      'A technical learning track focused on operating and supporting machine-learning and AI systems.',
    topics: [
      'Model deployment and serving',
      'Docker and containerization',
      'CI/CD for machine-learning systems',
      'Model monitoring',
      'Cloud concepts',
      'AI infrastructure concepts',
    ],
    outcome:
      'Build understanding of deployment and operations workflows and practise describing infrastructure decisions for AI systems.',
  },
  {
    id: 'data-engineering-for-ai-systems',
    title: 'Data Engineering for AI Systems',
    overview:
      'A technical learning track on preparing, processing, and managing data used by AI applications.',
    topics: [
      'Data pipelines',
      'ETL and ELT',
      'Data processing',
      'Data quality',
      'Data storage',
      'Data preparation for AI applications',
    ],
    outcome:
      'Practise reasoning about data pipeline stages, quality checks, and storage choices that support AI use cases.',
  },
  {
    id: 'ai-ml-research-data-science',
    title: 'AI/ML Research & Data Science',
    overview:
      'A technical learning track covering core methods for developing and evaluating machine-learning models.',
    topics: [
      'Machine learning',
      'Deep learning',
      'Statistical fundamentals',
      'Model development',
      'Model evaluation',
      'Experimentation and research',
    ],
    outcome:
      'Strengthen the ability to discuss modelling decisions, evaluation, and experimental results in technical interviews.',
  },
  {
    id: 'ai-security-red-teaming',
    title: 'AI Security & Red Teaming',
    overview:
      'A technical learning track on assessing AI applications responsibly and understanding their security risks.',
    topics: [
      'AI security fundamentals',
      'LLM security',
      'Prompt injection risks',
      'AI application vulnerabilities',
      'Responsible AI testing',
      'Defensive security practices',
    ],
    outcome:
      'Practise identifying AI application risks, discussing responsible testing, and describing defensive mitigations.',
  },
  {
    id: 'computer-vision-engineering',
    title: 'Computer Vision Engineering',
    overview:
      'A technical learning track covering common methods and tools for building computer-vision applications.',
    topics: [
      'Image processing',
      'Computer-vision fundamentals',
      'Object detection',
      'Image classification',
      'OpenCV',
      'Deep learning for vision',
    ],
    outcome:
      'Develop a structured way to explain computer-vision approaches, tasks, and implementation considerations.',
  },
]

export const informationPages = {
  about: {
    hash: '#about-us',
    title: 'About TECTRANZ',
    paragraphs: [
      'This website presents the TECTRANZ AI Interview Preparation Program for experienced professionals.',
      'The programme information on this site covers structured interview preparation, practical projects, mock interviews, CV preparation, and career guidance. No additional verified company history or profile information is available in this project.',
    ],
  },
  blogs: {
    hash: '#blogs',
    title: 'Blogs',
    paragraphs: [
      'Articles are not currently available on this website.',
    ],
  },
  reviews: {
    hash: '#reviews',
    title: 'Reviews',
    paragraphs: [
      'No approved programme reviews or testimonials are currently available on this website.',
    ],
  },
  enterprise: {
    hash: '#for-enterprises',
    title: 'For Enterprises',
    paragraphs: [
      'Organizations can use the enquiry form to discuss AI interview preparation for teams and learning or upskilling areas relevant to their needs.',
      'Topics may include the technical programme areas listed on this website and practical project-based learning. The form is an enquiry channel; programme scope and arrangements should be discussed with TECTRANZ.',
    ],
  },
}

export function getContentPage(hash) {
  const programme = technicalProgrammes.find(
    ({ id }) => hash === `#programme-${id}`,
  )

  if (programme) {
    return {
      kind: 'programme',
      hash: `#programme-${programme.id}`,
      title: programme.title,
      paragraphs: [programme.overview],
      topics: programme.topics,
      outcome: programme.outcome,
    }
  }

  return (
    Object.values(informationPages).find((page) => page.hash === hash) ?? null
  )
}
