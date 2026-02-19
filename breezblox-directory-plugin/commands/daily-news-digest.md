---
description: Compile daily AI + Data Center trending news digest for BreezBlox Directory review
allowed-tools: WebSearch, WebFetch, Read, Write, Bash
cron: "0 7 * * *"
---

Compile a daily news digest for the BreezBlox AI + Data Center Directory.

## Step 1 — Load source list

Read the file `sources.json` from the user's selected workspace folder. It contains an array of content sources with fields: name, url, type, category, frequency, priority, active. Only process sources where `active` is `true`.

## Step 2 — Fetch HIGH priority sources

Use WebSearch to find the latest news (last 24 hours) from each HIGH priority source:
- @testingcatalog — search `site:x.com testingcatalog AI tools`
- AI Daily Brief — search `AI Daily Brief podcast latest episode`
- Everyday AI — search `Everyday AI podcast Gary Grossman latest`
- The Artificial Intelligence Show — search `Marketing AI Institute podcast latest`
- Data Center Dynamics — search `site:datacenterdynamics.com news today`
- Data Center Knowledge — search `site:datacenterknowledge.com latest news`
- Uptime Institute — search `Uptime Institute blog latest`
- CSET Georgetown AI Policy — search `CSET Georgetown AI policy latest`

## Step 3 — Fetch MEDIUM priority sources if needed

If fewer than 8 unique stories found, also search:
- The Verge AI, Ars Technica AI, TLDR AI, Ben's Bites, Utility Dive energy

## Step 4 — Deduplicate and rank

Remove duplicate stories covering the same event. Keep the version from the highest-priority source. Rank by relevance: AI-infrastructure crossover topics first, then pure AI, then pure DC, then policy.

## Step 5 — Write the digest HTML

Create a digest HTML file matching the BreezBlox cyberpunk design system:
- Dark background `#0A0E17`, Orbitron font for headlines, Share Tech Mono for body
- Accent colors: neon yellow `#FFD800`, teal `#0DF2C9`, red `#FF2E63`, purple `#9D4EDD`
- 6–10 stories, each with: source name, date, headline (uppercase), 2–3 sentence summary (your own words, NOT copied text), and a "Why it matters" line for the AI + DC audience

Save the file as `news-digest-YYYY-MM-DD.html` in the workspace folder.

Also save `digest-YYYY-MM-DD.json` with structured data: `[{headline, source, url, summary, category, featured: false}]`

## Step 6 — Report to user

Tell the user:
- How many stories were found and from which sources
- Flag 1–2 stories you recommend marking as `featured: true` for the directory landing page
- Ask the user to review, edit if needed, then approve for publishing to the `/directory/news/` page on breezblox.com

**Human-in-the-loop required before publishing.**
