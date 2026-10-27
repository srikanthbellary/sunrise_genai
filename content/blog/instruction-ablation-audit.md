---
title: 'Delete one rule and rerun: how we audit an agent''s instructions'
description: 'Agent instructions only grow. Every rule costs tokens and steps, and some quietly make the work worse. Here is the audit we run: freeze a case set, remove one rule, rerun, compare quality and cost, and move the rules that matter into code.'
date: '2026-10-27'
slug: instruction-ablation-audit
image: /og.png
tags:
  - agents
  - evals
  - instructions
  - production
---

Every agent we run in production started with a short set of instructions. None of them stayed short.

It happens the same way each time. A run goes wrong, someone adds a line so it never happens again, and the line stays. "Double check every file before editing." "Always search the codebase first." "Be thorough." A few months later the instructions are three times longer, the agent is slower, the bill is higher, and nobody can say which of those lines is still pulling its weight.

Instructions are code that nobody tests. So we started testing them. The method is plain, a little tedious, and it has paid for itself on every agent we have applied it to.

## Why rules pile up

Adding a rule feels free. It is one sentence, it addresses a failure you just watched, and there is no review step for prose in a system prompt. Removing a rule feels risky, because you cannot remember why it was added and you do not want the old failure back.

That asymmetry means instructions only grow. And growth is not neutral:

- **Rules cost tokens on every run.** The instructions ride along with each call, so a line that fires once a month is paid for every single time.
- **Rules cost steps.** "Verify twice" is not one extra sentence. It is extra tool calls, extra file reads, extra turns, each one adding latency and spend.
- **Rules collide.** "Be concise" and "explain your reasoning fully" can both be in the same prompt, written months apart. The agent spends effort reconciling them, and the result satisfies neither.
- **Rules go stale.** An example that matched last spring's folder layout now points the agent at files that no longer exist.

None of this shows up as an error. The agent still finishes. It just does more work than the task needed, and some of that work makes the output worse.

## The audit, step by step

The audit borrows an idea from research called ablation: take one piece away, measure what changes, and decide from the measurement instead of from memory.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 360" role="img" aria-labelledby="loop-title loop-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="loop-title">The instruction audit loop</title><desc id="loop-desc">A loop of five steps. One, freeze a case set of real past tasks. Two, run the current instructions as a baseline and record quality checks and tokens. Three, remove one rule. Four, rerun the same cases. Five, compare. If quality holds and cost drops, delete the rule for good. If quality falls, restore the rule or move it into code. Then pick the next rule and repeat.</desc><rect width="640" height="360" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 344 H36 M16 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 344 H604 M624 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · ONE RULE AT A TIME</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">THE AUDIT LOOP</text><g font-family="'Source Serif 4', Georgia, serif"><rect x="40" y="80" width="150" height="64" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="115" y="106" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">1. Freeze cases</text><text x="115" y="126" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">real past tasks + checks</text><rect x="245" y="80" width="150" height="64" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="320" y="106" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">2. Baseline run</text><text x="320" y="126" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">quality, tokens, steps</text><rect x="450" y="80" width="150" height="64" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.8"/><text x="525" y="106" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">3. Remove one rule</text><text x="525" y="126" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">only one, never three</text><rect x="450" y="200" width="150" height="64" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="525" y="226" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">4. Rerun same cases</text><text x="525" y="246" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">same model, same budget</text><rect x="245" y="200" width="150" height="64" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="320" y="226" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">5. Compare</text><text x="320" y="246" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">quality first, then cost</text><rect x="40" y="170" width="150" height="50" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="115" y="191" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="12" font-weight="600">Quality holds</text><text x="115" y="208" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">delete the rule</text><rect x="40" y="244" width="150" height="50" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="115" y="265" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="12" font-weight="600">Quality drops</text><text x="115" y="282" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">restore or move to code</text></g><g fill="none" stroke="rgba(238,234,226,0.4)" stroke-width="1.2"><path d="M190 112 H240"/><path d="M395 112 H445"/><path d="M525 144 V195"/><path d="M450 232 H400"/><path d="M245 222 L195 198"/><path d="M245 242 L195 266"/><path d="M115 294 V318 H525 V268" stroke-dasharray="3 4"/></g><text x="320" y="334" text-anchor="middle" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="11">next rule, same cases</text></svg><figcaption>Fig. 01. The audit changes one thing per pass. If you remove three rules at once and quality drops, you have learned nothing about which one mattered.</figcaption></figure>

**1. Freeze a case set.** Pull real tasks the agent has already handled, not ones you invent. Twenty to fifty is usually enough to start. For each one, write down what a good result must contain: the fields that must be filled, the file that must change, the test that must pass, the question it must refuse. These become checks a script can run, so "did it get better or worse" is not a matter of reading transcripts and squinting.

**2. Run a baseline.** Run the current instructions against every case, more than once if the agent is not deterministic. Record three things per run: whether the checks passed, the tokens spent, and the number of steps (tool calls and turns). Keep the transcripts.

**3. Remove one rule.** Pick the line you are least sure about. Take it out. Change nothing else: same model, same tools, same budget.

**4. Rerun the same cases.** Same cases, same number of repeats.

**5. Compare, quality first.** If any check that passed before now fails, the rule was doing real work. If every check holds and tokens or steps went down, the rule was a cost with no benefit, and it goes. If nothing moved at all, the rule is dead weight and it goes too, because it is still paid for on every call.

Then pick the next rule and repeat. It is slow the first time. After that, the case set exists, and every future edit to the instructions can run through it before it ships.

## Where a rule should actually live

The audit usually turns up a second finding, more useful than the first. Many of the rules that matter should not be prose at all.

A sentence like "never retry more than three times" is a request. The model may honor it, or it may decide this situation is special. A retry limit in the tool code is a fact. The same goes for output shape, spend, and approvals.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 380" role="img" aria-labelledby="move-title move-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="move-title">Moving rules from prose into code</title><desc id="move-desc">Two columns. On the left, rules written as prose in the instructions. On the right, the code control that replaces each one. Output must be valid JSON with these fields becomes a schema check in code. Do not retry more than three times becomes a retry limit in the tool. Do not spend too long on one task becomes a token and step budget enforced by the runner. Ask before deleting anything becomes an approval gate on the delete tool. Only read the fields you need becomes filtering the API response before the model sees it. Judgment calls such as tone and what to prioritize stay as prose.</desc><rect width="640" height="380" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 364 H36 M16 364 V344" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 364 H604 M624 364 V344" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 02 · REQUEST VS FACT</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">WHERE RULES LIVE</text><g font-family="'Source Serif 4', Georgia, serif" font-size="12"><text x="40" y="76" fill="#D9661C" font-size="12" font-weight="600" letter-spacing="0.1em">PROSE IN THE PROMPT</text><text x="360" y="76" fill="#06B6C3" font-size="12" font-weight="600" letter-spacing="0.1em">CONTROL IN CODE</text><g fill="rgba(238,234,226,0.82)"><text x="40" y="112">"Return valid JSON with these fields"</text><text x="40" y="152">"Never retry more than three times"</text><text x="40" y="192">"Don't spend too long on one task"</text><text x="40" y="232">"Ask before deleting anything"</text><text x="40" y="272">"Only look at the fields you need"</text></g><g fill="rgba(238,234,226,0.82)"><text x="360" y="112">Schema check, reject and resend</text><text x="360" y="152">Retry limit inside the tool</text><text x="360" y="192">Token and step budget in the runner</text><text x="360" y="232">Approval gate on the delete tool</text><text x="360" y="272">Filter the response before the model</text></g><g stroke="rgba(238,234,226,0.35)" stroke-width="1.2" fill="none"><path d="M300 108 H350 M342 103 L350 108 L342 113"/><path d="M300 148 H350 M342 143 L350 148 L342 153"/><path d="M300 188 H350 M342 183 L350 188 L342 193"/><path d="M300 228 H350 M342 223 L350 228 L342 233"/><path d="M300 268 H350 M342 263 L350 268 L342 273"/></g><rect x="40" y="300" width="560" height="44" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.5"/><text x="320" y="320" text-anchor="middle" fill="#FAC345" font-weight="600">What stays as prose</text><text x="320" y="336" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">judgment: tone, priorities, what good looks like for this client</text></g></svg><figcaption>Fig. 02. A rule in the prompt is a request the model weighs. A rule in code is a fact it cannot talk its way around. Move the mechanical ones, keep the judgment.</figcaption></figure>

The pattern we follow:

- **Format rules become schema checks.** Validate the output in code. If it fails, send it back with the error. You no longer need a paragraph begging for valid JSON, and you stop paying for a second model call to inspect formatting a parser can check for free.
- **Retry and stop rules become limits in the tools.** A retry counter with a stopping condition, set where the call is made.
- **"Don't overdo it" becomes a budget.** A cap on tokens and steps per task, enforced by whatever runs the agent. When it trips, the run stops and the transcript goes to a person.
- **Safety rules become approval gates.** If an action needs a human yes, the tool should refuse to run without one, whatever the prompt says.
- **"Ignore the noise" becomes filtering.** Strip an API response down to the fields the task needs before the model ever reads it. Less context in, less to get distracted by.

Each of these removes a line from the instructions and makes the behavior more reliable at the same time. What is left in the prose is the part only prose can carry: judgment, priorities, and what a good result looks like for this particular job. We made a related argument in [Slim context packs beat written rules](/blog/slim-context-packs/). The audit is how you get there from an instruction file that has already grown.

## Tooling, without the shopping list

You do not need a platform to start. A folder of cases, a script that runs them, and the instructions under version control will take you most of the way. Git matters more than it sounds: when quality dips, you want to find the commit where a rule appeared, read the diff, and roll it back.

When the case set grows, open-source eval frameworks such as Promptfoo, DeepEval, or Inspect AI make it easier to run the same cases against two versions of the instructions and score the difference, including multi-turn runs with tool calls. Tracing tools such as Langfuse or OpenLIT show where the tokens and steps went inside a run, which tells you which rule to audit next. Pick one of each. The method matters far more than the brand.

## What to expect, and what not to

We are careful not to promise a number here. How much an audit saves depends entirely on how the instructions grew. A young agent with a tight prompt may have nothing to remove. An agent that has absorbed a year of incident fixes usually has a lot.

Two things hold every time. First, some rules you are sure are essential turn out to change nothing, and you only find out by removing them. Second, some rules you would have cut on sight turn out to be quietly holding a requirement in place, and the case set catches it before a client does. Both outcomes are the point. You stop deciding from memory and start deciding from a rerun.

Keep the real requirements, keep the quality checks, keep every approval boundary. Remove the rest one line at a time, and rerun after each one. The most expensive sentence in an agent's instructions is often the one nobody remembers writing.
