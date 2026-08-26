export const HERO = {
  wordmark: 'Sunrise Gen AI',
  headline: ['Enterprise GenAI,', 'built to run.'],
  tagline: 'Grounding the Autonomous Era',
  lede: 'Agents, retrieval, and data platforms in production.',
}

export const TICKER = [
  'Agentic operations',
  'Grounded retrieval',
  'Data platforms',
  'MCP-native delivery',
  'Evaluation and guardrails',
  'AWS · Azure · Google Cloud',
  'Wellington, FL',
]

export type Offer = {
  id: string
  title: string
  kicker: string
  discipline: string
  summary: string
  points: string[]
  metrics?: { value: string; label: string }[]
}

export const OFFERS: Offer[] = [
  {
    id: 'agentic-ops',
    title: 'Agentic operations',
    kicker: 'GenAI inside the operations you already run',
    discipline: 'Operations',
    summary:
      'We put agents where the work already happens. They read telemetry, ticket history, and runbooks together, and hand the on-call engineer a ranked hypothesis instead of ten dashboards.',
    points: [
      'Incident intelligence built on your existing observability and ticketing — no new console for anyone to learn.',
      'Recommended actions arrive with the evidence attached, so an engineer can accept, adjust, or reject with the reasoning in view.',
      'Guided remediation wired to your tooling over MCP, with a human keeping the last step.',
    ],
  },
  {
    id: 'rag',
    title: 'Grounded retrieval',
    kicker: 'Answers with a citation you can open',
    discipline: 'Knowledge',
    summary:
      'Retrieval over tickets, documents, and runbooks that stays honest when the book is messy. If the source does not support the answer, the system says so instead of inventing one.',
    points: [
      'RAG and GraphRAG across the knowledge your teams actually wrote, contradictions and all.',
      'Every answer carries its citation and a confidence signal, so reviewers audit rather than re-research.',
      'Refusals, grounding checks, and regression suites treated as product surface, not a final-week afterthought.',
    ],
  },
  {
    id: 'data-platforms',
    title: 'Data platforms',
    kicker: 'Schema and mapping work, done by machine',
    discipline: 'Data',
    summary:
      'Multi-source data never agrees on a schema. We replace the manual mapping grind with a GenAI pipeline that proposes, scores, and explains every mapping, and routes only the tail to a human.',
    points: [
      'Schema and attribute mapping across messy, multi-source catalogs, with confidence scoring and a review queue.',
      'Lakes, ETL/ELT, streaming, and production ML on AWS, Azure, and Google Cloud.',
      'Every mapping carries its rationale, so analysts audit decisions instead of redoing them.',
    ],
    metrics: [
      { value: '60%', label: 'Up to 60% less time on schema and mapping work' },
      { value: '3×', label: 'Throughput on attribute mapping' },
    ],
  },
  {
    id: 'migration',
    title: 'Migration & modernization',
    kicker: 'Move the analytics without moving the risk',
    discipline: 'Modernization',
    summary:
      'Mainframe-to-cloud and legacy-to-cloud migrations as a capability: extract, reshape, and land critical systems in the cloud without losing lineage and without asking the business to stop transacting.',
    points: [
      'Legacy extracts reshaped into cloud-native tables with lineage preserved end to end.',
      'Modernized pipelines running alongside the system of record until the cutover is boring.',
    ],
  },
  {
    id: 'delivery',
    title: 'Production LLM systems',
    kicker: 'The part after the demo',
    discipline: 'Delivery',
    summary:
      'A demo is not a system. We take models the rest of the way: prompt and context engineering, evaluation harnesses, guardrails, cost visibility, and the rollback path you need the first time it misbehaves.',
    points: [
      'Evaluation harnesses that measure behaviour instead of hoping for it.',
      'Serving, monitoring, and rollback for models that have to stay up.',
      'Architecture and delivery with the stakeholders who have to sign for it — review-ready.',
    ],
  },
]

export const CAPABILITIES = [
  {
    n: '01',
    title: 'Incident intelligence',
    body: 'Telemetry, tickets, and runbooks read together, so triage starts from a ranked hypothesis.',
  },
  {
    n: '02',
    title: 'Recommended actions',
    body: 'Next steps proposed with the evidence attached, for an engineer to accept, adjust, or reject.',
  },
  {
    n: '03',
    title: 'Agents over MCP',
    body: 'Agents wired to the tools your teams already run, rather than another console beside them.',
  },
  {
    n: '04',
    title: 'RAG & GraphRAG',
    body: 'Grounded retrieval over tickets, docs, and runbooks — with citations and a review path.',
  },
  {
    n: '05',
    title: 'Schema & attribute mapping',
    body: 'GenAI pipelines that propose, score, and explain mappings across messy multi-source data.',
  },
  {
    n: '06',
    title: 'Lakes & pipelines',
    body: 'Multi-source lakes, ETL/ELT, and streaming on AWS, Azure, and Google Cloud.',
  },
  {
    n: '07',
    title: 'Legacy to cloud',
    body: 'Mainframe-style migrations that keep lineage intact while the business keeps transacting.',
  },
  {
    n: '08',
    title: 'Evaluation & guardrails',
    body: 'Refusals, grounding checks, and regression suites so behaviour is measured, not assumed.',
  },
  {
    n: '09',
    title: 'MLOps & cost visibility',
    body: 'Serving, monitoring, rollback, and a clear view of what the model costs once it is live.',
  },
]

export const PROOF = [
  { value: '60%', label: 'Up to 60% less time on schema and mapping work' },
  { value: '3×', label: 'Throughput on attribute mapping' },
  { value: 'MCP', label: 'Agents on the tools you already run' },
]

export const CONTACT = {
  company: 'Sunrise Gen AI LLC',
  principal: 'Srikanth Bellary, Principal',
  city: 'Wellington, FL',
  email: 'sbellary@sunrisegenai.com',
  phone: '440-340-8383',
  phoneHref: 'tel:+14403408383',
}
