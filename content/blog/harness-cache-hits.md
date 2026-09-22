---
title: Cache hit rate is a harness quality metric
description: Prompt stability, tool-trace shape, and cache reuse are how you score a harness. An engineered layout earns hits. A vibe layout burns the floor.
date: '2026-09-22'
slug: harness-cache-hits
image: /og.png
tags:
  - agents
  - harness
  - production
---

We build production GenAI for operations, knowledge, and data. That sentence still constrains the loop. It also constrains the bill. On a long agent session the model is not only answering; it is re-reading the same system blocks, the same tool schemas, and the same workflow pack on every turn. If those blocks stay byte-stable, the gateway can reuse what it already paid to encode. If they churn, you pay again. Cache hit rate is not a purity contest. It is a harness quality metric.

Teams talk about agents as if the model invents efficiency. It does not. Efficiency shows up when the harness stops rewriting the prefix, stops renaming tools mid-run, and stops stuffing a new memoir into every message. Prompt stability, tool-trace shape, and cache reuse are three sensors on the same product. Score them. Or keep guessing why the floor feels slow while the token meter climbs.

## Cache hits are a harness score

A prompt cache rewards sameness at the front of the request: stable system instructions, stable tool definitions, and a stable role layout. Variable work (the ticket, the diff, the schema row) belongs later, where it belongs. When the front stays fixed and the tail carries the job, repeated enterprise workflows start to look like the same conversation to the encoder. That is how you earn reuse without faking a benchmark.

This is not another essay arguing that an agent is a harness. You already know the loop: gather, act, verify. The extension is narrower. Once the loop exists, the way you lay out messages and tools becomes a measurable surface. Hit rate. Prefix churn. Whether the tool schema in turn 17 still matches turn 1, and whether the observability rail can show a reviewer which block stayed hot and which block forced a miss.

We already see the consequence on repeated enterprise workflows: about 68% prompt-cache hit when reusable context sits behind an in-network gateway, alongside 42% lower token spend and 2.4× useful completions per 1k tokens. Those numbers are not a reason to skip verify. They are what happens when the expensive model sees a slim, stable pack instead of a wandering chat. Treat cache hit as a KPI when your tooling exposes it. Do not treat a lab anecdote as a Sunrise scorecard.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 440" role="img" aria-labelledby="cache-title cache-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="cache-title">Stable harness layout earns cache hits into verify</title><desc id="cache-desc">Left path: stable system blocks and deterministic tool schemas feed a cache hit, then gather, act, verify. Right path: vibe churn forces a cache miss and burns tokens before the same verify gate. An observability rail records hit or miss.</desc><rect width="640" height="440" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V420 M52 20 V420 M84 20 V420 M116 20 V420 M148 20 V420 M180 20 V420 M212 20 V420 M244 20 V420 M276 20 V420 M308 20 V420 M340 20 V420 M372 20 V420 M404 20 V420 M436 20 V420 M468 20 V420 M500 20 V420 M532 20 V420 M564 20 V420 M596 20 V420 M628 20 V420"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 424 H36 M16 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 424 H604 M624 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · HARNESS CACHE</text><text x="612" y="38" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">IN-NETWORK GATEWAY</text><rect x="28" y="56" width="280" height="168" fill="rgba(6,182,195,0.06)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="168" y="80" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">ENGINEERED LAYOUT</text><rect x="44" y="96" width="248" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="168" y="112" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">stable system blocks</text><rect x="44" y="124" width="248" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="168" y="140" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">deterministic tool schemas</text><rect x="44" y="152" width="248" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="168" y="168" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">cache-friendly message order</text><rect x="44" y="180" width="248" height="28" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="168" y="199" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.12em">HIT · REUSE PREFIX</text><rect x="332" y="56" width="280" height="168" fill="rgba(217,102,28,0.07)" stroke="#D9661C" stroke-opacity="0.65"/><text x="472" y="80" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">VIBE CHURN</text><rect x="348" y="96" width="248" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="472" y="112" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="12">rewritten system each turn</text><rect x="348" y="124" width="248" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="472" y="140" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="12">tool names drift mid-run</text><rect x="348" y="152" width="248" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="472" y="168" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="12">job facts shoved into prefix</text><rect x="348" y="180" width="248" height="28" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.75"/><text x="472" y="199" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.12em">MISS · REPAY TOKENS</text><path d="M168 224 V248" fill="none" stroke="#06B6C3" stroke-opacity="0.55"/><path d="M472 224 V248" fill="none" stroke="#D9661C" stroke-opacity="0.55"/><rect x="28" y="248" width="184" height="56" fill="rgba(217,102,28,0.1)" stroke="#D9661C" stroke-opacity="0.55"/><text x="120" y="272" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">01 · GATHER</text><text x="120" y="290" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">inspect · slim pack</text><rect x="228" y="248" width="184" height="56" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="320" y="272" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">02 · ACT</text><text x="320" y="290" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">small change · named tools</text><rect x="428" y="248" width="184" height="56" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="520" y="272" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">03 · VERIFY</text><text x="520" y="290" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">gate before done</text><path d="M120 304 V328 H520 V304" fill="none" stroke="rgba(238,234,226,0.2)" stroke-dasharray="3 4"/><text x="320" y="324" text-anchor="middle" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.12em">HIT AND MISS BOTH REACH VERIFY</text><rect x="28" y="348" width="584" height="68" fill="rgba(6,182,195,0.05)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="48" y="374" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">OBSERVABILITY</text><text x="48" y="394" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">prefix hash · tool schema id · cache hit/miss · token burn · why the gate opened</text><text x="48" y="408" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="12">inspect → plan → small change → verify stays on both paths</text><rect x="596" y="388" width="6" height="6" fill="#D9661C"/></svg><figcaption>Fig. 01. Stable blocks and schemas earn a cache hit. Vibe churn forces a miss. Both paths still owe gather, act, and a verify gate before done.</figcaption></figure>

Read the figure the way a reviewer will read a cost spike. The left column is boring on purpose: fixed blocks, named schemas, a message order that puts the stable prefix first. The right column looks busy and helpful. It rewrites the system prompt because someone added a tip, renames a tool because the JSON looked prettier, and shoves the ticket into the system block because that seemed convenient at 11pm. The encoder sees a new prefix. Miss. The loop still has to gather, act, and verify. You just paid twice for the privilege.

## What an engineered layout actually locks

Stability is not poetry. It is a short list of surfaces you refuse to mutate mid-run.

**System blocks stay versioned files.** STACK, PROJECT, TASK, CONVENTIONS. Or whatever names your estate already uses. The point is that the agent loads a known pack instead of inventing a new preamble every turn. When you launch a coding agent, prefer inspect, then plan, then the smallest correct change, then verify. That sequence is not theater. It keeps the expensive model from rewriting the world before it has read the file.

**Tool schemas stay deterministic.** Same name, same argument shape, same failure shape. If the tool contract changes, bump a version and treat it as a deploy, not as a chat edit. A reviewer should be able to open the trace and see that `read_file` in turn 40 is still the contract from turn 1. Drift in the schema is a silent cache killer and a silent permission killer.

**Message layout stays cache-friendly.** Put the durable instructions and tool definitions where the encoder expects a stable prefix. Put the ticket, the diff hunk, and the local evidence in the variable tail. Slim context packs already taught this lesson for knowledge work: the model should see what the job needs, not the estate memoir. Cache-friendly layout is the same idea applied to the wire format.

**The loop still ends in verify.** Cache hits do not certify correctness. A hot prefix can still drive a bad edit. Numeric gates on coding diffs, citation checks on retrieval, schema scores on mapping queues: those gates stay. Mapping work still only shows up to 60% less time on schema and mapping, and 3× throughput on attribute mapping, when the model proposes inside a scored contract. Speed without a gate is just a faster wrong answer.

## What a vibe harness burns

A vibe harness looks busy for about one afternoon.

Someone pastes a better system prompt into the live session, and the cache misses for every open thread that shared the old prefix. Someone adds a tool "just for this ticket" with a slightly different name. The schema fingerprint flips. Someone merges yesterday's failure notes into the system block instead of into a skill pack or a guide file, so the prefix grows and every later turn pays for the growth again.

Then the bill arrives. Token spend climbs while useful completions stay flat. The floor asks why the same workflow that was cheap on Tuesday is expensive on Thursday. The answer is almost never "the model got worse." The answer is that the harness stopped being a product and became a scratchpad.

Incident desks feel this as latency and as trust. A ranked hypothesis with evidence and a person on the last step is still how you get 75% lower mean time to recovery. A vibe harness that rewrites its own sensors mid-incident does not get you there. It gets you a long trace of re-explained context and a late page.

## Three sensors worth putting on the rail

If you only watch latency and final success, you will misdiagnose harness bugs as model bugs.

**Prompt-cache hit rate.** When the gateway or provider exposes it, log it per workflow, not as a single vanity number. A repeated mapping job should look different from a one-off research chat. Track the hit. Track the miss reason when you can: prefix change, tool schema change, forced refresh.

**Prompt stability.** Hash the durable blocks. If the hash flips between turns without a deliberate version bump, that is a defect. Stability is not "never change the prompt." Stability is "change it like software, with a diff a person can approve."

**Tool-trace shape.** Named tools. Bounded retries. Argument shapes that match the schema id. A trace that looks like a random walk of anonymous function calls is a miss waiting to happen, even when the cache is warm. Shape is how a reviewer reconstructs the run after a miss.

These sensors sit beside the same observability rail we already demand for permissions and evidence. They do not replace skills, slim packs, or numeric gates. They tell you whether the harness is earning reuse or burning it.

## What breaks when cache is an afterthought

**The mutating preamble.** Every turn appends a tip, a warning, or a pep talk to the system block. The model sounds careful. The encoder sees a new world every time.

**The anonymous tool zoo.** Thirty tools, soft names, optional arguments that mean different things on different days. The schema never fingerprints cleanly. Permissions become a story instead of a list.

**The prefix stuffed with the job.** The ticket body, the full schema dump, and last week's chat sit in the system section because someone wanted them "always visible." Visibility without layout discipline is just unpaid re-encoding.

**The hot miss that still ships.** Cache hit looks green. Verify is weak or missing. Leadership celebrates efficiency while the floor backs out a bad write. Cache is not a test gate.

**The lab number as a product claim.** Someone quotes an extreme hit rate from a private stack and pins it on your roadmap. You do not have their harness. Measure yours.

Each of these is a harness bug. Buying a larger context window will not fix them.

## Tradeoffs you actually have to make

Locking layouts costs design time. Versioning tool schemas costs process. Putting job facts in the tail means the model must gather instead of assuming the world is already in the system prompt. That can feel slower on the first turn.

Pay it. The alternative is repay on every turn.

Another trade: freshness versus hit rate. Sometimes the runbook changed an hour ago and the prefix must bump. Bump it on purpose. Write the version into the rail. A deliberate miss is cheaper than a silent stale instruction that ships the wrong remediation.

A third trade: one shared prefix versus many workflow-specific packs. A single mega-prefix is easier to cache and harder to reason about. Prefer small, named packs the gateway can route; composition beats a monolith that nobody dares to edit.

We still do not know how every provider will expose hit diagnostics next year. The rule that does not move is simpler. If you cannot point to a stable prefix, a schema id, and a verify step, you are not managing cache. You are hoping.

## What production demands

Production wants reuse you can defend in a review.

Keep durable instructions and tool schemas in versioned files. Lay messages so the stable prefix stays stable. Put the ticket and the local evidence in the variable tail. Run inspect, plan, small change, verify. Log hit rate, prefix hash, and tool-trace shape when the tooling exposes them, and refuse to call a cache hit a done signal.

At [sunrisegenai.com](https://sunrisegenai.com) the work is still the harness. The model is how the harness speaks. Cache is how the harness stops paying twice for the same speech. If your hit rate is a mystery and your tool schemas drift by accident, you do not have a quality-engineered loop yet. You have a vibe with a receipt.
