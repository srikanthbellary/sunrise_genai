---
title: Ship know-how as skills, not as another prompt
description: A reusable skill is a named contract the harness can load. Role, constraints, tools, and a recipe that survives the next project. Slop skills are prompts in a costume. Production skills are how the loop stops relearning the same job.
date: '2026-09-18'
slug: reusable-skills
image: /og.png
tags:
  - agents
  - skills
  - harness
---

We build production GenAI for operations, knowledge, and data. That work does not stay in one repo forever. The same gather, act, verify loop shows up on a coding agent, a mapping queue, a security review, and an incident desk. What should travel between those jobs is not a longer system prompt. It is a skill: a named pack the harness can load, name in the trace, and refuse when it does not fit.

A skill is how you stop pasting the same procedure into the next blank chat. The model forgets. The harness should not.

## Prompts evaporate. Skills persist.

Teams still treat know-how as chat residue. Someone writes a careful brief. The agent does decent work. The session ends. Next week a different person opens a different window and retypes half of it from memory. The good parts of the brief never become a file. The bad parts get copied into three other chats and mutate.

That is the opposite of production. Production wants a unit you can version, review, and point at when a run goes wrong. A skill is that unit when it is honest: a short description of when to use it, a body that names the steps and the stops, and a clear list of tools or data it is allowed to touch. You are not implementing a framework. You are describing a job the harness already knows how to run.

Markdown is often enough. Role. Constraints. Boundaries. References. A recipe the next agent can follow without a tribal walkthrough. Code is not gone. For a growing class of jobs, code is no longer the starting point. The starting point is a description the harness can load beside the loop.

## Slop skills are prompts with a folder

Skills get a bad reputation for a reason. The ecosystem is full of packs that are just a cheerful system prompt saved under a new name. No when-to-use line a reader can trust. No fail-closed stops. No tool contracts. No version that records what broke last time. Install counts go up. Floor trust does not.

A production skill has to survive a hostile reader. The description must say when to use it in one line, so a person (or another agent) can refuse it. The body must be a recipe, not a vibe. If the skill claims to review security, it has to say find, reproduce, patch, and escalate on blast radius. If it claims to keep human signal in outbound copy, it has to ban the em dash, demand an anti-slop audit, and refuse raw model paste. If it claims to build for a new device class, it has to point at the real APIs and update when the SDK moves.

Anything less is a costume. The harness should treat costume skills the way it treats ungated writes: they do not get to call the run done.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 420" role="img" aria-labelledby="skills-title skills-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="skills-title">Reusable skill pack inside the production harness</title><desc id="skills-desc">A skill library feeds the gather step of a production agent loop. Act loads a named skill under permissions. Verify checks the skill contract before done. An observability rail records which skill ran. An in-network gateway sits beside the loop.</desc><rect width="640" height="420" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V400 M52 20 V400 M84 20 V400 M116 20 V400 M148 20 V400 M180 20 V400 M212 20 V400 M244 20 V400 M276 20 V400 M308 20 V400 M340 20 V400 M372 20 V400 M404 20 V400 M436 20 V400 M468 20 V400 M500 20 V400 M532 20 V400 M564 20 V400 M596 20 V400 M628 20 V400"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 404 H36 M16 404 V384" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 404 H604 M624 404 V384" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · SKILL IN THE LOOP</text><text x="612" y="38" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">IN-NETWORK GATEWAY</text><rect x="28" y="56" width="168" height="148" fill="rgba(217,102,28,0.08)" stroke="rgba(238,234,226,0.2)"/><text x="112" y="80" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">SKILL LIBRARY</text><rect x="44" y="96" width="136" height="28" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="112" y="115" text-anchor="middle" fill="rgba(238,234,226,0.8)" font-family="'Source Serif 4', Georgia, serif" font-size="12">when-to-use</text><rect x="44" y="132" width="136" height="28" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="112" y="151" text-anchor="middle" fill="rgba(238,234,226,0.8)" font-family="'Source Serif 4', Georgia, serif" font-size="12">recipe body</text><rect x="44" y="168" width="136" height="24" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.5"/><text x="112" y="184" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="11">version · owner</text><path d="M196 130 H220" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="220" y="56" width="120" height="72" fill="rgba(217,102,28,0.1)" stroke="#D9661C" stroke-opacity="0.65"/><text x="280" y="86" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">01 · GATHER</text><text x="280" y="108" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">ticket · skill pick</text><path d="M340 92 H364" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="364" y="56" width="120" height="72" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="424" y="86" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">02 · ACT</text><text x="424" y="108" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">named skill · tools</text><path d="M484 92 H508" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="508" y="56" width="104" height="72" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="560" y="86" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">03 · VERIFY</text><text x="560" y="108" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">skill contract</text><rect x="220" y="152" width="392" height="44" fill="rgba(0,8,22,0.45)" stroke="rgba(238,234,226,0.15)"/><text x="416" y="180" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">PERMISSIONS under act · skill on the allowlist or it does not run</text><rect x="28" y="228" width="280" height="72" fill="rgba(6,182,195,0.07)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="168" y="258" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.14em">PASS · DONE</text><text x="168" y="280" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">contract held · trace names skill</text><rect x="332" y="228" width="280" height="72" fill="rgba(217,102,28,0.08)" stroke="#D9661C" stroke-opacity="0.7"/><text x="472" y="258" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.14em">FAIL · RETRY / PATCH SKILL</text><text x="472" y="280" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">changed gather · harden the pack</text><path d="M472 300 V324 H112 V204" fill="none" stroke="rgba(238,234,226,0.22)" stroke-dasharray="3 4"/><text x="200" y="320" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">FAILURE FEEDS THE LIBRARY</text><rect x="28" y="348" width="584" height="52" fill="rgba(6,182,195,0.05)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="48" y="372" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="13">load by name · refuse a miss · write the skill id into the observability rail</text><text x="48" y="392" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="12">every permanent fix lands in the pack, not only in the next chat</text><rect x="596" y="372" width="6" height="6" fill="#D9661C"/></svg><figcaption>Fig. 01. Skill library into gather. Named skill under permissions at act. Contract check at verify. Failures patch the pack so the next run inherits the fix.</figcaption></figure>

Read the figure the way a reviewer will read a failed run. The library is not a plugin drawer. It is a set of contracts with owners and versions. Gather picks a skill the way it picks a runbook. Act loads that skill under the same permissions bar that governs every other tool. Verify checks the skill contract before done opens. The observability rail writes the skill id, not "the model seemed to follow a vibe."

## What a good skill actually contains

Start with the description. One line on when to use it. That line is the product surface for selection. If two skills could apply, the descriptions must disagree enough that a person can choose. Vague "use this for coding" lines are how slop packs get installed and never trusted.

Then the body. Write it as intent the harness can execute with the tools it already has, not as a frozen recipe of yesterday's tool schemas. Schemas change. Intent should not. Name the stops: budgets, allowlists, refuse-when-unsourced, escalate-when-blast-radius-is-real. Name the evidence gather must attach. Name what verify must score before done.

Then ownership. A skill without an owner is a prompt that nobody will harden. When a run fails because the skill was wrong, the fix belongs in the pack. Guides and constraint docs earn their keep when every line is a past agent failure turned into a permanent rule. That is harness engineering in miniature: sensors, loop, memory, permissions, observability, applied to one reusable unit.

Domain packs are the obvious examples. Security review as a skill: find the vuln, reproduce it, ship a patch, escalate when the blast radius is real. Human-signal writing as a skill: library-grounded draft, anti-slop audit, zero em dashes, optional one humanizer pass, re-scan, then publish. Device or SDK packs that update when the platform docs move, so the agent is not guessing from last quarter's training cut. Mapping and schema packs that already show what mechanical contracts do for throughput: up to 60% less time on schema and mapping, and 3× throughput on attribute mapping, when the model proposes inside a scored contract instead of narrating a standards document.

The useful skill is the one you built for yourself first, then made portable. The useless skill is the one built for install counts.

## Skills sit inside the harness, not beside it

A skill is not a second agent. It is a loadable contract inside the same gather, act, verify loop. The in-network gateway still routes, caches, and hardens stop sequences. The skill does not replace the gateway. It does not replace numeric gates on coding diffs. It does not replace slim context packs. It is how the loop carries procedure without stuffing the entire procedure into every prompt.

That split is how the same gateway pattern holds 42% lower token spend, 2.4× useful completions per 1k tokens, and about 68% prompt-cache hit on repeated enterprise workflows. The expensive model sees a slim pack plus the skill that fits this job. It does not see a memoir of every procedure the company has ever written.

Incident intelligence still only delivers 75% lower mean time to recovery when a ranked hypothesis arrives with evidence and a person on the last step. A skill can tell the agent how to read telemetry and tickets. It cannot replace the person on a remediation that can take a service down. Persistent ownership of a workflow still means durable handoffs and a human on the exceptions. The skill is the durable handoff for know-how.

## What breaks when skills are thin

**The costume pack.** A cheerful README, no when-to-use line, no stops. It demos in a README screenshot. It fails on a messy ticket.

**The orphan prompt.** The skill lives in one person's laptop notes. Nobody versions it. Nobody reviews it. When that person leaves, the harness loses a month of tribal memory in an afternoon.

**The silent mismatch.** Gather loads the wrong skill because every description says "coding." The agent follows a careful recipe for the wrong job. The trace looks busy. The output is wrong in a confident way.

**The frozen schema.** The body hard-codes last month's tool names and argument shapes. A connector changes. The skill breaks in production while the chat version still "works" because a human rewrote it by hand.

**The unpatched failure.** The run fails. Someone fixes the chat. The skill file stays wrong. The next run inherits the same bug. You paid for a lesson and threw it away.

Each of these is a harness bug wearing a skills costume. A bigger model will not fix them.

## Tradeoffs you actually have to make

Skills add design time. Writing a when-to-use line that is honest is harder than dumping a prompt into a folder. Versioning and ownership add process. Reviewing skill PRs feels slower than letting everyone paste into chat.

Pay it anyway. The alternative is re-teaching the job on every new thread, which is how token spend climbs while quality stays flat.

Another trade: one mega-skill versus many small ones. A mega-skill is easier to advertise. Small skills are easier to select, refuse, and patch. Prefer small. Compose them in the harness when a job needs two contracts.

A third trade: public install fame versus internal floor trust. Install counts are not a sensor. Floor trust is whether on-call will let the skill run without watching every token. Design for the second number. We still do not know how large a company skill library should get before selection itself needs a gate. The rule that does not move is: if you cannot name the skill in the trace, you do not have a skill yet.

## What production demands

Production wants know-how that survives the session.

Write skills as named contracts: when-to-use, recipe, stops, tools, owner, version. Load them in gather. Fire them under permissions at act. Check their contracts at verify. Write the skill id into the observability rail. When a run fails because the pack was wrong, patch the pack so the next run inherits the fix.

Refuse costume skills. Prefer markdown descriptions the harness can load beside a real loop. Keep the model swappable. Keep a person on the last step when the write can hurt.

That is the standard we build to at [sunrisegenai.com](https://sunrisegenai.com). The model speaks. The harness finishes the job. The skill is how the harness remembers how. If you cannot point to the library, the allowlist, and the skill id in the trace, you do not have reusable know-how yet. You have another prompt that will evaporate when the tab closes.
