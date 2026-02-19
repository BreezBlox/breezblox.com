---
description: Discover new AI and data center companies to add to the BreezBlox Directory
allowed-tools: WebSearch, WebFetch, Read, Write
cron: "0 9 * * 1"
---

Search for new companies and tools to add to the BreezBlox AI + Data Center Directory.

## Step 1 — Load existing listings

Read `listings.json` from the user's workspace folder. Note all existing company names and website URLs to avoid duplicates.

## Step 2 — Load category taxonomy

Read `categories.json` from the user's workspace folder. Valid category IDs are:
`ai-models`, `ai-dev-tools`, `ai-infra-software`, `ai-platforms`, `containment`, `cooling`, `power`, `cabling`, `construction`, `dcim`, `gpu-cloud`, `colocation`, `ai-policy`, `energy`

## Step 3 — Search for new AI companies

Run these searches and collect company candidates:
- `"new AI tool" OR "AI startup" launched 2026`
- `new AI developer tools this week`
- `AI infrastructure startup funding 2026`
- `new LLM fine-tuning platform 2026`
- `new vector database AI 2026`

## Step 4 — Search for new data center companies

Run these searches:
- `new data center company 2026`
- `data center cooling innovation startup 2026`
- `new DCIM software platform 2026`
- `data center containment solutions new company`
- `GPU cloud provider new launch 2026`

## Step 5 — Build draft listings

For each new company not already in listings.json, create a listing object:

```json
{
  "id": "company-slug",
  "name": "Official Company Name",
  "description": "Under 150 chars — what they do",
  "longDescription": "2–3 sentences about what they offer and why relevant to the AI + DC audience.",
  "category": "matching-category-id",
  "tags": ["startup", "enterprise", "open-source", "us-based", "global"],
  "website": "https://...",
  "featured": false,
  "dateAdded": "YYYY-MM-DD",
  "status": "draft"
}
```

Status must be `"draft"` — never `"published"`. Human approval required.

## Step 6 — Save draft file

Save all new listings as `draft-listings-YYYY-MM-DD.json` in the workspace folder. Do NOT modify `listings.json` directly.

## Step 7 — Report to user

Summarize what was found: company name, category, one-line description, and website for each. Ask Rob to review and confirm which ones should be moved from draft to the main `listings.json`.
