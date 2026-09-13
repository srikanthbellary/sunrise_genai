---
title: Slim context packs beat written rules
description: Long policy in the prompt is not control. Hard stops — allowlists, budgets, stop sequences, a refuse-when-unsourced path — are control.
date: 2026-09-12
slug: slim-context-packs
tags:
  - context
  - evaluation
  - harness
---

Long policy documents in the prompt are not control. Models negotiate with prose. Hard stops are control: tool allowlists, token budgets, stop sequences, and a refuse-when-unsourced path.

We ship slim context packs — the schema, the few examples that matter, the citations that must be present — then we measure. Evaluation harnesses are product surface, not a slide. The same gateway pattern we run at [sunrisegenai.com](https://sunrisegenai.com) holds reusable context, model-aware temperature, and stop-sequence hardening so the loop cannot wander.

Written rules are a hope. A hard stop is a contract. If the source is missing, the system says so. If the budget is spent, the loop ends. If the tool is not on the list, it does not run.

Keep the pack small. Keep the stops mechanical. Keep the scoreboard where a reviewer can see it.
