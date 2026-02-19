# BreezBlox Directory Plugin

Automated content and listing workflows for the BreezBlox AI + Data Center Directory at breezblox.com.

## Commands

| Command | Schedule | Description |
|---------|----------|-------------|
| `/daily-news-digest` | Daily 7:00 AM | Scans configured sources, generates a formatted news digest for review |
| `/listing-discovery` | Mondays 9:00 AM | Discovers new AI + DC companies to add to the directory |
| `/source-health-check` | Sundays 6:00 AM | Verifies all sources are live, flags issues, suggests new sources |

## Installation

Copy the `breezblox-directory` folder into:
```
%AppData%\Claude\plugins\local-desktop-app-uploads\
```
Then restart Cowork. The commands will appear under `/` in any session.

## Key Files

The commands read from and write to your selected workspace folder:
- `sources.json` — editable content source list
- `listings.json` — main directory listings
- `categories.json` — taxonomy definition
- `news-digest-YYYY-MM-DD.html` — daily digest output (draft, needs approval)
- `draft-listings-YYYY-MM-DD.json` — discovered companies (draft, needs approval)
- `source-health-YYYY-MM-DD.md` — weekly source health report
