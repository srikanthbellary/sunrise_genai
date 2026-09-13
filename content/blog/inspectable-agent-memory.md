---
title: Give the agent a filesystem it can inspect
description: Opaque vectors and session blobs make memory a black box. Hierarchical files, portable over MCP, are how a person opens the last write before the next action fires.
date: '2026-09-08'
slug: inspectable-agent-memory
image: /og.png
aliases:
  - give-the-agent-a-filesystem
tags:
  - agents
  - memory
  - MCP
---

We build production GenAI for operations, knowledge, and data. Memory is where those three meet. An operations agent that cannot show what it thought it knew is not ready for a bridge call. A knowledge agent that cannot point at the note it retrieved is not ready for a citation. A data agent that cannot open the last mapping decision is not ready for a review queue. In all three cases the failure looks like a model miss. It is usually a memory miss you cannot see.

Hidden vector stores and opaque session blobs make agent memory a black box. When a run goes wrong — and it will — you cannot read what the agent thought it knew. You can only watch it do the wrong thing again with great confidence. That is not a research inconvenience. That is an operations defect.

Prefer a filesystem. Notes, tickets, diffs, and recall paths a person can open. Addressable memory is debuggable memory. If you cannot `cat` the file, you cannot explain the decision.

## Similarity is not an explanation

Dense retrieval is a good index. It is a poor source of truth. An embedding tells you that two strings were near each other in a space you do not inhabit. It does not tell you who wrote the fact, when it was last true, whether it was a decision or a guess, or which agent was allowed to overwrite it. When the only memory you have is a vector store plus a session blob, incident review becomes folklore: we think it remembered the retry policy; we think it had the customer id; we think last Tuesday’s thread is still in there.

Session blobs fail in a second way. They are convenient for a single client. They are hostile to every other client, and to every person who does not speak that vendor’s export. Resume becomes “open the same window.” Handoff becomes “paste the chat.” Audit becomes “we do not have that.”

The production question is not “did the model retrieve something?” The question is “can a reviewer open the thing it retrieved, see the path, and decide whether the next action is allowed to fire?” If the answer depends on a vendor UI, you do not have memory. You have a souvenir of a conversation.

## Memory should be a tree a person can walk

Working memory, session memory, and durable memory are not the same object. Collapsing them into one pile is how stale facts become policy.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 420" role="img" aria-labelledby="memory-title memory-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="memory-title">Inspectable memory across clients</title><desc id="memory-desc">Three agent clients write and recall through an MCP bus into a hierarchical filesystem of working, session, and durable files. A faded opaque vector blob sits aside as a dead end that a reviewer cannot open.</desc><rect width="640" height="420" fill="#00040D"/><g stroke="rgba(238,234,226,0.05)" stroke-width="1" fill="none"><path d="M20 20 H620 M20 52 H620 M20 84 H620 M20 116 H620 M20 148 H620 M20 180 H620 M20 212 H620 M20 244 H620 M20 276 H620 M20 308 H620 M20 340 H620 M20 372 H620 M20 404 H620"/><path d="M20 20 V400 M52 20 V400 M84 20 V400 M116 20 V400 M148 20 V400 M180 20 V400 M212 20 V400 M244 20 V400 M276 20 V400 M308 20 V400 M340 20 V400 M372 20 V400 M404 20 V400 M436 20 V400 M468 20 V400 M500 20 V400 M532 20 V400 M564 20 V400 M596 20 V400 M628 20 V400"/></g><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 404 H36 M16 404 V384" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 404 H604 M624 404 V384" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="38" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · WRITE / RECALL</text><text x="28" y="72" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">CLIENTS</text><rect x="28" y="84" width="130" height="36" fill="rgba(217,102,28,0.08)" stroke="rgba(238,234,226,0.2)"/><text x="93" y="107" text-anchor="middle" fill="rgba(238,234,226,0.86)" font-family="'Source Serif 4', Georgia, serif" font-size="14">coding agent</text><rect x="28" y="132" width="130" height="36" fill="rgba(217,102,28,0.08)" stroke="rgba(238,234,226,0.2)"/><text x="93" y="155" text-anchor="middle" fill="rgba(238,234,226,0.86)" font-family="'Source Serif 4', Georgia, serif" font-size="14">ops agent</text><rect x="28" y="180" width="130" height="36" fill="rgba(250,195,69,0.07)" stroke="rgba(238,234,226,0.2)"/><text x="93" y="203" text-anchor="middle" fill="rgba(238,234,226,0.86)" font-family="'Source Serif 4', Georgia, serif" font-size="14">reviewer</text><rect x="188" y="100" width="132" height="120" fill="rgba(6,182,195,0.07)" stroke="#06B6C3" stroke-opacity="0.55"/><text x="254" y="128" text-anchor="middle" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">MCP BUS</text><text x="254" y="152" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">write · recall</text><text x="254" y="174" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-family="'Source Serif 4', Georgia, serif" font-size="13">inspect · resume</text><text x="254" y="196" text-anchor="middle" fill="#FAC345" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">PORTABLE</text><path d="M158 102 H188" fill="none" stroke="#D9661C" stroke-opacity="0.7"/><path d="M158 150 H188" fill="none" stroke="#D9661C" stroke-opacity="0.7"/><path d="M158 198 H188" fill="none" stroke="#FAC345" stroke-opacity="0.7"/><path d="M320 160 H348" fill="none" stroke="#06B6C3" stroke-opacity="0.7"/><text x="360" y="72" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">MEMORY TREE</text><rect x="348" y="84" width="264" height="200" fill="rgba(0,8,22,0.55)" stroke="rgba(238,234,226,0.18)"/><rect x="364" y="100" width="232" height="40" fill="rgba(217,102,28,0.08)" stroke="rgba(238,234,226,0.16)"/><text x="380" y="118" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.14em">WORKING</text><text x="380" y="134" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">scratch · current diff · open ticket</text><rect x="364" y="150" width="232" height="40" fill="rgba(250,195,69,0.06)" stroke="rgba(238,234,226,0.16)"/><text x="380" y="168" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.14em">SESSION</text><text x="380" y="184" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">thread · decisions · retry policy</text><rect x="364" y="200" width="232" height="64" fill="rgba(6,182,195,0.06)" stroke="rgba(238,234,226,0.16)"/><text x="380" y="218" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="11" font-weight="600" letter-spacing="0.14em">DURABLE</text><text x="380" y="236" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">entity · schema map · on-call rota</text><text x="380" y="252" fill="rgba(238,234,226,0.82)" font-family="'Source Serif 4', Georgia, serif" font-size="13">service graph · artifact paths</text><rect x="28" y="300" width="584" height="88" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.1)"/><text x="44" y="324" fill="rgba(238,234,226,0.34)" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.16em">DEAD END</text><rect x="44" y="336" width="200" height="36" fill="rgba(238,234,226,0.04)" stroke="rgba(238,234,226,0.12)"/><circle cx="68" cy="354" r="8" fill="rgba(238,234,226,0.12)"/><circle cx="86" cy="348" r="6" fill="rgba(238,234,226,0.1)"/><circle cx="80" cy="362" r="5" fill="rgba(238,234,226,0.08)"/><text x="104" y="358" fill="rgba(238,234,226,0.4)" font-family="'Source Serif 4', Georgia, serif" font-size="13">opaque vector blob</text><path d="M52 342 L236 366" stroke="#D9661C" stroke-opacity="0.55" stroke-width="1.2"/><text x="268" y="350" fill="rgba(238,234,226,0.5)" font-family="'Source Serif 4', Georgia, serif" font-size="13">no path · no author · no diff · no cat</text><text x="268" y="370" fill="rgba(238,234,226,0.5)" font-family="'Source Serif 4', Georgia, serif" font-size="13">useful as an index — not as the record</text></svg><figcaption>Fig. 01 — Clients share a portable MCP bus. The record is a tree of files. The blob can point; it cannot be the thing you open.</figcaption></figure>

**Working** is the scratch of this turn: the open ticket, the current diff, the three files in play. It should be cheap to throw away and obvious when it is stale.

**Session** is the thread that should resume: decisions already made, the retry policy in force, the hypothesis ranked an hour ago. Session save and resume against files is how a coding agent comes back to the same job without reconstructing folklore from a chat scroll.

**Durable** is the estate: entities, schema maps, on-call rotas, service-graph notes, artifact paths. Durable memory is a contract with operations. It is small enough to audit, named enough to search, and boring enough that a person will actually open it.

The tree is the product. Vectors, if you use them, hang off the tree as an index. They do not replace it. When recall fires, the agent should return a path and a snippet, not a ghost of a similar sentence. When write fires, the agent should create or patch a file a reviewer can diff. When a second client — another agent, or a person — arrives, it should see the same tree, not a private embedding it cannot export.

## Why MCP is the port, not the memory

[OpenStinger](https://openstinger.com) is our portable MCP agent memory for that pattern: write, recall, inspect. The protocol is the port. The files are the memory. That distinction matters. If you treat MCP as a place to hide another blob, you have only changed the wire format of the black box. If you treat MCP as the way any serious client reads and writes the same tree, you get something operations can live with.

A coding agent, an ops agent, and a reviewer are not the same process. They should not each invent a store. The coding agent we ship already keeps memory and session save on files, not on a mystery blob, in front of an in-network gateway. The same idea shows up when incident intelligence has to hand a person a ranked hypothesis with evidence attached. If the evidence is “the model remembered,” the handoff failed. If the evidence is a path into the tree, the person can disagree with it. Disagreement is the point. Uninspectable memory cannot be overruled. It can only be suffered.

Portability also kills a quiet vendor lock. The memory that only lives inside one coding client will not be there when the next client is the one your security team approved. Files on a path survive that argument. Blobs do not.

## What goes wrong when memory cannot be opened

These failure modes are not theoretical. They are how quiet systems become expensive.

**Silent overwrite.** Two agents, or two turns, write the same durable fact. There is no diff. The new value wins. The old value was the true on-call rota. The next act pages the wrong person.

**Stale recall.** Working notes leaked into durable memory. The agent keeps retrieving last month’s retry policy because it is near the query in vector space. No one can see the timestamp because there is no file.

**Memory bloat.** Everything is remembered. Nothing is ranked. The pack that should have been slim is now a junk drawer. Token spend climbs and the useful completions per thousand tokens fall — the opposite of the *42% lower token spend* and *2.4×* useful-completion shape a disciplined gateway is supposed to hold.

**Unreviewed writes becoming policy.** A scratch hypothesis gets written without a reviewer. The next session treats it as durable. You have created institutional knowledge out of a guess.

**Cross-client drift.** Cursor remembers one story. The ops agent remembers another. The reviewer sees neither. MCP without a shared tree is just three black boxes that can wave at each other.

**The mute incident.** Mean time to recovery is a memory problem as much as a reasoning problem. The *75% lower MTTR* we deliver on incident intelligence assumes the hypothesis arrives with evidence a person can open. A vector neighborhood is not evidence. A file with a path is.

## Tradeoffs: retrieval quality versus a throat to choke

Inspectable files are not free. They take design. You have to name things. You have to decide what is working versus durable. You have to prevent the agent from treating the tree like a diary. Vector-only memory is faster to stand up and easier to demo. It will also be the thing you cannot explain to a risk committee.

The honest hybrid is this: use embeddings to find candidate paths; use files as the record; use the harness to refuse an act when the record is missing. That is the same gather-then-verify shape as the rest of the loop. Memory that cannot survive verify is not memory. It is atmosphere.

Another trade is size. Durable memory that cannot be audited will not be audited. Keep entities small. Keep decisions as short notes with dates. Keep artifacts as paths, not as pasted dumps. A person who can open the last write in a minute will open it. A person who has to reconstruct a 40,000-token blob will not.

A third trade is privacy and tenancy. A filesystem makes isolation visible: this tree is this workspace, this agent, this retention. A shared vector soup makes isolation a hope. Production memory is a contract with operations, which means it is also a contract with the people who have to delete it.

## What production demands

Keep memory on a path. Keep it hierarchical so scratch cannot quietly become law. Keep a write that produces a diff and a recall that returns a path. Keep the bus portable — MCP — so the coding agent, the ops agent, and the reviewer are looking at the same tree. Keep a human able to open the last write before the next action fires.

That is the standard we build to at [sunrisegenai.com](https://sunrisegenai.com) and in [OpenStinger](https://github.com/srikanthbellary/openstinger). The model can forget. The filesystem must not. If you cannot inspect the memory, you cannot defend the act, and if you cannot defend the act you do not have a production agent. You have a conversation that happens to have a disk you are not allowed to see.
