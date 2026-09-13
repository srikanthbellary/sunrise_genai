---
title: Slim context packs beat written rules
description: Long policy in the prompt is not control. Slim packs plus hard stops — allowlists, budgets, stop sequences, refuse-when-unsourced — are control. Evaluation is product surface.
date: '2026-09-12'
slug: slim-context-packs
image: /og.png
tags:
  - context
  - evaluation
  - harness
---

We build production GenAI for operations, knowledge, and data. All three punish a fat prompt. Operations cannot wait while a model rereads a policy novel on every turn. Knowledge cannot cite a paragraph that was “in the instructions.” Data cannot map a thousand attributes by stuffing last year’s standards document into the window and hoping attention holds. Control is not a longer system message. Control is a slim pack and a stop the model cannot talk its way around.

Long policy documents in the prompt are not control. Models negotiate with prose. They summarize the rule, then “interpret” it, then perform the interpretation with confidence. Hard stops are control: tool allowlists, token budgets, stop sequences, and a refuse-when-unsourced path. Written rules are a hope. A hard stop is a contract.

## The model will bargain with your lecture

A policy paragraph has the grammar of law and the enforcement of a suggestion. That would be fine in a style guide. It is not fine when the act can edit a service, file a remediation, or write a mapping into a review queue. Attention is finite. The more you stuff into the window, the more the actual schema, the actual citation, and the actual allowlist have to compete with your anxiety.

Teams reach for more writing because writing is cheap and engineering is not. Add a section. Add an example of being careful. Add a reminder not to invent. The pack gets heavier. The failure mode stays the same: the model produces a fluent continuation that is only loosely coupled to the rule. Then someone says the model “didn’t listen,” which is a category error. It listened the way a next-token machine listens. You asked it to be the control plane. It is a generator.

The other failure is quieter. A fat pack destroys cache shape. Repeated enterprise workflows should hit a stable prefix. When every turn carries a different lecture, you pay again. The gateway pattern we run — reusable context, model-aware temperature, stop-sequence hardening — is how we hold *42% lower token spend*, *2.4× useful completions per 1k tokens*, and about *68% prompt-cache hit* on those workloads. Those numbers move the wrong way the moment the pack becomes a memoir.

## What a slim pack actually contains

A slim context pack is not “fewer words” as a brand. It is the minimum the expensive model is allowed to see in order to do this job, this turn.

The schema — the fields, the types, the required keys. The few examples that changed a reviewer’s mind, not the twenty that made a slide. The citations or source ids that must be present for an answer to count. The name of the tool that may fire. The definition of done for this workflow. That is the pack. Everything else is either a hard stop outside the prompt, or it is noise.

Schema and attribute mapping is the cleanest picture of the idea. The work is structured. The examples that matter are few. Confidence scoring and a review queue sit beside the model, not inside a paragraph about being thorough. That is how we deliver *up to 60% less time on schema and mapping work* and *3× throughput on attribute mapping*. The gain is not a bigger window. The gain is a slim pack, a scored proposal, and a human on the last step.

Grounded retrieval is the same shape in another room. The pack holds the retrieved passages and the rule that an answer without a supporting source is a refusal. Graph relationships can sit under the retrieval. They do not need to be restated as a speech. If the source is missing, the system says so. If you instead paste a ten-page “citation policy,” you have asked the model to police itself.

## Hard stops live beside the model, not in its mouth

Allowlists, budgets, stop sequences, and refusals are not tone. They are gates. The expensive model sits above them. Cheap workers sit below them. The gates do not care how eloquent the completion was.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 430" role="img" aria-labelledby="stops-title stops-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="stops-title">Slim packs, cheap workers, and hard stops</title><desc id="stops-desc">An expensive model receives a slim context pack. Four hard-stop gates — allowlist, budget, refuse, and eval — sit between it and a row of cheap workers. A fat policy scroll is marked as a dead path that never becomes a gate.</desc><rect width="640" height="430" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V410 M52 20 V410 M84 20 V410 M116 20 V410 M148 20 V410 M180 20 V410 M212 20 V410 M244 20 V410 M276 20 V410 M308 20 V410 M340 20 V410 M372 20 V410 M404 20 V410 M436 20 V410 M468 20 V410 M500 20 V410 M532 20 V410 M564 20 V410 M596 20 V410 M628 20 V410"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 414 H36 M16 414 V394" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 414 H604 M624 414 V394" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · PACK AND STOPS</text><rect x="28" y="56" width="360" height="88" fill="rgba(217,102,28,0.08)" stroke="#D9661C" stroke-opacity="0.65"/><text x="44" y="80" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">EXPENSIVE MODEL</text><text x="44" y="104" fill="rgba(238,234,226,0.86)" font-family="'Source Serif 4', Georgia, serif" font-size="15">sees the slim pack only</text><text x="44" y="126" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="13">schema · few examples · required citations</text><rect x="404" y="56" width="208" height="88" fill="rgba(6,182,195,0.07)" stroke="#06B6C3" stroke-opacity="0.5"/><text x="420" y="80" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">SLIM PACK</text><rect x="420" y="92" width="88" height="10" fill="#FAC345" fill-opacity="0.85"/><rect x="420" y="108" width="56" height="10" fill="#FAC345" fill-opacity="0.45"/><rect x="420" y="124" width="72" height="10" fill="#D9661C" fill-opacity="0.7"/><text x="28" y="172" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">HARD STOPS</text><rect x="28" y="184" width="138" height="64" fill="rgba(0,8,22,0.7)" stroke="#D9661C" stroke-opacity="0.7"/><text x="97" y="210" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.12em">ALLOWLIST</text><text x="97" y="230" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-family="'Source Serif 4', Georgia, serif" font-size="12">tool not listed · no</text><rect x="176" y="184" width="138" height="64" fill="rgba(0,8,22,0.7)" stroke="#D9661C" stroke-opacity="0.7"/><text x="245" y="210" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.12em">BUDGET</text><text x="245" y="230" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-family="'Source Serif 4', Georgia, serif" font-size="12">tokens / retries spent</text><rect x="324" y="184" width="138" height="64" fill="rgba(0,8,22,0.7)" stroke="#06B6C3" stroke-opacity="0.65"/><text x="393" y="210" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.12em">REFUSE</text><text x="393" y="230" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-family="'Source Serif 4', Georgia, serif" font-size="12">unsourced · stop</text><rect x="472" y="184" width="140" height="64" fill="rgba(0,8,22,0.7)" stroke="#06B6C3" stroke-opacity="0.65"/><text x="542" y="210" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.12em">EVAL</text><text x="542" y="230" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-family="'Source Serif 4', Georgia, serif" font-size="12">gate before done</text><path d="M208 144 V184" fill="none" stroke="rgba(238,234,226,0.25)" stroke-dasharray="3 4"/><path d="M97 248 V276 H543 V248" fill="none" stroke="rgba(238,234,226,0.22)" stroke-dasharray="3 4"/><text x="28" y="298" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">CHEAP WORKERS</text><rect x="28" y="308" width="184" height="48" fill="rgba(250,195,69,0.06)" stroke="rgba(238,234,226,0.18)"/><text x="120" y="337" text-anchor="middle" fill="rgba(238,234,226,0.86)" font-family="'Source Serif 4', Georgia, serif" font-size="14">retrieve · parse</text><rect x="224" y="308" width="184" height="48" fill="rgba(250,195,69,0.06)" stroke="rgba(238,234,226,0.18)"/><text x="316" y="337" text-anchor="middle" fill="rgba(238,234,226,0.86)" font-family="'Source Serif 4', Georgia, serif" font-size="14">score · check</text><rect x="420" y="308" width="192" height="48" fill="rgba(250,195,69,0.06)" stroke="rgba(238,234,226,0.18)"/><text x="516" y="337" text-anchor="middle" fill="rgba(238,234,226,0.86)" font-family="'Source Serif 4', Georgia, serif" font-size="14">format · cache</text><rect x="28" y="372" width="584" height="40" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.1)"/><text x="44" y="397" fill="rgba(238,234,226,0.38)" font-family="'Source Serif 4', Georgia, serif" font-size="13">dead path · fat policy scroll in the prompt — negotiated, never a gate</text><path d="M430 384 L610 384" stroke="#D9661C" stroke-opacity="0.45"/></svg><figcaption>Fig. 01 — The expensive model sees a small pack. Allowlist, budget, refuse, and eval sit in the harness. Cheap workers do the rest.</figcaption></figure>

**Allowlist.** If the tool is not on the list, it does not run. The model may ask. The harness does not discuss it.

**Budget.** Tokens, retries, wall time, number of files. When the budget is spent, the loop ends and escalates. A retry without a new gather is a hang you are paying for.

**Refuse.** Retrieval and mapping both need a fail-closed path. No source, no answer. No confidence, no silent write. “I do not know” is a successful control outcome.

**Eval.** The test gate from the harness essay, applied to this pack: did the required keys appear, did the citation resolve, did the mapping stay inside the schema, did the stop sequence actually stop. Evaluation harnesses are product surface, not a slide.

Cheap workers — retrieve, parse, score, check, format, cache — should do most of the motion. The expensive model should see the pack and make the bounded judgment. That is in-network gateway thinking: route the hard call, reuse the prefix, harden the stop, keep the wander out.

## Evaluation is how you know the stop held

If you cannot score the pack, you do not have a pack. You have a prompt you like. Evaluation harnesses, guardrails, and regression suites belong next to the gateway, not in a quarterly review. The scoreboard a reviewer can see is part of the product: this workflow’s refuse rate, this workflow’s cache hit, this workflow’s useful completions, this workflow’s mapping confidence.

Incident work makes the same demand in hotter air. A multi-agent read of telemetry, tickets, and runbooks that cannot be evaluated will not deliver *75% lower mean time to recovery*. The on-call does not need more policy text. They need a ranked hypothesis, evidence, and a system that stops when the evidence is not there.

Do not confuse a red-team paragraph with a suite. A paragraph asks the model to be good. A suite tries to make it fail the same way twice and then refuses to ship the loop that failed.

## Failure modes of “we wrote it down”

**Policy theater.** A long instruction that no tool, budget, or test consults. Comforting in a design review. Invisible at runtime.

**Budget overrun.** No cap, or a cap the model is allowed to plead past. The loop looks busy. The bill is the only honest metric.

**Missing refuse.** The system would rather complete than stop. Unsourced answers get a tone of caution instead of a refusal. Caution is still a completion.

**Example hoarding.** Twenty few-shots that once helped a demo. The pack is now a junk drawer. Cache dies. The one example that mattered is buried.

**Silent template fallback.** Eval failed, so the old template printed. Leadership sees throughput. The floor sees a costume. This is the same defect as a harness without a test gate.

**One pack for every job.** File-and-test, incident hypothesis, and attribute mapping do not share a definition of done. A universal lecture is how you get a universal shrug.

## Tradeoffs: what you cut, what you enforce

Slimming the pack means someone has to decide what the model is no longer allowed to see. That decision is political inside a company and technical inside a gateway. Cut the history that does not change the act. Cut the policy that a gate already enforces. Keep the schema. Keep the two examples that prevent a known miss. Keep the identifiers the refuse path needs.

Enforcing stops means you will ship fewer fluent completions. That is the point. Useful completions per thousand tokens go up when the useless ones die at a gate. Token spend goes down when cheap workers and a stable prefix do the walking. Mapping throughput goes up when the model proposes inside a schema and a queue, instead of narrating the standards document.

The trade you should not make is “we will enforce it later.” Later is when the prompt has become folklore and no one will touch it because a demo once worked.

## What production demands

Keep the pack small enough that a reviewer can read it in one sitting. Keep the stops mechanical: allowlist, budget, refuse, eval. Keep the expensive model above the gates and the cheap workers below them. Keep reusable context on the gateway so repeated workflows can cache. Keep the scoreboard where a person can see it.

If the source is missing, the system says so. If the budget is spent, the loop ends. If the tool is not on the list, it does not run. That is the standard we ship from [sunrisegenai.com](https://sunrisegenai.com). Written rules are what you tell a person. Hard stops are what you tell a loop. Only one of those is control.
