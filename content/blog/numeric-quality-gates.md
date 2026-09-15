---
title: Coding agents need numeric gates, not vibes
description: Verify for coding agents is a stack of measurable contracts in the harness. Pick the gates that fit the job. Fail closed. Retry or escalate. Never ship on confidence theater.
date: '2026-09-15'
slug: numeric-quality-gates
image: /og.png
tags:
  - agents
  - quality
  - harness
---

We build production GenAI for operations, knowledge, and data. Coding agents sit inside that same demand. They write fast. Shipping still needs a definition of done a machine can fail. Numbers in the harness, not a tone of confidence in the completion.

A coding agent that can edit, commit, and open a pull request without a numeric verify step is a costume with a keyboard. Lint green is not shippable. A polite self-check in the prompt is not a gate. The verify step has to read like a contract: complexity on the functions that changed, coverage on the logic under edit, dead code on touched paths, honest types at the boundary. Pass ships. Fail retries with a changed gather, or escalates to a person. Silent ship is the defect.

## Vibes fail in the same places every time

Teams keep mistaking fluency for quality. The model produces a clean-looking diff. The review comment says "looks good." CI is green because the suite never touched the new branch. Two weeks later the file is a nested forest, half the helpers are unreachable, and one `any` has turned the boundary into fog.

Confidence theater is the other failure. The agent prints "I verified the change" inside the chat, yet no score left the process and no threshold was consulted. The harness treated a sentence as a sensor. That is how AI-generated clutter lands in production apps: not as malice, but as a missing contract.

Green lint is a low bar. Formatters and style rules catch almost none of the agent failure modes that matter on a long-lived codebase: god files, cognitive nests, untested happy paths, leftover exports, type escapes that compile and then lie. You need numbers that disagree with the model when the model is wrong.

## The gate stack sits in verify, before done

Gather pulls the ticket, the diff, the schema, the prior failing score. Act fires the named tools under a permission list. Verify is where the numeric stack lives, and done is not a mood. Done is a set of contracts that returned pass.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 420" role="img" aria-labelledby="gates-title gates-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="gates-title">Numeric gate stack in the verify step</title><desc id="gates-desc">A coding agent writes, then a verify stack of numeric gates (complexity, coverage, dead code, types) decides pass to ship or fail to retry and escalate. An in-network gateway sits beside the loop.</desc><rect width="640" height="420" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V400 M52 20 V400 M84 20 V400 M116 20 V400 M148 20 V400 M180 20 V400 M212 20 V400 M244 20 V400 M276 20 V400 M308 20 V400 M340 20 V400 M372 20 V400 M404 20 V400 M436 20 V400 M468 20 V400 M500 20 V400 M532 20 V400 M564 20 V400 M596 20 V400 M628 20 V400"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 404 H36 M16 404 V384" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 404 H604 M624 404 V384" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · NUMERIC VERIFY</text><text x="612" y="38" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">IN-NETWORK GATEWAY</text><rect x="28" y="56" width="150" height="100" fill="rgba(217,102,28,0.08)" stroke="rgba(238,234,226,0.2)"/><text x="103" y="82" text-anchor="middle" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">01 · WRITE</text><text x="103" y="108" text-anchor="middle" fill="rgba(238,234,226,0.86)" font-family="'Source Serif 4', Georgia, serif" font-size="14">coding agent</text><text x="103" y="130" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">diff · tools · edit</text><path d="M178 106 H208" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="208" y="48" width="404" height="168" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="224" y="72" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">02 · NUMERIC GATES</text><rect x="224" y="88" width="88" height="52" fill="rgba(217,102,28,0.1)" stroke="#D9661C" stroke-opacity="0.65"/><text x="268" y="110" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600">COMPLEX</text><text x="268" y="128" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-family="'Source Serif 4', Georgia, serif" font-size="11">caps</text><rect x="320" y="88" width="88" height="52" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="364" y="110" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600">COVER</text><text x="364" y="128" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-family="'Source Serif 4', Georgia, serif" font-size="11">floors</text><rect x="416" y="88" width="88" height="52" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="460" y="110" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600">DEAD</text><text x="460" y="128" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-family="'Source Serif 4', Georgia, serif" font-size="11">code</text><rect x="512" y="88" width="84" height="52" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="554" y="110" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600">TYPES</text><text x="554" y="128" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-family="'Source Serif 4', Georgia, serif" font-size="11">honesty</text><text x="224" y="168" fill="rgba(238,234,226,0.5)" font-family="'Source Serif 4', Georgia, serif" font-size="12">job-fit contracts on the diff · not a vibe score</text><text x="224" y="188" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12">optional mutation / CRAP on crown modules only</text><path d="M320 216 V236" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="28" y="244" width="280" height="72" fill="rgba(6,182,195,0.07)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="168" y="274" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.14em">PASS · SHIP</text><text x="168" y="296" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">contracts held · done opens</text><rect x="332" y="244" width="280" height="72" fill="rgba(217,102,28,0.08)" stroke="#D9661C" stroke-opacity="0.7"/><text x="472" y="274" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.14em">FAIL · RETRY / ESCALATE</text><text x="472" y="296" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">changed gather · or a person</text><path d="M472 316 V340 H103 V156" fill="none" stroke="rgba(238,234,226,0.22)" stroke-dasharray="3 4"/><text x="200" y="336" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">RETRY PATH</text><rect x="28" y="360" width="584" height="44" fill="rgba(6,182,195,0.05)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="48" y="387" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">mechanical scores in the harness · never silent ship on confidence theater</text><rect x="596" y="378" width="6" height="6" fill="#D9661C"/></svg><figcaption>Fig. 01. Agent write, then a job-fit numeric stack in verify. Pass ships. Fail retries with a changed gather, or escalates. Done stays shut until the contracts hold.</figcaption></figure>

The figure is the product shape. The gateway still routes, caches, and hardens stop sequences. The gate stack is not the gateway; it is the definition of done for this coding job.

## What each class of gate actually buys you

Complexity caps catch the nested forest before it becomes the file everyone fears. Cyclomatic and cognitive limits on methods are useful defaults. Example contracts a harness can enforce look like warn around 15 and fail around 20 on the function under edit. A public scorecard that says "under 22" is a starting illustration, not a sacred number; tighten or loosen for the language and the blast radius. Halstead difficulty can sit as a trend on changed functions. Treat a hard global "under 80" as a smell signal, not as merge law. Absolute Difficulty thresholds do not have strong industry consensus. Agents will game a number they can see.

Coverage floors buy you evidence that the new logic ran. Aim the floor at changed lines and domain logic under edit, often in the 80 to 90 percent band for production app work. Do not demand 100 percent of UI chrome, platform channels, or generated tables. Repo-wide 100 percent as a merge block trains agents to write useless tests that inflate a score and teach nothing.

Dead code gates buy compound cleanup: no new dead exports on touched paths, and delete orphans in the same PR when it is cheap. Zero dead code as a whole-repo religion is expensive theater. Zero "redundant" as an automated fail is worse, because the word is subjective and agents respond with bad renames.

Type honesty buys a boundary you can trust. Ban `any` in TypeScript on agent PRs. Allow `unknown` at JSON and API edges, then narrow; blind rules that also ban `unknown` punish the right pattern. Dart and other languages need their own analysis rules, not a TypeScript paste.

Mutation and CRAP-style gates buy pressure on tests that only assert the happy path. Keep them on crown-jewel modules (matcher cores, billing, quota), not on every pull request for every package. Full mutation at repo scale is slow and noisy. "No surviving mutants" everywhere is religion dressed as rigor.

Those thresholds are example contracts. They are not Sunrise product KPIs. The product move is knowing which subset fits this job, and wiring it so the agent cannot talk past it.

## Gates live in the harness, not in a polite prompt

A system prompt that says "keep complexity low and write tests" is a lecture. Models negotiate with lectures. The same pattern shows up when teams paste long policy into the window and call it control. Slim packs and hard stops are control, and numeric verify is the coding-agent version of that stop.

Put the scores in CI and in the agent loop. The harness gathers the failing metric, the file path, and the prior attempt so the next act has to change something measurable. A retry that does not change the gather is a hang you are paying for.

This is the same gather, act, verify shape as the rest of the production loop. Incident intelligence only delivers 75% lower mean time to recovery when a ranked hypothesis arrives with evidence and a person on the last step. Coding agents only stay useful when the verify step can fail them with a number. The in-network gateway still holds the routing and cache shape that delivers 42% lower token spend, 2.4× useful completions per 1k tokens, and about 68% prompt-cache hit on repeated enterprise workflows. None of that replaces the gate. It makes the gate affordable, because the expensive model sees a slim pack and a failing score, not a memoir about quality.

Schema and mapping work already shows what mechanical verify does for throughput: up to 60% less time on schema and mapping, and 3× throughput on attribute mapping, when the model proposes inside a scored contract instead of narrating a standards document. Coding-agent verify is that idea applied to diffs.

## Fail closed. Then retry or escalate.

When a gate fails, done stays shut. The loop may retry with a changed gather: the complexity report, the uncovered lines, the dead export list, the type error. Cap the retries. When the budget is spent, escalate. A person owns the write that can still hurt.

Never silent ship. Never print the template because verify was inconvenient. Leadership will see throughput while the floor sees clutter, and trust leaves quietly the same way it leaves when a harness falls back to a canned answer after eval fails.

Fail closed is not cruelty.

It is how you keep an operations floor, a knowledge desk, or a data review queue from inheriting AI-generated debt at agent speed.

## Tradeoffs you actually have to make

Numeric gates add latency. Mutation on a crown module can add minutes. Threshold tuning takes judgment, and false fails will happen on generated assets, golden scripts, and theme dumps. Carve those out in the PR note. Do not invent a softer gate that always passes.

The expensive trade is religion. Enforce the full public scorecard on every line of every repo and you will spend product time on coverage theater, Halstead games, and mutation noise. Skip numeric contracts entirely and you will spend it later deleting god files. The useful middle is a tightened default for agent PRs on production apps: complexity, dead code on touched paths, ban `any`, meaningful coverage on logic under edit, selective mutation where the blast radius is real.

Another trade is language. A TypeScript rule set is not a Flutter rule set, so the harness should carry language-specific contracts rather than one meme pasted into every brief.

A third trade is where judgment lives. Cheap workers can compute scores. The expensive model should see the failing slice and the slim pack. The person should see the trace when the loop escalates. That split is harness design, not a bigger model card.

We still do not know the perfect default band for every stack we will ship next year. The contracts will move. The rule that does not move is mechanical verify before done.

## What production demands

Production coding agents need a verify step that can say no with a number.

Name the contracts for the job. Wire them in the harness, not in a paragraph the model can summarize away. Prefer diff-scoped complexity, dead code, type honesty, and coverage that proves the new logic ran. Keep mutation and CRAP for modules that deserve the cost. Reject repo-wide 100 percent coverage, blind Halstead absolutes, and "no surviving mutants" on every PR as universal law.

Fail closed. Retry with a changed gather, escalate when the budget is spent, and keep a person on the last step when the write can take a service down.

That is the standard we build to at sunrisegenai.com. The model writes. The harness decides whether the run ships. If you cannot point to the numeric stack in front of done, you do not have a coding agent yet. You have a fast autocomplete with a pull-request costume.
