# Daily News Digest

**Schedule:** Daily at 7:00 AM (cron: `0 7 * * *`)

## Prompt

Compile a daily AI + Data Center news digest for the BreezBlox Directory.

**Step 1: Read the source list.**
Read the file at `sources.json` in the user's selected folder (or search for it). This JSON file contains an array of content sources with properties: name, url, type, category, frequency, priority, and active status. Only process sources where `active` is `true`.

**Step 2: Fetch trending content from HIGH priority sources first.**
Use WebSearch to search for the latest news from each HIGH priority source. Focus on:
- AI news: @testingcatalog posts, AI Daily Brief, Everyday AI, The Artificial Intelligence Show (MarketingAI Institute)
- Data Center news: Data Center Dynamics, Data Center Knowledge, Uptime Institute
- Policy: AI Policy Newsletter (CSET Georgetown)

Search queries should target content from the last 24 hours. For each source, search for "[source name] latest news today" or similar.

**Step 3: Fetch MEDIUM priority sources if needed.**
If fewer than 8 stories were found from HIGH sources, also search MEDIUM priority sources (The Verge AI, Ars Technica AI, TLDR AI, Ben's Bites, STR, Mission Critical Magazine, Utility Dive).

**Step 4: Deduplicate and rank.**
Remove duplicate stories (same event covered by multiple sources). Keep the version from the highest-priority source. Rank by: relevance to AI + data center crossover topics first, then pure AI news, then pure DC news, then policy.

**Step 5: Generate the digest.**
Create an HTML file with 6-10 top stories. For each story include:
- Source name and date
- Headline (uppercase, Orbitron font style)
- 2-3 sentence summary in your own words (do NOT copy article text verbatim)
- Why it matters for the BreezBlox audience (AI builders + DC professionals)

**Step 6: Save the output.**
Save the digest as `news-digest-YYYY-MM-DD.html` in the user's selected folder. Also save a `digest-YYYY-MM-DD.json` with structured data (headline, source, url, summary, category) for potential future automation.

**Step 7: Notify.**
Tell the user the digest is ready for review. Mention how many stories were found, which sources had the most relevant content, and flag 1-2 stories you'd recommend as "Featured" for the directory landing page.

**Success criteria:** A formatted digest file with 6-10 deduplicated, summarized news items covering AI and data center topics from the configured sources.
