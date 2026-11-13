---
title: 'Ask for a label, not a paragraph: confidence-gated decisions in agent pipelines'
description: 'Many of the model calls in a production agent are not writing anything. They are choosing: which queue, which intent, ship or hold. We treat those calls as typed judgments with a closed set of answers, a confidence score we actually check, and three bands that decide whether the agent acts, asks, or hands off.'
date: '2026-11-13'
slug: confidence-gated-decisions
image: /og.png
tags:
  - agents
  - evals
  - production
  - routing
---

We build production GenAI for operations, knowledge, and data. When we trace a working agent call by call, a pattern shows up every time. Only some of the calls write something a person will read. The rest are decisions. Is this email a refund request or a shipping question? Does this document belong to the finance tree or the legal tree? Is this draft ready for review, or does it go back for another pass?

Those decision calls are where quiet failures live. Nobody reads them. They just steer everything after them.

## The prompt-and-parse trap

The first version of a routing step usually looks the same. A prompt asks a chat model to "classify this ticket and explain your reasoning," then a few lines of code hunt through the reply for a category name. It works in the demo. Then the model starts a reply with "Based on the details, this looks most like a billing issue, though it could also be account access," and the parser picks whichever word it finds first.

Three things go wrong at once in that setup.

The answer space is open. The model can invent a category you never defined, or blend two. The parser then guesses, and the guess is invisible.

There is no usable confidence. A paragraph that says "most likely" carries no number you can threshold. Asking the model to append "confidence: 0.9" gets you a number that sounds precise and usually is not tied to how often it is right.

And the cost is in the wrong place. You pay a writing model to write prose that a few lines of code then throw away.

## A decision is a typed question

We now write those steps as typed questions instead. Each one has three parts.

**The state.** The text being judged, plus only the context the decision needs. A ticket body and the customer's plan tier. Not the whole conversation history.

**A closed set of answers.** A fixed list of options, a yes or no, or a score on a defined scale. Every option has a one-line definition the team agreed on. "Other" is allowed, and it is a real answer that routes somewhere, not a shrug.

**A probability per answer.** The step returns a distribution over the options, not a sentence. Structured output from a general model, logprobs read off an open model, a small fine-tuned classifier, or a dedicated decision model can all fill this slot. The interface stays the same, so the harness does not care which engine sits behind it.

That last point matters more than it looks. Once the decision has a type, swapping the engine becomes a routing change with tests, the same way we treat any [model that has to earn its route](/blog/model-route-gates/). The prose-writing model keeps the jobs that need prose and multi-step reasoning. The judgment step does one thing.

A schema alone does not finish the job, though. Schema-constrained output guarantees the answer is one of your options. It says nothing about whether it is the right one, or how sure the system should be. That is the part most pipelines skip.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 380" role="img" aria-labelledby="gate-title gate-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="gate-title">A confidence-gated decision step inside an agent</title><desc id="gate-desc">Incoming work goes into a typed question made of state, a closed set of options, and a returned probability per option. The top probability is compared against two thresholds chosen on labeled data. Above the high threshold the agent acts on its own. Between the two thresholds the agent prepares the action and asks a person to confirm. Below the low threshold, or when the answer is Other, the item goes to a human queue. Every outcome is logged as a label for recalibration.</desc><g font-family="Inter, system-ui, sans-serif"><rect x="24" y="40" width="150" height="70" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.4)"/><text x="99" y="70" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Incoming work</text><text x="99" y="90" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">ticket, doc, draft</text><line x1="174" y1="75" x2="214" y2="75" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="214,70 224,75 214,80" fill="rgba(238,234,226,0.5)"/><rect x="226" y="24" width="190" height="102" fill="rgba(250,195,69,0.10)" stroke="#FAC345" stroke-opacity="0.75"/><text x="321" y="48" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">Typed question</text><text x="321" y="70" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">state: only what it needs</text><text x="321" y="88" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">options: closed list + Other</text><text x="321" y="106" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">returns: probability per option</text><line x1="416" y1="75" x2="456" y2="75" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="456,70 466,75 456,80" fill="rgba(238,234,226,0.5)"/><rect x="468" y="40" width="150" height="70" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.85"/><text x="543" y="70" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Threshold check</text><text x="543" y="90" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">set on labeled data</text><line x1="543" y1="110" x2="543" y2="150" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><line x1="123" y1="150" x2="543" y2="150" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><line x1="123" y1="150" x2="123" y2="176" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="118,176 123,186 128,176" fill="rgba(238,234,226,0.5)"/><line x1="321" y1="150" x2="321" y2="176" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="316,176 321,186 326,176" fill="rgba(238,234,226,0.5)"/><line x1="519" y1="150" x2="519" y2="176" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="514,176 519,186 524,176" fill="rgba(238,234,226,0.5)"/><rect x="28" y="188" width="190" height="96" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="123" y="214" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">Act</text><text x="123" y="236" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">above the high bar</text><text x="123" y="254" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">reversible internal steps</text><text x="123" y="272" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">route, tag, file</text><rect x="226" y="188" width="190" height="96" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.45)"/><text x="321" y="214" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Ask</text><text x="321" y="236" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">between the bars</text><text x="321" y="254" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">prepare, then confirm</text><text x="321" y="272" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">one click for a person</text><rect x="424" y="188" width="190" height="96" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.85"/><text x="519" y="214" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Hand off</text><text x="519" y="236" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">below the low bar</text><text x="519" y="254" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">or the answer is Other</text><text x="519" y="272" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">human queue with context</text><rect x="28" y="308" width="586" height="44" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="48" y="335" fill="rgba(238,234,226,0.7)" font-size="12">every outcome (accepted, corrected, handed off) is logged as a label for the next calibration check</text></g></svg><figcaption>Fig. 01. A decision step returns a probability per option. Two thresholds, chosen on labeled examples, split the work into act, ask, and hand off. Every outcome becomes a label.</figcaption></figure>

## Confidence you have checked

A confidence score is only useful if it means what it says. If a step reports 0.9 on a batch of items, roughly nine in ten of those should be right. That property is called calibration, and it is separate from accuracy. A step can be accurate and badly calibrated, confidently wrong on exactly the cases you most need flagged.

So before any threshold goes live, we build a small labeled set from real traffic. Not synthetic examples. Real tickets, real documents, real drafts, each one labeled by the person who owns that lane. A few dozen rows per option is enough to see the shape. We run the decision step over the set, bucket the predictions by reported confidence, and compare each bucket's reported confidence with how often it was actually right.

That comparison is a reliability chart. A well-calibrated step tracks the diagonal. An overconfident one bows below it: it says 0.9 and lands well short of nine in ten. The chart tells us two things at once. Whether the raw scores are usable at all, and where the thresholds should sit.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 380" role="img" aria-labelledby="cal-title cal-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="cal-title">Reading a reliability chart to set thresholds</title><desc id="cal-desc">A conceptual reliability chart. The horizontal axis is the confidence the decision step reports, from low to high. The vertical axis is how often the step was actually right in that bucket. A diagonal line marks perfect calibration. A second curve bows below the diagonal at high confidence, showing an overconfident step. Shaded vertical bands mark the hand-off zone at low confidence, the ask zone in the middle, and the act zone at high confidence, where the high threshold is placed where observed accuracy meets the bar the team agreed on.</desc><g font-family="Inter, system-ui, sans-serif"><rect x="80" y="30" width="150" height="280" fill="rgba(217,102,28,0.10)"/><rect x="230" y="30" width="190" height="280" fill="rgba(238,234,226,0.04)"/><rect x="420" y="30" width="160" height="280" fill="rgba(250,195,69,0.10)"/><text x="155" y="52" text-anchor="middle" fill="#D9661C" font-size="12" font-weight="600">hand off</text><text x="325" y="52" text-anchor="middle" fill="#EEEAE2" font-size="12" font-weight="600">ask</text><text x="500" y="52" text-anchor="middle" fill="#FAC345" font-size="12" font-weight="600">act</text><line x1="80" y1="310" x2="580" y2="310" stroke="rgba(238,234,226,0.55)" stroke-width="1.5"/><line x1="80" y1="310" x2="80" y2="30" stroke="rgba(238,234,226,0.55)" stroke-width="1.5"/><line x1="80" y1="310" x2="580" y2="30" stroke="rgba(238,234,226,0.45)" stroke-width="1.5" stroke-dasharray="6 5"/><text x="470" y="80" fill="rgba(238,234,226,0.6)" font-size="11" transform="rotate(-29 470 80)">perfectly calibrated</text><path d="M80,310 C180,250 280,190 360,160 C440,132 510,118 580,108" fill="none" stroke="#D9661C" stroke-width="2.5"/><text x="470" y="150" fill="#D9661C" font-size="11">overconfident step</text><line x1="420" y1="30" x2="420" y2="310" stroke="#FAC345" stroke-width="1.5" stroke-dasharray="3 4"/><line x1="230" y1="30" x2="230" y2="310" stroke="#D9661C" stroke-width="1.5" stroke-dasharray="3 4"/><text x="420" y="330" text-anchor="middle" fill="#FAC345" font-size="11">high bar</text><text x="230" y="330" text-anchor="middle" fill="#D9661C" font-size="11">low bar</text><text x="330" y="356" text-anchor="middle" fill="rgba(238,234,226,0.65)" font-size="12">reported confidence</text><text x="40" y="170" text-anchor="middle" fill="rgba(238,234,226,0.65)" font-size="12" transform="rotate(-90 40 170)">actually right</text></g></svg><figcaption>Fig. 02. Conceptual reliability chart. If a step bows below the diagonal, its raw score cannot be trusted as written, so the bars move to where observed accuracy on labeled data meets the team's bar.</figcaption></figure>

## Three bands, not one cutoff

A single cutoff forces a bad trade. Set it high and almost everything lands on a person's desk. Set it low and the agent acts on guesses. Two thresholds fix that by giving the middle a job.

**Act.** Above the high bar, the agent takes the step itself. We only allow this band for reversible, internal moves: routing a ticket, tagging a document, filing a draft into the right folder. Anything that leaves the building still goes through the [approval gate](/blog/proactive-approval-gates/), no matter how confident the score.

**Ask.** Between the bars, the agent prepares the action and shows it with the top two options. A person confirms with one click or picks the other one. This band is where most of the learning comes from, because every correction is a labeled example of exactly the kind the step finds hard.

**Hand off.** Below the low bar, or whenever the answer is "Other," the item goes to a human queue with the state attached, so the person does not start from zero.

Where the bars sit is a business decision written down in numbers, the same instinct as our [numeric quality gates](/blog/numeric-quality-gates/). The owner of the lane picks the error rate they can live with in the act band. The labeled set shows which confidence level delivers it. If no level does, the act band stays empty and the step runs in ask mode until it earns more.

## The labels you already have

Here is the part we think most decision pipelines leave on the table. A routing step is one of the few model calls that sees its own outcome. The ticket was reopened or it was not. The reviewer moved the document to another folder or left it. The draft was approved or sent back.

Those are free labels, arriving every day. We log every decision with its state, its distribution, the band it landed in, and what happened next. On a schedule, a short job rebuilds the reliability chart from the last window of outcomes and compares it to the one that set the thresholds.

When the curve drifts (new product names, a new kind of request, a model update behind the engine), the check fails loudly before the act band starts quietly misrouting. Then a person looks at the new failures, adds them to the labeled set, and resets the bars. The same discipline we use when we [delete one rule and rerun](/blog/instruction-ablation-audit/) on an agent's instructions: change one thing, measure, keep only what holds.

## Where we do not use it

Typed judgments are narrow on purpose. A single pass over a closed list cannot look anything up, run a check, or ask a follow-up question. So we keep them away from decisions that need any of that. Whether a contract clause is acceptable is not a label. Neither is anything involving a person's job, credit, or health; those stay with people, and a score can at most sort the queue they see.

We also do not trust a vendor's speed or accuracy multiple as a substitute for our own labeled set. A fast, cheap judge is useful. It is useful because we checked it on our traffic, not because a chart on a launch page said so.

What we have not settled is how small the labeled set can be for a lane with many rare options. A few dozen rows per option is easy for the common ones and slow for the long tail. For now the rare options live in the ask band until enough real corrections pile up. That is honest, but it is not fast.

## The short version

Most of what an agent does is choose, not write. Give those choices a type: a defined state, a closed list of answers, and a probability per answer. Check that the probability means what it says on labeled data from real traffic. Split the work into act, ask, and hand off with two bars the lane owner signs off on. Then let the outcomes you already collect keep the bars honest.

Ask for a label. Check the confidence. Let the middle band teach you.
