---
title: 'A database snapshot cannot unsend an email'
description: 'A one-click undo for agent mistakes sounds like the safety net autonomy needs. It covers the rows you own and nothing else. Here is how we sort agent actions by how they can be reversed, record each one in a ledger before it runs, and gate the ones that have no way back.'
date: '2026-11-24'
slug: agent-undo-ledger
image: /og.png
tags:
  - agents
  - reliability
  - production
  - safety
---

Every team that gives an agent write access eventually asks for the same feature: an undo button. Snapshot the database before the agent acts, and if it does something dumb, restore the snapshot. One click, mistake gone.

It is a good instinct and a partial answer. A snapshot covers the rows you own. It does nothing for the email the agent already sent, the card it already charged, or the text message sitting on a customer's lock screen. Those effects live in other people's systems, and your database has no say over them.

We build production apps and agent systems, and most of our agents touch something outside our own walls. So we stopped thinking about undo as a button and started treating it as a property of each action, decided before the action ever runs. This note walks through how that works.

## Two problems with "restore the snapshot"

The first problem is the one above. Agents rarely only write rows. They call APIs, and an API call is a fact in someone else's world. Rolling back your copy of the world does not roll back theirs. Worse, it can make the two disagree: your database now says the invoice was never sent, while the customer is holding it.

The second problem is quieter. A snapshot is a picture of everything, not just of the agent's change. Say the agent makes a bad write at 9:00, a person fixes an unrelated record at 9:05, and a new customer signs up at 9:10. Restoring the 8:59 snapshot erases the agent's mistake and also the fix and the signup. Whole-database restore is a disaster recovery tool. It is too blunt for correcting one agent's bad afternoon.

Both problems point the same way. You need to know, per action, what was done and what the inverse of that action is. That is a log, not a picture.

## Sort actions by how they come back

Before an agent gets a new tool, we put that tool in one of three classes. The class decides how the action is reversed, and it is written down next to the tool definition, not worked out after something goes wrong.

**Inside our walls.** Writes to data we own: a row in our database, a file in our storage, a setting in our own app. These are the easy ones. Wrap the agent's writes in a transaction where you can, and where you cannot, record the before value of exactly the rows it touched so a restore is scoped to those rows. No full snapshot needed.

**Outside, with an inverse.** Actions in another system that the other system lets you reverse: a charge can be refunded, a booking cancelled, a calendar invite withdrawn, a published post deleted. These are undone by a compensating action, a new forward action that cancels the effect of the first. The refund does not erase the charge. Both exist, and the customer may see both. That is fine, as long as the agent knows the compensator exists before it acts and the ledger records which charge it belongs to.

**Outside, final.** Actions with no inverse at all: an email delivered, a text sent, a push notification shown, a message posted somewhere you cannot delete from. There is no rollback for these and no clever engineering will add one. A follow-up "please ignore that" email is a second action, not an undo. For this class, safety has to happen before the action, not after.

<figure class="blog-figure" role="group"><svg viewBox="0 0 640 380" role="img" aria-labelledby="ul-title ul-desc" width="100%" height="auto" style="display:block;width:100%;height:auto;background:#00040D"><title id="ul-title">Three kinds of agent actions, three ways back</title><desc id="ul-desc">An action ledger runs across the top: intent, execute, result. Below it, three lanes. Lane one, writes inside our own database, is undone by a transaction or a scoped restore. Lane two, outside actions that have an inverse such as a charge or a booking, is undone by a compensating action recorded with an idempotency key. Lane three, outside actions that cannot be taken back such as a sent email or a text message, has no way back, so it is gated before it runs.</desc><g font-family="Inter, system-ui, sans-serif"><text x="320" y="30" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Every side effect goes through the ledger first</text><rect x="60" y="46" width="140" height="36" fill="rgba(250,195,69,0.18)" stroke="#FAC345" stroke-opacity="0.85"/><text x="130" y="69" text-anchor="middle" fill="#EEEAE2" font-size="12">1. write intent</text><rect x="250" y="46" width="140" height="36" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.4)"/><text x="320" y="69" text-anchor="middle" fill="#EEEAE2" font-size="12">2. execute</text><rect x="440" y="46" width="140" height="36" fill="rgba(238,234,226,0.05)" stroke="rgba(238,234,226,0.4)"/><text x="510" y="69" text-anchor="middle" fill="#EEEAE2" font-size="12">3. record result</text><line x1="200" y1="64" x2="240" y2="64" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="240,59 250,64 240,69" fill="rgba(238,234,226,0.5)"/><line x1="390" y1="64" x2="430" y2="64" stroke="rgba(238,234,226,0.5)" stroke-width="1.5"/><polygon points="430,59 440,64 430,69" fill="rgba(238,234,226,0.5)"/><text x="320" y="108" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">intent names the action class and how to reverse it</text><rect x="30" y="126" width="180" height="200" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.25)"/><text x="120" y="152" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Inside our walls</text><text x="120" y="176" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">rows we own</text><text x="120" y="222" text-anchor="middle" fill="#EEEAE2" font-size="12">Undo:</text><text x="120" y="242" text-anchor="middle" fill="#EEEAE2" font-size="12">transaction or</text><text x="120" y="260" text-anchor="middle" fill="#EEEAE2" font-size="12">scoped restore</text><text x="120" y="304" text-anchor="middle" fill="#FAC345" font-size="11">cheap, fully reversible</text><rect x="230" y="126" width="180" height="200" fill="rgba(238,234,226,0.03)" stroke="rgba(238,234,226,0.25)"/><text x="320" y="152" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Outside, with an inverse</text><text x="320" y="176" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">charge, booking, post</text><text x="320" y="222" text-anchor="middle" fill="#EEEAE2" font-size="12">Undo:</text><text x="320" y="242" text-anchor="middle" fill="#EEEAE2" font-size="12">compensating action</text><text x="320" y="260" text-anchor="middle" fill="#EEEAE2" font-size="12">plus idempotency key</text><text x="320" y="304" text-anchor="middle" fill="#FAC345" font-size="11">reversible, leaves a trace</text><rect x="430" y="126" width="180" height="200" fill="rgba(250,195,69,0.08)" stroke="#FAC345" stroke-opacity="0.7"/><text x="520" y="152" text-anchor="middle" fill="#EEEAE2" font-size="13" font-weight="600">Outside, final</text><text x="520" y="176" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">email, text, push</text><text x="520" y="222" text-anchor="middle" fill="#EEEAE2" font-size="12">No undo exists.</text><text x="520" y="242" text-anchor="middle" fill="#EEEAE2" font-size="12">Gate it before</text><text x="520" y="260" text-anchor="middle" fill="#EEEAE2" font-size="12">it runs</text><text x="520" y="304" text-anchor="middle" fill="#FAC345" font-size="11">approval, not rollback</text><text x="320" y="360" text-anchor="middle" fill="rgba(238,234,226,0.6)" font-size="11">Undo walks the ledger backward and runs each recorded inverse</text></g></svg><figcaption>Sort every agent action by how it can be reversed before you ship the agent. The third lane is the one a rollback button quietly ignores.</figcaption></figure>

## The ledger comes first

The mechanism that ties the three classes together is an action ledger. Every side effect the agent wants to cause goes through it in three steps.

**1. Write the intent.** Before calling the tool, the agent records what it is about to do: the tool, the arguments, the action class, an idempotency key, and the compensating action it would run to reverse this one (or the note that none exists). If the intent cannot be written, the action does not run.

**2. Execute.** The tool runs with the idempotency key attached, so a retry after a timeout does not charge the card twice or book two rooms. Most payment and booking APIs accept a key like this. When one does not, the agent first checks the ledger and the other system for an earlier attempt before trying again.

**3. Record the result.** The response goes into the same ledger entry: the charge id, the booking reference, the message id. The compensator needs those ids. A refund without the charge id is a guess.

Undo is now well defined. To reverse a run, walk its ledger entries backward and execute each recorded inverse: restore the touched rows, refund the charge, cancel the booking. Entries marked final are listed for a person, because the only honest response to a sent email is a human decision about what to say next.

The ledger is also the best debugging artifact the agent produces. When someone asks what the agent did on Tuesday, the answer is a list of intents and results, not a reconstruction from scattered logs.

## Prevention beats any undo

An undo path is the second line of defense. The first is the agent not being able to do the wrong thing.

Scope the credentials. An agent that only drafts invoices should hold a token that can create drafts and nothing else. It cannot send an invoice by mistake if the token cannot send. Short-lived, narrow tokens remove whole categories of error before the ledger ever sees them.

Gate the final class. Anything in the outside, final lane pauses for approval before the last step. The agent prepares the email, shows exactly what will go out and to whom, and waits. We wrote about how we decide where those pauses go in [approval gates for proactive agents](/blog/proactive-approval-gates/). The ledger makes that gate cheap to build: the action class is already on the intent record, so the runtime knows which entries must wait.

Cap the blast radius. Put limits in the runtime, not the prompt: how many outside actions one run may take, how much money one run may move, how many recipients one message may have. A loop that would send four hundred emails stops at the cap and asks.

## Undo does not stop the repeat

Reversing a bad run fixes today. It does nothing about tomorrow, when the same inputs reach the same agent and it makes the same mistake again, possibly while nobody is watching.

So every reversed run produces one more artifact: a replay fixture. We save the inputs, the tool responses and the ledger from the failed run, and add it to the agent's test set. Any change to the agent's instructions, tools or model has to pass that fixture before it ships. This is the same evidence rule we apply to code in [evidence before merge](/blog/evidence-before-merge/), pointed at agent behavior.

There is a related trap worth naming. Many agent failures never throw an error. The agent reports "done" and nothing happened, or the wrong thing happened quietly. A ledger helps here too, because "done" with no result recorded for an intent is a mismatch a simple check can catch, long before a customer does.

## A short checklist

When we give an agent a new tool, we answer these before it ships:

- Which class is this action: inside our walls, outside with an inverse, or outside and final?
- If it has an inverse, what exact call reverses it, and which id from the result does that call need?
- Does the call accept an idempotency key, and if not, how does the agent detect an earlier attempt?
- Does the credential allow more than this tool needs? If so, narrow it.
- If the action is final, where does the approval pause sit, and what does the person see?
- What runtime cap stops a loop of this action?
- When a run using this tool is reversed, where does its replay fixture go?

None of these answers is hard. They are just easy to skip, and skipping them is what turns a small agent mistake into a long day of apologies.

## The point

Autonomy is only practical when recovery is designed in, and recovery is not one mechanism. Rows come back through transactions. Outside actions with an inverse come back through compensators that were named in advance. Final actions do not come back, so they wait for a person. A ledger written before every action holds the three together.

A snapshot is still worth keeping. Just do not mistake it for an undo button. It can put your data back. It cannot take back an email.
