export const HERO = {
  wordmark: 'Sunrise Gen AI',
  headline: ['Enterprise GenAI,', 'built to run.'],
  tagline: 'Grounding the Autonomous Era',
  lede: 'Autonomous agents, retrieval, and data platforms in production.',
}

export const TICKER = [
  'Agentic operations',
  'Grounded retrieval',
  'Data platforms',
  'MCP-native delivery',
  'Evaluation and guardrails',
  'AWS · Azure · Google Cloud',
  'West Palm Beach, FL',
]

export type OfferFigure = 'harness' | 'graph'

export type Offer = {
  id: string
  title: string
  kicker: string
  discipline: string
  summary: string
  points: string[]
  metrics?: { value: string; label: string }[]
  figure?: OfferFigure
}

export const OFFERS: Offer[] = [
  {
    id: 'autonomous-agents',
    title: 'Autonomous agents',
    kicker: 'Harness and loop engineering that finishes the job',
    discipline: 'Agents',
    figure: 'harness',
    summary:
      'We build workflow-specific harnesses — not a generic chatbot — in front of an in-network model gateway. Agents gather, act, and verify, with a test gate before they call the work done.',
    points: [
      'An in-network coding agent — single-file Python, about 1,100 lines, standard library only — with file operations, atomic multi-edit, diff preview, git operations, memory, skill packs, and session save and resume. A test gate sits in front of done.',
      'A 12-step LLM migration pipeline, about 12,000 lines, that rewrites a Java/Spring service — POMs, security configuration, controllers, permission evaluators, properties, Maven build, and git push — in about 2.5 minutes against about 7.5 hours by hand.',
      'Custom harness engineering and loop engineering on an enterprise LLM gateway: Azure versus Bedrock routing, reusable context, model-aware temperature, stop-sequence hardening, and evaluation harnesses. Gather → act → verify — never a silent template fallback. Token efficiency on the same workloads: 42% lower token spend, 2.4× useful completions per 1k tokens, and about 68% prompt-cache hit on repeated enterprise workflows.',
    ],
    metrics: [
      { value: '42%', label: 'Lower token spend on the same workloads' },
      { value: '2.4×', label: 'Useful completions per 1k tokens' },
      { value: '~68%', label: 'Prompt-cache hit on repeated workflows' },
    ],
  },
  {
    id: 'multi-agent',
    title: 'Agents and multi-agent systems',
    kicker: 'Incident intelligence, then a human on the last step',
    discipline: 'Operations',
    summary:
      'We put multi-agent systems on the telemetry, tickets, and runbooks you already run — and on the service call graph — then keep a person on the last step. Mean time to recovery drops 75%.',
    points: [
      'Incident intelligence that reads telemetry, tickets, and runbooks together, then hands the on-call a ranked hypothesis and MCP-guided remediation with the evidence attached. 75% lower mean time to recovery.',
      'MCP-native agents on the tools your teams already use, plus a graph-intelligence platform: 15 MCP tools and 20 REST endpoints over a service call graph, with multi-turn session tracking, entity extraction, and intent routing to 12 handlers.',
      'A human keeps the last step. We do not run production operations fully unsupervised.',
    ],
    metrics: [{ value: '75%', label: 'Lower mean time to recovery' }],
  },
  {
    id: 'rag-llm',
    title: 'RAG and LLM architecture',
    kicker: 'Answers with a citation — and a refusal when there is none',
    discipline: 'Knowledge',
    figure: 'graph',
    summary:
      'Grounded retrieval over tickets, documents, and runbooks. Context graphs and Graph Architecture hold the relationships; evaluation harnesses measure whether the system stays honest.',
    points: [
      'RAG and GraphRAG over the knowledge your teams actually wrote, with citations, a confidence signal, and a refusal when the source does not support the answer.',
      'A graph and LLM pipeline that writes wiki-ready API documentation and migration-eligibility assessments per service, including token-scheme classification checked against ground truth.',
      'Evaluation harnesses, guardrails, and regression suites treated as product surface. The same harness and gateway pattern — routing, reusable context, stop-sequence hardening — is how we hold 42% lower token spend and 2.4× useful completions per 1k tokens, with about 68% prompt-cache hit on repeated workflows. Context graphs and Graph Architecture sit under the retrieval. That is harness engineering for evaluation.',
    ],
  },
  {
    id: 'data-ai',
    title: 'Data processing with AI',
    kicker: 'Schema, mapping, inventory, and warehouse rules',
    discipline: 'Data',
    summary:
      'We replace the mapping grind and the warehouse-rule grind with pipelines that propose, score, and explain — and we inventory the estate so the work has a map.',
    points: [
      'Schema and attribute mapping with confidence scoring and a review queue — up to 60% less time on that work, and 3× throughput on attribute mapping.',
      'AST inventory of a Java/Spring estate: 63 services, 236 controllers, 467 controller-level tasks, 506 REST endpoints. Lakes, ETL, Spark, and Databricks sit under the work.',
      'A manifest-driven rule engine — 118 externalized SQL detection rules against a 432-table gold warehouse — with SHA-256 hash-locked artifacts, fail-closed integrity, UUID5 idempotency, and 44,000+ records per run. GxP-grade, Part 11-style auditability as a capability.',
    ],
    metrics: [
      { value: '60%', label: 'Up to 60% less time on schema and mapping work' },
      { value: '3×', label: 'Throughput on attribute mapping' },
    ],
  },
  {
    id: 'platforms',
    title: 'Platforms and delivery',
    kicker: 'Lakes, migration, regulated quality, production serving',
    discipline: 'Delivery',
    summary:
      'The rest of the system: Graph Architecture for blast-radius and scoping, legacy-to-cloud extracts with lineage, serving-layer RBAC, and review-ready validation writing — on AWS, Azure, and Google Cloud.',
    points: [
      'Static-analysis Graph Architecture: 75 Java microservices, 504 endpoints, 10 UI applications, and 15 external systems into Neo4j, with 88.9% edge resolution, used for blast-radius, migration scoping, and security review. That is graph engineering.',
      'Legacy-to-cloud and mainframe-class extracts with lineage preserved. Serving-layer RBAC — 5 capability modules, 11 role grants, a 25-endpoint registry. Sixteen immutable DDL releases. GAMP Category 5 validation writing as a capability — URS, system specification, architecture, and configuration — without naming a product. PlantUML held in lockstep with the design pack. Multi-cloud: AWS, Azure, GCP.',
      'Android and iOS product engineering. We designed and built the Ingre apps (ingre.ai): camera scan, label parse, and the harmful-ingredient call, for food and beauty labels.',
    ],
  },
]

export const CAPABILITIES = [
  {
    n: '01',
    title: 'In-network coding agent',
    body: 'Loop engineering with file operations, memory, and a test gate before done.',
  },
  {
    n: '02',
    title: 'LLM service-migration pipeline',
    body: 'Twelve steps that rewrite a Java/Spring service in about 2.5 minutes versus about 7.5 hours by hand.',
  },
  {
    n: '03',
    title: 'Incident intelligence',
    body: 'Multi-agent, MCP-guided remediation over telemetry, tickets, and runbooks. 75% lower MTTR.',
  },
  {
    n: '04',
    title: 'Graph intelligence over MCP',
    body: '15 tools and 20 endpoints on a service call graph, with a human on the last step.',
  },
  {
    n: '05',
    title: 'RAG and context graphs',
    body: 'Grounded retrieval with citations, refusals, and Graph Architecture under it.',
  },
  {
    n: '06',
    title: 'Evaluation harnesses',
    body: '42% lower token spend, 2.4× useful completions per 1k tokens, about 68% prompt-cache hit.',
  },
  {
    n: '07',
    title: 'Schema and attribute mapping',
    body: 'Up to 60% less time, 3× throughput, with confidence scoring and a review queue.',
  },
  {
    n: '08',
    title: 'Manifest-driven rule engines',
    body: '118 SQL detection rules over a 432-table gold warehouse. Hash-locked, fail-closed.',
  },
  {
    n: '09',
    title: 'Graph Architecture',
    body: '88.9% edge resolution for blast-radius, migration scoping, and security review.',
  },
]

export const MEDIA_SENTENCE =
  'Image models for the visuals, text models for the words, video models for the motion.'

export const MEDIA_USES = ['Marketing materials', 'Campaigns', 'Web content']

export const MEDIA_MODELS = [
  {
    n: '01',
    title: 'Image models',
    body: 'Key visuals, product and lifestyle imagery, and the social and display variants that all come off one art direction rather than six.',
    output: 'Key art · Product shots · Social & display',
  },
  {
    n: '02',
    title: 'Text models',
    body: 'Campaign copy, landing and product page content, and long-form written to a brief and held to a brand voice across every variant.',
    output: 'Campaign copy · Web content · Long-form',
  },
  {
    n: '03',
    title: 'Video models',
    body: 'Short-form video, motion cutdowns, and animated variants for the placements that need moving image instead of a still.',
    output: 'Short-form · Cutdowns · Motion variants',
  },
]

export const PROOF = [
  { value: '75%', label: 'Lower mean time to recovery' },
  { value: '42%', label: 'Lower token spend on the same workloads' },
  { value: '60%', label: 'Less time on schema and mapping work' },
  { value: '3×', label: 'Throughput on attribute mapping' },
]

export const CONTACT = {
  company: 'Sunrise Gen AI LLC',
  principal: 'Srikanth Bellary, Principal',
  city: 'West Palm Beach, FL',
  email: 'sbellary@sunrisegenai.com',
  phone: '440-340-8383',
  phoneHref: 'tel:+14403408383',
}
