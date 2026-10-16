---
title: Memory is five layers, not a bigger window
description: Models got smarter. Long-horizon agents still re-brief from zero. The production fix is a memory stack (working, episodic, semantic, procedural, forgetting), not another context-window upgrade.
date: '2026-10-16'
slug: five-layer-agent-memory
image: /og.png
tags:
  - agents
  - memory
  - production
---

We build production GenAI for operations, knowledge, and data. Models got smarter this year. Long-horizon agents still open a fresh session and re-brief from zero. That is not a model IQ problem. It is a memory architecture problem. Buy a bigger window and you buy more room to forget with confidence. Design five layers and the agent can carry work across days without pretending every turn is the first.

A [harness](/blog/agent-is-a-harness/) already decides what the agent may see, touch, and call done. Memory is the part of that harness that decides what is still true when the chat ends. How you store it (files a person can open, not opaque blobs) is the complementary half of the story. We wrote that in [inspectable agent memory](/blog/inspectable-agent-memory/). This note is the other half: which layers you design, how they flow, and why forgetting belongs on day one.

## The bottleneck moved

Frontier models handle longer prompts than they did two years ago. Teams still lose days on multi-session debug, support triage, and schema work because each session starts as if the last one never happened. Same broken approach. Retried. A fact that was already true on Tuesday gets re-derived like it was news. A skill that should have been promoted after the third win never loads, so the agent plans from scratch anyway.

Those failures look like reasoning misses in the chat. On an operations floor they are memory misses. The model did not get dumber overnight. What failed is simpler: the estate never wrote down what happened, what is true, how we do this, and what should die.

Stretching the context window does not invent that ledger. It only delays the truncate. At some budget the early task brief falls off the back. Decisions vanish. The agent keeps the last tool dump and loses the reason the job exists. That is FIFO amnesia with a prettier token meter.

## Five layers, five questions

Memory is not one pile. Collapse everything into "stuff we retrieved" and stale guesses become policy. Split it into five questions the harness can answer.

**Working.** What is true right now, in this context window? System prompt, current turn, tool results, the open ticket, the slim pack you injected. Cheap to refresh. Dangerous to treat as durable.

**Episodic.** What happened? Task attempts, errors, outcomes, user corrections, cost and time. A log of runs, not a philosophy. The agent that can ask "did we already try X?" stops burning tokens on the same failed approach.

**Semantic.** What is true? Distilled facts, entities, relations. A thin ontology beats stuffing more tokens into the next prompt. Schema and validation beat folklore.

**Procedural.** How do we do this? Named [skills](/blog/reusable-skills/): trigger, steps, tools, preconditions, success criteria. Versioned. Loadable. Refusable when the job does not match.

**Forgetting.** What should we delete or supersede? TTL, contradiction flags, supersession when a lock changes. A never-forget agent rot. Confident wrong behavior from a stale fact is worse than a clean miss.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 440" role="img" aria-labelledby="memory5-title memory5-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="memory5-title">Five-layer agent memory stack with overflow, distill, promote, and forgetting</title><desc id="memory5-desc">User input feeds working memory. Overflow writes to episodic. Distill moves facts into semantic. Promote moves repeated methods into procedural. Forgetting prunes and supersedes semantic and procedural stores. Dashed retrieval arrows return selected memory into working.</desc><rect width="640" height="440" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V420 M52 20 V420 M84 20 V420 M116 20 V420 M148 20 V420 M180 20 V420 M212 20 V420 M244 20 V420 M276 20 V420 M308 20 V420 M340 20 V420 M372 20 V420 M404 20 V420 M436 20 V420 M468 20 V420 M500 20 V420 M532 20 V420 M564 20 V420 M596 20 V420 M628 20 V420"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 424 H36 M16 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 424 H604 M624 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · FIVE LAYER MEMORY</text><text x="612" y="38" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">OVERFLOW FIRST</text><rect x="28" y="56" width="100" height="48" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="78" y="78" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">USER</text><text x="78" y="94" text-anchor="middle" fill="rgba(238,234,226,0.65)" font-family="'Source Serif 4', Georgia, serif" font-size="11">input · ticket</text><path d="M128 80 H156" fill="none" stroke="rgba(238,234,226,0.35)"/><rect x="156" y="56" width="156" height="72" fill="rgba(217,102,28,0.1)" stroke="#D9661C" stroke-opacity="0.7"/><text x="234" y="80" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">01 · WORKING</text><text x="234" y="100" text-anchor="middle" fill="rgba(238,234,226,0.78)" font-family="'Source Serif 4', Georgia, serif" font-size="12">true right now</text><text x="234" y="116" text-anchor="middle" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="11">context · tools · pack</text><path d="M234 128 V148" fill="none" stroke="#D9661C" stroke-opacity="0.7"/><text x="248" y="144" fill="#D9661C" font-family="'Source Serif 4', Georgia, serif" font-size="10" font-weight="600" letter-spacing="0.08em">OVERFLOW</text><rect x="156" y="148" width="156" height="64" fill="rgba(250,195,69,0.07)" stroke="#FAC345" stroke-opacity="0.55"/><text x="234" y="172" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">02 · EPISODIC</text><text x="234" y="192" text-anchor="middle" fill="rgba(238,234,226,0.78)" font-family="'Source Serif 4', Georgia, serif" font-size="12">what happened</text><path d="M234 212 V232" fill="none" stroke="rgba(238,234,226,0.35)"/><text x="248" y="228" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="10" font-weight="600" letter-spacing="0.08em">DISTILL</text><rect x="156" y="232" width="156" height="64" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.65"/><text x="234" y="256" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">03 · SEMANTIC</text><text x="234" y="276" text-anchor="middle" fill="rgba(238,234,226,0.78)" font-family="'Source Serif 4', Georgia, serif" font-size="12">what is true</text><path d="M234 296 V316" fill="none" stroke="rgba(238,234,226,0.35)"/><text x="248" y="312" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="10" font-weight="600" letter-spacing="0.08em">PROMOTE</text><rect x="156" y="316" width="156" height="64" fill="rgba(6,182,195,0.1)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="234" y="340" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">04 · PROCEDURAL</text><text x="234" y="360" text-anchor="middle" fill="rgba(238,234,226,0.78)" font-family="'Source Serif 4', Georgia, serif" font-size="12">how we do this</text><rect x="360" y="148" width="252" height="232" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.22)"/><text x="486" y="176" text-anchor="middle" fill="#D9661C" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">05 · FORGETTING</text><text x="486" y="200" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">prune · supersede</text><text x="486" y="220" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">TTL · contradict flag</text><rect x="380" y="236" width="212" height="28" fill="rgba(217,102,28,0.08)" stroke="#D9661C" stroke-opacity="0.45"/><text x="486" y="254" text-anchor="middle" fill="rgba(238,234,226,0.72)" font-family="'Source Serif 4', Georgia, serif" font-size="11">acts on semantic + skills</text><rect x="380" y="276" width="212" height="28" fill="rgba(250,195,69,0.07)" stroke="#FAC345" stroke-opacity="0.4"/><text x="486" y="294" text-anchor="middle" fill="rgba(238,234,226,0.72)" font-family="'Source Serif 4', Georgia, serif" font-size="11">stale fact dies on purpose</text><rect x="380" y="316" width="212" height="44" fill="rgba(6,182,195,0.06)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="486" y="336" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.08em">PRODUCT SURFACE</text><text x="486" y="352" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="11">not a cleanup chore</text><path d="M312 180 H360" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><path d="M312 264 H360" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><path d="M312 348 H360" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><path d="M360 260 H330 V92 H312" fill="none" stroke="#06B6C3" stroke-opacity="0.55" stroke-dasharray="3 4"/><text x="420" y="100" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.1em">RETRIEVE → WORKING</text><rect x="28" y="400" width="584" height="28" fill="rgba(6,182,195,0.05)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="48" y="418" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.08em">OVERFLOW BEFORE TRUNCATE · DISTILL · PROMOTE · FORGET ON DAY ONE</text><rect x="596" y="412" width="6" height="6" fill="#D9661C"/></svg><figcaption>Fig. 01. User input lands in working. Overflow writes episodes before the window truncates. Distill turns outcomes into semantic facts. Promote turns repeated wins into procedural skills. Forgetting prunes and supersedes. Dashed arrows retrieve the right slice back into working.</figcaption></figure>

Read the figure the way a reviewer will read a stuck agent. Working is the hot surface. Everything else exists so working can stay small. Overflow is not a nice-to-have. It is the rule that protects the task brief when the budget hits roughly 85% full. Extract decisions and facts into episodic, then compact. Keep recent turns and pointers. Do not FIFO-destroy the reason the job started.

## A practical path that ships

Do not build all five layers on the first calendar day. Sequence them, or you will ship a museum of empty stores.

**Start with episodic only.** One JSONL of task outcomes is enough to query similar past tasks before starting. Minutes to ship. Biggest early return. The agent that can load "last three attempts on this ticket type" stops looking clever while repeating failure.

**Overflow before truncate.** When context pressure rises, write first. Compact second. A [slim context pack](/blog/slim-context-packs/) still matters for what you inject. Overflow is how you refuse to erase the brief just because the window got full.

**Add a thin ontology for semantic.** Entity types, relations, a validation pass. One schema layer beats stuffing another thousand tokens of narrative into gather. Keep it boring. Boring is auditable.

**Promote skills after repeated wins.** Same task type succeeds three times? Turn the method into a procedural skill with a version and an owner. A stale skill is worse than no skill. Promotion without versioning is how folklore becomes law.

**Build forgetting on day one of semantic.** Supersede outdated facts. Flag contradictions for a person to resolve. Put TTL on data that ages. If forgetting is a cleanup ticket for next quarter, you will ship confident wrong answers this quarter.

Write-back discipline sits beside this stack. Chat is enough inside a thread. Memory and files are for what must survive outside it. Dumping every turn into semantic is how the ontology becomes a junk drawer. The same habit that keeps profile memory small keeps semantic honest.

## Production tests worth copying

Architecture without tests is a slide. Four checks catch the failures that demos hide.

**Amnesia.** Finish a multi-step fix. Open a new session. The agent must recall the outcome without re-reading the entire prior transcript. If it cannot, episodic write-back failed.

**Contradiction.** Inject two conflicting facts. The agent must flag the conflict, not silently pick a favorite. Silent pick is how wrong on-call rotas page the wrong person.

**Staleness.** Expire a TTL. The expired fact must not still drive answers. If it does, forgetting is decoration.

**Skill promotion.** After N successes on the same job type, the next run should load the skill instead of re-planning from a blank page. If it re-plans every time, procedural memory is a folder of unread markdown.

These tests are cheap. They are also how you know you built memory, not atmosphere.

## When not to add memory

Skip the stack for one-off format jobs, pure brainstorming, and batch work that should stay stateless. Memory has cost: storage, review, contradiction handling, the discipline to forget. Pay that cost for daily reports, support triage, multi-session debug, and any job where last week's outcome should change today's gather. Do not pay it for a one-shot CSV reshape that dies when the script exits.

## Inspectability and layers are partners

Files you can open, paths you can diff, a bus that does not hide another blob: that is how a person overrules a bad write. Layers are what you put in those files. Working scratch, episodic logs, semantic notes, procedural skills, forgetting rules. Without layers, an inspectable filesystem is still a diary. Without inspectability, a five-layer design is a black box with better vocabulary.

We still do not know how automatic skill promotion should be before a person has to approve the pack, and that uncertainty is the kind of loose end a production team should keep visible instead of papering over with a silent default. Until that line is clear, promote with an owner on the file and a version the next run can refuse. The model can suggest the skill. The harness decides whether it loads.

## What production demands

Production wants an agent that remembers the right things and forgets the rest on purpose.

Keep working small and honest. Overflow into episodic before the window truncates the brief. Distill into a thin semantic ontology. Promote methods into versioned skills after repeated wins. Put forgetting on the product surface the day semantic goes live. Test amnesia, contradiction, staleness, and promotion before you claim the agent learned. Skip memory where the job is one-shot and should stay that way.

At [sunrisegenai.com](https://sunrisegenai.com) the harness is still the product. Memory is how the harness survives the next session. Five layers beat a bigger window. The agent that forgets on purpose is the one you can trust on the floor.
