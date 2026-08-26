export const HERO = {
  wordmark: 'Sunrise Gen AI',
  headline: ['Production systems', 'for operations and', 'messy knowledge.'],
  tagline: 'Grounding the Autonomous Era',
  lede:
    'An enterprise AI and data practice. We build the agents, retrieval, and pipelines that hold up in production — and we ship the products we use ourselves.',
}

export const TICKER = [
  '15+ years in enterprise data',
  'Google Cloud Professional Data Engineer',
  'Agentic operations',
  'RAG / GraphRAG',
  'Mainframe → cloud',
  'MCP',
  'Wellington, FL',
]

export type Engagement = {
  id: string
  client: string
  program: string
  discipline: string
  summary: string
  points: string[]
  metrics?: { value: string; label: string }[]
}

export const ENGAGEMENTS: Engagement[] = [
  {
    id: 'verizon',
    client: 'Verizon',
    program: 'Agents for SRE',
    discipline: 'Agentic operations',
    summary:
      'Agents that sit inside network operations: they read telemetry, ticket history, and runbooks together, then hand on-call a ranked hypothesis instead of ten dashboards.',
    points: [
      'Incident intelligence built on the observability and ticketing systems already in place — no new console to learn.',
      'Recommended actions arrive with the evidence attached, so an engineer can accept, adjust, or reject with the reasoning in view.',
      'Guided remediation wired to existing operational tooling over MCP, with the human keeping the last step.',
    ],
  },
  {
    id: 'circana',
    client: 'Circana',
    program: 'Attribute & schema mapping',
    discipline: 'GenAI data pipelines',
    summary:
      'Retail and CPG data arrives from thousands of sources that never agree on a schema. We replaced the manual mapping grind with an LLM pipeline that proposes, scores, and explains every mapping.',
    points: [
      'Attribute and schema mapping across messy, multi-source catalogs, with confidence scoring and a human review queue for the tail.',
      'Every mapping carries its rationale, so analysts audit decisions instead of redoing them.',
    ],
    metrics: [
      { value: '60%', label: 'Less manual effort on schema and attribute mapping' },
      { value: '75%', label: 'Auto-mapping accuracy across multi-source catalogs' },
      { value: '3×', label: 'Faster turnaround onboarding a new data source' },
    ],
  },
  {
    id: 'thermofisher',
    client: 'Thermo Fisher',
    program: 'Mainframe to cloud',
    discipline: 'Data modernization',
    summary:
      'The system of record still lived on the mainframe. We moved the analytics off it without pretending the mainframe was going away.',
    points: [
      'Mainframe extracts reshaped into cloud-native tables with lineage preserved end to end.',
      'Modernized pipelines running alongside the legacy system while the business kept transacting.',
    ],
  },
  {
    id: 'cvs',
    client: 'CVS Health',
    program: 'RPhAI',
    discipline: 'Applied LLM systems',
    summary:
      'AI brought into the pharmacist\u2019s workflow, where a confident wrong answer is worse than no answer at all.',
    points: [
      'Grounded retrieval over pharmacy policy and operational knowledge, with citations a pharmacist can check.',
      'Guardrails and evaluation treated as product surface, not an afterthought at the end of the build.',
    ],
  },
  {
    id: 'earlier',
    client: 'Earlier work',
    program: 'The foundation',
    discipline: '15+ years',
    summary:
      'Before the agent work: fifteen-plus years building the data estate that AI now runs on top of.',
    points: [
      'Warehousing, ETL/ELT, streaming, BI, and production ML across AWS, Azure, and Google Cloud.',
      'Architecture through delivery — ARB-ready designs defended in front of C-level and engineering alike.',
      'Google Cloud Professional Data Engineer.',
    ],
  },
]

export const CAPABILITIES = [
  {
    n: '01',
    title: 'Agentic operations',
    body: 'Incident intelligence, recommended actions, and guided remediation, wired to the tools your teams already run.',
  },
  {
    n: '02',
    title: 'Enterprise RAG & GraphRAG',
    body: 'Retrieval over tickets, runbooks, contracts, and docs — with citations, confidence, and a review path.',
  },
  {
    n: '03',
    title: 'GenAI data pipelines',
    body: 'Schema and attribute mapping across messy multi-source data, scored and explained rather than guessed.',
  },
  {
    n: '04',
    title: 'Multi-cloud platforms',
    body: 'Lakes, ETL/ELT, streaming, and production ML on AWS, Azure, and Google Cloud.',
  },
  {
    n: '05',
    title: 'Mainframe → cloud',
    body: 'Extract, reshape, and land critical legacy systems in the cloud without losing lineage.',
  },
  {
    n: '06',
    title: 'Production LLM systems',
    body: 'Prompt and context engineering, evaluation harnesses, and cost visibility once the model is live.',
  },
  {
    n: '07',
    title: 'Guardrails & evaluation',
    body: 'Refusals, grounding checks, and regression suites so behaviour is measured, not hoped for.',
  },
  {
    n: '08',
    title: 'MLOps',
    body: 'Training, serving, monitoring, and rollback paths for models that have to stay up.',
  },
  {
    n: '09',
    title: 'Architecture & delivery',
    body: 'Designs that survive review, and delivery with the stakeholders who have to sign for it.',
  },
]

export const CONTACT = {
  city: 'Wellington, FL',
  email: 'sbellary@sunrisegenai.com',
  phone: '440-340-8383',
  phoneHref: 'tel:+14403408383',
}
