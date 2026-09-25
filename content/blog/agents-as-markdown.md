---
title: The agent file is the contract
description: Most production agents are Markdown contracts, not framework code. Role, instructions, constraints, tool refs. Describing the agent is the product surface. Description without a harness is still a costume.
date: '2026-09-25'
slug: agents-as-markdown
image: /og.png
tags:
  - agents
  - harness
  - production
---

We build production GenAI for operations, knowledge, and data. That sentence used to point at frameworks. Custom loops. Custom tool wiring. A repo that only three people understood. The work still needs a loop. What changed is where the agent itself lives. For a growing class of jobs, the agent is not a Python class. It is a Markdown file: role, instructions, constraints, and references to the tools or data it may touch. Describing the agent is the product surface. Implementing a framework is optional scaffolding.

That claim makes people nervous, because it sounds like "prompts are enough." They are not. A Markdown agent without gather, act, verify, permissions, and a readable trace is a costume with nicer formatting. The file is the contract. The harness is how the contract runs. Lose either one and the floor learns the difference on a messy ticket.

## Most agents are files now

Traditionally an agent meant four things glued together: a model, an agentic loop, tool wiring, and custom logic inside a framework. That stack still exists. It is just no longer the starting point for every job.

For many teams the agent is defined by a file the harness can load. Role. Clear instructions. Boundaries. Tool and data references. Sometimes that file is named AGENTS.md. Sometimes it is a skill pack. Sometimes it is a short contract checked into the same repo as the workflow. The names vary. The shape does not. You are not implementing the thinking. You are describing what the agent is allowed to do, how it should decide, and what it must refuse.

That feels closer to product design than to framework engineering. More "describe the system" than "implement the system."

Code is not gone. For ops desks, knowledge queues, and mapping work, code is often no longer where the agent begins. The starting point is a readable contract a person can review in a pull request.

Reusable skills already taught part of this lesson. A skill is a named pack the harness loads for a procedure. The agent file is one layer up. It is the identity of the worker: who it is, what jobs it takes, what it must never touch, which skills and tools sit on its allowlist. Skills travel between projects. The agent file is the job description that decides which skills get to travel into this run.

## Description without a harness is a costume

A Markdown file does not gather evidence. It does not fire a named tool. It does not score a schema. It does not put a person on the last step when the blast radius is real. Those are harness jobs.

The loop stays the same: inspect and gather, act under permissions, verify before done. The agent file feeds that loop. It does not replace it. Guides and constraint docs earn their keep when every line is a past failure turned into a permanent rule. Sensors still matter. Permissions still sit under act. Observability still writes a rail a reviewer can read after the run fails.

Incident desks still only get 75% lower mean time to recovery when a ranked hypothesis arrives with evidence and a person on the last step. A beautiful AGENTS.md that never reads telemetry is theater. Mapping queues still only show up to 60% less time on schema and mapping, and 3× throughput on attribute mapping, when the model proposes inside a scored contract. The Markdown says what "scored" means. The harness enforces the score.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 440" role="img" aria-labelledby="md-title md-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="md-title">Markdown agent contract inside the production harness</title><desc id="md-desc">Left column: agent Markdown file with role, instructions, constraints, and tool refs. Center: gather, act, verify loop. Right: permissions bar and observability rail. Vibe paste path shown as a dead end without version or gate.</desc><rect width="640" height="440" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V420 M52 20 V420 M84 20 V420 M116 20 V420 M148 20 V420 M180 20 V420 M212 20 V420 M244 20 V420 M276 20 V420 M308 20 V420 M340 20 V420 M372 20 V420 M404 20 V420 M436 20 V420 M468 20 V420 M500 20 V420 M532 20 V420 M564 20 V420 M596 20 V420 M628 20 V420"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 424 H36 M16 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 424 H604 M624 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · AGENT AS MARKDOWN</text><text x="612" y="38" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">IN-NETWORK GATEWAY</text><rect x="28" y="56" width="176" height="196" fill="rgba(217,102,28,0.08)" stroke="#D9661C" stroke-opacity="0.55"/><text x="116" y="80" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">AGENT.MD</text><rect x="44" y="96" width="144" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="116" y="112" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">role</text><rect x="44" y="124" width="144" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="116" y="140" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">instructions</text><rect x="44" y="152" width="144" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="116" y="168" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">constraints</text><rect x="44" y="180" width="144" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="116" y="196" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">tool refs</text><rect x="44" y="212" width="144" height="28" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="116" y="231" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">VERSION · OWNER</text><path d="M204 154 H228" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="228" y="56" width="120" height="64" fill="rgba(217,102,28,0.1)" stroke="#D9661C" stroke-opacity="0.55"/><text x="288" y="82" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">01 · GATHER</text><text x="288" y="102" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">load contract</text><path d="M348 88 H372" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="372" y="56" width="120" height="64" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="432" y="82" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">02 · ACT</text><text x="432" y="102" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">named tools</text><path d="M492 88 H516" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="516" y="56" width="96" height="64" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="564" y="82" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">03 · VERIFY</text><text x="564" y="102" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">gate</text><rect x="228" y="140" width="384" height="40" fill="rgba(0,8,22,0.45)" stroke="rgba(238,234,226,0.15)"/><text x="420" y="165" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">PERMISSIONS under act · tool on the file allowlist or it does not run</text><rect x="228" y="196" width="184" height="56" fill="rgba(6,182,195,0.07)" stroke="#06B6C3" stroke-opacity="0.5"/><text x="320" y="222" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">CONTRACT PATH</text><text x="320" y="240" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">diff · review · load</text><rect x="428" y="196" width="184" height="56" fill="rgba(217,102,28,0.1)" stroke="#D9661C" stroke-opacity="0.7"/><text x="520" y="222" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">VIBE PASTE</text><text x="520" y="240" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">no version · no gate</text><path d="M520 252 V276 H116 V252" fill="none" stroke="rgba(238,234,226,0.2)" stroke-dasharray="3 4"/><text x="280" y="272" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.12em">PASTE IS A DEPLOY DEFECT</text><rect x="28" y="300" width="584" height="48" fill="rgba(0,8,22,0.4)" stroke="rgba(238,234,226,0.12)"/><text x="48" y="322" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">file hashes into the stable prefix · cache-friendly when the contract stays versioned</text><text x="48" y="340" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12">42% lower token spend · 2.4× useful completions · ~68% prompt-cache hit on repeated workflows</text><rect x="28" y="364" width="584" height="52" fill="rgba(6,182,195,0.05)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="48" y="388" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">OBSERVABILITY</text><text x="48" y="406" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">agent file id · version · tool allowlist hit · why verify opened or stayed shut</text><rect x="596" y="388" width="6" height="6" fill="#D9661C"/></svg><figcaption>Fig. 01. Agent Markdown feeds gather. Act stays under the file allowlist. Verify still gates done. Vibe paste has no version and no review path.</figcaption></figure>

Read the figure the way a reviewer will read a surprise behavior change. The left column is the contract: role, instructions, constraints, tool refs, a version, an owner. The center is still gather, act, verify. Permissions sit under act because the model will ask for a tool that is almost on the list. The right path is the failure mode everyone already knows: someone pastes a "better" system prompt into a live session at 11pm. No diff. No review. No hash into the stable prefix. The next morning the floor cannot say which agent ran.

## What the agent file actually locks

An agent Markdown file is not a mood board. It is a short list of surfaces you are willing to defend in a review.

**Role stays explicit.** Who the agent is for this job. Incident triage is not schema mapping. Knowledge answer is not code edit. If the role line could fit every workflow, it fits none.

**Instructions stay procedural.** Intent the harness can execute with the tools it already has. Not a pep talk. Not a memoir of last quarter's outage. Steps, stops, and what evidence gather must attach before act fires.

**Constraints stay fail-closed.** Budgets. Allowlists. Refuse when unsourced. Escalate when blast radius is real. Written hopes about "being careful" do not survive contact with a model paid to continue.

**Tool refs stay named.** The file points at tools and data the harness already knows. Same names the observability rail will write. If the tool is not on the list, it does not run. Soft "use whatever helps" lines are how permission bars dissolve.

**Version and owner stay on the file.** No owner means nobody hardens the contract. When a run fails because the agent file was wrong, the fix belongs in the file. Not only in the next chat.

Slim context packs already taught the packing lesson: the expensive model should see what the job needs, not the estate memoir. The agent file is how you keep that pack stable enough to hash. Cache-friendly layout still matters. When the durable contract sits in versioned files behind an in-network gateway, repeated enterprise workflows still show about 68% prompt-cache hit, alongside 42% lower token spend and 2.4× useful completions per 1k tokens. Those numbers are a consequence of stable description plus a loop that does not wander. They are not a reason to skip verify.

## Treat prompt paste as a deploy defect

If the agent is a file, changing the agent is a deploy.

That sounds bureaucratic until you watch what live paste does.

Someone rewrites the role mid-incident because the tone felt off. Someone adds a tool "just for this ticket" with a slightly different name. Someone merges yesterday's failure notes into the system block instead of into a constraint line with a version bump. The encoder sees a new prefix. Reviewers see a mystery. The floor sees a run that "used to work."

Version the agent definition the way you version software. Diff it. Review it. Load the tagged file into the harness. Write the agent file id and version into the observability rail. A deliberate bump is cheaper than a silent rewrite that ships the wrong remediation.

Numeric gates on coding diffs still sit downstream. Poetry in the Markdown does not impress them. They care whether the change passed the contract. The agent file should name which gate applies. The harness should refuse done when the gate stays shut.

## What breaks when the agent is only chat residue

**The costume chatbot.** The interface says agent. The run is a single completion with a system prompt that lives in one person's notes. No file. No version. No gather from the estate. It demos well. It does not survive a messy ticket.

**The orphan AGENTS.md.** A file exists. Nobody owns it. Nobody reviews it. When the person who wrote it leaves, the harness loses a month of tribal judgment in an afternoon.

**The silent tool sprawl.** The Markdown says "use available tools." Thirty soft names, optional arguments that mean different things on different days. Permissions become a story. The rail cannot fingerprint the schema.

**The unpatched failure.** The run fails. Someone fixes the chat. The agent file stays wrong. The next run inherits the same bug. You paid for a lesson and threw it away.

**The description that replaces the loop.** Leadership celebrates that "agents are just Markdown now." Sensors stay unplugged. Verify stays optional. Trust leaves quietly when the first ungated write lands.

Each of these is a harness bug wearing a documentation costume. A larger model will not fix them.

## Tradeoffs you actually have to make

Writing an honest agent file costs design time. Naming constraints that are real is harder than pasting a cheerful brief. Versioning and review add process. Floor staff will ask why they cannot "just tweak the prompt" during a live run.

Pay it. The alternative is an agent identity that mutates under you while the bill and the blast radius stay yours.

Another trade: one mega-agent file versus many small ones. A mega-file is easier to advertise. Small files are easier to review, refuse, and patch. Prefer small. Compose them in the harness when a job needs two roles. Skills stay the portable procedures. Agent files stay the job descriptions that select those procedures.

A third trade: framework code versus Markdown-first. Some jobs still need custom logic the file cannot express. Keep that code. Do not pretend every agent is a file. Do pretend less. Start with the contract. Add scaffolding only when the contract proves it needs it.

We still do not know how large a company library of agent files should get before selection itself needs a gate. The rule that does not move is simpler. If you cannot point to a versioned file, an allowlist, and a verify step, you do not have a Markdown agent. You have a prompt with a filename.

## What production demands

Production wants an agent identity a reviewer can open.

Keep the agent in a versioned Markdown contract: role, instructions, constraints, tool refs, owner. Load that file in gather. Fire tools under the allowlist at act. Check the named gate at verify. Write the agent file id into the observability rail. When a run fails because the contract was wrong, patch the file so the next run inherits the fix.

Refuse costume agents. Prefer descriptions the harness can load beside a real loop. Keep the model swappable. Keep a person on the last step when the write can hurt.

Treat live prompt paste as a deploy defect, not as a clever shortcut.

That is the standard we build to at [sunrisegenai.com](https://sunrisegenai.com). The model speaks. The harness finishes the job. The agent file is how the floor knows which job it was supposed to finish. If you cannot open the file, name the version, and show the allowlist hit in the trace, you do not have an agent yet. You have another chat that will evaporate when the tab closes.
