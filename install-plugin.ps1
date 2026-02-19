# BreezBlox Directory Plugin Installer v3
# Right-click -> "Run with PowerShell"

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== BreezBlox Directory Plugin Installer ===" -ForegroundColor Cyan
Write-Host ""

# --- Target paths ---
$pluginRoot  = "$env:LOCALAPPDATA\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\local-agent-mode-sessions\db7135fd-870e-4c67-ad24-a573e8d7710f\277beabb-28e3-4a5a-a3bc-2506e3a46a52\cowork_plugins\marketplaces\local-desktop-app-uploads"
$destPlugin  = Join-Path $pluginRoot "breezblox-directory"
$claudeDir   = Join-Path $pluginRoot ".claude-plugin"
$marketJson  = Join-Path $claudeDir "marketplace.json"

# --- Check Cowork plugin directory exists ---
if (-not (Test-Path $pluginRoot)) {
    Write-Host "ERROR: Cowork plugin directory not found. Is the Claude desktop app installed?" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# --- Step 1: Remove any broken prior install ---
Write-Host "Step 1: Clearing any previous install attempt..." -ForegroundColor Yellow
if (Test-Path $destPlugin) {
    Remove-Item -Recurse -Force $destPlugin
    Write-Host "  Removed old breezblox-directory" -ForegroundColor Gray
}

# --- Step 2: Create full folder structure ---
Write-Host ""
Write-Host "Step 2: Building plugin folder structure..." -ForegroundColor Yellow

$foldersToCreate = @(
    $destPlugin,
    (Join-Path $destPlugin ".claude-plugin"),
    (Join-Path $destPlugin "commands")
)

foreach ($folder in $foldersToCreate) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}
Write-Host "  Created directory structure" -ForegroundColor Green

# --- Step 3: Write plugin.json ---
Write-Host ""
Write-Host "Step 3: Writing plugin files..." -ForegroundColor Yellow

$pluginJson = Join-Path $destPlugin ".claude-plugin\plugin.json"
@'
{
  "name": "breezblox-directory",
  "version": "1.0.0",
  "description": "Automated content and listing workflows for the BreezBlox AI + Data Center Directory",
  "author": {
    "name": "BreezBlox"
  },
  "category": "Productivity",
  "keywords": ["directory", "ai", "datacenter", "news", "listings", "automation"]
}
'@ | Set-Content $pluginJson -Encoding UTF8
Write-Host "  Written: .claude-plugin/plugin.json" -ForegroundColor Green

# --- Step 4: Write daily-news-digest.md ---
$dailyNews = Join-Path $destPlugin "commands\daily-news-digest.md"
@'
---
description: Compile daily AI + Data Center trending news digest for BreezBlox Directory review
allowed-tools: WebSearch, WebFetch, Read, Write, Bash
cron: "0 7 * * *"
---

Compile a daily news digest for the BreezBlox AI + Data Center Directory.

## Step 1 - Load source list

Read the file `sources.json` from the user's selected workspace folder. Only process sources where `active` is `true`.

## Step 2 - Fetch HIGH priority sources

Use WebSearch to find the latest news (last 24 hours) from each HIGH priority source:
- @testingcatalog - search `site:x.com testingcatalog AI tools`
- AI Daily Brief - search `AI Daily Brief podcast latest episode`
- Everyday AI - search `Everyday AI podcast latest`
- The Artificial Intelligence Show - search `Marketing AI Institute podcast latest`
- Data Center Dynamics - search `site:datacenterdynamics.com news today`
- Data Center Knowledge - search `site:datacenterknowledge.com latest news`

## Step 3 - Fetch MEDIUM priority sources if needed

If fewer than 8 unique stories found, also search: The Verge AI, Ars Technica AI, TLDR AI, Ben's Bites, Utility Dive energy.

## Step 4 - Deduplicate and rank

Remove duplicate stories. Rank by relevance: AI-infrastructure crossover first, then pure AI, then pure DC, then policy.

## Step 5 - Write the digest HTML

Create a digest HTML file matching the BreezBlox cyberpunk design:
- Background `#0A0E17`, Orbitron font headlines, Share Tech Mono body
- Colors: neon yellow `#FFD800`, teal `#0DF2C9`, red `#FF2E63`
- 6-10 stories each with: source, date, headline, 2-3 sentence summary (own words), "Why it matters"

Save as `news-digest-YYYY-MM-DD.html` in the workspace folder.
Also save `digest-YYYY-MM-DD.json` with: `[{headline, source, url, summary, category, featured: false}]`

## Step 6 - Report to user

Tell the user how many stories were found, from which sources, and recommend 1-2 to mark `featured: true`.
Ask for review and approval before publishing.

**Human-in-the-loop required before publishing.**
'@ | Set-Content $dailyNews -Encoding UTF8
Write-Host "  Written: commands/daily-news-digest.md" -ForegroundColor Green

# --- Step 5: Write listing-discovery.md ---
$listingDisc = Join-Path $destPlugin "commands\listing-discovery.md"
@'
---
description: Discover new AI and data center companies to add to the BreezBlox Directory
allowed-tools: WebSearch, WebFetch, Read, Write
cron: "0 9 * * 1"
---

Search for new companies and tools to add to the BreezBlox AI + Data Center Directory.

## Step 1 - Load existing listings

Read `listings.json` from the workspace folder. Note all existing company names and URLs to avoid duplicates.

## Step 2 - Load category taxonomy

Read `categories.json` from the workspace folder. Valid category IDs: `ai-models`, `ai-dev-tools`, `ai-infra-software`, `ai-platforms`, `containment`, `cooling`, `power`, `cabling`, `construction`, `dcim`, `gpu-cloud`, `colocation`, `ai-policy`, `energy`

## Step 3 - Search for new AI companies

- `new AI tool OR AI startup launched 2026`
- `new AI developer tools this week`
- `AI infrastructure startup funding 2026`
- `new LLM fine-tuning platform 2026`
- `new vector database AI 2026`

## Step 4 - Search for new data center companies

- `new data center company 2026`
- `data center cooling innovation startup 2026`
- `new DCIM software platform 2026`
- `GPU cloud provider new launch 2026`

## Step 5 - Build draft listings

For each new company, create a listing object with status `"draft"` - never `"published"`.
Save all as `draft-listings-YYYY-MM-DD.json`. Do NOT modify `listings.json` directly.

## Step 6 - Report to user

Summarize each find: name, category, one-line description, website. Ask Rob to approve which ones move to `listings.json`.
'@ | Set-Content $listingDisc -Encoding UTF8
Write-Host "  Written: commands/listing-discovery.md" -ForegroundColor Green

# --- Step 6: Write source-health-check.md ---
$healthCheck = Join-Path $destPlugin "commands\source-health-check.md"
@'
---
description: Weekly health check on all BreezBlox Directory content sources
allowed-tools: WebSearch, WebFetch, Read, Write
cron: "0 6 * * 0"
---

Run a weekly health check on the BreezBlox Directory content source list.

## Step 1 - Load source list

Read `sources.json` from the workspace folder. Process all entries regardless of `active` status.

## Step 2 - Check each source

Use WebFetch or WebSearch to verify:
- URL is accessible (not 404 or down)
- New content published in last 7 days
- Content still relevant to AI and/or data center topics

## Step 3 - Classify each source

- HEALTHY - Active, recent content, on-topic
- WARNING - Accessible but no new content in 7+ days, or topic drift
- ERROR - URL unreachable or publication appears stopped

## Step 4 - Suggest 2-3 new sources

Search for new AI newsletters, data center publications, and AI podcasts launched in 2026.
For each: name, URL, type, category, one-sentence case for adding it.

## Step 5 - Save report

Save `source-health-YYYY-MM-DD.md` in the workspace folder with sections: Summary, Healthy, Warning, Error, Suggested New Sources.

## Step 6 - Report to user

Highlight any ERROR sources. Present suggestions. Ask which errors should be set to `active: false` and which suggestions should be added.
'@ | Set-Content $healthCheck -Encoding UTF8
Write-Host "  Written: commands/source-health-check.md" -ForegroundColor Green

# --- Step 7: Update marketplace.json ---
Write-Host ""
Write-Host "Step 4: Registering in marketplace.json..." -ForegroundColor Yellow

if (-not (Test-Path $claudeDir)) {
    New-Item -ItemType Directory -Force -Path $claudeDir | Out-Null
}

$newEntry = [PSCustomObject]@{
    name    = "breezblox-directory"
    version = "1.0.0"
    source  = "./breezblox-directory"
}

if (Test-Path $marketJson) {
    $raw    = Get-Content $marketJson -Raw
    $market = $raw | ConvertFrom-Json
    $exists = $market.plugins | Where-Object { $_.name -eq "breezblox-directory" }
    if (-not $exists) {
        $market.plugins += $newEntry
    }
    $market | ConvertTo-Json -Depth 10 | Set-Content $marketJson -Encoding UTF8
    Write-Host "  Updated existing marketplace.json" -ForegroundColor Green
} else {
    $market = [PSCustomObject]@{
        name        = "local-desktop-app-uploads"
        version     = "1.0.0"
        description = "Locally uploaded plugins via Claude Desktop app"
        owner       = [PSCustomObject]@{ name = "Local User" }
        plugins     = @($newEntry)
    }
    $market | ConvertTo-Json -Depth 10 | Set-Content $marketJson -Encoding UTF8
    Write-Host "  Created new marketplace.json" -ForegroundColor Green
}

# --- Done ---
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Installation complete!" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Commands available after restarting Claude:" -ForegroundColor White
Write-Host "  /daily-news-digest    - runs daily at 7:00 AM" -ForegroundColor Green
Write-Host "  /listing-discovery    - runs Mondays at 9:00 AM" -ForegroundColor Green
Write-Host "  /source-health-check  - runs Sundays at 6:00 AM" -ForegroundColor Green
Write-Host ""
Write-Host "Quit and reopen the Claude desktop app now." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close"
