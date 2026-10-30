---
title: 'A model has to earn its route: swapping models with tests built from real failures'
description: 'Sending each task to the best model is the right idea, and a common source of quiet regressions. Here is how we gate model swaps: one case set per route, built from production failures, and a challenger only takes a route after it beats the current model on that set.'
date: '2026-10-30'
slug: model-route-gates
image: /og.png
tags:
  - agents
  - evals
  - models
  - production
---

Most production AI products stopped being "one model" a while ago. A single product might send code edits to one model, short summaries to a cheaper one, image briefs to an image model, and the occasional hard planning question to the most expensive reasoning tier it can reach. Picking the best model for each task is the right instinct. It is also where a lot of quiet regressions come from.

A new model ships every few weeks. It tops a leaderboard, the release notes look great, and someone swaps it in. Two weeks later a client mentions that the summaries started dropping dates, or that the agent now wraps every JSON reply in a code fence the parser rejects. Nobody connects it to the swap, because nothing threw an error.

The fix we use is simple to describe. Every route has its own test set. The test set is built from real failures. A model only takes a route after it beats the current one on that set. Here is how that works in practice.

## A route is a task type, not a model

Start by naming the routes. A route is a kind of work your product sends to a model, with a clear idea of what a good answer looks like. Examples from our own builds:

- **Code edits.** Change a file so the tests pass and nothing unrelated moves.
- **Summaries.** Compress a long thread into a few lines and keep every date, name and amount.
- **Extraction.** Pull fields out of a document into a fixed schema.
- **Planning.** Break a request into steps an agent can carry out.
- **Image briefs.** Turn a description into a prompt an image model actually follows.

Each route fails in its own way, so each needs its own checks. A summary that reads well but drops an invoice amount is a failure. A code edit that passes the tests but rewrites an unrelated file is a failure. A general benchmark score sees neither.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 380" role="img" aria-labelledby="routes-title routes-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="routes-title">Routes, each with its own case set</title><desc id="routes-desc">A request enters a router on the left. The router sends it to one of four routes: code edits, summaries, extraction, and planning. Each route has three parts: its own case set built from real inputs, the current model that holds the route, and a challenger model that is being tested against the same cases. A dashed line from production failures feeds new cases back into every case set.</desc><rect width="640" height="380" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 364 H36 M16 364 V344" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 364 H604 M624 364 V344" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · ONE SET PER ROUTE</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">ROUTING</text><g font-family="'Source Serif 4', Georgia, serif"><rect x="36" y="168" width="96" height="44" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="84" y="195" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="12" font-weight="600">Request</text><rect x="160" y="160" width="100" height="60" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.8"/><text x="210" y="186" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Router</text><text x="210" y="204" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">which task?</text><g font-size="12"><rect x="300" y="64" width="300" height="56" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="314" y="86" fill="#06B6C3" font-weight="600">Code edits</text><text x="314" y="106" fill="rgba(238,234,226,0.65)" font-size="11">case set · current model · challenger</text><rect x="300" y="134" width="300" height="56" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="314" y="156" fill="#06B6C3" font-weight="600">Summaries</text><text x="314" y="176" fill="rgba(238,234,226,0.65)" font-size="11">case set · current model · challenger</text><rect x="300" y="204" width="300" height="56" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="314" y="226" fill="#06B6C3" font-weight="600">Extraction</text><text x="314" y="246" fill="rgba(238,234,226,0.65)" font-size="11">case set · current model · challenger</text><rect x="300" y="274" width="300" height="56" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="314" y="296" fill="#06B6C3" font-weight="600">Planning</text><text x="314" y="316" fill="rgba(238,234,226,0.65)" font-size="11">case set · current model · challenger</text></g><rect x="36" y="290" width="200" height="40" fill="rgba(250,195,69,0.10)" stroke="#FAC345" stroke-opacity="0.7"/><text x="136" y="315" text-anchor="middle" fill="#FAC345" font-size="12" font-weight="600">Production failures</text></g><g fill="none" stroke="rgba(238,234,226,0.4)" stroke-width="1.2"><path d="M132 190 H155"/><path d="M260 180 L295 92"/><path d="M260 186 L295 162"/><path d="M260 196 L295 232"/><path d="M260 204 L295 302"/><path d="M136 290 V250 H280 V346 H612 V92 H604" stroke="#FAC345" stroke-opacity="0.55" stroke-dasharray="3 4"/></g><text x="452" y="362" text-anchor="middle" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="11">every failure becomes a case on its route</text></svg><figcaption>Fig. 01. The router decides which kind of work a request is. Each kind of work keeps its own cases, its current model, and room for a challenger.</figcaption></figure>

## Build the case set from what actually broke

The best test cases are the ones production already wrote for you. Every time a run goes wrong, we save three things: the exact input, the steps the agent took (tool calls and intermediate outputs), and the answer it should have given. That case goes into the route's set the same week, while everyone still remembers what went wrong.

A few rules keep the set useful:

- **Real inputs only,** with private details removed. Invented cases test what you imagined users do. Saved cases test what they actually did.
- **Every case has a check a script can run.** A field that must be present, a test that must pass, a request that must be refused, a format the parser accepts. If a case can only be judged by reading it, write down exactly what the reader looks for, and keep those cases few.
- **Keep the passing cases too.** A set made only of old failures tells you whether a new model fixes past mistakes. It says nothing about whether it breaks what already worked. Mix both.
- **Start small.** Fifteen to twenty cases per route catches the obvious regressions. The set grows on its own as new failures arrive.

After a couple of months the set reflects your users, your documents and your edge cases. That is worth more than any public benchmark, because it measures the job you actually do. It is the same idea we use when we [audit an agent's instructions](/blog/instruction-ablation-audit/): freeze real cases first, then change one thing and measure.

## Grade the path, not only the answer

For agent routes, the final answer can be right for the wrong reasons. A challenger might reach the correct file edit after reading forty files and calling search a dozen times, where the current model needed four reads. Or it might land the right answer by skipping a confirmation step it was supposed to take.

So on agent routes we record the whole run and check it, not just the last message. Did it call the tools it should have? Did it ask for approval where approval was required? How many steps and tokens did it spend? A challenger that matches quality but takes three times the steps is not an upgrade. It is the same answer, slower and more expensive.

## The swap gate

When a new model looks promising, it runs as a challenger on the route's full case set, with the same instructions, the same tools and the same budgets as the current model. Then we compare, in this order.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 360" role="img" aria-labelledby="gate-title gate-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="gate-title">The model swap gate</title><desc id="gate-desc">A challenger model passes through four checks in order. First, quality: it must pass every case the current model passes, and any case that flips from pass to fail is read by a person. Second, format: its output must still parse. Third, the path: tool calls, approvals, and step count. Fourth, cost and latency per case. If any check fails, the challenger is rejected or kept only as a fallback. If all pass, it is promoted by a one-line config change, and the previous model stays wired as a fallback.</desc><rect width="640" height="360" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 344 H36 M16 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 344 H604 M624 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 02 · EARN THE ROUTE</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">SWAP GATE</text><g font-family="'Source Serif 4', Georgia, serif"><rect x="28" y="96" width="104" height="60" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.8"/><text x="80" y="122" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Challenger</text><text x="80" y="140" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">same set, tools</text><rect x="152" y="96" width="102" height="60" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="203" y="122" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">1. Quality</text><text x="203" y="140" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">no pass flips</text><rect x="272" y="96" width="102" height="60" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="323" y="122" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">2. Format</text><text x="323" y="140" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">still parses</text><rect x="392" y="96" width="102" height="60" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="443" y="122" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">3. Path</text><text x="443" y="140" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">tools, approvals</text><rect x="512" y="96" width="102" height="60" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="563" y="122" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">4. Cost</text><text x="563" y="140" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">tokens, time</text><rect x="392" y="230" width="222" height="64" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="503" y="256" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Promote</text><text x="503" y="276" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">one config line, old model as fallback</text><rect x="28" y="230" width="226" height="64" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="141" y="256" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="13" font-weight="600">Reject or keep as fallback</text><text x="141" y="276" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">any check fails</text></g><g fill="none" stroke="rgba(238,234,226,0.4)" stroke-width="1.2"><path d="M132 126 H148"/><path d="M254 126 H268"/><path d="M374 126 H388"/><path d="M494 126 H508"/><path d="M563 156 V226"/><path d="M203 156 V190 H141 V226" stroke-dasharray="3 4"/><path d="M323 156 V190 H141" stroke-dasharray="3 4"/><path d="M443 156 V190 H323" stroke-dasharray="3 4"/></g><text x="320" y="326" text-anchor="middle" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="11">a leaderboard win gets a model into the gate, not through it</text></svg><figcaption>Fig. 02. Quality comes first, and a single case flipping from pass to fail gets read by a person before anything else. Cost only matters once quality holds.</figcaption></figure>

1. **Quality.** Does the challenger pass every case the current model passes? Any case that flips from pass to fail gets read by a person before anything else happens. Sometimes the old answer was the wrong one and the check needs fixing. More often the flip is real.
2. **Format.** Does the output still parse? Small changes in formatting break more integrations than bad reasoning does.
3. **Path.** On agent routes, did it use the right tools, take the required approvals, and stay within the step budget?
4. **Cost and latency.** Tokens per case, time to first token, total time per case.

Then one of three decisions: promote it, reject it, or keep it wired as a fallback for when the current model is slow or unavailable.

A model can win one route and lose another. That is normal, and it is the whole point of having routes. The cheaper model that handles extraction perfectly can be the right call there and the wrong one for planning.

## Log the difference per tier

Many products also route by difficulty: a fast, cheap tier for easy requests and a top tier for hard ones. The question is always whether the top tier is earning its price. So for each route and each tier we keep two numbers from the case set: how many cases pass, and what each case costs. When the cheap tier passes the same cases as the expensive one, the expensive tier comes off that route. When the cheap tier fails cases users care about, it stays off, however tempting the bill looks.

The same log tells you when the routing itself is wrong. If requests the router marked as easy keep showing up in the failure log, the router is misjudging difficulty. That is a fix in the router, not a reason to buy a bigger model.

## Keep every swap reversible

Promotion is a config change, not a rewrite. Each route names its model in exactly one place, and the previous model stays wired as a fallback for a few weeks. If something slips past the case set, rolling back is one line. Then the new failure goes into the set, so the next challenger has to handle it too.

## What this buys you

None of this is exotic. It is a folder of cases per route, a script that runs them against two models, and a habit of saving failures the week they happen. What it buys is speed. When a better model arrives, you know within an afternoon whether it is better for your work, on which routes, and at what cost, and you can adopt it without crossing your fingers.

That is how we think about model choice at Sunrise. The best model for a task is the one that passes that task's tests, not the one at the top of this week's chart.
