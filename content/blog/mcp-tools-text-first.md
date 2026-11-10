---
title: 'Photos in chat, text in the tool: designing MCP tools text-first'
description: 'Under the MCP spec, a tool takes JSON Schema arguments and nothing else. There is no native image or file input. So we let the host chat model read the photo, pass the tool plain text, keep limits on the server, and add a documented file-input variant only on hosts that publish one.'
date: '2026-11-10'
slug: mcp-tools-text-first
image: /og.png
tags:
  - agents
  - MCP
  - tools
  - production
---

We build production GenAI for operations, knowledge, and data. More of that work now reaches people as an MCP server running inside someone else's chat app. One request shows up early in that kind of design. A user takes a photo of a supplier invoice, drops it into the chat, and expects the tool to receive the picture.

It usually will not. Not because a host is broken, but because of how the protocol is drawn.

## What the spec actually gives you

Read the tools page of the MCP specification (version 2025-11-25) slowly and one asymmetry jumps out. A tool declares an `inputSchema`, which must be a valid JSON Schema object. When the host calls the tool, it sends `tools/call` with a name and an `arguments` object that matches that schema. Strings, numbers, booleans, arrays, nested objects. That is the whole input surface.

The output side is richer. A tool result can carry text, an image (base64 data plus a MIME type), audio, a resource link, or an embedded resource, alongside optional `structuredContent` checked against an `outputSchema`.

So images can come out of a tool natively. They have no native way in.

Anything that moves a user's file into a tool call is a host extension layered on top of the spec. One host documents that extension in detail. Others document no such mechanism as of early November 2026. You should design for that gap on purpose instead of discovering it during review.

## Text-first: let the host model read the photo

The default we now ship is boring. The tool accepts text.

Every major chat host runs a model that can read images. So the photo stays where it landed, in the conversation. The host model reads it, pulls out the fields that matter, and calls our tool with those fields as ordinary arguments. For the invoice case that might be `read_invoice_text(text, vendor_name?)`: one required string with the extracted lines, one optional hint.

Three things fall out of that choice.

First, the same tool works on every host, because every host can send a string. No per-host branch on day one.

Second, the server stays in charge of the rules. The spec says servers must validate inputs and rate limit tool invocations, and that is where quotas, plan limits, and per-user counts belong. A host model can be talked into retrying a call; a counter in your own database cannot. One host even sends an anonymized user id in request metadata specifically for rate limiting, which is a useful signal and still not an authorization decision.

Third, the tool contract is easy to test, because the input is a string you can write down in a fixture file.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 400" role="img" aria-labelledby="paths-title paths-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="paths-title">Two ways a chat photo can reach an MCP tool</title><desc id="paths-desc">Top path, text-first, works on every host: the user photo goes to the host chat model, which reads it and calls the tool with extracted text as a JSON argument. The server validates and counts quota. Bottom path, file-input variant, only where a host documents it: the user photo goes through a host file extension, which passes a temporary download URL and file id to the tool. The server downloads the bytes, then validates and counts quota. Both paths log which one ran.</desc><rect width="640" height="400" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 384 H36 M16 384 V364" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 384 H604 M624 384 V364" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 01 · TWO PATHS IN</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">INPUT</text><g font-family="'Source Serif 4', Georgia, serif"><text x="28" y="76" fill="#06B6C3" font-size="12" font-weight="600" letter-spacing="0.12em">TEXT-FIRST · EVERY HOST</text><rect x="28" y="88" width="110" height="56" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="83" y="111" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="13" font-weight="600">Photo</text><text x="83" y="129" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">in the chat</text><rect x="168" y="88" width="130" height="56" fill="rgba(250,195,69,0.10)" stroke="#FAC345" stroke-opacity="0.7"/><text x="233" y="111" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">Host model</text><text x="233" y="129" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">reads the image</text><rect x="328" y="88" width="130" height="56" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="393" y="111" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Text argument</text><text x="393" y="129" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">plain JSON string</text><text x="28" y="214" fill="#D9661C" font-size="12" font-weight="600" letter-spacing="0.12em">FILE INPUT · DOCUMENTED HOSTS ONLY</text><rect x="28" y="226" width="110" height="56" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.35)"/><text x="83" y="249" text-anchor="middle" fill="rgba(238,234,226,0.85)" font-size="13" font-weight="600">Photo</text><text x="83" y="267" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">in the chat</text><rect x="168" y="226" width="130" height="56" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.8"/><text x="233" y="249" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">File extension</text><text x="233" y="267" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">host-specific field</text><rect x="328" y="226" width="130" height="56" fill="rgba(217,102,28,0.08)" stroke="#D9661C" stroke-opacity="0.6"/><text x="393" y="249" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">download_url</text><text x="393" y="267" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">plus file_id · temporary</text><rect x="488" y="88" width="124" height="194" fill="rgba(6,182,195,0.10)" stroke="#06B6C3" stroke-opacity="0.9" stroke-width="1.4"/><text x="550" y="150" text-anchor="middle" fill="#06B6C3" font-size="14" font-weight="600" letter-spacing="0.1em">YOUR SERVER</text><text x="550" y="176" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">validate input</text><text x="550" y="194" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">count quota</text><text x="550" y="212" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">fetch bytes if URL</text><text x="550" y="230" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">log which path ran</text><rect x="28" y="316" width="584" height="44" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="48" y="336" fill="#FAC345" font-size="12" font-weight="600" letter-spacing="0.1em">SPEC BASELINE</text><text x="48" y="352" fill="rgba(238,234,226,0.65)" font-size="12">tool inputs are JSON Schema arguments · images can come out, not in</text></g><g fill="none" stroke="rgba(238,234,226,0.4)" stroke-width="1.2"><path d="M138 116 H164"/><path d="M298 116 H324"/><path d="M458 116 H484"/><path d="M138 254 H164"/><path d="M298 254 H324"/><path d="M458 254 H484" stroke="#D9661C" stroke-opacity="0.7"/></g></svg><figcaption>Fig. 01. Text-first works everywhere because every host can send a string. The file-input variant exists only where a host publishes the extension, and the server still owns validation, quota, and the log line that says which path ran.</figcaption></figure>

## The tradeoffs we accept

Text-first is not free. Here is what it costs and what we do about each.

**Extraction quality belongs to the host model, not to you.** If the photo is blurry or the model misreads a line item, your tool receives a confident wrong string. You cannot fix that inside the tool. What you can do is make the tool honest about what it got: return the parsed fields back in the result, flag anything that fails validation (a total that does not match the lines, a date in the future), and let the host model ask the user to confirm. A refusal with a reason beats a silent guess. The spec has a lane for this already: tool execution errors come back with `isError: true` and text the model can act on.

**Base64 in an argument is technically possible and a bad idea.** A JSON string can hold an encoded image, and nothing in the schema stops you from declaring one. But that string sits in the model's context as tokens, it bloats every turn that carries it, and no host documents it as the way to send files. We do not build on undocumented patterns that happen to work this week.

**You lose the original bytes.** Some jobs need them: an audit trail that must keep the source document, or a downstream model that reads layout and not just text. For those jobs, text-first is the fallback path, and the documented file variant becomes the primary one on hosts that support it.

## Adding a file variant where a host documents one

The clearest published mechanism today is in the ChatGPT Apps SDK. You list the input fields that carry files in `_meta["openai/fileParams"]` on the tool descriptor. Each such field must be a file object whose schema declares four properties: `download_url` and `file_id` (both required), plus `mime_type` and `file_name` (declared, but optional). At call time the host passes a temporary `download_url`, and your server fetches the bytes itself. The docs say the Scan Tools step and submission reject a file schema that gets those declarations wrong, which is a nice property. A broken schema fails before a user ever sees it.

We treat that as a second tool, not a flag on the first. Something like `read_invoice_file(file)` next to `read_invoice_text(text)`. Separate names keep each contract simple, keep the text tool identical on every host, and make the log line unambiguous about which one fired.

The temporary URL deserves its own care. Download promptly, check the MIME type against what you accept, cap the size you are willing to pull, and do not store the URL as if it were a permanent reference. Store the file you fetched, or store nothing.

The failure we design against hardest is drift between the two tools (it is the kind of bug that gets blamed on the wrong host for a whole afternoon). Someone adds a currency field to one schema and not the other, and the two paths quietly return different shapes for the same invoice. So both tools return through one shared output schema, and a test fails if they disagree.

## Outputs can carry images, so use them

Because the output side is rich, a tool can hand back an image or a resource link when the answer is visual. An annotated crop of the line it could not parse. A link to the stored source document. That keeps the conversation honest about what the server actually saw, and it costs nothing in protocol terms. The asymmetry is in the inputs, not the outputs.

## Descriptions are written for discovery, so write them in the user's words

The tool description is not documentation for your teammates. It is what the host model reads when it decides whether your tool fits the user's request, and ChatGPT's docs say tool metadata is one of the signals its model weighs when it surfaces apps in conversation.

So we write descriptions the way a user would phrase the ask. "Read the totals and line items from a photo of an invoice" beats "invoice OCR ingestion endpoint." For the text tool we also say plainly what to send: "Pass the text you read from the image." The host model takes that literally, which is the point.

## How we test it

Same instinct as our [evidence before merge](/blog/evidence-before-merge/) rule: the claim is not "it works in chat," the claim is a passing check with a record behind it.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 340" role="img" aria-labelledby="test-title test-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="test-title">How we test a text-first MCP tool with an optional file variant</title><desc id="test-desc">Three test layers. Contract tests per host check that each tool descriptor and schema is accepted. Fallback tests check that the text tool alone completes the job when no file extension exists. Path logging records on every call whether the text path or the file path ran, so the share of each is measurable.</desc><rect width="640" height="340" fill="#00040D"/><path d="M16 16 H36 M16 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 16 H604 M624 16 V36" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M16 324 H36 M16 324 V304" fill="none" stroke="#D9661C" stroke-width="1.2"/><path d="M624 324 H604 M624 324 V304" fill="none" stroke="#D9661C" stroke-width="1.2"/><text x="28" y="40" fill="rgba(238,234,226,0.42)" font-family="'Source Serif 4', Georgia, serif" font-size="13" font-weight="600" letter-spacing="0.18em">FIG. 02 · PROVE EACH PATH</text><text x="612" y="40" text-anchor="end" fill="#06B6C3" font-family="'Source Serif 4', Georgia, serif" font-size="12" font-weight="600" letter-spacing="0.12em">TESTS</text><g font-family="'Source Serif 4', Georgia, serif"><rect x="28" y="72" width="180" height="168" fill="rgba(6,182,195,0.08)" stroke="#06B6C3" stroke-opacity="0.7"/><text x="118" y="100" text-anchor="middle" fill="#06B6C3" font-size="13" font-weight="600">Contract tests</text><text x="118" y="120" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">one suite per host</text><text x="118" y="156" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">descriptor accepted</text><text x="118" y="174" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">schema validates</text><text x="118" y="192" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">fixture strings pass</text><rect x="230" y="72" width="180" height="168" fill="rgba(250,195,69,0.10)" stroke="#FAC345" stroke-opacity="0.7"/><text x="320" y="100" text-anchor="middle" fill="#FAC345" font-size="13" font-weight="600">Fallback tests</text><text x="320" y="120" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">no file extension</text><text x="320" y="156" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">text tool finishes job</text><text x="320" y="174" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">bad text gets isError</text><text x="320" y="192" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">same output shape</text><rect x="432" y="72" width="180" height="168" fill="rgba(217,102,28,0.14)" stroke="#D9661C" stroke-opacity="0.8"/><text x="522" y="100" text-anchor="middle" fill="#D9661C" font-size="13" font-weight="600">Path logging</text><text x="522" y="120" text-anchor="middle" fill="rgba(238,234,226,0.55)" font-size="11">every call</text><text x="522" y="156" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">host · tool · path</text><text x="522" y="174" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">validation result</text><text x="522" y="192" text-anchor="middle" fill="rgba(238,234,226,0.7)" font-size="11">share of each path</text><rect x="28" y="262" width="584" height="40" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.55"/><text x="48" y="287" fill="rgba(238,234,226,0.65)" font-size="12">a host that changes its rules breaks a contract test, not a customer</text></g></svg><figcaption>Fig. 02. Contract tests per host, a fallback suite that assumes no file extension at all, and a log line on every call that records which path ran.</figcaption></figure>

**Contract tests per host.** For each host a tool targets, a suite checks that our descriptors and schemas are accepted the way that host documents, and that a set of fixture strings (clean, messy, truncated) produce the expected result. Host rules change. When they do, we want a red test in our pipeline, not a support ticket.

**A fallback suite that assumes nothing.** We run the full job through the text tool alone, as if no host offered file input anywhere. If the text path cannot finish the job, the file path is hiding a design problem.

**A log line that names the path.** Every call records host, tool name, which path ran (text or file), and whether validation passed. That gives us the share of each path per host without guessing, the same way [numeric quality gates](/blog/numeric-quality-gates/) want a number instead of a feeling. If the file path dominates on one host and its validation failures climb, we look there first.

What we have not settled is how far to trust a host model's extraction on documents where one wrong digit matters. Confirm-before-commit with the user is our current answer. We are not sure it scales to long documents without becoming a chore nobody reads.

## The short version

The protocol gives tools a string-shaped door. Design for that door first. Let the host model read the photo, send your tool text, and keep every limit on your own server, where the [harness](/blog/agent-is-a-harness/) can see it. Then, host by host, add the file variant that host actually documents, test it like a contract, and log which path ran.

Start with text. Add files where the docs say you can.
