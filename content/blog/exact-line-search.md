---
title: 'Find the exact line: why our agents search plain text before vectors'
description: 'The default recipe for letting an AI read your documents is chunk, embed, store in a vector database. It works, but it is often the second step taken first. Here is how we start agent search with plain keyword search over raw files, make every answer quote a line it can prove, and add vectors only when a measured gap says so.'
date: '2026-11-03'
slug: exact-line-search
image: /og.png
tags:
  - agents
  - retrieval
  - search
  - production
---

Ask a team how to let an AI answer questions from their own documents and you will usually hear the same recipe. Split every file into chunks. Turn each chunk into an embedding. Store the embeddings in a vector database. At question time, embed the question, pull the closest chunks, and hand them to the model.

That recipe works, and for some jobs it is the right one. But in a lot of projects it is the second step taken first. Before any of it is built, there is a simpler option sitting in the repo: the files themselves, and a search tool that has been fast and reliable for decades.

At Sunrise we start agent search with plain keyword search over raw files. We make every answer quote the exact line it came from. And we only add vectors when a small, honest test shows keyword search missing things that matter. Here is why, and how we decide.

## What the agent actually needs

When an agent answers a question from your documents, the answer is only as useful as your ability to check it. "Our refund window is 30 days" is a claim. "Our refund window is 30 days, from `policies/refunds.md`, line 14" is a claim you can verify in two seconds.

So the retrieval step has one real job: put the right lines in front of the model, with their file and line number attached, so the model can quote them. Not the vaguely related paragraph. The line.

That changes what good search looks like. Similarity scores are a means, not the goal. The goal is a quote that exists, word for word, in a file you own.

## Agents are good at searching like people do

Keyword search used to be weak for question answering because a person had to guess the right words on the first try. An agent does not have that problem. It can run a search, read what came back, notice the vocabulary the documents actually use, and search again.

A question like "how long do customers have to get their money back?" might not match the word "refund" on the first pass. The agent tries "money back", sees nothing useful, tries "refund", finds `policies/refunds.md`, reads the lines around the hit, and answers. Three cheap searches, a few seconds, and the evidence is right there.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 380" role="img" aria-labelledby="loop-title loop-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="loop-title">The agent search loop over raw files</title><desc id="loop-desc">A question goes to the agent. The agent writes a few keyword queries and runs them over the raw files. Each hit comes back with a file path and line number. The agent reads the lines around each hit. If the lines answer the question, the agent writes an answer that quotes the exact line with its file and line. If not, it refines the query using words it found in the documents and searches again.</desc><rect width="640" height="380" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 364 H36 M16 364 V344" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 364 H604 M624 364 V344" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · SEARCH LIKE A PERSON</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">RETRIEVAL</text><g font-family="'Source Serif 4', Georgia, serif"><rect x="36" y="80" width="120" height="56" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="96" y="104" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="13" font-weight="600">Question</text><text x="96" y="122" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">in user's words</text><rect x="196" y="80" width="140" height="56" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.8"/><text x="266" y="104" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Agent writes queries</text><text x="266" y="122" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">a few keywords</text><rect x="376" y="80" width="228" height="56" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="490" y="104" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Keyword search, raw files</text><text x="490" y="122" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">no chunks, no index to rebuild</text><rect x="376" y="186" width="228" height="56" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="490" y="210" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Hits with file and line</text><text x="490" y="228" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">policies/refunds.md:14</text><rect x="196" y="186" width="140" height="56" fill="rgba(250,195,69,0.10)" stroke="#FAC345" stroke-opacity="0.7"/><text x="266" y="210" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">Read around hits</text><text x="266" y="228" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">does it answer?</text><rect x="196" y="292" width="408" height="48" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="400" y="321" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Answer that quotes the exact line, with file and line</text><text x="96" y="214" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">no: refine with</text><text x="96" y="230" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">words the docs use</text></g><g fill="none" stroke="rgba(238,234,226,0.4)" stroke-width="1.2"><path d="M156 108 H192"/><path d="M336 108 H372"/><path d="M490 136 V182"/><path d="M376 214 H340"/><path d="M266 242 V288"/><path d="M196 214 H170 V140 H230 V136" stroke="#FAC345" stroke-opacity="0.6" stroke-dasharray="3 4"/></g></svg><figcaption>Fig. 01. The agent searches, reads, and tries again with the words the documents actually use. Every hit carries its file and line, so the answer can quote it.</figcaption></figure>

The loop costs a little more model time per question than a single vector lookup. In return you get something a similarity score never gives you: the agent can show its work.

## What you skip by starting simple

The vector recipe brings a set of decisions and chores that are easy to underestimate.

- **Chunking.** How big is a chunk? Do you split on headings, paragraphs or a fixed size? Every choice cuts some answers in half.
- **Re-indexing.** Documents change. Every edit means new embeddings, and a stale index answers from last month's policy without telling anyone.
- **A second copy of your data.** The vector store is another place your documents live, with its own access rules, backups and deletion story.
- **Opaque misses.** When a vector search fails, it is hard to say why. When a keyword search fails, you can see exactly which words were tried.

Plain files avoid all four. The source of truth is the folder. Edit a file and the next search sees the edit. Delete a file and it is gone from every answer. Access to the documents is the same access you already manage.

## Make every quote provable

Search is half of the job. The other half is making sure the answer does not drift from what the documents say. Our rule is short: every factual claim in an agent's answer quotes a line, with its file path and line number.

That rule is checkable by a script, not just by a careful reader. After the agent answers, we take each quote and confirm it appears word for word at the cited place. A quote that is not in the file gets dropped, and the claim it supported goes with it. A model that paraphrases a policy into something the policy never said is caught before anyone reads the answer.

This is the same instinct behind [evidence before merge](/blog/evidence-before-merge/): an agent's claim counts when it comes with proof a machine can check.

## Where keyword search falls short

Keyword search is not the answer to everything, and pretending otherwise would be its own mistake. It struggles in a few predictable places:

- **Heavy paraphrase.** Users describe a problem in words that never appear in the documents, and the agent cannot guess the bridge.
- **Very large collections.** Millions of files make every search slower and noisier, and the agent spends more steps sifting.
- **Content that is not text.** Scanned pages, images and diagrams need a different path entirely.
- **Many languages.** A question in one language over documents in another breaks keyword matching.

When those show up, vectors earn their place. The question is how you know.

## How we decide: measure the gap first

We decide with a small test built from real questions, not a debate. The steps are simple.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 360" role="img" aria-labelledby="ladder-title ladder-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="ladder-title">Deciding when to add vectors</title><desc id="ladder-desc">Step one: collect real questions, each paired with the exact line that answers it. Step two: run keyword search only and count how many target lines the agent finds and quotes. Step three: read every miss and label its cause. If misses are mostly bad queries or missing documents, fix those and stay with keyword search. If misses are mostly vocabulary mismatch, add vectors as a second retriever whose hits are merged with keyword hits, and rerun the same question set to confirm the gain.</desc><rect width="640" height="360" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 344 H36 M16 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 344 H604 M624 344 V324" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 02 · MEASURE, THEN ADD</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">DECISION</text><g font-family="'Source Serif 4', Georgia, serif"><rect x="28" y="84" width="180" height="60" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="118" y="110" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="13" font-weight="600">1. Real questions</text><text x="118" y="128" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">each with its answer line</text><rect x="230" y="84" width="180" height="60" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.8"/><text x="320" y="110" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">2. Keyword only</text><text x="320" y="128" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">count lines found and quoted</text><rect x="432" y="84" width="180" height="60" fill="rgba(250,195,69,0.12)" stroke="#FAC345" stroke-opacity="0.8"/><text x="522" y="110" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">3. Read every miss</text><text x="522" y="128" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">label the cause</text><rect x="28" y="214" width="270" height="72" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="163" y="240" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Bad queries or missing docs</text><text x="163" y="260" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">fix the prompt or the files,</text><text x="163" y="276" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">stay with keyword search</text><rect x="342" y="214" width="270" height="72" fill="rgba(6,182,195,0.12)" stroke="#06B6C3" stroke-opacity="0.8"/><text x="477" y="240" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Vocabulary mismatch</text><text x="477" y="260" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">add vectors as a second retriever,</text><text x="477" y="276" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">merge hits, rerun the same set</text></g><g fill="none" stroke="rgba(238,234,226,0.4)" stroke-width="1.2"><path d="M208 114 H226"/><path d="M410 114 H428"/><path d="M522 144 V180 H163 V210"/><path d="M477 180 V210"/></g><text x="320" y="320" text-anchor="middle" fill="rgba(238,234,226,0.45)" font-family="'Source Serif 4', Georgia, serif" font-size="11">the misses decide, not the architecture diagram</text></svg><figcaption>Fig. 02. Count what keyword search finds, read every miss, and let the cause of the misses decide whether vectors are worth adding.</figcaption></figure>

1. **Collect real questions.** Pull twenty to forty questions people actually asked, and for each one, write down the exact line that answers it. That pairing is the whole test.
2. **Run keyword search only.** Let the agent search, read and refine as usual. For each question, record whether it found and quoted the target line.
3. **Read every miss.** Label why it missed. Usually the cause is one of three things: the agent gave up too early, the answer was never written down, or the user's words had nothing in common with the document's words.

The labels tell you what to do. If the agent gave up early, fix its instructions so it tries more terms. If the answer was never written down, no retriever will find it, so write the document. Only the third cause, vocabulary mismatch, is a real argument for vectors.

When we do add vectors, they come in as a second retriever, not a replacement. The agent gets hits from both, merged, and the quoting rule stays exactly the same. Then we rerun the same question set. If the found count goes up on the questions that used to miss, the vectors stay. If it barely moves, they come back out, and nobody has to maintain an index for nothing.

## How this looks in our own work

Our own research library is plain Markdown in folders, one topic per file. Our agents search it with keyword search, read the surrounding lines, and cite the file path when they bring a finding back. When a library note changes, the next search sees it. There is no index to rebuild and no second copy to keep in sync.

That is the pattern we bring to client builds too. Start with the files you already have. Make every answer quote a line it can prove. Measure what plain search misses with real questions, and add more machinery only where the misses point.

The best retrieval system is the one whose answers you can check, and the simplest one that passes your own questions.
