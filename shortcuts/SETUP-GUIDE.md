# BreezBlox Directory — Automation Setup Guide

## Your Scheduled Shortcuts

Three automation shortcuts have been created for the BreezBlox Directory:

| Shortcut | Schedule | What It Does |
|----------|----------|--------------|
| **daily-news-digest** | Daily at 7:00 AM | Scans your source list, finds trending AI + DC news, generates a formatted digest for your review |
| **weekly-listing-discovery** | Mondays at 9:00 AM | Searches for new companies/tools to add to the directory, creates draft listings for your approval |
| **source-health-check** | Sundays at 6:00 AM | Verifies all content sources are still active, flags dead links, suggests new sources |

## How to Set Up in Cowork

To create each shortcut in Cowork:

1. Open a new Cowork session
2. Type `/create-shortcut` or ask Claude to "create a scheduled shortcut"
3. Copy the prompt from the corresponding `.md` file in this folder
4. Set the cron schedule as noted in each file
5. Name it using the kebab-case name (e.g., `daily-news-digest`)

## Where Are Your Key Files?

| File | Purpose |
|------|---------|
| `sources.json` | Editable list of content sources (your 4 personal picks + suggested sources) |
| `listings.json` | Full directory listings (in the repo at `data/listings.json`) |
| `categories.json` | Category taxonomy (in the repo at `data/categories.json`) |

## Human-in-the-Loop Touchpoints

Every automation produces DRAFTS, never publishes directly. You always have final say:

- **News digest** → Review, edit voice/tone, select featured stories, approve for publish
- **Listing discovery** → Verify company info, categorize, approve to add to directory
- **Source health** → Review flagged issues, update source list, add suggested sources

## Editing Your Source List

Open `sources.json` in any text editor. Each source looks like:

```json
{
  "id": "source-slug",
  "name": "Source Name",
  "url": "https://...",
  "type": "podcast|newsletter|news-publication|social",
  "category": "ai-news|datacenter|policy",
  "frequency": "daily|weekly|monthly",
  "priority": "high|medium",
  "notes": "Why this source matters",
  "active": true
}
```

Set `active: false` to temporarily disable a source without removing it.
