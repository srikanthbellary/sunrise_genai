---
title: Security is a release gate, not a last look
description: When agents write most of the code, pre-ship security cannot be a vibe check the night before launch. Secrets, authorization, data rules, abuse limits, supply chain, and logs become numbered gates the harness runs on every release.
date: '2026-10-06'
slug: pre-ship-security-gate
image: /og.png
tags:
  - agents
  - security
  - production
---

We build production GenAI for operations, knowledge, and data. That sentence usually points at incident desks, mapping queues, and retrieval. It also points at something less glamorous: the login screen, the storage bucket, and the admin route that every one of those systems ships with.

Coding agents changed the speed of that work. A scaffold that once took a sprint now lands before lunch. The model writes the handler, the schema, the upload form, and the deploy file in one pass. What it does not do, unless the harness makes it, is stop and ask who is allowed to call that handler.

Numeric quality gates already taught that a coding agent needs a number that can say no. Reusable skills taught that procedure should travel as a named pack the harness loads and versions like code, not as a paste in a chat. This note puts both lessons where a miss costs the most.

Pre-ship security is a gate. Numbered. Machine-checkable where it can be. Run on every release, not once before launch. Packaged so the next agent loads the same review instead of improvising one.

## Fast code, slow leaks

Picture 4:40pm on a release afternoon. The agent has opened a pull request with a clean diff and green tests. The demo works. Someone types "looks good, ship it" and walks off toward the burnt coffee smell of the last pot.

Inside that diff sits a service key in a config file, a user ID read straight from the request body, and a database rule that says any signed-in user may read any row. None of it breaks a test. All of it works in the demo, because the demo is one friendly user on one laptop.

That is the trap. Functional tests prove the happy user gets what they asked for. They say nothing about the unhappy user who edits a request, replays a token, or uploads a file named like a script. Agents are very good at the happy path. Most tutorials they learned from end there.

So the review cannot be a feeling. A senior engineer squinting at a diff the evening before launch is a vibe check with a job title. It catches what that person happens to remember. It misses whatever they were too tired to open.

The fix is not a smarter model. It is a list the harness owns.

## The checklist becomes numbered gates

Most pre-ship security lists look alike, and that is a good sign. The failure modes are old. What changes in an agent shop is the format. A bulleted reminder in a wiki becomes a set of numbered gates, each with an owner, a sensor, and a verdict.

Here is the shape we use. The group names are ours. The checks underneath are about as standard as this field gets, which is the point.

**S1. Secrets stay out of the repo.** No keys in source, no committed `.env`, nothing sensitive in git history. Scan both. A key that was deleted three commits ago is still a published key, and every old clone still has it.

**S2. Identity is checked on the server.** Real authentication on every route that touches user data. Permissions verified server-side. A user ID that arrives from the browser is a claim, not a fact. The server looks it up from the session.

**S3. Data rules are locked down.** Each user sees only their rows. Database policies, storage buckets, and hosted backends like Firebase or Supabase get explicit rules, written and tested, never left on the permissive defaults that made the prototype easy.

**S4. The surface stays small.** Admin routes sit behind a role check. Production runs with debug off, and errors return a plain message and an ID while the stack trace goes to the log, never to the user.

**S5. Input is distrusted.** Validation happens on the server even when the form already checked it. Sanitize user content before it renders. Uploads get type, size, and storage checks, and they land somewhere that cannot execute them. Queries use parameters, so neither SQL nor NoSQL injection has a door.

**S6. Abuse has a ceiling.** Login and signup are rate-limited and answer with a 429 when the ceiling is hit. Security headers are set. CORS names the origins that are allowed instead of waving a wildcard.

**S7. Dependencies are accounted for.** Lockfiles are committed. New packages get a second look before they land, because an agent will happily import whatever name it half remembers. Known-vulnerable versions fail the build.

**S8. Logs do not hoard people.** No tokens, passwords, or full personal records in logs or traces. The rail records that a check failed, not the customer's email address.

**S9. Someone tests as a stranger.** Before go-live, a run plays the untrusted user: a second account, a tampered request, an expired token. If that run can read what it should not, the gate stays shut.

Nine gates. Not because nine is magic. Because each one maps to a check you can name in a review and a sensor you can point to in the trace.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 440" role="img" aria-labelledby="sec-title sec-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="sec-title">Pre-ship security gate runs numbered checks on every agent release</title><desc id="sec-desc">Left: an agent pull request enters the release path. Center: nine numbered security gates covering secrets, identity, data rules, surface, input, abuse limits, dependencies, logs, and a stranger test. Right: a passing run moves to a person who signs the release, and a failing run returns to act with the finding attached.</desc><rect width="640" height="440" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V420 M52 20 V420 M84 20 V420 M116 20 V420 M148 20 V420 M180 20 V420 M212 20 V420 M244 20 V420 M276 20 V420 M308 20 V420 M340 20 V420 M372 20 V420 M404 20 V420 M436 20 V420 M468 20 V420 M500 20 V420 M532 20 V420 M564 20 V420 M596 20 V420 M628 20 V420"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 424 H36 M16 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 424 H604 M624 424 V404" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · PRE-SHIP SECURITY GATE</text><text x="612" y="38" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">EVERY RELEASE</text><rect x="28" y="56" width="148" height="196" fill="rgba(217,102,28,0.08)" stroke="#D9661C" stroke-opacity="0.65"/><text x="102" y="80" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">AGENT PR</text><rect x="42" y="96" width="120" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="102" y="112" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="12">handler</text><rect x="42" y="124" width="120" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="102" y="140" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="12">schema · rules</text><rect x="42" y="152" width="120" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="102" y="168" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="12">config · deps</text><rect x="42" y="180" width="120" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><text x="102" y="196" text-anchor="middle" fill="rgba(238,234,226,0.75)" font-family="'Source Serif 4', Georgia, serif" font-size="12">green tests</text><rect x="42" y="212" width="120" height="28" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.75"/><text x="102" y="231" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">HAPPY PATH</text><path d="M176 154 H196" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="196" y="56" width="232" height="196" fill="rgba(6,182,195,0.06)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="312" y="80" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">SECURITY.SKILL</text><rect x="210" y="94" width="100" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="260" y="110" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">S1 secrets</text><rect x="314" y="94" width="100" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="364" y="110" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">S2 identity</text><rect x="210" y="122" width="100" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="260" y="138" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">S3 data rules</text><rect x="314" y="122" width="100" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="364" y="138" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">S4 surface</text><rect x="210" y="150" width="100" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="260" y="166" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">S5 input</text><rect x="314" y="150" width="100" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="364" y="166" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">S6 abuse</text><rect x="210" y="178" width="100" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="260" y="194" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">S7 deps</text><rect x="314" y="178" width="100" height="22" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.2)"/><text x="364" y="194" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="12">S8 logs</text><rect x="210" y="210" width="204" height="28" fill="rgba(250,195,69,0.1)" stroke="#FAC345" stroke-opacity="0.6"/><text x="312" y="229" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">S9 TEST AS A STRANGER</text><path d="M428 154 H448" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="448" y="56" width="164" height="90" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="530" y="80" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">ALL GATES PASS</text><text x="530" y="104" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">person signs release</text><text x="530" y="124" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">verdict in the trace</text><rect x="448" y="162" width="164" height="90" fill="rgba(217,102,28,0.1)" stroke="#D9661C" stroke-opacity="0.7"/><text x="530" y="186" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">ANY GATE FAILS</text><text x="530" y="210" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">back to act</text><text x="530" y="230" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">finding · repro attached</text><path d="M530 252 V286 H102 V252" fill="none" stroke="rgba(238,234,226,0.2)" stroke-dasharray="3 4"/><text x="200" y="280" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.12em">FAIL NEVER SHIPS SILENTLY</text><rect x="28" y="304" width="584" height="40" fill="rgba(0,8,22,0.4)" stroke="rgba(238,234,226,0.12)"/><text x="48" y="329" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">mechanical sensors first · skill review second · a person on the last step</text><rect x="28" y="356" width="584" height="28" fill="rgba(6,182,195,0.05)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="48" y="375" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.1em">OBSERVABILITY · skill id · gate ids · finding ids · no personal data</text><rect x="28" y="396" width="584" height="24" fill="rgba(217,102,28,0.05)" stroke="#D9661C" stroke-opacity="0.35"/><text x="48" y="413" fill="rgba(238,234,226,0.5)" font-family="'Source Serif 4', Georgia, serif" font-size="11" letter-spacing="0.08em">same gates on the next release · not a launch-week ritual</text><rect x="596" y="404" width="6" height="6" fill="#D9661C"/></svg><figcaption>Fig. 01. An agent pull request clears functional tests on the happy path. The security skill runs nine numbered gates. Pass goes to a person who signs the release. Fail goes back to act with the finding and a repro attached.</figcaption></figure>

Read the figure left to right, the way a release moves. The agent pull request on the left is real work with real tests, all of them on the happy path. The center block is the security skill: nine gates, each named, each able to stay shut on its own. On the right the path splits. A clean run goes to a person who signs the release. A failing run goes back to act with a finding and a way to reproduce it. There is no third exit.

## Machine checks first, judgment second

Not every gate is equally mechanical, and pretending otherwise produces theater.

Some gates are pure sensors: a secret scanner over the diff and the history, a dependency audit against the lockfile, a header check against the built site, a grep for `debug=true` in production config. They run in seconds. They fail the build without asking anyone.

Some gates need a test harness, and S2 and S9 are best proven by trying. Spin up two accounts. Have the second one request the first one's record by ID. Expect a 403. Replay a token after logout. Expect a refusal. Send the signup endpoint a burst and expect a 429. These tests are boring to write, which is exactly why an agent should write them and a gate should demand them.

A few gates need judgment. Whether a database policy truly isolates tenants, or whether a log field counts as personal data, is a reading task. That is where a review skill earns its keep, and where a person still signs.

Sensors, then tests, then judgment. All three before anyone signs.

## Package the review as a skill

Security review used to live in a few heads. Agent shops cannot run on that, because heads go on vacation and the agent has no idea who to ask.

The better pattern is a review skill the harness loads whenever a run touches auth, data access, uploads, config, or dependencies. Security teams have started publishing open review skills for coding agents that find a weakness, reproduce it, and propose a patch. That direction is right. A versioned review pack can be loaded, diffed, and improved. A senior engineer's memory cannot.

A useful security skill carries a few things. When-to-use, written narrowly enough that it does not fire on a copy change. The gates. The repro format, so a finding arrives with steps instead of adjectives. The patch rule: propose the fix, never apply it to auth or data rules without a person approving. And an owner, because a security skill nobody maintains goes stale faster than any other kind.

The skill id and the gate ids go into the trace. The personal data does not. When a reviewer asks why the release was blocked, the answer is "S3 failed, finding 2, here is the request that read another tenant's row." Not "the agent seemed worried."

## What breaks when security is a vibe

**The launch-week audit.** Someone runs the checklist once, the week before go-live, and files it. Six releases later the agent adds a route with no role check. Nobody reran the list. Nobody owned it.

**The trusted browser.** The frontend hides the admin button, so the team assumes the admin route is safe. The route itself checks nothing. Hiding a button is a design choice, not an access rule.

**The permissive default.** The prototype opened the storage bucket so uploads would work during the demo. The rule never got tightened. It works for everyone, which is the problem.

**The chatty error.** Production returns a full stack trace with file paths and a query string. Helpful during a bug hunt. Equally helpful to a stranger mapping the system.

**The log that knows too much.** Debug logging captured full request bodies, tokens included, and the traces got shipped to a third-party dashboard. The gate on logs exists because this one is easy to do by accident and hard to undo.

Each of these is a harness gap. A larger model writes the same route with the same missing check unless something asks it to prove otherwise.

## Tradeoffs you actually pay

Gates cost release time. A secret scanner will flag a test fixture that only looks like a key, and someone will spend twenty minutes proving it is fake. Two-account tests add setup. Rate limits occasionally block a legitimate burst, like a sales team all signing up from the same office network on the same afternoon, and someone has to tune the ceiling.

Pay it. A blocked release costs an afternoon. A leaked key or an open bucket costs the trust of every person whose data sat behind it.

There is also a format trade. One giant security checklist is easy to point at and hard to run. Small numbered gates are easier to sense, fail, and fix. Keep the core nine and add thin packs for surfaces that need more, like payments or health data, rather than growing one list nobody finishes.

We still do not know how far a review skill can go on its own before its findings need a second model to triage false positives. The rule that does not move is simpler. If you cannot point to a numbered gate, the sensor or test behind it, and a verdict in the trace, you do not have a security process. You have a feeling about one.

## What production demands

Production wants a release a reviewer can audit.

Keep pre-ship security in a versioned skill: when-to-use, numbered gates, sensors and tests, repro format, patch rule, owner. Load it in gather whenever a run touches auth, data, uploads, config, or dependencies. Let act write the fix. Let verify run every gate, every release. Write the gate ids into the observability rail and keep personal data out of it. When a finding slips through, patch the skill so the next release inherits the check.

Refuse the last look. Keep the model swappable. Keep a person on the last step when the change touches who can see what.

That is the standard we build to at [sunrisegenai.com](https://sunrisegenai.com). The model writes the code. The harness decides whether it ships. The security gate is how the floor knows a stranger was invited to try the door before the customer ever saw it.
