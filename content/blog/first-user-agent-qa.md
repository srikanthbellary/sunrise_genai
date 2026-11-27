---
title: 'Five first-time users, none of them human'
description: 'The people who build an app are the worst people to test its first five minutes. Before we launch, we send five browser agents through it as first-time users, each with one behavior rule, and fix what they hit before a real person does.'
date: '2026-11-27'
slug: first-user-agent-qa
image: /og.png
tags:
  - agents
  - qa
  - launch
  - production
---

Every app we have shipped looked finished to us the day before launch. That is the problem. By then we have clicked through the signup flow a few hundred times. We know the button that looks disabled is not, we know the error on step two clears itself if you wait, and we skip the pricing page because we wrote it.

A first-time user knows none of that. They arrive cold, on whatever phone they happen to hold, with a few seconds of patience. Analytics will tell you later that a share of them left on step two. It will not tell you why, and they will not write in to explain.

So before a launch we now run a step that sits between our own testing and real users: five browser agents, each playing one kind of first-time visitor, sent from the landing page to a first success. This note covers how we set it up, what each run has to hand back, and where the method stops being useful.

## Why five personas and not one tester

The obvious version is one agent told to "test the app like a new user." It does not work well. A generic agent tester behaves like a careful, patient, fluent person who reads every label and tries again when something fails. That is roughly how the builders behave, so it finds roughly what the builders already found.

Real first visits fail in specific ways, and each way needs a tester who is constrained to behave like that. So instead of one agent with a vague brief, we give five agents one hard behavior rule each. The rule matters more than any description of the persona's personality. An agent told "you are impatient" still reads the whole page. An agent told "you click the first button you see and you leave at the first error" actually tests the hurried path.

## The five we send in

**The hurried one.** Skims, clicks the most prominent button, and quits at the first error or the first screen that does not obviously move forward. This persona tests whether the main path is the obvious path. When it fails, the cause is usually a primary button that does something other than what a newcomer expects, or a required step that is not visibly required.

**The reader.** Opens pricing, terms and privacy before signing up, and compares what they say against what the app later asks for. This persona catches mismatches the team stopped seeing: a plan name on the pricing page that differs from the one at checkout, a permission request that the privacy page never mentions, a trial length stated two different ways.

**The small screen on a slow link.** Does everything on a narrow phone viewport with network throttling turned on. This catches layouts that only work on the builder's monitor, buttons pushed below a keyboard, spinners with no end, and forms that lose their contents when a slow request times out.

**The literal reader.** Follows only what the screen literally says. No guessing from convention, no knowledge of how similar apps work, no reading between the lines. We also run it in plain, simple English. This persona is our best check on copy. If a step only makes sense because you already know what the product does, the literal reader gets stuck there, and so will anyone reading in a second language.

**The breaker.** Pastes junk into every field, hits back in the middle of a flow, double-clicks every submit button, opens the same link in two tabs. This is not a security test. We covered attack-style checks separately in our [pre-ship security gate](/blog/pre-ship-security-gate/). The breaker is looking for the ordinary chaos of real hands: duplicate orders, half-saved profiles, and error messages that blame the user for something the app did.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 420" role="img" aria-labelledby="fu-title fu-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="fu-title">Five first-time users, one ranked list, one rerun</title><desc id="fu-desc">Five persona lanes run left to right from the landing page toward a first success: the hurried user, the reader, the small screen on a slow network, the literal reader, and the breaker. Friction points along each lane are marked. All friction points flow into one merged list ranked by how many personas hit each issue, then into a single fix pass, and a loop arrow returns to the same five personas for a rerun.</desc><g font-family="Inter, system-ui, sans-serif"><text x="320" y="28" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Same app, five different first visits</text><text x="40" y="58" fill="rgba(238,234,226,0.6)" font-size="11">landing page</text><text x="300" y="58" text-anchor="end" fill="rgba(238,234,226,0.6)" font-size="11">first success</text><rect x="20" y="70" width="290" height="40" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.25)"/><text x="32" y="95" fill="#EEEAE2" font-size="12">1. The hurried one</text><circle cx="250" cy="90" r="6" fill="#FAC345"/><rect x="20" y="118" width="290" height="40" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.25)"/><text x="32" y="143" fill="#EEEAE2" font-size="12">2. The reader</text><circle cx="200" cy="138" r="6" fill="#FAC345"/><circle cx="265" cy="138" r="6" fill="#FAC345"/><rect x="20" y="166" width="290" height="40" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.25)"/><text x="32" y="191" fill="#EEEAE2" font-size="12">3. Small screen, slow link</text><circle cx="250" cy="186" r="6" fill="#FAC345"/><rect x="20" y="214" width="290" height="40" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.25)"/><text x="32" y="239" fill="#EEEAE2" font-size="12">4. The literal reader</text><circle cx="230" cy="234" r="6" fill="#FAC345"/><circle cx="280" cy="234" r="6" fill="#FAC345"/><rect x="20" y="262" width="290" height="40" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.25)"/><text x="32" y="287" fill="#EEEAE2" font-size="12">5. The breaker</text><circle cx="250" cy="282" r="6" fill="#FAC345"/><line x1="310" y1="186" x2="350" y2="186" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="350,181 360,186 350,191" fill="rgba(238,234,226,0.5)"/><rect x="360" y="70" width="140" height="232" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.7"/><text x="430" y="94" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">One ranked list</text><text x="430" y="114" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">by personas hit</text><text x="376" y="150" fill="#EEEAE2" font-size="12">A  hit by 3</text><text x="376" y="178" fill="#EEEAE2" font-size="12">B  hit by 2</text><text x="376" y="206" fill="#EEEAE2" font-size="12">C  hit by 1</text><text x="376" y="234" fill="#EEEAE2" font-size="12">D  hit by 1</text><text x="430" y="284" text-anchor="middle" fill="#FAC345" font-size="11">stuck beats annoyed</text><line x1="500" y1="186" x2="530" y2="186" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="530,181 540,186 530,191" fill="rgba(238,234,226,0.5)"/><rect x="540" y="156" width="84" height="60" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.4)"/><text x="582" y="182" text-anchor="middle" fill="#EEEAE2" font-size="12">one fix</text><text x="582" y="200" text-anchor="middle" fill="#EEEAE2" font-size="12">pass</text><path d="M582 216 L582 350 L165 350 L165 314" fill="none" stroke="#FAC345" stroke-opacity="0.8" stroke-width="1.5"/><polygon points="160,314 165,304 170,314" fill="#FAC345" fill-opacity="0.8"/><text x="374" y="372" text-anchor="middle" fill="#EEEAE2" font-size="12">rerun the same five with the same definition of success</text><text x="320" y="404" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">a fix counts only when the persona who hit it now gets through</text></g></svg><figcaption>Each persona carries one behavior rule. Their friction points merge into a single list, the top of the list gets fixed in one pass, and the same five go through again.</figcaption></figure>

## Define success before anyone starts

Every persona gets the same finish line, written down before the run: the first moment a new user gets real value. For a recipe app it might be "a saved recipe on the home screen." For a scanner it might be "a first result shown for a real label." It is never "reached the dashboard."

A fixed finish line does two jobs. It stops a run from wandering into corners of the app no newcomer would visit. And it turns each run into a clear outcome: the persona reached first success, reached it with friction, or did not reach it at all.

## What each run has to hand back

An agent's opinion of an app is worth very little. "The onboarding felt a bit confusing" cannot be fixed. So each persona returns a trail, not a review:

- every step it took, in order, with the URL or screen name
- a screenshot at each moment it was confused, stuck, or annoyed
- the exact on-screen text it was reacting to, copied, not paraphrased
- what it expected to happen and what happened instead
- a severity: **stuck** (could not continue), **confused** (continued by guessing), or **annoyed** (continued, but would plausibly leave)

The exact text is the part teams skip, and it is the most useful. Half of what these runs find is copy, and copy problems are cheap to fix only when you know which sentence caused them.

## Merge, then rank by how many hit it

Five trails produce a lot of notes, many of them the same problem seen from different angles. Before anything gets fixed, we merge them. Two findings are the same issue when they point at the same screen and the same element, even if the personas described them differently.

Then we rank. The first key is how many personas hit the issue. A problem that stopped three different kinds of user is almost certainly real and almost certainly costly. The second key is severity, so stuck outranks confused, and confused outranks annoyed. A single annoyed note from one persona sits at the bottom, and it is fine if it stays there for a release.

That ranking is what makes the exercise practical. Without it, a pre-launch QA pass becomes a long list that nobody finishes, and the launch ships with the top problem buried on line thirty.

## Fix in one pass, then send the same five again

We fix the top of the list in one pass, as one change set, and then rerun the same five personas with the same behavior rules and the same finish line. A fix counts only when the persona who hit the problem now gets through that point. If a fix moves the friction to the next screen, the rerun shows it, and the issue stays open.

The reruns are also where we catch fixes that break something else. Making the hurried path more obvious sometimes hides the link the reader needed. Running all five every time keeps one persona's fix from becoming another persona's new problem.

After launch, the five runs stay. They become a small regression suite for the first five minutes of the product, and we run them again before any change that touches signup, onboarding, pricing, or the first-success screen. This is the same evidence rule we apply to code in [evidence before merge](/blog/evidence-before-merge/): a claim that the flow works needs a run that shows it.

## The guardrails we keep

Browser agents that fill in forms and press buttons are taking real actions, so the setup matters as much as the prompt.

- Runs point at a staging build or a preview deployment, never production.
- Every persona signs up with a test account made for the run. No real customer data, ever.
- Payments use the provider's test mode. Emails and texts go to a sandbox inbox, not to real addresses.
- The breaker gets the same limits as everyone else. Chaos inside a test environment is the point. Chaos that leaks out of it is an incident.
- Each run has a step cap and a time cap, so a persona stuck in a loop ends the run instead of clicking forever.

## Where this stops being useful

Simulated users are good at one thing: finding friction on the path from first visit to first success. They are not users. An agent does not get bored the way a person does, does not bring a real reason for showing up, and has no opinion worth trusting on whether the product is worth paying for.

So we keep the claim narrow. These runs tell us where a newcomer is likely to get stuck, confused, or annoyed. They do not tell us whether people want the product, which features matter, or what to charge. That still takes real people, real conversations, and real usage. The agent pass simply means that when real people show up, they spend their few seconds of patience on the product instead of on our mistakes.

## A short checklist

Before a launch, we answer these:

- What is the first success, written in one sentence?
- Does each of the five personas have one hard behavior rule, not just a description?
- Does every run return steps, screenshots, exact on-screen text, and a severity?
- Are findings merged by screen and element before ranking?
- Is the list ranked by personas hit first, then severity?
- Did the rerun use the same personas and the same finish line?
- Are staging, test accounts, test payments, and a sandbox inbox in place?

It takes a few hours. It is the cheapest way we know to see the app the way a stranger will see it on day one.
