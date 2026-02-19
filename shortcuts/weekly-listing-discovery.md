# Weekly Listing Discovery

**Schedule:** Every Monday at 9:00 AM (cron: `0 9 * * 1`)

## Prompt

Discover new companies and tools to add to the BreezBlox AI + Data Center Directory.

**Step 1: Read existing listings.**
Read `listings.json` from the user's selected folder. This contains the current directory listings. Note all existing company names and websites to avoid duplicates.

**Step 2: Read the category taxonomy.**
Read `categories.json` from the user's selected folder. The directory has 14 categories across 4 parent groups: AI Development & Tools, Data Center & Infrastructure, Cloud & Compute, and Policy & Regulation.

**Step 3: Search for new AI tools and companies.**
Use WebSearch to find recently launched or notable AI tools and companies that aren't already in the directory. Search for:
- "new AI tools launched this week 2026"
- "AI startup funding this week"
- "new AI developer tools"
- "new AI infrastructure companies"
- "new MLOps tools"
Target: Find 3-5 new AI-related companies.

**Step 4: Search for new data center companies and services.**
Use WebSearch to find new or notable data center companies. Search for:
- "new data center companies 2026"
- "data center startup funding"
- "new data center cooling technology"
- "data center containment solutions companies"
- "new DCIM software"
Target: Find 3-5 new DC-related companies.

**Step 5: Pre-fill listing templates.**
For each discovered company, create a listing object with:
- id: URL-friendly slug of company name
- name: Official company name
- description: Under 150 characters
- longDescription: 2-3 sentences about what they do and why they're relevant
- category: Best matching category ID from categories.json
- tags: Relevant tags (e.g., "startup", "enterprise", "open-source", "us-based")
- website: Official website URL
- featured: false (human decides this)
- dateAdded: Today's date (YYYY-MM-DD)
- status: "draft" (requires human approval before publishing)

**Step 6: Save draft listings.**
Save the new draft listings as `draft-listings-YYYY-MM-DD.json` in the user's selected folder. Do NOT modify the main listings.json — that requires human approval.

**Step 7: Report findings.**
Tell the user how many new companies were discovered, which categories they fall into, and provide a brief summary of each. Ask the user to review and approve which ones should be added to the main directory.

**Success criteria:** A JSON file containing 5-10 pre-filled draft listing objects for new companies not already in the directory, ready for human review.
