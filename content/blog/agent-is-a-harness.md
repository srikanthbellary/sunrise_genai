---
title: An agent is a model plus a harness
description: A model generates tokens. An agent finishes work. The difference is the loop, the tools, and a test gate in front of done.
date: 2026-09-01
slug: agent-is-a-harness
tags:
  - agents
  - harness
---

A model generates tokens. An agent finishes work. The difference is the harness: tools, a loop, a definition of done, and a test gate before anyone calls the run finished.

At [sunrisegenai.com](https://sunrisegenai.com) we build workflow-specific harnesses in front of an in-network model gateway. File operations, atomic multi-edit, memory, session save and resume — then a gate. Gather, act, verify. If the last step is a silent template fallback, you do not have an agent. You have a prompt with a costume.

A chatbot is a conversation. A production agent is a job with a contract. The model is interchangeable. The harness is the product.

Write the loop so a human can read the trace. Name the tools. Cap the retries. Refuse when the evidence is not there. That is how an agent holds up on an operations floor instead of in a demo.
