---
description: Weekly health check on all BreezBlox Directory content sources — flags dead links, suggests new sources
allowed-tools: WebSearch, WebFetch, Read, Write
cron: "0 6 * * 0"
---

Run a weekly health check on the BreezBlox Directory content source list.

## Step 1 — Load source list

Read `sources.json` from the user's workspace folder. Process all entries regardless of `active` status — inactive ones still need health notes.

## Step 2 — Check each source

For each source, use WebFetch or WebSearch to verify:
- The URL responds (not 404 / dead)
- New content published in the last 7 days
- Content is still relevant to AI and/or data center topics

## Step 3 — Classify each source

Assign one of three statuses:

- **HEALTHY** ✅ — Active, recent content, still on-topic
- **WARNING** ⚠️ — Accessible but hasn't published in 7+ days, or topic drift detected
- **ERROR** ❌ — URL unreachable, site down, or publication appears to have stopped

## Step 4 — Suggest 2–3 new sources

Search for:
- `AI newsletter 2026 new launch`
- `data center industry news publication 2026`
- `AI podcast new 2026`

For each suggestion provide: name, URL, type (podcast/newsletter/publication), category (ai-news/datacenter/policy), and a one-sentence case for why it's worth adding.

## Step 5 — Save the report

Save `source-health-YYYY-MM-DD.md` in the workspace folder with this structure:

```
# Source Health Report — YYYY-MM-DD

## Summary
- Healthy: X sources
- Warning: X sources
- Error: X sources

## ✅ Healthy
...

## ⚠️ Warning
...

## ❌ Error
...

## Suggested New Sources
...
```

## Step 6 — Report to user

Highlight any ERROR sources immediately. Present the new source suggestions. Ask if any ERROR sources should be set to `active: false` in `sources.json`, and if any suggestions should be added.
