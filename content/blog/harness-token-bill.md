---
title: 'Pick the harness for the bill, not the score'
description: 'Run the same open-weight models through three coding harnesses and the pass rate barely moves, but the tokens spent per solved task can double. Here is how we choose a harness, cap a run, and make an agent test after its last edit.'
date: '2026-10-23'
slug: harness-token-bill
image: /og.png
tags:
  - agents
  - harnesses
  - evals
  - production
---

We build production GenAI for operations, knowledge, and data, and a growing share of that work runs through coding agents. So we get asked one question more than almost any other: which harness should we use? Claude Code, Codex, Cursor, or one of the open harnesses that wrap whatever model you point them at.

The usual way to answer is to look at a leaderboard and pick the one with the highest pass rate. A recent study suggests that for at least some models this is the wrong number to stare at. The pass rate hardly moves when you swap the harness. What moves is the bill.

## The experiment

Reflection AI ran a study inside SWE-Bench Pro V2, a benchmark of real software engineering tasks. They took three open-weight models (GLM-5.3, Kimi K3, and Inkling) and ran each one through three harnesses on 642 tasks:

- **mini-swe-agent**, which gives the model a single bash tool with a 30 second cap on each command.
- **Pi** and **OpenCode**, which give the model structured tools for reading, searching, and editing files.

Every run had the same locked budget and no network access beyond the model endpoint. That matters. When people compare harnesses in the wild, they usually change three things at once (the model, the budget, the tools) and then credit whichever one they were excited about. Here only the harness changed.

## What decides whether a task gets solved

The study broke down the variance in solved versus failed across three sources. The task itself explained 31.7%. The model explained 2.65%. The scaffold, meaning the harness, explained 0.29%.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 340" role="img" aria-labelledby="variance-title variance-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="variance-title">Share of variance in solved or failed, by source</title><desc id="variance-desc">Horizontal bar chart from the Reflection AI study in SWE-Bench Pro V2. The task explains 31.7 percent of variance in whether a run is solved. The model explains 2.65 percent. The harness, or scaffold, explains 0.29 percent. Scale runs from 0 to 35 percent.</desc><rect width="640" height="340" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 324 H36 M16 324 V304" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 324 H604 M624 324 V304" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · WHAT DECIDES A SOLVE</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">SHARE OF VARIANCE</text><g stroke="rgba(238,234,226,0.08)" stroke-width="1"><path d="M150 70 V270 M218 70 V270 M286 70 V270 M354 70 V270 M422 70 V270 M490 70 V270 M558 70 V270"/></g><g fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" text-anchor="middle"><text x="150" y="290">0%</text><text x="218" y="290">5%</text><text x="286" y="290">10%</text><text x="354" y="290">15%</text><text x="422" y="290">20%</text><text x="490" y="290">25%</text><text x="558" y="290">30%</text></g><text x="136" y="114" text-anchor="end" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">Task</text><rect x="150" y="94" width="431" height="30" fill="rgba(250,195,69,0.18)" stroke="#FAC345" stroke-opacity="0.8"/><text x="574" y="114" text-anchor="end" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600">31.7%</text><text x="136" y="174" text-anchor="end" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">Model</text><rect x="150" y="154" width="36" height="30" fill="rgba(6,182,195,0.2)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="196" y="174" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600">2.65%</text><text x="136" y="234" text-anchor="end" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">Harness</text><rect x="150" y="214" width="4" height="30" fill="#D9661C"/><text x="164" y="234" fill="#D9661C" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600">0.29%</text><text x="28" y="312" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11">Three open-weight models, three harnesses, 642 tasks, same locked budget.</text></svg><figcaption>Fig. 01. Whether a run gets solved depends mostly on the task, a little on the model, and almost not at all on the harness. That last bar is real, not a rendering glitch.</figcaption></figure>

Read that slowly. In this setup, the harness explained roughly a tenth as much as the model, and about a hundredth as much as the task. If you spent a week arguing about bash versus structured edit tools for these models, you were arguing about the smallest bar on the chart.

There is one honest exception. Inkling showed a 7.5 point spread across harnesses, with Pi trailing the other two. So "the harness never matters" is not the lesson. The lesson is that it mattered much less than most teams assume for two of these three models, and that you only find the third case by measuring it.

## Where the harness does show up

If the harness barely changes the pass rate, where does it leave a mark? On tokens.

Kimi K3 spent 1.3 million tokens per solved task under Pi and 2.6 million under mini-swe-agent. Same model, same tasks, roughly the same success, twice the spend. GLM-5.3, by contrast, sat between 3.5 and 3.7 million tokens per solved task under every harness. Its cost was set by the model, not by the tools around it.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 360" role="img" aria-labelledby="tokens-title tokens-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="tokens-title">Tokens per solved task, same model, different harness</title><desc id="tokens-desc">Bar chart of millions of tokens spent per solved task. Kimi K3 under Pi spends 1.3 million; Kimi K3 under mini-swe-agent spends 2.6 million, twice as much. GLM-5.3 spends between 3.5 and 3.7 million under every harness, shown as a band. Scale runs from 0 to 4 million.</desc><rect width="640" height="360" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 344 H36 M16 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 344 H604 M624 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 02 · THE BILL</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">TOKENS PER SOLVED TASK</text><g stroke="rgba(238,234,226,0.08)" stroke-width="1"><path d="M80 280 H600 M80 220 H600 M80 160 H600 M80 100 H600"/></g><g fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" text-anchor="end"><text x="72" y="284">0</text><text x="72" y="224">1M</text><text x="72" y="164">2M</text><text x="72" y="104">3M</text><text x="72" y="64">4M</text></g><path d="M80 60 V280" stroke="rgba(238,234,226,0.2)"/><rect x="120" y="202" width="90" height="78" fill="rgba(6,182,195,0.2)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="165" y="194" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600">1.3M</text><text x="165" y="300" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">Kimi K3</text><text x="165" y="316" text-anchor="middle" fill="rgba(238,234,226,0.5)" font-family="'Source Serif 4', Georgia, serif" font-size="11">Pi</text><rect x="240" y="124" width="90" height="156" fill="rgba(217,102,28,0.2)" stroke="#D9661C" stroke-opacity="0.8"/><text x="285" y="116" text-anchor="middle" fill="#D9661C" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600">2.6M</text><text x="285" y="300" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">Kimi K3</text><text x="285" y="316" text-anchor="middle" fill="rgba(238,234,226,0.5)" font-family="'Source Serif 4', Georgia, serif" font-size="11">mini-swe-agent</text><path d="M210 190 C 222 150, 232 140, 240 136" fill="none" stroke="rgba(238,234,226,0.35)" stroke-dasharray="3 4"/><text x="226" y="150" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="11">2x</text><rect x="400" y="58" width="170" height="222" fill="rgba(250,195,69,0.1)" stroke="#FAC345" stroke-opacity="0.5"/><rect x="400" y="58" width="170" height="12" fill="rgba(250,195,69,0.35)"/><text x="485" y="52" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600">3.5M to 3.7M</text><text x="485" y="300" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">GLM-5.3</text><text x="485" y="316" text-anchor="middle" fill="rgba(238,234,226,0.5)" font-family="'Source Serif 4', Georgia, serif" font-size="11">every harness</text><text x="485" y="170" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="11">cost set by</text><text x="485" y="186" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="11">the model</text></svg><figcaption>Fig. 02. For Kimi K3, swapping the harness doubled the tokens per solved task. For GLM-5.3, the harness made almost no difference to cost. You cannot know which kind of model you have until you run it.</figcaption></figure>

This is the number that ends up on an invoice. A team that picks a harness from a pass rate chart can land on the expensive option without ever seeing it, because the chart they used to decide was flat.

## Failing runs are the ones that keep going

The most useful finding for anyone running agents in production is about what failure looks like. In the same model and harness pair, the median failed run wrote 1.6 to 2.0 times the completion tokens of the median solved run.

A failing agent is rarely one that gave up early. It is one that kept going: rereading files, retrying the same edit, running one more search. From the outside it looks busy, and busy reads as progress. The token count says otherwise. By the time a run has burned well past what a typical solved run costs, it is more likely to be failing than close to finishing.

That turns into a rule you can enforce. Measure tokens per solved run on your own tasks, then set a budget stop at a multiple of that number. When a run crosses it, stop, keep the transcript, and hand it to a person or a fresh run with a narrower prompt. Set the multiple generously so slow but healthy runs still have room. What you save is the long tail of expensive runs that were never going to land.

## Test after the last edit

One more result held for all three models: running the tests after the final edit roughly doubled the odds of solving the task.

That sounds obvious. It is not what agents do by default. They often run tests early, make two more edits to clean something up, and then declare victory on the strength of a test run that no longer describes the code. The fix is cheap. Put it in the instructions the agent reads on every run (an `AGENTS.md` file, a skill, a system prompt) as a required step: after the last change, run the tests again, and do not report done unless they pass. We treat that as part of the harness contract, not a nice-to-have.

## How we use this at Sunrise

None of this means harness choice is free. It means the deciding number is different from the one most people look at. When we set up an agent for a client workflow, we now track four things on a small, fixed set of tasks that look like the real work:

1. **Pass rate**, across repeated runs, so one lucky run does not decide anything.
2. **Tokens per solved task**, per model and harness pair. This is usually where the candidates separate.
3. **A budget stop**, set from the solved-run numbers, so runaway failures end on their own.
4. **A test after the final edit**, checked in the transcript, not taken on trust.

Then we change one thing at a time. If two harnesses tie on pass rate and one spends half the tokens, that is the decision, and it compounds every day the agent runs.

## What this does not say

It is worth being precise about the limits. The study covered three open-weight models on one benchmark. It does not show that harness choice is irrelevant for every model, and it does not compare closed harnesses like Claude Code against Codex. Inkling already broke the pattern once. The point is not to stop caring about harnesses. It is to stop judging them by a number that, at least here, barely moved, and to start judging them by the one that did.

Pick the harness for the bill. Cap the runs that keep going. Make the agent test after its last edit. Those three habits do more for a production agent than another week spent reading leaderboards.

*Source: Reflection AI study in [SWE-Bench Pro V2](https://labs.scale.com/blog/swe-bench-pro-v2) ([paper](https://arxiv.org/abs/2610.24206)).*
