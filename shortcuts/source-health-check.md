# Source Health Check

**Schedule:** Every Sunday at 6:00 AM (cron: `0 6 * * 0`)

## Prompt

Run a health check on all content sources configured for the BreezBlox Directory to ensure they're still active and producing relevant content.

**Step 1: Read the source list.**
Read `sources.json` from the user's selected folder. This contains all configured content sources for the directory's news aggregation.

**Step 2: Check each source.**
For each source in the list, use WebSearch or WebFetch to verify:
- The URL is still accessible (not returning 404 or redirect to a dead page)
- The source has published new content in the last 7 days
- The content is still relevant to AI and/or data center topics

**Step 3: Flag issues.**
Create a health report with three sections:
- HEALTHY: Sources that are active and producing relevant content (include last content date if found)
- WARNING: Sources that are accessible but haven't published in 7+ days, or whose content focus may have shifted
- ERROR: Sources that are unreachable, returning errors, or appear to have shut down

**Step 4: Suggest new sources.**
Search for 2-3 potential new sources that could be added to the list. Focus on:
- New AI newsletters or podcasts that have launched recently
- Data center industry publications not already in the list
- Policy/regulation sources covering AI or energy topics
For each suggestion, provide: name, URL, type, category, and why it would be valuable.

**Step 5: Save the report.**
Save the health report as `source-health-YYYY-MM-DD.md` in the user's selected folder with clear formatting.

**Step 6: Notify the user.**
Summarize: how many sources are healthy, how many have warnings, how many have errors. If there are any ERROR sources, highlight them prominently. Present the new source suggestions and ask if the user wants to add any to sources.json.

**Success criteria:** A markdown health report covering all configured sources with status indicators, plus 2-3 new source suggestions.
