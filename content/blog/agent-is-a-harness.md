---
title: An agent is a model plus a harness
description: A model generates tokens. An agent finishes work. The difference is the loop, the tools, the permissions, and a test gate in front of done — the harness is the product.
date: '2026-09-01'
slug: agent-is-a-harness
image: /og.png
tags:
  - agents
  - harness
  - production
---

We build production GenAI for operations, knowledge, and data. That sentence is a design constraint, not a slogan. If the work has to finish on an operations floor, a knowledge desk, or a mapping queue, the model is not the product. The product is the harness around it: the loop, the tools, the permissions, the sensors, the traces, and the gate that decides whether anyone is allowed to call the run done.

A model generates tokens. An agent finishes work. Teams keep buying the former and hoping it becomes the latter. It does not. A larger context window does not invent a definition of done. A better benchmark score does not attach evidence to a ticket. A new model card does not put a human on the last step when the blast radius is real. Those are harness problems. Treat them as model problems and you will ship a prompt with a costume.

## The model is interchangeable. The job is not.

Enterprise buyers already know the model is a commodity path. The same workflow may route to Azure one quarter and Bedrock the next. Temperature, stop sequences, and cache behavior change when the vendor changes. The job does not. The job is still: gather what the floor already knows, act only with the tools you are allowed to hold, and verify before anyone trusts the output.

That is why we put workflow-specific harnesses in front of an in-network model gateway instead of hanging a chat box on a vendor SDK. The gateway is where routing, reusable context, model-aware temperature, and stop-sequence hardening live. The harness is where the work lives. Swap the model and the loop should still read the same way in a trace: gather, act, verify. If swapping the model changes the contract of the job, you did not have a contract. You had a vibe.

A chatbot is a conversation. A production agent is a job with a contract. Conversations can wander. Jobs cannot. The harness is how you keep a statistical machine inside a job.

## A harness is a loop with sensors, permissions, and a witness

People say “agent” when they mean “the model called a function.” That is a tool call. A harness is larger. It is the closed loop that decides what to look at, what it is allowed to touch, how it knows it is finished, and how a person reconstructs the run when it is not.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 400" role="img" aria-labelledby="harness-title harness-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="harness-title">The production agent loop</title><desc id="harness-desc">Sensors feed a gather station, then act under a permissions bar, then verify at a test gate. An observability rail records the run. A dashed retry path returns to gather. An in-network gateway sits beside the loop.</desc><rect width="640" height="400" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620"/><path d="M20 20 V380 M52 20 V380 M84 20 V380 M116 20 V380 M148 20 V380 M180 20 V380 M212 20 V380 M244 20 V380 M276 20 V380 M308 20 V380 M340 20 V380 M372 20 V380 M404 20 V380 M436 20 V380 M468 20 V380 M500 20 V380 M532 20 V380 M564 20 V380 M596 20 V380 M628 20 V380"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 384 H36 M16 384 V364" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 384 H604 M624 384 V364" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · AGENT LOOP</text><text x="612" y="38" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.16em">IN-NETWORK GATEWAY</text><rect x="470" y="48" width="142" height="52" fill="rgba(6,182,195,0.06)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="541" y="70" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">ROUTE · CACHE</text><text x="541" y="88" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="12">stop sequences · temp</text><text x="48" y="78" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.18em">SENSORS</text><rect x="28" y="88" width="118" height="28" fill="rgba(217,102,28,0.08)" stroke="rgba(238,234,226,0.18)"/><text x="87" y="107" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">telemetry</text><rect x="28" y="122" width="118" height="28" fill="rgba(217,102,28,0.08)" stroke="rgba(238,234,226,0.18)"/><text x="87" y="141" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">tickets</text><rect x="28" y="156" width="118" height="28" fill="rgba(217,102,28,0.08)" stroke="rgba(238,234,226,0.18)"/><text x="87" y="175" text-anchor="middle" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">files · runbooks</text><path d="M146 136 H176" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="176" y="72" width="132" height="128" fill="rgba(217,102,28,0.07)" stroke="rgba(238,234,226,0.2)"/><text x="242" y="96" text-anchor="middle" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">01 · GATHER</text><line x1="192" y1="118" x2="288" y2="118" stroke="#F2EDE4" stroke-opacity="0.55" stroke-width="1.4"/><line x1="192" y1="138" x2="272" y2="138" stroke="#F2EDE4" stroke-opacity="0.32"/><line x1="192" y1="158" x2="280" y2="158" stroke="#F2EDE4" stroke-opacity="0.32"/><text x="242" y="186" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">evidence in</text><path d="M308 136 H336" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="336" y="72" width="132" height="128" fill="rgba(250,195,69,0.06)" stroke="rgba(238,234,226,0.2)"/><text x="402" y="96" text-anchor="middle" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">02 · ACT</text><rect x="352" y="110" width="40" height="10" fill="none" stroke="#FAC345" stroke-opacity="0.75"/><rect x="364" y="128" width="56" height="10" fill="none" stroke="#FAC345" stroke-opacity="0.45"/><rect x="352" y="146" width="48" height="10" fill="none" stroke="#D9661C" stroke-opacity="0.75"/><text x="402" y="186" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-family="'Source Serif 4', Georgia, serif" font-size="12">tools fire</text><rect x="336" y="208" width="132" height="36" fill="rgba(0,8,22,0.7)" stroke="#D9661C" stroke-opacity="0.7"/><text x="402" y="231" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">PERMISSIONS</text><path d="M402 200 V208" fill="none" stroke="#D9661C" stroke-opacity="0.55"/><path d="M468 136 H488" fill="none" stroke="rgba(238,234,226,0.28)" stroke-dasharray="3 4"/><rect x="488" y="116" width="124" height="84" fill="rgba(6,182,195,0.07)" stroke="rgba(238,234,226,0.2)"/><text x="550" y="140" text-anchor="middle" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">03 · VERIFY</text><rect x="508" y="152" width="84" height="28" fill="none" stroke="#06B6C3" stroke-opacity="0.5"/><path d="M520 170 L532 180 L572 152" fill="none" stroke="#06B6C3" stroke-width="1.5"/><rect x="248" y="268" width="144" height="34" fill="rgba(0,8,22,0.75)" stroke="#D9661C" stroke-opacity="0.75"/><text x="320" y="290" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.16em">TEST GATE</text><path d="M550 200 V284 H392" fill="none" stroke="rgba(238,234,226,0.22)" stroke-dasharray="3 4"/><path d="M248 285 H176 V136" fill="none" stroke="rgba(238,234,226,0.22)" stroke-dasharray="3 4"/><text x="154" y="230" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.14em">RETRY</text><rect x="28" y="328" width="584" height="48" fill="rgba(6,182,195,0.05)" stroke="#06B6C3" stroke-opacity="0.4"/><text x="48" y="350" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">OBSERVABILITY</text><text x="48" y="368" fill="rgba(238,234,226,0.62)" font-family="'Source Serif 4', Georgia, serif" font-size="13">named tools · capped retries · readable trace · evidence attached</text><rect x="596" y="348" width="6" height="6" fill="#D9661C"/></svg><figcaption>Fig. 01 — Sensors in, permissions under the act, a test gate before done, a trace a person can read.</figcaption></figure>

Read the figure the way a reviewer will read a failed run. Sensors are not optional decoration. Telemetry, tickets, files, and runbooks are how the loop learns the estate it is standing in. Without them the model invents a world and acts inside it. Permissions are not a policy paragraph. They are the bar under act: the tool is on the list, or it does not run. Observability is not a dashboard you open after an outage. It is a rail the loop writes as it moves — named tools, retry counts, the evidence that was attached, the reason the gate opened or stayed shut.

The in-network gateway sits beside the loop on purpose. It is not the agent. It is the controlled path the agent is allowed to speak through. Routing, cache, temperature, and stop sequences belong there. The definition of done does not.

## Gather, act, verify — never a silent template fallback

The loop we ship is short to say and expensive to fake.

**Gather** means the agent reads the world it is allowed to read: the ticket, the trace, the file, the schema, the runbook. It does not start from a blank chat. If the evidence is not there, gather fails closed. That is a feature. A polite paragraph that hides the miss is a defect.

**Act** means a named tool fires under a permission. File operations. Atomic multi-edit. Diff preview. Git operations. Memory write. Session save. A skill pack. The tool has a name a human can find in the trace. The write is addressable. If act is “the model spoke in a tone that sounded like work,” you are still in a conversation.

**Verify** means a test gate sits in front of done. Unit, contract, retrieval check, schema check, citation check — whatever the job contracted. The gate is mechanical. It does not grade on confidence theater. If the last step is a silent template fallback — a default email, a canned runbook, a “here is a possible next step” that was going to print anyway — you do not have an agent. You have a prompt with a costume.

That rule is how we keep incident intelligence honest. Multi-agent reads of telemetry, tickets, and runbooks only pay off when the output is a ranked hypothesis with evidence attached and a person on the last step. That is the path that delivers *75% lower mean time to recovery*. The number is not a model score. It is what happens when the harness refuses to call a guess a remediation.

## Tools are contracts, not a plugin drawer

The fastest way to ruin a loop is to give it thirty tools and a smile. Tool sprawl is not capability. It is an attack surface and a confusion surface. Each tool is a contract: what it reads, what it writes, what it must not touch, how failure looks, how the trace names it.

Production tools we actually put on a coding agent are boring on purpose. Single-file Python. Standard library. File operations. Atomic multi-edit. Diff preview. Git. Memory. Skill packs. Session save and resume. A test gate in front of done. The boredom is the point. An operations floor does not need a zoo of half-documented functions. It needs a small set of writes a reviewer can replay.

Permissions sit under act because the model will ask for more than it should. It will want a broader glob, a hotter temperature, a second retry, a tool that is almost the right one. The harness answers with a list, not with a lecture. If the tool is not on the list, it does not run. If the retry cap is spent, the loop ends and escalates. Written rules about “being careful” do not survive contact with a model that is paid to continue.

## What breaks when the harness is thin

A thin harness fails in ways that look like model failure, which is why teams keep buying models.

**The costume chatbot.** The interface says agent. The run is a single completion with a system prompt. There is no gather from the estate, no named tool, no gate. It demos well. It does not survive a messy ticket.

**The infinite retry.** The loop is real, but nothing caps it. Cost climbs. The same broken edit is attempted until someone kills the job. A retry without a changed gather is not perseverance. It is a hang.

**The ungated write.** The agent can edit, commit, or file a change without a verify step that a human can name. You will find this out during the incident, not during the demo.

**The missing sensor.** The model never sees the runbook, the service graph, or the last diff. It invents. Then it acts. Then someone spends the afternoon explaining why the invented world was cheaper than reading the file.

**The mute trace.** Tools are anonymous. Memory is a blob. Retries are invisible. When the run goes wrong — and it will — no one can reconstruct the decision. That is not an observability gap. That is a missing product surface.

**The silent fallback.** The verify step fails, so the system prints the template it was always going to print. Leadership thinks the agent finished the job. The floor knows it did not. Trust leaves the building quietly.

Each of these is a harness bug. Fine-tuning the model will not fix them.

## Tradeoffs you actually have to make

A thicker harness is not free. Verify adds latency. Permissions add design time. Sensors add integration. Traces add storage and a review habit. Teams that skip those costs do not skip them. They pay them later, in incidents and in token waste.

The useful trade is not “more model versus less model.” It is where judgment lives. Cheap, narrow workers can gather and check. The expensive model should see a slim pack and a bounded act, not the entire estate and a blank check. That split is how the same gateway pattern holds *42% lower token spend*, *2.4× useful completions per 1k tokens*, and about *68% prompt-cache hit* on repeated enterprise workflows. Those numbers are a consequence of reusable context and a loop that does not wander. They are not a reason to skip the gate.

Another trade: autonomy versus a human on the last step. We do not run production operations fully unsupervised. Incident intelligence can rank a hypothesis and attach evidence. A person still owns the remediation that can take a service down. That is not a lack of faith in models. It is respect for blast radius.

A third trade: one generic agent versus workflow-specific harnesses. The generic agent is cheaper to demo. The specific harness is cheaper to operate. File-and-test is not the same job as schema mapping, and neither is the same job as retrieval that must refuse when the source is missing. If the definition of done changes, the harness changes. The model can stay.

## What production demands

Production does not demand a cleverer system prompt. It demands a loop a human can read.

Name the tools. Cap the retries. Put permissions under act, not in a paragraph the model can negotiate. Attach evidence at gather, not as an appendix the model might remember. Put a test gate in front of done. Write the trace as if the next reader is on-call and angry. Route through a gateway you own, so the model is a part you can swap. Keep a person on the last step when the write can hurt.

That is how an agent holds up on an operations floor instead of in a demo. At [sunrisegenai.com](https://sunrisegenai.com) the work is the harness. The model is how the harness speaks. If you cannot point to the sensors, the permissions, the gate, and the trace, you do not have an agent yet. You have tokens, and tokens are not a job.
