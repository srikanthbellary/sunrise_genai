---
title: 'The agent should not guess what revenue means: a semantic layer for data agents'
description: 'The hard part of agent analytics is not writing SQL. It is agreeing on what business words mean. We give data agents an approved terms file, expose only those terms through read-only tools, validate every query against certified definitions, and show the number, the SQL, and sample rows with every answer.'
date: '2026-11-17'
slug: agent-semantic-layer
image: /og.png
tags:
  - agents
  - data
  - mcp
  - evals
---

We build production GenAI for operations, knowledge, and data. The most common data request we see is also the shortest: "What was revenue last quarter?" Five words. A model can turn them into SQL in seconds, and the number that comes back looks fine.

Then someone in finance asks which revenue column it used.

The warehouse has three candidates. One is gross bookings. One is net of refunds. One is recognized revenue, and it lives in a table with a name nobody outside accounting would guess. The agent picked the one whose column name matched the word in the question. The answer was clean, fast, and wrong, and nothing in the reply said so.

## The SQL was never the hard part

Current models write decent SQL. They join tables, group by month, and handle a window function without drama. What they cannot do is read a company's mind. "Active customer" might mean a paid account with a login in the last thirty days, or an account with any open contract, or whatever the dashboard counts. Three teams, three answers, and all of them are in the warehouse somewhere.

A person who joins the company learns this in the first month, usually by getting a number wrong in a meeting. An agent does not get a first month. It gets one question and a schema.

So we stopped asking the model to infer meaning from column names. We hand it the meaning, written down and signed off by someone who owns the number. That is a semantic layer, and open-source ones built for agents have started to appear, which we think is a good sign for the idea. We are not going to compare products here. The pattern matters more than the package, and you can build the first version with a text file and a review habit.

## Five parts that fit together

Here is the shape we use. Each part answers a failure we have watched happen.

**Discovery.** A job reads warehouse metadata (table names, column names, types, comments, foreign keys) and drafts a list of business terms. Revenue, active customer, churned account, order. Each draft carries the columns it thinks apply and a plain sentence of definition. This is a proposal, nothing more. Models are good at the boring first pass over four hundred columns. They are not entitled to decide what the company means.

**Certification.** A named person reviews each draft term and marks it certified, edited, or rejected. Revenue goes to finance. Active customer goes to whoever owns the product metrics. The approved terms live in one file in version control, with an owner and a date on each entry. Anything uncertified does not exist as far as the agent is concerned.

**Grounding.** When a question arrives, the agent works from the terms file, not from raw schema. It finds the terms the question uses, reads their certified definitions, and builds the query from those. If the question uses a word with no entry, the right behavior is to say so and stop. "I do not have a certified definition for churn" is a good answer. A confident guess is the failure we are removing.

**Validation.** The generated SQL is checked before it runs. Does it reference the columns the certified definition names for this term? Does it apply the filters the definition requires, such as excluding test accounts or refunded orders? Does it touch a table the terms file never mentioned? A failed check sends the query back with the reason attached, and after a couple of tries it goes to a person.

**Exposure.** The agent reaches all of this through tools. We use the Model Context Protocol, though a CLI or a small API works the same way. The tools are read-only and they are about terms: look up a term, list the terms, run a validated query for a term, fetch sample rows. There is deliberately no tool that lists raw tables or reads arbitrary columns. If the agent cannot browse the schema, it cannot wander into the wrong revenue column. That is the same instinct as [giving agents tools that return text they can reason over](/blog/mcp-tools-text-first/), with one more rule: the menu itself is the guardrail.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 380" role="img" aria-labelledby="sem-title sem-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="sem-title">A semantic layer between a data agent and the warehouse</title><desc id="sem-desc">A question goes to the agent. The agent reads a terms file of certified business definitions. The terms file drives a validated SQL step, which runs against the warehouse through a read-only role. The result returns as an answer card showing the number, the SQL that ran, and sample rows. A dashed correction loop carries reviewed corrections from the answer card back to the terms file.</desc><g font-family="Inter, system-ui, sans-serif"><rect x="20" y="40" width="130" height="70" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.4)"/><text x="85" y="70" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Question</text><text x="85" y="90" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">revenue last quarter</text><line x1="150" y1="75" x2="180" y2="75" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="180,70 190,75 180,80" fill="rgba(238,234,226,0.5)"/><rect x="190" y="40" width="130" height="70" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.4)"/><text x="255" y="70" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Agent</text><text x="255" y="90" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">terms tools only</text><line x1="320" y1="75" x2="350" y2="75" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="350,70 360,75 350,80" fill="rgba(238,234,226,0.5)"/><rect x="360" y="24" width="260" height="102" fill="rgba(250,195,69,0.10)" stroke="#FAC345" stroke-opacity="0.75"/><text x="490" y="48" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">Terms file</text><text x="490" y="70" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">certified definitions</text><text x="490" y="88" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">revenue, active customer</text><text x="490" y="106" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">owner and date on each</text><line x1="490" y1="126" x2="490" y2="198" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="485,198 490,208 495,198" fill="rgba(238,234,226,0.5)"/><rect x="360" y="210" width="260" height="80" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.85"/><text x="490" y="238" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Validated SQL</text><text x="490" y="260" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">right columns, required filters,</text><text x="490" y="276" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">no tables outside the terms</text><line x1="360" y1="250" x2="332" y2="250" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="332,245 322,250 332,255" fill="rgba(238,234,226,0.5)"/><rect x="190" y="210" width="130" height="80" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.4)"/><text x="255" y="242" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Warehouse</text><text x="255" y="262" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">read-only role</text><line x1="190" y1="250" x2="162" y2="250" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="162,245 152,250 162,255" fill="rgba(238,234,226,0.5)"/><rect x="20" y="210" width="130" height="80" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="85" y="234" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">Answer card</text><text x="85" y="254" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">the number</text><text x="85" y="270" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">the SQL it ran</text><text x="85" y="284" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">sample rows</text><path d="M85 290 L85 340 L632 340 L632 75 L630 75" fill="none" stroke="#FAC345" stroke-opacity="0.75" stroke-width="1.5" stroke-dasharray="5 4"/><polygon points="630,70 620,75 630,80" fill="#FAC345" fill-opacity="0.75"/><text x="358" y="330" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-size="11">reviewed corrections go back into the terms file</text></g></svg><figcaption>Fig. 01. The agent never sees raw tables. It works from certified terms, its SQL is checked against them, and every answer carries what a reviewer needs to check it. Corrections a person approves flow back to the terms file.</figcaption></figure>

## What the answer looks like

The reply is not a sentence. It is a card with three things: the number, the exact SQL that produced it, and a handful of the rows underneath. Next to those sits the term definition it used, with its owner.

That card changes who can catch a mistake. A finance lead does not read SQL for fun, but she can look at five rows and see that refunds are still in them. An engineer can read the query and see a missing filter in ten seconds. You can check the work instead of trusting it, and checking takes under a minute.

It also changes how you review the agent over time. A wrong answer is no longer a mystery. Either the term is wrong, the validation missed something, or the question was ambiguous. Each of those has a different fix and a different owner.

## Learning without drift

People will correct the agent. "That should exclude trial accounts." "We stopped counting reseller orders in March." Those corrections are the most valuable data in the whole system, and in most setups they vanish into a chat thread.

We route them somewhere. A correction becomes a proposed edit to a term, with the question that triggered it attached. The term's owner reviews it, and only then does the terms file change. The agent never edits its own definitions. If it could, one confident user could quietly redefine revenue for everyone else.

This is the same pattern we use for [agent memory people can inspect](/blog/inspectable-agent-memory/): the knowledge is a file a person can read, diff, and roll back. When a number moves, you can see which edit moved it.

## Keep the plumbing boring

Two rules sit under all of this, and neither is clever.

Database credentials belong in a real secret store, injected at runtime, rotated on a schedule. Not in the terms file, not in a config committed to the repo, not in an environment dump that ends up in a log. The role behind them is read-only and scoped to the schemas the terms cover. Validation is a second line of defense. The role is the first, because a check can have a bug and a permission cannot be talked around.

And the agent's harness should stay a harness: a loop, a few tools, a clear stop. If you want the longer version of that argument, [the agent is a harness](/blog/agent-is-a-harness/), and the semantic layer is one more thing it plugs into.

## How to know it helps

A semantic layer feels like it should help. Feeling is not evidence, and we do not take any vendor's word for how much it helps on our questions. We measure it.

Build a labeled question set from real requests. Start with fifty or so, and sort them by type: single metric, metric split by a dimension, time comparison, filtered count, multi-step question that needs two terms. For each, a person who knows the data writes the right answer and checks it against a trusted report.

Then run the whole set twice. Once with the agent working from raw schema. Once with the layer on. Score each run per question type, not as one blended average, because the blend hides the interesting part. We expect the layer to matter most on questions where a business word has several plausible columns, and to matter little on a plain count of rows in one table. If your results say otherwise, believe your results.

Track three things beyond right or wrong. How often did the agent refuse because a term had no certified definition? How often did validation reject a query? And how often did a reviewer disagree with the card? Refusals are not failures. A refusal on an undefined word is the system working, and a pile of them tells you which terms to certify next.

Rerun the set whenever the terms file, the model, or the validator changes. It is cheap, and it is the only way to notice a regression before a person does.

## What we have not solved

Certification is a human bottleneck. Four hundred columns produce a draft list in minutes, and then the owners have to find time to read it. We start with the ten terms that show up in most questions and let the rest wait. Coverage grows slowly, and some questions will get a polite refusal for a while.

Validation is also only as good as the definitions. A certified definition can itself be wrong. The card makes that visible faster, but it does not make it impossible.

## The short version

Let the model write SQL. Do not let it decide what revenue means. Draft terms from metadata, have owners certify them, expose only those terms through read-only tools, validate every query against the definitions, and show the number with its SQL and rows. Feed approved corrections back into the file, and measure the whole thing on questions with known answers.

A fast answer is worth having. A fast answer you can check is worth keeping.
