---
title: 'The agent comes to you. Approval still ships.'
description: 'A production agent can wake on a schedule, read connected systems, and prepare a PR or a message on its own. Every send and every ship still waits for a human. Proactive is not unsupervised.'
date: '2026-11-06'
slug: proactive-approval-gates
image: /og.png
tags:
  - agents
  - harness
  - production
  - approvals
---

We build production GenAI for operations, knowledge, and data. The teams that ask us for proactive agents usually mean two products by accident: an agent that starts work without being asked, and an agent that finishes without being checked. Those are not the same thing. One saves a morning of triage. The other posts a reply you never saw, to a customer who will remember the tone more than the fix.

Proactive, in our builds, means the agent comes to you with a prepared action. It still stops before anything leaves the building.

## What proactive actually means

A reactive agent waits for a prompt. A proactive one owns a schedule. On a budgeted cadence it reads the systems you already connect (inbox, ticket queue, repo, status page), drafts a short brief of what changed, and prepares the next move: a pull request, a reply, a change note, or a clean refusal. Then it parks and waits.

The human sees the exact action, then approves it, edits it, or refuses it. Only after that click does the harness send or ship.

That is the whole pattern: not a personality, a stop in the loop.

Picture a knowledge ops lane at 7:42am. The agent wakes, scans overnight merges against the docs tree, finds three files that drifted from the API surface, opens a draft PR with the proposed edits, and puts a three-line brief on the reviewer's desk. Nobody typed a prompt. Nobody got a silent publish either. The PR sits behind the gate until a person merges.

It pairs cleanly with rules we already ship. [Evidence before merge](/blog/evidence-before-merge/) keeps a checker off the maker's chat and puts proof in a ledger. [Numeric quality gates](/blog/numeric-quality-gates/) refuse a green story without numbers. The approval gate is the same instinct for anything that exits: email, chat, a merge that publishes, a payment, a delete. Prepare alone. Leave alone only after a person signs.

## The gate before send or ship

Show the action. Wait.

If the agent wants to send a customer reply, the gate shows the recipient, the subject, the full body, and the ticket id it claims to answer. If it wants to open a docs PR, the gate shows the files touched, the diff summary, and the reviewers it would tag. If it wants to delete a draft or close a ticket, the gate shows that too. Nothing fuzzy. The human either clicks through or stops the run cold.

Some actions stay off-limits even with a click. Moving money between accounts. Trading securities. Anything your policy pack marks as never-agent. The gate is not a blank permission slip. It is a permission to propose the things you already decided an agent may touch.

Decorative gates fail the same way decorative tests fail. If the default is "looks good" and the review takes three seconds, you built a button, not a stop. The harness has to make refusal cheap and approval deliberate. One click for refuse. A second confirm for send. Exact text on screen, not a summary the model wrote about itself.

We learned this the slow way on an early ops prototype: the gate showed a one-line abstract ("reply about refund window") while the body underneath quoted a policy line that had been retired two releases earlier. Reviewers approved the abstract. Customers got the stale line. The fix was boring and correct. Render the full outbound payload. Make the abstract optional chrome, never the thing you sign.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 400" role="img" aria-labelledby="loop-title loop-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="loop-title">Proactive agent loop with a human approval gate</title><desc id="loop-desc">A schedule wakes the agent. The agent gathers from connected systems, drafts a brief, and prepares an action such as a pull request or a message. An approval gate sits before any send or ship. Approve goes to send or ship. Refuse returns to the draft or ends the run. The harness owns both the schedule and the stop.</desc><rect width="640" height="400" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 384 H36 M16 384 V364" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 384 H604 M624 384 V364" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · PROACTIVE LOOP</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">GATE</text><g font-family="'Source Serif 4', Georgia, serif"><rect x="28" y="72" width="110" height="52" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="83" y="94" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="13" font-weight="600">Schedule</text><text x="83" y="112" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">budgeted wake</text><rect x="158" y="72" width="110" height="52" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.8"/><text x="213" y="94" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Gather</text><text x="213" y="112" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">read systems</text><rect x="288" y="72" width="110" height="52" fill="rgba(250,195,69,0.10)" stroke="#FAC345" stroke-opacity="0.7"/><text x="343" y="94" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">Draft brief</text><text x="343" y="112" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">what changed</text><rect x="418" y="72" width="194" height="52" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="515" y="94" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Prepare action</text><text x="515" y="112" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">PR · message · note</text><rect x="158" y="176" width="324" height="64" fill="rgba(217,102,28,0.16)" stroke="#D9661C" stroke-opacity="0.95" stroke-width="1.6"/><text x="320" y="202" text-anchor="middle" fill="#D9661C" font-size="14" font-weight="600" letter-spacing="0.14em">APPROVAL GATE</text><text x="320" y="222" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="12">show exact action · wait for a human</text><rect x="88" y="292" width="180" height="52" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="178" y="314" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Approve</text><text x="178" y="332" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">send or ship</text><rect x="372" y="292" width="180" height="52" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="462" y="314" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="13" font-weight="600">Refuse</text><text x="462" y="332" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">edit, retry, or stop</text></g><g fill="none" stroke="rgba(238,234,226,0.4)" stroke-width="1.2"><path d="M138 98 H154"/><path d="M268 98 H284"/><path d="M398 98 H414"/><path d="M515 124 V150 H320 V176"/><path d="M240 240 V268 H178 V288"/><path d="M400 240 V268 H462 V288"/><path d="M462 344 V360 H83 V124" stroke="#FAC345" stroke-opacity="0.55" stroke-dasharray="3 4"/></g><text x="320" y="372" text-anchor="middle" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="11">harness owns the wake and the stop</text></svg><figcaption>Fig. 01. The agent wakes, gathers, drafts, and prepares on its own. The approval gate sits before every send or ship. Approve leaves the building. Refuse stays inside.</figcaption></figure>

## Cost-aware cadence, not nonstop polling

A proactive agent that checks connected systems every few seconds will burn the plan before lunch. Background reads count toward usage. Every wake is tokens, tool calls, and sometimes a browser session on a machine that is not your laptop or phone.

So the cadence is a budget, not a heartbeat. Inbox and tickets might wake every few hours. Docs and changelog work can wait for a merge event. An incident lane should wake on a status change, then go quiet again. Overnight stays dark unless the policy pack says otherwise. When nothing changed, the run costs almost nothing and writes a one-line "clear" into the log. When something changed, the agent spends the rest of its allowance on the brief and the prepared action.

Nonstop polling feels diligent. It is usually just expensive. The harness should expose the cost of a check the same way it exposes the cost of a long tool loop, so someone can cut a cadence that does not earn its keep.

A useful diagnostic is empty-wake rate. If fourteen of the last sixteen wakes found nothing, you are not being thorough. You are renting compute to confirm silence. Drop the cadence. Keep the same gather and draft path for the wakes that remain. The [agent-is-a-harness](/blog/agent-is-a-harness/) loop still owns definition of done. It just wakes less often.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 360" role="img" aria-labelledby="cadence-title cadence-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="cadence-title">Cost-aware check cadence versus nonstop polling</title><desc id="cadence-desc">Left side shows nonstop polling: dense wake ticks that burn the plan. Right side shows a budgeted cadence: sparse wakes, a cheap clear when nothing changed, and a full gather-and-draft only when something did. A shared daily budget bar sits underneath both.</desc><rect width="640" height="360" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 344 H36 M16 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 344 H604 M624 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 02 · CADENCE IS A BUDGET</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">COST</text><g font-family="'Source Serif 4', Georgia, serif"><rect x="28" y="68" width="280" height="180" fill="rgba(217,102,28,0.08)" stroke="#D9661C" stroke-opacity="0.55"/><text x="168" y="94" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Nonstop poll</text><text x="168" y="114" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">wake · wake · wake · wake</text><g fill="#D9661C"><rect x="48" y="140" width="6" height="28"/><rect x="64" y="148" width="6" height="20"/><rect x="80" y="136" width="6" height="32"/><rect x="96" y="150" width="6" height="18"/><rect x="112" y="142" width="6" height="26"/><rect x="128" y="152" width="6" height="16"/><rect x="144" y="138" width="6" height="30"/><rect x="160" y="146" width="6" height="22"/><rect x="176" y="140" width="6" height="28"/><rect x="192" y="150" width="6" height="18"/><rect x="208" y="136" width="6" height="32"/><rect x="224" y="148" width="6" height="20"/><rect x="240" y="142" width="6" height="26"/><rect x="256" y="152" width="6" height="16"/><rect x="272" y="144" width="6" height="24"/></g><text x="168" y="210" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="12">plan spent by noon</text><text x="168" y="228" text-anchor="middle" fill="rgba(238,234,226,0.45)" font-size="11">most wakes find nothing</text><rect x="332" y="68" width="280" height="180" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="472" y="94" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Budgeted cadence</text><text x="472" y="114" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">few wakes · spend on change</text><g fill="#06B6C3"><rect x="360" y="148" width="10" height="20"/><rect x="420" y="136" width="10" height="32"/><rect x="480" y="152" width="10" height="16"/><rect x="540" y="140" width="10" height="28"/></g><text x="425" y="180" fill="#FAC345" font-size="11">full draft</text><text x="472" y="210" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="12">clear when quiet</text><text x="472" y="228" text-anchor="middle" fill="rgba(238,234,226,0.45)" font-size="11">allowance left for real work</text><rect x="28" y="272" width="584" height="44" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="48" y="292" fill="#FAC345" font-size="12" font-weight="600" letter-spacing="0.1em">DAILY CHECK BUDGET</text><text x="48" y="310" fill="rgba(238,234,226,0.65)" font-size="12">every wake counts · cut the cadence that does not earn its keep</text></g></svg><figcaption>Fig. 02. Nonstop polling burns the plan on empty wakes. A budgeted cadence spends most of its allowance only when something actually changed.</figcaption></figure>

## Outcome-shaped budgets beat effort-shaped ones

How you meter the agent decides what it optimizes for.

An effort-shaped budget pays for wakes, tool calls, and minutes of browser time whether or not anything useful happened. The agent learns to look busy. A long gather that finds nothing still spends the day, and the dashboard still lights up green.

An outcome-shaped budget pays when a prepared action appears: a PR opened or updated, a brief that names a real change, a message ready for the gate. Quiet runs that find nothing cost near zero. The incentive finally matches the floor: nobody wants seventeen empty status pings in a review queue, and everyone wants the one PR that closes the gap sitting behind a gate they can refuse in a single click.

Illustrative example (not a locked Sunrise metric): if a docs agent wakes eight times in a day and finds a mismatch twice, an outcome budget charges those two prepared PRs and treats the six clears as nearly free. An effort budget charges all eight wakes the same. The second design trains the team to dread the agent. The first trains them to open the gate when it knocks.

This is the same instinct as the harness note. The harness owns the budget and the definition of done. The model proposes. The loop accounts. Outcome metering is how you keep proactive from turning into a token furnace with a cheerful status page.

## What breaks when the gate is missing or decorative

**The silent send.** The agent drafts a reply and posts it. Wrong tone, wrong customer, a number that was never in the ticket. By the time a person notices, the thread already moved and the apology costs more than the original ask.

**The always-approve habit.** The gate exists, but the UI makes approve the only fast path. Refuse takes four clicks and a reason field nobody wants to fill at 4:50pm. Reviewers stop refusing. You have a rubber stamp with a nicer label.

**The summary instead of the action.** The gate shows "ready to update docs" instead of the diff. The human approves a vibe. The files that ship are not the files they imagined, and the evidence ledger records a pass that never inspected the payload.

**The nonstop poll.** Cadence is set to "as often as possible." Token spend climbs through the morning. The plan hits a soft limit at 2:11pm. The afternoon incident has no agent left, which is when you needed it most.

**The effort meter.** Leadership sees "active all day" and calls it adoption. The floor sees empty briefs and stops reading them. Trust leaves before the feature does, and the next proactive ask gets a hard no from the people who actually review.

Each of these is a harness gap, not a model gap. A larger model will draft a better brief and still send the wrong email if nothing outside it is paid to wait.

## Tradeoffs you actually pay

Waiting for a human adds latency. A morning brief that lands at 7:40 and waits until 9:05 is slower than an unsupervised send at 7:41. That delay is the product. Blast radius shrinks when a person can still say no, and most outbound mistakes are cheaper to block than to unwind.

You also pay for design work on the gate itself. Exact action on screen. Cheap refuse. Second confirm on send. An off-limits list that cannot be overridden from chat. Logging who approved what, with a timestamp, next to the [evidence ledger](/blog/evidence-before-merge/). Skip that surface and the loop looks fast in a demo and soft on a production floor.

Cadence is another trade. Check too rarely and the brief is stale. Check too often and the plan dies on empty wakes. Start coarse (a few times a day for ops mail, on-merge for docs), measure empty wakes for a week, then tighten only where empty wakes stay low and real changes stay timely. We still do not have a single number that fits every queue. The rule that does not move is simpler: the cadence is a budgeted choice, written down in the policy pack, not a default of "always."

One open question we keep meeting in client builds: who is allowed to permanently widen the off-limits list. The floor wants a fast escape hatch when a new action class shows up. Leadership wants a change-control path. We have not settled a single pattern we would defend across every shop. Until we do, we keep the list in the harness config, require a human edit to widen it, and refuse any agent attempt to grant itself a new exit.

## The harness owns the schedule and the stop

Proactive agents are not unsupervised agents. They wake on a schedule you set. They gather from systems you connect. They draft and prepare without being asked. They stop at a human before anything ships or sends.

That stop is the difference between a production floor and a clever demo. The [harness](/blog/agent-is-a-harness/) owns both ends: when the agent may start, and when it may leave.

Build the gate first. Then let the agent come to you.
