---
title: The checker is not the maker
description: As models and harnesses commoditize, intent, verification, and evidence gate how fast agents get adopted in a business. Separate who does the work from who governs it. Store the change ledger. No evidence, no merge.
date: '2026-10-13'
slug: evidence-before-merge
image: /og.png
tags:
  - agents
  - harness
  - production
---

We build production GenAI for operations, knowledge, and data. That sentence used to point at the model, then at the harness around it. Both are getting cheaper and more interchangeable. What still gates how fast a business will let agents touch real work is quieter: intent written down, a checker that is not the maker, and an evidence record a person can sign.

An agent that grades its own work will pass itself. Not a personality flaw. Optimization. The model that proposed the change has already decided the change is good. Ask it to verify and it will narrate confidence. The floor needs something else.

## What commoditizes, and what does not

A year ago the fight was over which model card to buy. Then it became which harness loop to wrap around it: gather, act, verify, the tools, the permissions, the [definition of done](/blog/agent-is-a-harness/). Those loops are still the product. They are also starting to look alike across shops. The next scarce layer is the governance surface that sits beside the loop.

Intent: the written ticket, policy, or SOP the change is supposed to serve.

Verification: a separate checker with its own instructions, its own tools, and no stake in the diff looking clever.

Evidence: the diff, the test run, the eval scores, the rule that was met, stored as an append-only change ledger.

Those three records are how a business decides whether an agent run is something a person can sign. Without them, the harness is still a costume with a keyboard. With them, it starts to look like a system of record for change.

## The maker writes. The checker refuses.

Picture a coding agent opening a pull request at 2:17pm. The diff is tidy. The unit suite is green. The agent writes a short summary that says the change matches the ticket. Someone on the floor is about to type "looks good."

That summary is not verification. It is the maker talking about its own homework.

A separate checker gets a different brief. No shared conversation with the maker. It loads the ticket text, the policy pack for this surface, and the tools that can read the diff and re-run the contracts that matter. It is allowed to say no. Expected to, when the evidence is thin.

The [numeric quality gates](/blog/numeric-quality-gates/) note already argued for measurable contracts in verify: complexity caps, coverage floors, dead-code checks, honest types. Those numbers still matter. This note is about who is allowed to declare that the numbers, and the policy behind them, were met. A score the maker prints into chat is theater. A score a separate checker writes into a ledger is a record.

Separation of duties is an old idea. Agents make it urgent again. The maker can finish in minutes what used to take a day, and the same speed that writes the change can paper over the review.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 440" role="img" aria-labelledby="evidence-title evidence-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="evidence-title">Maker agent, separate checker, evidence ledger, and fail-closed merge gate</title><desc id="evidence-desc">A maker agent produces a change. Intent from a ticket and policy pack feeds both the maker and a separate checker. The checker writes to an append-only evidence ledger. A merge gate opens only when intent, verification, and evidence are present. A dashed fail-closed path returns to the maker when evidence is missing.</desc><rect width="640" height="440" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V420 M52 20 V420 M84 20 V420 M116 20 V420 M148 20 V420 M180 20 V420 M212 20 V420 M244 20 V420 M276 20 V420 M308 20 V420 M340 20 V420 M372 20 V420 M404 20 V420 M436 20 V420 M468 20 V420 M500 20 V420 M532 20 V420 M564 20 V420 M596 20 V420 M628 20 V420"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 424 H36 M16 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 424 H604 M624 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · EVIDENCE BEFORE MERGE</text><text x="612" y="38" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">FAIL CLOSED</text><rect x="28" y="56" width="160" height="100" fill="rgba(250,195,69,0.07)" stroke="#FAC345" stroke-opacity="0.55"/><text x="108" y="80" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">INTENT</text><text x="108" y="104" text-anchor="middle" fill="rgba(238,234,226,0.78)" font-family="'Source Serif 4', Georgia, serif" font-size="12">ticket · policy</text><text x="108" y="124" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">SOP the change serves</text><rect x="28" y="172" width="160" height="112" fill="rgba(217,102,28,0.09)" stroke="#D9661C" stroke-opacity="0.7"/><text x="108" y="198" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">01 · MAKER</text><text x="108" y="222" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">agent writes</text><text x="108" y="244" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">diff · tools · edit</text><text x="108" y="266" text-anchor="middle" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11">does not grade itself</text><path d="M108 156 V172" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><path d="M188 228 H220" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="220" y="172" width="160" height="112" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.65"/><text x="300" y="198" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">02 · CHECKER</text><text x="300" y="222" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">separate brief</text><text x="300" y="244" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">own tools · own rules</text><text x="300" y="266" text-anchor="middle" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11">allowed to say no</text><path d="M300 156 V172" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><path d="M188 106 H300 V172" fill="none" stroke="rgba(238,234,226,0.22)" stroke-dasharray="3 4"/><path d="M380 228 H412" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="412" y="156" width="200" height="144" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.22)"/><text x="512" y="180" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">03 · EVIDENCE</text><text x="512" y="204" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="12">append-only ledger</text><rect x="428" y="216" width="168" height="20" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="512" y="230" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="11">diff · tests · eval scores</text><rect x="428" y="242" width="168" height="20" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="512" y="256" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="11">rule id · policy map</text><rect x="428" y="268" width="168" height="20" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.45"/><text x="512" y="282" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="11">who checked · when</text><path d="M512 300 V320" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="412" y="320" width="200" height="52" fill="rgba(6,182,195,0.1)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="512" y="342" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">MERGE GATE</text><text x="512" y="360" text-anchor="middle" fill="rgba(238,234,226,0.65)" font-family="'Source Serif 4', Georgia, serif" font-size="12">all three records, or shut</text><path d="M412 346 H108 V284" fill="none" stroke="rgba(238,234,226,0.22)" stroke-dasharray="3 4"/><text x="200" y="340" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.12em">NO EVIDENCE · NO MERGE</text><rect x="28" y="392" width="584" height="32" fill="rgba(6,182,195,0.05)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="48" y="413" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">SYSTEM OF RECORD · change mapped to policy · a person can sign</text><rect x="596" y="404" width="6" height="6" fill="#D9661C"/></svg><figcaption>Fig. 01. Intent feeds both sides. The maker writes the change. A separate checker grades it. Evidence lands in an append-only ledger. The merge gate opens only when all three records are present. Missing evidence returns to the maker. Done stays shut.</figcaption></figure>

Read the figure the way a reviewer will read a blocked merge. Intent sits above both agents on purpose. The maker and the checker both need the ticket, but they do not share a chat. The ledger is not a status emoji. It is the place the business looks six months later when someone asks why a policy was believed to hold.

## Three records, not one vibe

**Intent** is the written reason the change exists. A ticket id, a policy section, an SOP step. If the agent cannot name what it is serving, gather fails closed before a tool fires. Vague intent produces vague review. Written intent gives the checker something real to disagree with.

**Verification** is a second role. Same model family is fine. Same conversation is not. The checker gets its own instructions, its own tool list, and a hard rule: do not invent a pass. If the evidence is missing, say so. If a rule does not apply, say which rule was skipped and why. A checker that always agrees is a second costume.

**Evidence** is what survives the run. Diff hash. Test command and exit code. Eval scores that map to the contracts for this job. The policy or SOP id that was claimed. The checker id and a timestamp. Append-only, so a later rewrite cannot erase the first refusal. That ledger is the audit trail a compliance desk or an on-call engineer can actually use.

Numbers without separation are still maker theater. Separation without a ledger is a story retold from memory. You need both.

## Fail closed means the merge stays dark

No evidence, no merge. That sentence is the whole product rule.

When the checker returns a gap, the merge gate stays shut. The maker may retry with a changed gather: the failing contract, the uncovered policy line, the missing test. Cap the retries. When the budget is spent, escalate to a person. Silent ship is the defect that kills trust on an operations floor. Leadership sees throughput. The floor sees unverifiable change.

This is the same fail-closed habit as numeric gates and security gates. The new piece is the ledger. A blocked merge that leaves no record teaches nothing. A blocked merge that writes "rule P-14 unmet, checker run 9f3a, tests not re-run" becomes the next gather pack.

We still do not know how many businesses will treat that ledger as a true system of record next to tickets and change management. The rule that does not move is simpler. If you cannot point to intent, a separate check, and stored evidence, you do not have agent governance. You have a demo that finished quickly.

## What breaks when the maker is also the judge

**The self-grade.** The agent ends the run with "verified against the ticket." No second process ran. No score left the harness. The chat message was treated as a sensor.

**The shared context.** Maker and checker sit in one thread, so the checker inherits the maker's excuses. Separation of duties needs separation of context, not a second paragraph in the same window.

**The missing map.** Tests are green, yet nobody can name which policy section the change satisfies. Six months later the audit question has no answer except a shrug and a git blame.

**The editable log.** Evidence lives in a wiki page someone can tidy after the fact. A record you can rewrite is a draft, not a ledger.

**The always-open gate.** Leadership wants agent velocity, so the merge button ignores an empty evidence slot. Velocity without a signable trail is unpaid cleanup deferred to the next incident.

Each of these is a harness gap. A larger model writes the same self-serving summary unless something outside it is paid to disagree.

## Tradeoffs you actually pay

A separate checker costs tokens and wall time. On a small copy change that can feel heavy. Pay it where the blast radius is real: auth, data access, billing paths, anything a customer or a regulator can ask about later. Thin surfaces can share a lighter checker. Crown paths get the full brief.

You will also fight false fails. A checker that does not understand an allowed exception will block good work. Keep an escape that a person can sign, with the exception written into the ledger. Do not invent a soft gate that always passes when the floor is busy.

Another trade is who owns the policy pack. If intent lives only in people's heads, the checker has nothing to load. Writing SOPs and ticket templates feels like latency until someone does it. Skipping that work is how agent programs stall after the pilot, when the business asks for proof and the team has chat logs.

We still owe ourselves a sharper answer on how far an automated checker can go before a second human review is mandatory. Until that line is clear, keep a person on the last step when the write can hurt money, access, or trust.

## What production demands

Production wants a change a stranger can audit.

Write intent before the maker acts. Put verification in a separate role with its own tools. Store evidence in an append-only ledger that maps the change back to the policy it claims to meet. Keep the merge gate dark until all three are present. Let numeric contracts and security gates feed that ledger instead of living as vibes in chat. Keep the model swappable. Keep a person able to sign, and able to refuse.

That is how agent work stops being a demo and starts being something a business can adopt. At [sunrisegenai.com](https://sunrisegenai.com) the harness is still the product. Intent, verification, and evidence are how it earns a signature. The maker writes. The checker grades. The ledger remembers. No evidence, no merge.
