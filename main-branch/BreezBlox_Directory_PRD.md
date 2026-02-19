  
**BREEZBLOX DIRECTORY**

Product Requirements Document

AI \+ Data Center Infrastructure Directory & Content Hub

Version 1.0

February 18, 2026

Prepared for: Rob @ BreezBlox

**CONFIDENTIAL**

# **Table of Contents**

# **1\. Executive Summary**

BreezBlox Directory is a new hybrid directory and content hub to be added as a dedicated section of breezblox.com. It will serve two converging audiences: AI developers and practitioners who are building and deploying AI systems, and data center industry professionals who plan, build, and operate the physical infrastructure those systems depend on.

The directory will list companies, tools, services, and resources across both domains, while the content hub will aggregate curated articles, trending news, and original editorial content. Automated Cowork agents will handle routine content sourcing and formatting, while a human-in-the-loop workflow ensures editorial quality and brand alignment.

This document defines the product vision, audience, feature requirements, information architecture, automation workflows, content strategy, and phased roadmap for delivering the BreezBlox Directory.

# **2\. Product Vision & Positioning**

## **2.1 Vision Statement**

Become the go-to crossover resource where AI builders and data center professionals find the companies, tools, and news that sit at the intersection of artificial intelligence and physical infrastructure.

## **2.2 Unique Value Proposition**

Most AI directories ignore infrastructure. Most data center directories ignore AI workloads. BreezBlox bridges the gap because Rob operates in both worlds — running two data center startups (third-party containment installation and containment manufacturing) while being a daily AI power user. That lived experience creates editorial credibility that pure aggregators cannot replicate.

## **2.3 Strategic Positioning**

* Crossover niche: The only directory purpose-built for the AI-infrastructure intersection  
* Practitioner-led curation: Every listing and article passes through someone who actually works in both industries  
* Content flywheel: Directory listings drive SEO traffic, content drives engagement, engagement attracts listing submissions  
* Automation-augmented: AI agents handle sourcing and drafting; human judgment handles publishing

# **3\. Target Audience**

| Persona | Description | What They Need |
| :---- | :---- | :---- |
| AI Builder / Dev | Engineers, product managers, and founders building AI applications, fine-tuning models, or deploying inference pipelines | Tool discovery, infrastructure options, GPU cloud comparisons, deployment guides, policy updates affecting AI |
| DC Operator / Buyer | Data center owners, facility managers, contractors, and procurement leads who build, upgrade, or maintain facilities | Vendor discovery (containment, cooling, power), build-out news, regulatory changes, project case studies |
| AI-Infra Executive | C-suite and VPs at cloud providers, colo operators, and AI companies making capital allocation decisions | Market intelligence, competitor tracking, policy/regulatory news, industry trend analysis |
| Tech Entrepreneur | Startup founders and indie builders exploring opportunities at the AI-infrastructure intersection | Startup ideas, market gaps, service providers, networking, funding news |

# **4\. Directory Categories & Taxonomy**

The directory is organized into primary categories, each with subcategories. Every listing gets tagged across multiple dimensions for cross-category discovery.

## **4.1 AI Development & Tools**

* AI Model Providers — Foundation model companies, open-source model hubs, fine-tuning platforms  
* AI Developer Tools — IDEs, coding assistants, testing/eval frameworks, prompt engineering tools  
* AI Infrastructure Software — Orchestration, serving, monitoring, MLOps, vector databases  
* AI Application Platforms — No-code/low-code AI builders, chatbot platforms, AI agent frameworks  
* AI Research & Education — Courses, research labs, open datasets, benchmark leaderboards

## **4.2 Data Center & Physical Infrastructure**

* Containment Solutions — Hot/cold aisle containment, custom enclosures, modular containment systems  
* Cooling & Thermal Management — Liquid cooling, immersion cooling, CRAC/CRAH, heat exchangers  
* Power & Electrical — UPS systems, PDUs, generators, busway, energy storage  
* Structured Cabling & Connectivity — Fiber, copper, cable management, cross-connects  
* Construction & Facility Services — General contractors, design-build firms, commissioning agents  
* Monitoring & DCIM — Environmental monitoring, DCIM platforms, BMS integration

## **4.3 Cloud & Compute Services**

* GPU Cloud Providers — On-demand GPU instances, reserved capacity, spot pricing  
* Colocation Providers — Retail colo, wholesale, edge, AI-ready facilities  
* Hyperscale & Wholesale — Major cloud providers, wholesale capacity, sovereign cloud

## **4.4 Policy, Regulation & Industry News**

* AI Policy & Governance — Government regulation, executive orders, AI safety frameworks  
* Energy & Sustainability — Renewable energy for DC, carbon reporting, PUE optimization  
* Industry Associations & Events — Trade groups, conferences, certification programs

## **4.5 Cross-Cutting Tags**

Every listing also gets tagged with cross-cutting attributes: company size (startup / mid-market / enterprise), geography (US regions, international), pricing model (free / freemium / paid / enterprise), and content type (tool / service / resource / news source).

# **5\. Information Architecture & Sitemap**

## **5.1 Site Map**

The directory lives as a top-level section within breezblox.com. The following shows the page hierarchy:

| Level 1 (Nav) | Level 2 (Section) | Level 3 (Detail) |
| :---- | :---- | :---- |
| **/directory** | Landing / hero \+ featured | — |
|  | /directory/browse | Filterable grid of all listings |
|  | /directory/listing/\[slug\] | Individual listing detail page |
|  | /directory/category/\[slug\] | Category landing with filtered listings |
|  | /directory/news | Aggregated news feed (auto \+ curated) |
|  | /directory/articles | Original \+ guest articles hub |
|  | /directory/submit | Listing submission form |

## **5.2 Listing Data Model**

Each directory listing contains the following fields:

| Field | Type | Description |
| :---- | :---- | :---- |
| name | string | Company or tool name |
| slug | string | URL-friendly identifier (auto-generated) |
| logo\_url | string | Company logo image URL |
| description | text | Short description (150 chars) \+ long description |
| category | enum | Primary category from taxonomy |
| subcategory | enum | Subcategory within primary |
| tags | array | Cross-cutting tags (size, geo, pricing, type) |
| website\_url | string | External website link |
| featured | boolean | Whether listing appears in featured section |
| date\_added | date | Timestamp for recency sorting |
| status | enum | draft / pending\_review / published / archived |

# **6\. Feature Requirements**

## **6.1 MVP (Phase 1\)**

| Priority | Feature | Automation | Human-in-Loop |
| :---- | :---- | :---- | :---- |
| **P0** | Directory landing page with featured listings and category navigation | No | Yes — curate |
| **P0** | Browse page with search, filter by category/tag, and sort | No | No |
| **P0** | Individual listing detail pages with description, links, and tags | No | Yes — review |
| **P1** | News feed page aggregating AI \+ DC trending news | Yes — sourcing | Yes — approve |
| **P1** | Articles hub for original and guest blog posts | Partial — draft | Yes — edit/publish |
| **P1** | Listing submission form (public intake for new directory entries) | No | Yes — approve |
| **P2** | JSON data layer for listings (replacing hardcoded HTML) | No | No |

## **6.2 Phase 2 Enhancements**

* Ratings and reviews on listings (community-driven trust signals)  
* Comparison tool to compare two or more listings side-by-side  
* Newsletter integration for weekly digest of new listings and top articles  
* Sponsored/featured listing tier for monetization  
* API endpoint for programmatic access to directory data  
* RSS feed generation for each category

# **7\. Content Strategy & Sources**

## **7.1 Content Pillars**

All content maps to one of four pillars that reinforce the directory’s positioning:

1. AI Tools & Development — New tools, framework releases, model benchmarks, developer tutorials  
2. Data Center Build & Operations — Construction projects, cooling innovations, containment solutions, facility design  
3. Industry Crossover — Where AI demand meets infrastructure supply: GPU shortages, power constraints, edge compute, sovereign AI  
4. Policy & Market Intelligence — Government regulation, energy policy, investment trends, M\&A activity

## **7.2 Content Source List (Editable)**

The following table is your master source list. Add, remove, or re-prioritize sources at any time. Cowork agents will pull from these sources on their scheduled runs.

### **AI News & Analysis**

| Source | Type | Frequency | Priority |
| :---- | :---- | :---- | :---- |
| @testingcatalog (X/Twitter) | Social / curation | Daily | HIGH — Rob’s pick |
| AI Daily Brief Podcast | Podcast / newsletter | Daily | HIGH — Rob’s pick |
| Everyday AI Podcast \+ Site | Podcast / blog | Daily | HIGH — Rob’s pick |
| The Artificial Intelligence Show (MarketingAI Institute) | Podcast | Weekly | HIGH — Rob’s pick |
| The Verge — AI Section | News publication | Daily | MEDIUM |
| Ars Technica — AI | News publication | Daily | MEDIUM |
| Import AI Newsletter (Jack Clark) | Newsletter | Weekly | MEDIUM |
| TLDR AI Newsletter | Newsletter | Daily | MEDIUM |
| Ben’s Bites | Newsletter | Daily | MEDIUM |

### **Data Center & Infrastructure**

| Source | Type | Frequency | Priority |
| :---- | :---- | :---- | :---- |
| Data Center Dynamics | Industry publication | Daily | HIGH |
| Data Center Knowledge | Industry publication | Daily | HIGH |
| Uptime Institute | Research / blog | Weekly | HIGH |
| STR (Structure Research) | Market research | Monthly | MEDIUM |
| AFCOM / Data Center World | Association / events | Periodic | MEDIUM |
| Mission Critical Magazine | Trade publication | Monthly | MEDIUM |

### **Policy & Regulation**

| Source | Type | Frequency | Priority |
| :---- | :---- | :---- | :---- |
| AI Policy Newsletter (CSET Georgetown) | Newsletter | Weekly | HIGH |
| The White House — AI/Tech briefings | Gov’t press | As published | MEDIUM |
| Utility Dive — Energy/Power | Industry news | Daily | MEDIUM |

# **8\. Automation Workflows (Cowork Agents)**

This section defines which tasks are automated by scheduled Cowork agents, which require human approval, and where the handoff points are.

## **8.1 Workflow Overview**

| Workflow | Automated Steps | Human Steps | Schedule |
| :---- | :---- | :---- | :---- |
| **Trending News Digest** | Scan sources, extract headlines, summarize, draft digest, save to review queue | Review digest, edit/rewrite, approve for publish, select featured items | Daily at 7:00 AM |
| **Article Drafting** | Research topic, pull data, generate draft article, format in site style | Review draft, fact-check, edit voice/tone, approve publish date | On-demand \+ weekly batch |
| **Listing Discovery** | Monitor sources for new AI tools/DC vendors, extract company info, pre-fill listing template | Verify accuracy, add editorial notes, categorize, approve listing | Weekly on Mondays |
| **Submission Review** | Parse form data, check for duplicates, pre-categorize, flag spam | Final review, verify legitimacy, edit description, approve or reject | As submissions arrive |
| **Source Health Check** | Check all sources for availability, flag dead links, report new content volume | Review flagged issues, update source list, add new sources | Weekly on Sundays |

## **8.2 Detailed Workflow: Trending News Digest**

This is the primary daily automation and the most complex workflow. Here is the step-by-step process:

**AUTOMATED STEPS (Cowork Agent)**

1. Agent wakes up on schedule (daily at 7:00 AM local time)  
2. Reads the source list from the editable JSON/YAML config file  
3. For each HIGH priority source: fetch latest content (RSS, web scrape, API)  
4. For each MEDIUM priority source: fetch content if not already covered by HIGH sources  
5. Deduplicate stories across sources (fuzzy matching on headlines and URLs)  
6. Rank stories by relevance to directory categories and recency  
7. Generate a 2-3 sentence summary for each top story (no more than 8-10 stories per digest)  
8. Format digest as a draft HTML page matching site template  
9. Save draft to /directory/news/drafts/ with today’s date  
10. Send notification to Rob (email or preferred channel) with draft link

**HUMAN-IN-THE-LOOP STEPS (Rob)**

1. Open draft digest and review each story summary  
2. Edit, rewrite, or remove stories that don’t meet editorial bar  
3. Add personal commentary or context where relevant (this is the editorial value-add)  
4. Select 1-2 stories for “Featured” placement on directory landing page  
5. Approve for publishing — triggers deployment to live /directory/news page

## **8.3 Cowork Agent Configuration**

Each automated workflow will be implemented as a Cowork shortcut with a scheduled trigger. The agents will use the following tools and data:

* Web Search \+ WebFetch — for pulling content from configured sources  
* Read/Write tools — for managing draft files, source config, and listing data  
* Google Drive (if connected) — for storing review queue documents  
* Bash — for data processing, deduplication, and template rendering

The source list configuration will be stored as an editable JSON file in the workspace folder. Rob can add or remove sources at any time without modifying agent code.

# **9\. Human-in-the-Loop Decision Map**

The following table maps every significant decision point to whether it requires human judgment or can be fully automated. This is the definitive reference for what Rob needs to touch versus what runs hands-off.

| Decision Point | Auto? | Human? | Rationale |
| :---- | :---- | :---- | :---- |
| Source content fetching | ✅ Yes | ❌ No | Deterministic — just fetching data |
| Story deduplication | ✅ Yes | ❌ No | Fuzzy matching is good enough; human fixes edge cases in review |
| Story summarization | ✅ Yes | ❌ No | AI summaries serve as drafts; human edits for voice |
| Publishing news digest | ❌ No | ✅ Yes | Editorial quality and brand voice require human sign-off |
| Selecting featured content | ❌ No | ✅ Yes | Strategic decision — what represents BreezBlox brand |
| Article first draft | ✅ Yes | ❌ No | AI drafts based on outline/topic; saves 60-70% of writing time |
| Article editing \+ publishing | ❌ No | ✅ Yes | Voice, accuracy, and editorial positioning are human calls |
| New listing discovery | ✅ Yes | ❌ No | Monitoring and pre-filling is mechanical |
| Approving new listings | ❌ No | ✅ Yes | Quality gate — only real, relevant companies get listed |
| Categorization of listings | ✅ Yes | ⚠️ Review | AI suggests category; human confirms or overrides |
| Spam/fraud detection on submissions | ✅ Yes | ⚠️ Escalation | Auto-flag obvious spam; escalate edge cases to Rob |
| Source list management | ❌ No | ✅ Yes | Strategic decision about which voices shape the directory |
| Site design and layout changes | ❌ No | ✅ Yes | Brand and UX decisions always require Rob |

# **10\. Technical Architecture**

## **10.1 Current Stack Assessment**

The current breezblox.com is a static HTML/CSS/JS site deployed on Netlify. There is no build step, no framework, and no CMS. The cyberpunk aesthetic is implemented with custom CSS (Orbitron \+ Share Tech Mono fonts, neon yellow/teal/purple color palette, glitch animations).

## **10.2 Recommended Architecture for Directory**

Given the static nature of the current site and the need for dynamic filtering and search, we recommend a progressive enhancement approach:

**Option A: Enhanced Static (Recommended for MVP) —** Keep the static HTML approach but introduce a JSON data layer. Directory listings are stored in a listings.json file. A lightweight JavaScript module reads this file at page load and renders the directory with client-side filtering and search. This preserves the existing deployment pipeline, requires no build tools, and matches the current site architecture.

**Option B: Static Site Generator (Phase 2 consideration) —** Migrate to Astro or 11ty (Eleventy) to get build-time page generation from JSON/Markdown content. This gives better SEO (pre-rendered listing pages), faster page loads, and a natural content authoring workflow. Netlify deployment stays the same.

**Option C: Full Framework (Phase 3 if needed) —** Move to Next.js or Astro with server-side rendering if the directory grows beyond \~500 listings and needs server-side search, pagination, or user accounts. This is overkill for MVP but worth noting as a future path.

## **10.3 Data Architecture (MVP)**

* listings.json — Array of listing objects matching the data model in Section 5.2  
* categories.json — Taxonomy definition with category/subcategory hierarchy  
* sources.json — Editable source list for Cowork agents (name, URL, type, frequency, priority)  
* news/drafts/\*.html — Auto-generated digest drafts awaiting review  
* news/published/\*.html — Approved and published digest pages  
* articles/\*.html — Blog articles (original \+ guest)

## **10.4 Design System Integration**

The directory pages will use the existing BreezBlox design system: dark backgrounds (var(--dark-blue): \#0A0E17), neon accent colors (yellow \#FFD800, teal \#0DF2C9, purple \#9D4EDD, accent red \#FF2E63), Orbitron headings, Share Tech Mono body text, glitch effects on hover states, and corner decoration elements. The directory will feel native to the site, not bolted on.

# **11\. Success Metrics**

| Metric | 30-Day Target | 90-Day Target | Measurement |
| :---- | :---- | :---- | :---- |
| Directory listings | 50 listings | 150 listings | Count in listings.json |
| Monthly page views (directory) | 500 | 2,500 | Netlify Analytics |
| News digests published | 20 (weekdays) | 60 | Published file count |
| Original articles | 4 | 12 | Article count |
| Listing submissions received | 5 | 25 | Form submissions |
| Rob’s review time per day | \< 30 min | \< 20 min | Self-tracked |

# **12\. Phased Roadmap**

## **Phase 1: Foundation (Weeks 1-3)**

* Set up /directory branch with page templates matching BreezBlox design system  
* Create JSON data layer (listings.json, categories.json, sources.json)  
* Build directory landing page with category navigation  
* Build browse/search page with client-side filtering  
* Build individual listing detail page template  
* Seed directory with initial 30-50 listings across all categories  
* Deploy to Netlify on /directory path

## **Phase 2: Content Engine (Weeks 3-5)**

* Build and configure Trending News Digest Cowork agent (daily schedule)  
* Build news feed page to display published digests  
* Set up articles hub and publish 2-3 initial articles  
* Build listing submission form with spam detection  
* Configure Source Health Check agent (weekly schedule)  
* Set up Listing Discovery agent (weekly schedule)

## **Phase 3: Growth & Polish (Weeks 5-8)**

* Add Article Drafting agent for assisted content creation  
* Implement RSS feeds for each category  
* Add newsletter signup and weekly digest email  
* Optimize SEO (meta tags, structured data, sitemap.xml)  
* Collect feedback and iterate on taxonomy/categories  
* Evaluate migration to Astro/11ty for Phase 2 architecture

# **13\. Appendix: Cowork Shortcut Specifications**

The following are implementation specifications for each scheduled Cowork agent. These will be created as Cowork shortcuts that can be triggered manually or on a schedule.

## **13.1 Shortcut: daily-news-digest**

* Trigger: Scheduled daily at 7:00 AM  
* Input: sources.json (reads HIGH \+ MEDIUM priority sources)  
* Process: Fetch → Deduplicate → Rank → Summarize → Format  
* Output: Draft HTML file in /directory/news/drafts/YYYY-MM-DD.html  
* Notification: Email Rob with link to review draft  
* Human action required: Review, edit, approve for publish

## **13.2 Shortcut: weekly-listing-discovery**

* Trigger: Scheduled weekly on Mondays at 9:00 AM  
* Input: sources.json \+ existing listings.json (to check for duplicates)  
* Process: Search → Extract company data → Pre-fill listing template → Save as draft  
* Output: Array of draft listing objects in /directory/drafts/listings/  
* Human action required: Review each draft, verify accuracy, approve to add to listings.json

## **13.3 Shortcut: source-health-check**

* Trigger: Scheduled weekly on Sundays at 6:00 AM  
* Input: sources.json  
* Process: Check each URL → Report status → Flag issues → Note content volume  
* Output: Health report saved to /directory/reports/source-health-YYYY-MM-DD.md  
* Human action required: Review flagged issues, update source list if needed

*End of document.*