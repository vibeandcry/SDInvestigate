# Modern OSINT Tools, 2025 to Oct 2026

Research date: 2026-10-23. Compiled from seven parallel research passes (AI/LLM tools; people/username/social; geolocation/imagery; infrastructure/threat intel; email/phone/breach; verification/archiving/media forensics; frameworks/dark web/crypto/records), verified against official repos, vendor sites, PyPI/crates.io release data, Bellingcat, GIJN, Indicator, OCCRP, Troy Hunt, WITNESS, NewsGuard and academic sources. Spot-checked again at compile time.

## Scoring rubric (my assessment, not an industry standard)

Safety (1-5): how much you have to trust the operator and what happens to your query data.
5 = open source, runs locally/offline or client-side, reputable maintainer, no legal gray area.
4 = reputable, but closed source or your queries go to the vendor; or minor caveats.
3 = young or single-maintainer project, or data goes to a third-party LLM/proxy, or ToS friction with target platforms, or live probes that can alert a target.
2 = anonymous operator, unclear data provenance, legal gray area, or heavy undisclosed phone-home.
1 = concrete red flags: root installers, stolen-data resale, unmaintained with malicious forks, or primarily lead-gen.

Quality (1-5): maturity, maintenance activity, community/independent validation, and how much real investigative value it adds. 5 = reference-grade and actively maintained; 1 = unproven or effectively dead.

Dates: "inferred" means a release page showed day/month but not year. "Unverified" means I found it only in a secondary source.

## Landscape changes you should know about (2025-2026)

- WHOIS is sunset for gTLDs since 28 Jan 2025; RDAP is authoritative. Legacy WHOIS scrapers are breaking.
- Nitter repo archived 26 Aug 2026 after X Corp cease-and-desist; public mirrors (xcancel etc.) are unreliable for evidence.
- Sentinel Hub EO Browser retired 20 Mar 2026; use Copernicus Browser.
- GeoSpy closed to the public Jan 2025 after 404 Media reporting; rebranded Raven (Graylark), law enforcement/enterprise only.
- Maltego acquired Hunchly 19 May 2025.
- abuse.ch APIs require a free Auth-Key since 30 Jun 2025.
- Censys moved to a credit-based Platform; legacy free search is shrinking.
- Gitleaks is in maintenance mode; Betterleaks is the successor.
- Archive.today: FBI subpoena Oct 2025, banned by English Wikipedia Feb 2026, reports of altered captures. Do not use as sole evidence. Memento Time Travel shut down Sept 2025. Conifer read-only May 2026.
- Google phased out ClaimReview fact-check snippets June 2025.
- Meta and Google stopped EU political ads late 2025; EU political ad libraries are now historical only.
- OCCRP Aleph moved to hosted Aleph Pro 15 Dec 2025. OpenSanctions metered its API (credit bundles Sept 2026).
- Sector035 Week in OSINT stopped publishing Dec 2024. Live curation is now Indicator (Craig Silverman), Bellingcat's Toolkit, GIJN, OSINT Field Notes (Benjamin Strick), The OSINT Newsletter.
- Holehe (last release Jul 2022), PhoneInfoga, SpiderFoot (no commits since Nov 2023), OnionSearch are effectively unmaintained. Successors noted below.

---

## 1. AI-assisted investigation agents and frameworks

**OpenOSINT** | https://github.com/OpenOSINT/OpenOSINT
Passive OSINT engine; an LLM agent chains 21 tools (holehe, sherlock, HIBP, RDAP/DNS, Shodan, VirusTotal, Censys, GitHub, GDELT, dorks) and writes Markdown/PDF reports. REPL, CLI, MCP server, local web UI. Platform: Python 3.10+, Linux/macOS/Windows. Price: free, MIT (hosted Monitor/Diligence paid). Date: v2.x releases May to Aug 2026; 1.8k stars. Safety 3/5 (noisy tools off by default, good; but tool output goes to whichever LLM you configure, scraped pages are a prompt-injection surface, sponsor/referral links in README). Quality 4/5. Tags: agent, mcp, aggregator, passive-recon, report-gen

**Robin** | https://github.com/apurvsinghgautam/robin
AI-powered dark web OSINT: LLM refines query, searches onion engines over Tor, scrapes, summarizes with pivots. Streamlit UI; MCP server since v3.0. Platform: Python/Docker, needs Tor; any LLM incl. Ollama. Price: free, MIT. Date: DEF CON 2025 demo labs; v3.1 Oct 2025; 7.4k stars. Safety 3/5 (hostile onion text into LLM context; use local model). Quality 4/5. Tags: dark-web, agent, tor, mcp

**Clearfront** | https://github.com/scottmartinanderson/clearfront
Local AI agent running ~30 tools from email/username/domain/IP/name, outputs report plus evidence graph. Platform: CLI/REPL/web/MCP. Price: free, MIT, BYO keys. Date: 2026, v2.7.x; 4 stars. Safety 3/5 (referral links, tiny user base). Quality 2/5 (very early). Tags: agent, self-osint, mcp, evidence-graph

**World Monitor** | https://github.com/koala73/worldmonitor | https://worldmonitor.app
Open-source real-time situational-awareness dashboard: 45+ map layers (ADS-B, conflict, disaster, infra), AI briefs, Country Instability Index, REST API, MCP, CLI, desktop app. Platform: web, Win/Mac/Linux (Tauri), self-host. Price: free, AGPL-3.0; Pro in development. Date: viral 2026; ~88k stars. Safety 4/5 (local Ollama mode avoids cloud LLM; AGPL). Quality 4/5 (AI briefs are synthesized, not verified facts). Tags: dashboard, geoint, monitoring, mcp

**Taranis AI** | https://github.com/taranis-ai/taranis-ai
EU/AIT-backed OSINT news-collection platform: ingests sources, NLP clusters and summarizes into analyst reports; MISP sharing; optional analyst chat. Platform: self-hosted Docker. Price: free, EUPL-1.2. Date: active 2025-2026; ~1.2k stars. Safety 5/5 (public-sector governance; chat sends to your configured LLM only). Quality 4/5 (heavy: 16 GB RAM). Tags: news-osint, cti, nlp, self-hosted

**OSINT Toolkit (dev-lu)** | https://github.com/dev-lu/osint_toolkit
Single-analyst CTI web platform: IOC extraction/bulk analysis, .eml analyzer, lookalike domains, Sigma/YARA GUI, generative-AI templates. Price: free, AGPL-3.0. Date: 2024-2025; 931 stars; author says prototype. Safety 4/5. Quality 3/5. Tags: cti, ioc, self-hosted

**EarthKit / EarthKit Agent** | https://github.com/JettChenT/earthkit | https://docs.earthkit.app
Geolocation toolkit: Sift (GeoCLIP + visual place recognition + GPT), natural-language to Overpass, geo-estimation heatmaps, satellite/street-view matching; Agent mode does step-by-step geolocation with a critic model. Platform: web (credits) or self-host. Price: GPL-3.0; hosted credit-based. Date: 2024 launch, agent 2025-2026; 82 stars. Safety 2/5 (hosted sessions are PUBLIC on the explore feed by default; images go to Modal/OpenAI; team unnamed). Quality 3/5. Tags: geolocation, agent, overpass

**MiroFish** | https://github.com/666ghj/MiroFish
Multi-agent persona-swarm prediction engine for public-opinion forecasting (adjacent to OSINT, not collection). Price: free, AGPL-3.0. Date: Mar 2026, ~80k stars, Shanda-incubated. Safety 3/5 (sends data to Qwen API and Zep Cloud). Quality 3/5 (investigative value speculative). Tags: simulation, public-opinion

**DarkGPT** | https://github.com/luijait/DarkGPT
GPT-4 chat front end over the DeHashed breach API. Price: no license stated; needs paid DeHashed + OpenAI keys. Date: 2024, stale. Safety 1/5 (breach PII sent to OpenAI, no license, unmaintained). Quality 1/5. Tags: breach-data, stale, caution

**GPT Researcher** | https://github.com/assafelovic/gpt-researcher
Deep-research agent producing cited reports; MCP client and server (gptr-mcp). Price: free, Apache-2.0 plus API costs. Date: deep-research/MCP features 2025; ~29.5k stars. Safety 3/5 (Tavily/cloud LLM by default). Quality 4/5. Tags: deep-research, agent, mcp

**Local Deep Research** | https://github.com/LearningCircuit/local-deep-research
Privacy-first deep research with local LLMs (Ollama/LM Studio), SQLCipher storage, no telemetry, egress-control scopes; sources incl. arXiv, Wayback, SearXNG. Price: free, MIT. Date: 2025-2026; ~9.4k stars. Safety 5/5 (authors note egress control is a guardrail, not an air gap). Quality 4/5. Tags: deep-research, local-llm, privacy

**Exa Websets** | https://exa.ai (pricing unverified)
Natural-language description to a verified structured table of entities (people, companies). Price: paid API with free credits. Date: Dec 2024 announce, GA 2025. Safety 3/5 (vendor stores queries; enumerating people at scale has GDPR implications). Quality 4/5. Tags: neural-search, entity-enumeration, api

**AIWhisperer (Henk van Ess)** | https://github.com/voelspriet/aiwhisperer
Pre-processes leak/document sets for cloud AI: OCR, 500-page chunking, pseudonymizes names/phones/emails/IBANs with a local mapping file. Platform: macOS app (unsigned) or pip. Price: free, CC0. Date: 15 Jan 2026. Safety 5/5 (local; README honest that regex redaction needs review). Quality 4/5. Tags: redaction, leak-analysis, journalism

**OSINT Navigator (Indicator)** | https://navigator.indicator.media
LLM search over 7,500+ tools from nine toolkits; tailored recommendations, community answers; optional run-locally mode (WebGPU model in browser). Price: free 10/day; members 50/day + API/MCP. Date: public 13 Apr 2026. Safety 4/5 (default mode sends query to hosted LLM; use local mode). Quality 4/5. Tags: directory, tool-finder, ai

**Cylect.io** | https://www.cylect.io
Donation-funded aggregator of ~500 tools with an AI assistant and ChatGPT custom GPT variant. Price: free. Date: GPT 2023-24; site v2026.8. Safety 3/5 (click-throughs go to hundreds of third parties). Quality 3/5. Tags: aggregator, start-page

**CavalierGPT (Hudson Rock)** | https://www.hudsonrock.com/cavaliergpt
Custom GPT over Hudson Rock infostealer data. Price: free with ChatGPT. Date: late 2024, used through 2025. Safety 3/5 (queries to OpenAI and Hudson Rock; victim-sourced data). Quality 3/5. Tags: infostealer, custom-gpt

**Blackbird (AI profiling mode)** | https://github.com/p1ngul1n0/blackbird
See section 3; the --ai mode sends matched site names to the author's hosted endpoint for "behavioral insights". Safety for AI mode 3/5; output is speculative profiling, label it as such.

**Vehicle AI** | https://vehicle-ai.vercel.app (unverified)
Identifies vehicle make/model/year range from exterior photos. Price: free. Date: covered Nov 2025. Safety 2/5 (anonymous Vercel app, unknown backend). Quality 2/5. Tags: vehicle, image-recognition

**Frontier LLMs as geolocation tools (Claude, Gemini, ChatGPT, Google AI Mode)** | Bellingcat tests: https://www.bellingcat.com/resources/2026/10/22/can-llms-supercharge-geolocations-our-tests-show-big-improvements-but-humans-remain-key/ and https://www.bellingcat.com/resources/2025/08/14/llms-vs-geolocation-gpt-5-performs-worse-than-other-ai-models/
Not a product, but the most important capability shift. Oct 2026 round (52 unpublished photos, 24 models): Claude Opus/Fable top on both metrics; top models placed over 50% within 25 km; Bellingcat's own Claude agent with custom skills (ESRI tiles, OSM Search) beat all stock models. Aug 2025 round: Google AI Mode best, GPT-5 regressed. Safety 2/5 for sensitive imagery (provider retention/training terms; confident hallucination). Quality 4/5 as a lead generator with a human in the loop. Tags: llm, geolocation, benchmark

## 2. OSINT MCP servers and agent skill packs

**awesome-osint-mcp-servers (soxoj)** | https://github.com/soxoj/awesome-osint-mcp-servers
Canonical index: 34 servers, 10 categories, by the Maigret author. Free. Safety n/a (list does not vet entries; several are paid wrappers). Quality 4/5. Tags: index, mcp

**osint-toolbox-mcp** | https://github.com/renkagod/osint-toolbox-mcp
Docker MCP server wrapping Sherlock, Maigret, Blackbird, Holehe, GHunt, theHarvester, SpiderFoot, PhoneInfoga, ExifTool, subfinder, dnsrecon, dnstwist plus WHOIS/DNS/crt.sh/Wayback. Price: free, MIT. Date: v1.0.0 2026; 0 stars. Safety 3/5 (runs live checks from your IP; GHunt needs Google session in a volume; review Dockerfile). Quality 2/5 (unproven). Tags: mcp, docker, classic-tools

**osint-tools-mcp-server (frishtik)** | https://github.com/frishtik/osint-tools-mcp-server
Earlier MCP wrapper (Sherlock, Holehe, SpiderFoot, GHunt, Maigret, theHarvester, Blackbird). Price: free, MIT. Date: 2025; 237 stars, 5 commits. Safety 3/5. Quality 2/5 (one-shot release; use osint-toolbox-mcp). Tags: mcp

**osint-mcp-server (badchars)** | https://github.com/badchars/osint-mcp-server
37 tools over Shodan, VirusTotal, Censys, SecurityTrails, DNS, WHOIS, CT, BGP, Wayback, GeoIP, M365 tenant checks; 21 keyless. Price: free, MIT. Date: 2025-2026; 41 stars (a copy exists at ar2r-b, use the original). Safety 3/5 (third-party code holding your API keys). Quality 3/5. Tags: mcp, infrastructure, passive

**BurtTheCoder MCP family (mcp-maigret, mcp-shodan, mcp-virustotal, mcp-dnstwist)** | https://github.com/BurtTheCoder/mcp-maigret | https://github.com/BurtTheCoder/mcp-shodan | https://github.com/BurtTheCoder/mcp-virustotal
Single-purpose, widely used, early 2025. Price: free, MIT; Shodan/VT keys needed. Safety 3/5 (unofficial; HTTP transport has no auth, keep on localhost). Quality 3/5. Tags: mcp, username, shodan, virustotal

**Censys Platform MCP Server (official)** | https://docs.censys.com/docs/platform-mcp-server
Hosted remote MCP: natural language to CenQL, host/cert/web lookups, investigate_host/CVE, attack-surface discovery. Price: consumes paid Censys credits. Date: 21 Jul 2025 (Threat Hunting MCP 12 Sep 2025). Safety 4/5 (official; queries go to Censys; give agents spend-capable keys carefully). Quality 4/5. Tags: mcp, official, infrastructure

**Google mcp-security / gti-mcp (official)** | https://github.com/google/mcp-security | https://pypi.org/project/gti-mcp/
Google SecOps MCP servers; GTI server exposes VirusTotal/Google Threat Intelligence lookups. Price: free, Apache-2.0; VT API tiers paid beyond free quota. Date: 2025; 0.1.3 Aug 2026; 535 stars. Safety 5/5 (official Google). Quality 4/5. Tags: mcp, official, virustotal, cti

**GreyNoise MCP Server** | https://docs.greynoise.io/docs/mcp-server
Local MCP for IP context, RIOT, batch checks, tag intel, GNQL. Price: free server, requires Enterprise API key. Date: 2025. Safety 4/5. Quality 3/5 (enterprise key is the blocker). Tags: mcp, ip-reputation

**ZoomEye MCP (official)** | https://github.com/zoomeye-ai/mcp_zoomeye
Official MCP for ZoomEye asset search. Price: free, MIT; API credits paid. Date: 2025; 82 stars. Safety 3/5 (Knownsec, China; data-sovereignty consideration). Quality 3/5. Tags: mcp, asset-search

**Bright Data MCP** | https://github.com/brightdata/brightdata-mcp
32 tools: SERP search, anti-bot scraping to Markdown, 1,200+ structured scrapers, remote browser; collection layer for many OSINT agents. Price: 5,000 req/month free, then $1.50/1K. Date: 2025, v2.7.x; ~2.7k stars. Safety 2/5 (commercial proxy network sees your queries; ToS exposure on LinkedIn etc.; scraped content is a prompt-injection vector). Quality 4/5. Tags: mcp, scraping, proxy

**FullHunt API + MCP** | https://fullhunt.io
Attack-surface intel: host intel, subdomains, pDNS history, CVE search; Python SDK and official MCP. Price: free dev signup (limits undisclosed). Date: MCP 2025-2026. Safety 4/5. Quality 3/5. Tags: attack-surface, mcp

**Modat Magnify MCP**, **Silent Push MCP**, **Cloudflare Radar MCP**, **HIBP MCP**, **XposedOrNot MCP**, **CourtListener MCP**, **user-scanner MCP**, **RedditOSINT MCP**: see their main entries below.

**osint-agent-skills + OSINT-BIBLE (frangelbarrera)** | https://github.com/frangelbarrera/osint-agent-skills | https://github.com/frangelbarrera/OSINT-BIBLE
Agent knowledge base: analyst system prompt with anti-hallucination rules, pivot playbooks, tool registries, ethics rules, report templates, output-hash tool. Price: free, MIT. Date: v1.6.0 2026; 32 stars. Safety 4/5 (mostly text; audit the registries). Quality 3/5. Tags: agent-skills, methodology

**Claudii Exploratores** | https://github.com/SOsintOps/claudii-exploratores
Claude skill + MCP porting the 898-tool Exploratores catalog; builds search URLs only (human stays in loop), IBAN verifier, reversible PII redactor. Price: free, AGPL-3.0. Date: v1.0.0-alpha 2026. Safety 4/5. Quality 2/5 (alpha, README warns of errors). Tags: claude-skill, mcp, catalog

**maltego-mcp (lidless-labs)** | https://github.com/lidless-labs/maltego-mcp (unverified)
Builds Maltego .mtgx graphs from an LLM; basic lookups. Price: free, MIT. Date: Jul 2026, v0.4.x; Glama rates "stale". Safety 3/5 (unofficial). Quality 2/5. Tags: mcp, maltego

**GeoOSINT (mutanex-labs)** | https://github.com/mutanex-labs/geoosint
MCP + CLI for evidence-based geolocation: hash-chained evidence ledger, WGS84 geometry, sun/shadow math, cached Overpass, EXIF GPS. Price: free, MIT. Date: 2026, 1 commit. Safety 4/5 (local SQLite, loopback). Quality 2/5 (P0 foundation). Tags: mcp, geolocation, early

## 3. Username, people, and cross-platform correlation

**Maigret** | https://github.com/soxoj/maigret
Username to dossier across ~5,900 sites with recursive pivoting; 2025-2026 added web UI with graph view, --ai summaries (any OpenAI-compatible endpoint), Neo4j export, permutations, Tor/I2P, Cloudflare bypass. Platform: pip, Snap, Windows exe, Docker, Colab. Price: free, MIT (paid tier for daily DB/API). Date: v0.5.0 Aug 2025 to v0.6.6 Sep 2026; 39.3k stars. Safety 4/5 (sponsor ads; AI mode sends data where you point it; CF bypass may breach ToS). Quality 5/5. Tags: username, recursive, graph

**Sherlock** | https://github.com/sherlock-project/sherlock
Classic 400+ site username hunter, org-maintained. Price: free, MIT. Date: v0.15/0.16 2025 (year inferred); 93.8k stars. Safety 5/5 (install only from sherlock-project; many spammy forks). Quality 4/5. Tags: username, classic

**WhatsMyName (dataset) + whatsmyname.app** | https://github.com/WebBreacher/WhatsMyName | https://whatsmyname.app
Community JSON of 700+ detection patterns powering Blackbird, GoSearch, Linkook; web app runs in-browser (OSINT Combine). Price: free, CC BY-SA 4.0. Date: continuous through 2026. Safety 5/5 dataset; 4/5 web app (requests from your IP). Quality 5/5. Tags: username, dataset, foundation

**Blackbird** | https://github.com/p1ngul1n0/blackbird
Username and email search across 600+ platforms (WMN data), AI profiling, PDF/CSV export. Price: free, open source. Date: AI/600+ in 2025; 7.9k stars. Safety 4/5 (3/5 with --ai; see section 1). Quality 4/5. Tags: username, email, pdf

**GoSearch** | https://github.com/ibnaleem/gosearch
Go rewrite, 300+ sites, false-positive confidence, breach pivots (Hudson Rock, ProxyNova COMB, BreachDirectory). Price: free, GPL-3.0. Date: v2.0.x May-Jun 2026; 3.7k stars. Safety 3/5 (Defender false-positives binary; breach pivots return hashes and mention Weakpass cracking, stay in lawful scope). Quality 4/5. Tags: username, go, breach-pivot

**Linkook** | https://github.com/JackJuly/linkook
True linked-account discovery: follows links inside found profiles to other handles/emails; Hudson Rock/HIBP checks; Neo4j export. Price: free, MIT. Date: first release 5 Feb 2025; v1.1.3 3 Oct 2026; 1.0k stars. Safety 4/5 (small codebase; emails sent to HR/HIBP). Quality 4/5. Tags: username, linked-accounts, neo4j

**user-scanner** | https://github.com/kaifcodec/user-scanner
Email + username footprinting, 2,700+ modules claimed, metadata scraping, cross-scan pivots, Hudson Rock check, MCP server, PDF/JSON/CSV. Platform: pip, Nix. Price: free, MIT. Date: first PyPI 23 Oct 2025; v1.5.2.3 18 Oct 2026; 5.5k stars. Safety 3/5 (loud modules can trigger password-reset emails to the target, off by default; TLS-fingerprint impersonation evades bot controls, expect bans; sponsor banners; fast-moving single maintainer; module counts inconsistent). Quality 4/5. Tags: email, username, holehe-successor, mcp

**Social Analyzer** | https://github.com/qeeqbox/social-analyzer
1,000+ sites with confidence scoring, permutations, screenshots; local web UI + CLIs. Price: free, AGPL-3.0. Date: maintained 2026; 23.7k stars. Safety 4/5 (web UI has no auth, local only). Quality 4/5. Tags: username, web-ui, scoring

**Tookie-OSINT (ex Alfred)** | https://github.com/Alfredredbird/tookie-osint
Sherlock-style finder, V4 rewrite for Python 3.12, Kali/Termux packaging. Price: free, MIT. Date: V4 2025 (inferred); 3.1k stars. Safety 4/5. Quality 3/5. Tags: username, termux

**Mr.Holmes** | https://github.com/Lucksi/Mr.Holmes
Username/domain/phone/email with dorking, maps, graph PDFs, local GUI. Price: free, GPL-3.0. Date: 2021-2026. Safety 3/5 (ships default GUI creds Admin/Qwerty123, change them). Quality 3/5. Tags: username, phone, gui

**socid-extractor** | https://github.com/soxoj/socid-extractor
Parses profile pages into normalized fields incl. stable internal IDs (GAIA, Facebook UID, Instagram pk, Steam ID); ~250 schemes; engine behind Maigret. Price: free, MIT. Date: expanded 2026; 1.1k stars. Safety 5/5. Quality 4/5. Tags: profile-parsing, identifiers, library

**OSINT Industries + Palette** | https://www.osint.industries
Reverse email/phone/username/name/wallet/IP/image across 1,000+ modules; hosts GHunt; Palette graph; API. Price: Basic £19/mo, Intermediate £49, Advanced £99, Enterprise custom; free programs for LE/journalists/nonprofits. Date: Palette/Academy 2025. Safety 4/5 (closed; live account probes can appear in target security logs; "100% accurate" marketing unprovable; pricing page has lorem-ipsum in annual block). Quality 4/5. Tags: reverse-email, reverse-phone, commercial, api

**Epieos** | https://epieos.com
Reverse email/phone surfacing Google account artifacts, Skype, social registrations; claims no query logging. Price: freemium. Date: established; still a first stop in 2026. Safety 4/5 (legal entity not named on homepage; French operator). Quality 4/5. Tags: reverse-email, google-osint

**Predicta Search** | https://www.predictasearch.com | https://pypi.org/project/predictasearch/
Reverse email/phone/name/username across 1,740+ sources, bulk CSV, Cases, official Python/CLI (MIT). Price: free (3 searches), Basic/Expert/Pro/Custom (prices not public). Date: Python client Apr 2025; Cases 2026. Safety 4/5 (EU/GDPR; keeps deletable search history; recruiter marketing raises FCRA issues for that use). Quality 4/5. Tags: reverse-email, eu

**Osintly** | https://osint.ly
New all-in-one dashboard claiming 1,550+ modules, AI workflows, case mgmt, free gaming lookups (Steam, Roblox, Epic, PSN, Xbox, Snapchat, memory.lol). Price: paid tiers (unpublished), some free tools. Date: 2026. Safety 2/5 (no founders, company or jurisdiction named anywhere; aggressive SEO). Quality 2/5 until vetted. Tags: aggregator, gaming, unverified-operator

**Lolarchiver** | https://lolarchiver.com
Pay-per-query archives: reverse email/phone, X handle and bio changelogs 2011 to present, TikTok/YouTube comment history, Twitch/Kick chat logs and ban history, Instagram keyword search. Price: 0.06 EUR/query plus subscriptions. Date: community attention 2025-2026. Safety 2/5 (anonymous operator; bulk chat-log archiving raises GDPR/ToS questions). Quality 3/5 (unique handle-history data; corroborate with memory.lol). Tags: handle-history, twitter, twitch, paid

**Expose Team** | https://expose.team (listing verified only)
Credit-based people/company search with link analysis, timelines, AI reports; API, MCP, CLI. Price: $8/mo (40 credits) to $200/mo (1,000). Date: 2025-2026. Safety 2/5 (opaque sourcing, no company details). Quality 2/5. Tags: people-search, mcp, opaque

**SL Crimewall (Social Links)** | https://sociallinks.io/products/sl-crimewall
Enterprise full-cycle platform, 850+ sources, link analysis, case mgmt, ML analysis. Price: paid, quote. Date: flagship through 2026 (Crimewall labeled BETA). Safety 3/5 (closed; prior facial-recognition controversy). Quality 4/5. Tags: enterprise, link-analysis, socmint

**OSINT Combine NexusXplore** | https://www.osintcombine.com/nexusxplore
Surface/deep/dark web platform with AI search, network analysis, optional facial recognition (can be disabled per jurisdiction). Price: paid annual SaaS. Safety 4/5. Quality 4/5. Tags: platform, commercial

**Fivecast ONYX/MATRIX/OPENSCREEN** | https://www.fivecast.com
Government/enterprise OSINT suite with generative-AI criteria. Price: quote. Safety 3/5 (vendor claims unverified). Quality 3/5. Tags: platform, government

**Maltego AI Assistant** | https://docs.maltego.com/en/support/solutions/articles/15000061164-what-is-the-ai-assistant-
Chat assistant inside Maltego Graph (Browser) and Search: reads/analyzes graph entities, tagging, translation, reporting. Price: part of paid plans. Date: 2025, updated Jun 2026. Safety 3/5 (underlying LLM provider not stated; ask vendor before case data). Quality 3/5. Tags: link-analysis, ai-assistant

## 4. Platform-specific social tools

**Telepathy-Community (Prose Intelligence)** | https://github.com/prose-intelligence-ltd/Telepathy-Community
Telegram chat scans, member lists, full archives, Gephi edgelists, nearby lookup; TelepathyDB/API paid. Price: free, MIT (DB paid). Date: last code Jul 2024; README says not maintained; source install currently broken. Safety 3/5 (needs your Telegram API creds, ban risk; UK company). Quality 2/5 (frozen). Tags: telegram, archiving, frozen

**Telegram Phone Number Checker (Bellingcat)** | https://github.com/bellingcat/telegram-phone-number-checker
Checks whether phone numbers map to Telegram accounts; returns username/name/ID/photo; proxy support. Price: free, MIT. Date: v1.2.2 17 Aug 2026; 1.8k stars. Safety 4/5 (use a burner account; adding contacts is visible to Telegram). Quality 4/5. Tags: telegram, phone, bellingcat

**TelegramDB** | https://telegramdb.org
Telegram search engine via bot; hundreds of millions of chats. Price: freemium. Safety 2/5 (operator unnamed; bot sees your Telegram identity). Quality 3/5. Tags: telegram, search

**Telemetrio** | https://telemetr.io
~7.1M channel catalog with analytics, fake-subscriber detection, API. Price: freemium. Safety 4/5. Quality 4/5. Tags: telegram, channel-analytics

**Osintgraph** | https://github.com/XD-MHLOO/Osintgraph
Instagram target graph (followers, followees, posts, comments, likes) into Neo4j; optional Gemini agent. Price: free, GPL-3.0. Date: first release 1 Sep 2025; 957 stars. Safety 3/5 (burner IG account required; Gemini sends personal content to Google). Quality 3/5. Tags: instagram, neo4j, graph

**Instaloader** | https://github.com/instaloader/instaloader
Standard Instagram downloader/scraper. Price: free, MIT. Date: v4.15.x 2026 (inferred). Safety 4/5 (logged-in use risks account action). Quality 5/5. Tags: instagram, scraper

**TokIntel** | https://github.com/HackUnderway/TokIntel
TikTok username lookup via Apify scraper, JSON/TXT reports. Price: free, MIT; Apify token metered. Date: 2026; 115 stars. Safety 3/5 (data flows through Apify). Quality 2/5 (thin wrapper). Tags: tiktok, apify

**SnapIntel** | https://github.com/Kr0wZ/SnapIntel
Downloads public Snapchat stories/highlights/spotlights/Bitmoji, upload heatmap; no login. Price: free, AGPL-3.0. Date: pip support Aug 2025; 338 stars. Safety 5/5. Quality 3/5. Tags: snapchat, download

**CrossLinked** | https://github.com/m8sec/CrossLinked
Employee enumeration from search-engine LinkedIn results, no login. Price: free, GPL-3.0. Date: ongoing; 1.6k stars. Safety 5/5. Quality 4/5. Tags: linkedin, employees

**GitFive** | https://github.com/mxrch/GitFive
GitHub profile investigator: name history, email-to-account mapping, commit identities, SSH keys, secondary accounts. Price: free, MPL-2.0. Date: Py3.13 support 2025; 1.0k stars. Safety 4/5 (needs your GitHub login). Quality 4/5. Tags: github, email, handle-history

**GHunt v2** | https://github.com/mxrch/ghunt
Google account investigation (email/Gaia ID, Maps reviews, Drive metadata, BSSID geolocation, Digital Asset Links); companion extension. Price: free, AGPL-3.0 with author use restrictions. Date: v2.3.4 16 Mar 2026; ~19.6k stars. Safety 4/5 (hands your Google cookies to the tool, use a sock account; Google breaks modules). Quality 4/5. Tags: google-osint, gaia-id

**memory.lol** | https://github.com/travisbrown/memory.lol
API of ~542M historical Twitter/X screen names back to 2011. Price: free; Anti-Capitalist Software License. Date: live through 2026. Safety 4/5 (single maintainer; availability "subject to change"). Quality 4/5 (public access limited to last 60 days except listed bad actors; full index for approved researchers). Tags: twitter, handle-history

**twscrape** | https://github.com/vladkens/twscrape
Async X scraper using a pool of your own accounts with rotation; the main surviving X scraper after Nitter. Price: free, MIT. Date: ongoing; 2.8k stars. Safety 2/5 (violates X ToS, accounts get banned; telemetry ON by default, set TWS_TELEMETRY=0; referral links to account sellers). Quality 3/5. Tags: twitter, scraper, telemetry

**Nitter (status)** | https://github.com/zedeus/nitter
Archived 26 Aug 2026 after X Corp cease-and-desist. Safety 2/5 for public instances. Quality 1/5 going forward. Tags: twitter, archived

**Arctic Shift (+ PullPush)** | https://arctic-shift.photon-reddit.com
Free Reddit archive 2022 to present with search UI, downloads, API; PullPush for older Pushshift-era data. Price: free. Date: primary Reddit archive 2024-2025. Safety 4/5 (single maintainer, no SLA; deleted-content retrieval has privacy implications). Quality 4/5. Tags: reddit, archive, deleted-content

**RedditOSINT** | https://github.com/AlbertRG99/RedditOSINT
Reddit username profiler over Arctic Shift/PullPush: live and deleted content, activity patterns, exposed identifiers, exposure score; MCP server. Price: open source, no license file. Date: 2026; 18 stars. Safety 3/5 (no license, tiny). Quality 2/5. Tags: reddit, profiler, mcp, new

**ClearSky** | https://clearsky.app
Bluesky block graph, moderation lists, handle history via PLC directory. Price: free. Safety 4/5 (operator unnamed; all public AT Proto data). Quality 4/5. Tags: bluesky, blocks, handle-history

**Bluesky utility set** (Bstat https://bstat.app, Dopplersky https://dopplersky.com, Bskyinsights https://bskyinsights.com, BlueskyMeter https://blueskymeter.com, Bluecrawler https://bluecrawler.com, ilo.so DID resolver https://ilo.so, bsky.jazco.dev) (individually unverified)
Profile stats, growth, join date, DID resolution. Free. Safety 3/5 (hobbyist, ad-supported). Quality 3/5. Tags: bluesky, analytics

**Masto** | https://github.com/C3n7ral051nt4g3ncy/Masto
Mastodon/fediverse user and instance intel; Maltego transform Mar 2025. Price: free, MIT. Date: Mar 2025; 272 stars. Safety 5/5. Quality 4/5. Tags: mastodon, fediverse

**OSoMeNet (successor to Hoaxy)** | https://hoaxy.osome.iu.edu
Indiana University diffusion mapping incl. Bluesky. Price: free, academic. Date: migration 2025-2026. Safety 5/5. Quality 4/5. Tags: bluesky, diffusion, academic

**Open Measures (ex SMAT)** | https://public.openmeasures.io
Bulk search/timeline across 4chan, 8kun, BitChute, Bluesky, Gab, Gettr, Odysee, Parler, Rumble, Telegram, TikTok, Truth Social, VK and more; CLI, Jupyter. Price: public tier free (data 6+ months old, 39 API req/day); Pro paid; journalist/academic discounts. Date: 2025 retrospective, Bluesky added. Safety 4/5. Quality 4/5. Tags: fringe-platforms, influence-ops, api

**4CAT + Zeeschuimer (Digital Methods Initiative)** | https://4cat.nl | https://github.com/digitalmethodsinitiative/4cat/releases | https://github.com/digitalmethodsinitiative/zeeschuimer
Zeeschuimer (Firefox) records what you scroll on TikTok, Instagram, X, LinkedIn, Douyin, Gab, Truth Social, Pinterest, RedNote, Threads to NDJSON; 4CAT runs network graphs, similarity, image analysis, LLM annotation (OpenAI/Gemini/Ollama), Whisper. Price: free, MPL-2.0. Date: v1.47 Feb 2025 to v1.56 Jul 2026. Safety 4/5 (captures only in your logged-in session; LLM processors can send data out unless local). Quality 5/5. Tags: socmint, graph, academic

**Steam alias history set** | https://github.com/Dalistin/steam-osint (list, 2025) | https://steamhistory.net | https://steamid.uk | native: steamcommunity.com/profiles/<SteamID64>/namehistory
Free. Safety 3/5 (the Dalistin README also advertises Telegram/Discord data-lookup channels, ignore those). Quality 3/5. Tags: steam, gaming, alias-history

**NameMC** | https://namemc.com
Minecraft username/skin history; refuses removal requests. Free. Safety 4/5. Quality 4/5. Tags: minecraft, alias-history

## 5. Face search (legal and ethical caution; GDPR/BIPA exposure, most ToS limit to your own face or consent)

**PimEyes** | https://pimeyes.com
Web face search with alerts and takedowns; video face search announced 16 Jul 2025. Price: free 10/day blurred; Open Plus / PROtect / Advanced tiers (prices didn't render). Safety 2/5 (UK/German regulatory actions; "photographic similarity not biometrics" framing contested). Quality 4/5. Tags: face-search, biometric, legal-risk

**FaceCheck.ID** | https://facecheck.id
Face search over social, news, videos, scammer DBs, mugshots, sex-offender registries; API. Price: freemium credits. Safety 2/5 (Belize operator, no named people; mugshot indexing; explicitly not for FCRA decisions). Quality 3/5. Tags: face-search, mugshots

**Lenso.ai** | https://lenso.ai/en
AI reverse image search with places/people/duplicates categories, Face Search (region-locked), API. Price: freemium; Pro/Dev plans. Date: launched Sep 2024, API Mar 2025. Safety 3/5 (opt-out/DMCA processes exist). Quality 3/5. Tags: face-search, reverse-image, api

**Search4faces** | https://search4faces.com
Face search over static VK/OK/TikTok/Clubhouse avatar scrapes (2020/2022). Price: freemium. Safety 1/5 (anonymous Russia-adjacent operator; uploading subject photos is itself an exposure). Quality 2/5. Tags: face-search, vk

**Raven (ex GeoSpy, Graylark)** | https://geospy.ai redirects
AI geolocation, Street Targeting, CarID, room-to-Airbnb matching; law enforcement/enterprise only since Jan 2025; rebrand Apr 2026; $10.7M seed Aug 2026. Safety 2/5 (not available to independents; "GeoSpy" sites still live are impostors). Quality n/a. Tags: ai-geolocation, le-only, awareness

## 6. Email, phone, and breach data

**Have I Been Pwned 2.0** | https://haveibeenpwned.com | https://haveibeenpwned.com/mcp
Rebuilt 18-20 May 2025; stealer-log website lists (Jan 2025), Synthient corpus (Oct 2025), passkeys, k-anonymity email API and bulk domain verification (31 Mar 2026), MCP server (17 Apr 2026). Price: free personal search; Core from $4.39/mo to Pro 1 $379/mo (stealer logs, k-anon email search) and up. Safety 5/5 (gold-standard provenance; Core plans forbid third-party/client work; stealer-log data has no accuracy guarantee). Quality 5/5. Tags: breach-check, stealer-logs, api, mcp

**XposedOrNot** | https://xposedornot.com | https://pypi.org/project/xposedornot/
Free, open-source breach search (796 breaches, ~11.7B records), k-anon passwords, domain monitoring, includes infostealer logs; SDKs in 8 languages and MCP (Dec 2025 to 2026). Price: free; paid xonAPI+ business tier. Safety 4/5 (one-person project; thinner provenance vetting than HIBP). Quality 4/5. Tags: breach-check, free, mcp

**Hudson Rock free tools / Cavalier** | https://www.hudsonrock.com/free-tools | https://docs.hudsonrock.com/docs
Infostealer-infection lookups by email/username/domain/tech/Android app; free API program; theHarvester module (Dec 2025). Price: free community tier; Cavalier enterprise. Safety 3/5 (threat-actor-sourced victim data; free results intentionally partial lead-gen; no privacy policy on tools page). Quality 4/5. Tags: infostealer, free-tier, api

**LeakCheck** | https://leakcheck.io
Breach + infostealer search, ~1,366 sources, API, Telegram bot. Price: free public endpoint (source names only); $2.99/day, $9.99/mo, $69.99 lifetime, Enterprise from $179/quarter. Safety 2/5 (UK-registered with GDPR language and removal process, but sells plaintext passwords and PII from stolen dumps). Quality 3/5 (corroboration only). Tags: breach-search, gray-area

**DeHashed** | https://www.dehashed.com (unverified this session)
Breach index (~24B assets) with source attribution; free tier redacted; API v2. Safety 2/5 (reseller of stolen credential data). Quality 3/5. Tags: breach-search, gray-area

**Intelligence X** | https://intelx.io
Selector search (email, domain, phone, IP, BTC, hashes) across pastes, Tor/I2P, leaks, COMB, stealer logs, Usenet, historical WHOIS/DNS. Price: free 50 lookups/day; Researcher 200/day; paid tiers. Safety 3/5 (Czech company; indexes leaked documents; widely accepted professionally). Quality 4/5. Tags: leak-search, paste, darknet

**Revealer.US** | https://revealer.us
New breach + stealer + account-enumeration report service. Price: free tier; from $12.99/mo. Date: 2025-2026. Safety 2/5 (unnamed partner datasets; SEO competitor-bashing blog). Quality 2/5. Tags: breach-search, new

**MailAccess** | https://github.com/KatrielMoses/MailAccess
Self-hostable email suite: ~357 service registration checks, breach lookups, identity-clustering graph, exposure score, domain email harvesting (Common Crawl, GitHub, CT, keyservers), STIX/Maltego export. Price: core free, MIT; Pro adds B2B enrichment from unnamed sources. Date: first PyPI 19 May 2026; v0.18.8 17 Oct 2026; ~1.7k stars. Safety 2/5 (sponsored by residential-proxy vendors advertising "scalable email harvesting"; Pro is lead-gen; "founder pricing, limited seats" pressure). Quality 3/5 (capable, but audit before case data). Tags: email-enumeration, self-hosted, caution

**holehe (status)** | https://github.com/megadose/holehe
Last release Jul 2022, 71 open issues, many modules broken. Beware hosted wrappers (HoleheOSINT.com, Apify) that route queries through third parties. Safety 3/5. Quality 2/5. Use user-scanner / MailAccess / Blackbird instead.

**theHarvester 4.9.x** | https://github.com/laramies/theHarvester
Domain/org recon returning emails, hosts, people, breach names; REST API, HarvestView web app; sources incl. hudsonrock (keyless), hibpverified, dehashed, intelx, hunter. Price: free, open source. Date: v4.9.0 Dec 2025; 17.3k stars. Safety 4/5 (several configured sources are gray breach resellers, choose consciously). Quality 5/5. Tags: email-harvesting, domain-recon

**SearchPhone (HackUnderway)** | https://github.com/HackUnderway/SearchPhone
Phone OSINT: Numverify validation, SerpAPI/DDG/Reddit/GitHub search for the number, Hudson Rock check, PDF/JSON. Price: free, MIT (API keys metered). Date: 2025-2026; 2.1k stars, 13 commits. Safety 3/5 (thin history vs stars; third-party APIs see queries). Quality 3/5. Tags: phone-osint

**NUMINT** | https://github.com/AllainDB/numint
Suspicious-number triage: line type, VoIP/burner, carrier, fraud score via IPQS through a Cloudflare Worker; offline libphonenumber parsing. Price: free code, no license file. Date: 2025-2026; 0 stars. Safety 3/5. Quality 2/5. Tags: phone-triage, fraud-score, new

**ignorant-rs** | https://github.com/jonaylor89/ignorant
Rust port of megadose/ignorant (phone-to-account checks on Amazon/Instagram/Snapchat). Price: free, GPL-3.0. Date: Jul 2025; 16 stars. Safety 3/5 (account probes; tiny). Quality 2/5. Tags: phone-enumeration, rust

**PhoneInfoga (status)** | https://github.com/sundowndev/phoneinfoga
README now says "stable but unmaintained, may be archived". GPL-3.0. Safety 4/5 (use original, not forks/Apify wrappers). Quality 2/5. Tags: phone, unmaintained

**libphonenumber / python phonenumbers** | https://github.com/google/libphonenumber | https://pypi.org/project/phonenumbers/
Authoritative offline parsing/validation/number-type/carrier-prefix library; 45 releases since Jan 2025. Price: free, Apache-2.0. Safety 5/5. Quality 5/5 (prefix-based carrier is original, not ported). Tags: phone-parsing, library, offline

**Reacher / check-if-email-exists** | https://github.com/reacherhq/check-if-email-exists | https://reacher.email
Rust email verification without sending: syntax, MX, disposable, SMTP deliverability, catch-all, Gravatar, HIBP flag; CLI, Docker, SaaS. Price: AGPL-3.0 + commercial; sponsors get 8,000 hosted verifications/month. Date: crate v0.11.10 16 Oct 2026; ~10k stars. Safety 4/5 (SMTP probes are visible in target mail-server logs; needs port 25). Quality 5/5. Tags: email-verification, smtp

**python-disposable + disposable-email-domains** | https://github.com/pescheckit/python-disposable | https://github.com/disposable/disposable-email-domains
Offline disposable-email detection, 72k+ domains, auto-updated from 40+ sources. Price: free, MIT. Date: first release Mar 2026. Safety 5/5 (no runtime network calls). Quality 3/5 (upstream list is the real asset). Tags: disposable-email, offline

**Mailtower Email Header Analyzer** | https://github.com/mailtower-app/email-header-analyzer | https://mailheader.mailtower.app
Client-side header analysis: hop path, delays, detail inspection; self-hostable. Price: free, MIT. Date: 2025-2026; 6 stars. Safety 5/5 (verify network tab before pasting sensitive headers). Quality 3/5. Tags: email-headers, client-side

**CyberDefenders MHA** | https://github.com/cyberdefenders/email-header-analyzer
Flask header analyzer, Docker. Price: free. Safety 4/5 (self-host, server-side). Quality 3/5. Tags: email-headers

**FLAGGED, NOT RECOMMENDED**: 2025-2026 GitHub repos "WhatsApp-OSINT", "whatslookup", "whatsapp-checker" (OSINT Trace) and "Apple ID checker" Apify actors: thin clients for paid RapidAPI endpoints scraping WhatsApp profile data with "anti-bot bypass", 0-2 commits, hidden backends. Safety 1/5.

## 7. Geolocation, imagery, mapping, physical world

**Bellingcat ShadowFinder** | https://github.com/bellingcat/ShadowFinder
Object height + shadow length + UTC time to a global band of possible locations. Platform: Colab, Jupyter, pip, CLI. Price: free, MIT. Date: Aug 2024, pushed Sep 2026; 622 stars. Safety 5/5 (run locally for sensitive cases). Quality 5/5. Tags: shadow, chronolocation

**ShadowTrace** | https://github.com/bytemallet/shadowtrace
Browser shadow geolocation with three-point marking and two-photo intersection. Price: free, MIT. Date: 2025-2026; 7 stars. Safety 3/5 (likely client-side but not stated; "99.9%" claim unsupported). Quality 2/5. Tags: shadow, web

**GeoSeer** | https://geoseeer.com
Commercial AI photo/video geolocation: Fast, Agent, Event modes; API. Price: free 1 search/day + 10 API calls; Starter $19/mo ($9 annual); Pro $69/mo ($29 annual). Date: late 2025. Safety 2/5 (no legal entity, founder or jurisdiction named; unknown which LLMs receive images; heavy SEO comparison blogs). Quality 3/5 (in Bellingcat's Oct 2026 test Fast refused 4/52, Agent refused 8/52, frequent timeouts). Tags: ai-geolocation, commercial, unknown-operator

**Picarta V2** | https://picarta.ai | https://github.com/PicartaAI/Picarta-API
Vision-transformer geolocation, top-10 candidates, radius restriction, Python API, on-prem for enterprise. Price: freemium; API enterprise-only. Date: V2 Aug 2024, compared through 2026; Picarta S.r.l. (Italy). Safety 3/5 (retention policy not stated; images uploaded). Quality 3/5 (self-reported 44.8% at 1 km on IM2GPS3k). Tags: ai-geolocation, api

**Bellingcat ColourHighlighter** | https://bellingcat.github.io/ColourHighlighter/
WebGL colour LUT filters on a screen share for collaborative geolocation. Price: free, MIT. Date: Nov 2025. Safety 5/5. Quality 3/5. Tags: image-analysis, collaboration

**Copernicus Browser** | https://browser.dataspace.copernicus.eu
ESA viewer for Sentinel-1/2/3/5P with timelapse, compare, mosaics, shapefile AOI; Feb and Jul 2025 upgrades; Sentinel-2C active since 21 Jan 2025. Price: free (account). Safety 5/5. Quality 5/5. Tags: sentinel, free-imagery, timelapse

**Esri World Imagery Wayback** | https://livingatlas.arcgis.com/wayback/
Swipe-compare dated basemap releases back to 2014 with capture metadata; Updates mode Jun 2025. Price: free (Updates mode needs ArcGIS login). Safety 4/5. Quality 5/5 (map update date is not capture date; click tile). Tags: historical-imagery, change-detection

**GeoWhisperer (Henk van Ess)** | https://www.geowhisperer.org
Compares dated Esri Wayback releases, runs seven automatic change/season checks, generates change movie and report; drop a geotagged photo to jump there. Price: freemium (paid via Digital Digging membership). Date: 2026 beta. Safety 4/5 (GPS parsed in-browser, not uploaded; movies deleted after 14 days). Quality 4/5 (bound by Esri's irregular cadence). Tags: change-detection, wayback

**Google Earth web: historical Street View + Detect change** | https://earth.google.com | https://developers.google.com/maps/documentation/earth/detect-change
Historical Street View inside Earth (24 Jun 2025); Detect change experimental 10 m annual-change heatmap on AlphaEarth embeddings (23 Sep 2026). Price: free. Safety 3/5 (Google tracking; Detect change is pre-GA, not evidence). Quality 4/5. Tags: historical-imagery, street-view

**Umbra Open Data + Bellingcat Umbra Open Data Tracker** | https://github.com/bellingcat/umbra-open-data-tracker | s3://umbra-open-data-catalog/
Free 0.2-1 m SAR scenes (17+ TiB); tracker generates daily KML of all footprints for Google Earth. Price: free, MIT. Date: tracker Aug 2026. Safety 5/5. Quality 4/5. Tags: sar, free-imagery, kml

**Bellingcat AIS Imagery Search** | https://bellingcat.github.io/ais-imagery-search/
Load an AIS track CSV; finds Sentinel/Landsat scenes overlapping the vessel's position and time. Price: free. Date: Aug 2026. Safety 5/5 (client-side). Quality 4/5. Tags: ais, sentinel, landsat

**SkyFi** | https://skyfi.com
Self-serve marketplace for archive/tasked imagery from 50+ providers (Maxar/Vantor, Planet, ICEYE, Umbra, Satellogic) down to 7.5 cm; iOS/Android/API. Price: pay per image; Pro $20/mo; enterprise $500/mo. Date: Series A Jan 2026. Safety 4/5 (KYC account; purchases logged). Quality 4/5. Tags: commercial-imagery, tasking

**Bellingcat RS4OSINT (guide)** | https://bellingcat.github.io/RS4OSINT/
Open guide to remote sensing for OSINT. Free. Date: Jan 2026. Safety 5/5. Quality 4/5. Tags: guide, remote-sensing

**Panoramax** | https://panoramax.fr | https://docs.panoramax.fr
Federated open-source Street View alternative (OSM France + IGN), web viewer, CLI, STAC API, self-host. Price: free, open source. Date: FOSDEM Feb 2025, growing. Safety 5/5. Quality 4/5 (coverage strongest in France/Europe). Tags: street-level, osm, federated

**Apple Maps on the web (Look Around)** | https://maps.apple.com
Look Around 360 panoramas in any browser incl. Windows/Linux; different capture dates than Google. Price: free. Date: Dec 2024, out of beta Apr 2025. Safety 5/5 (no account). Quality 4/5. Tags: street-level

**Mapillary layer in ArcGIS Living Atlas** | https://www.esri.com/arcgis-blog/products/arcgis-living-atlas/announcements/mapillary-street-view-imagery-layer
3B+ Mapillary images as coverage tiles and Oriented Imagery layer in ArcGIS. Price: public layer; ArcGIS account for Pro. Date: 24 Jun 2026. Safety 4/5 (Meta/Esri tracking). Quality 3/5. Tags: street-level, gis

**Turnstone (Bellingcat adsb-history)** | https://github.com/bellingcat/adsb-history
Historical ADS-B analysis across aircraft: AOI/altitude/speed/bearing/type filters, CSV export, spot surveillance circuits; hosted instance by application. Price: free, MIT; self-host needs Firebase project and large data loads. Date: 5 Mar 2026. Safety 5/5. Quality 4/5 (LLM-labelled aircraft categories can be wrong, search by type code). Tags: adsb, flight-history, bellingcat

**Community ADS-B aggregators**: adsb.lol https://adsb.lol (free annual history dumps, ODbL), airplanes.live https://airplanes.live, adsb.fi https://adsb.fi, OpenSky https://opensky-network.org (OAuth2 credits: 400/day anon, 4,000 registered), ADS-B Exchange https://globe.adsbexchange.com (JETNET-owned, history via RapidAPI, tracking cookies)
Unfiltered trackers that ignore LADD blocking. Price: free to freemium. Safety 4/5 (ADS-B Exchange cookies; data can be spoofed). Quality 4/5. Tags: adsb, live-tracking

**Global Fishing Watch Map / Vessel Viewer** | https://globalfishingwatch.org/map | https://github.com/GlobalFishingWatch/gfwr
Free global AIS plus Sentinel-1 SAR dark-vessel detections with AIS matching, Sentinel-2 optical detections (Jul 2025), VIIRS night detections (Mar 2026), Python/R packages, ArcGIS layers. Price: free non-commercial. Safety 5/5. Quality 5/5 (known registry ingestion gaps logged). Tags: ais, sar, dark-vessels

**Bellingcat OpenStreetMap Search** | https://osm-search.bellingcat.com | https://github.com/bellingcat/osm-search
Slider-based proximity search over OSM without Overpass QL; used as a skill by Bellingcat's Claude geolocation agent. Price: free, MIT. Date: pushed Jul 2026. Safety 5/5. Quality 4/5. Tags: osm, proximity-search

**Overpass Ultra** | https://overpass-ultra.us | https://gitlab.com/trailstash/ultra
MapLibre-based Overpass Turbo reimagining: large result sets, rich styling, SPARQL/GeoJSON/GPX/KML, OpenHistoricalMap. Price: free, MIT. Date: v4 2025-26. Safety 5/5. Quality 4/5. Tags: osm, overpass

**Bellingcat geoclustering** | https://github.com/bellingcat/geoclustering
CLI DBSCAN/OPTICS clustering of lat/lon CSVs to GeoJSON and kepler.gl map. Price: free, MIT. Date: Jul 2026. Safety 5/5. Quality 3/5. Tags: clustering, geojson

**QMapCompare (QGIS plugin)** | https://github.com/MIERUNE/qgis-plugin-qmapcompare
Mirror/split/lens comparison of two layers in QGIS. Price: free. Date: 22 Feb 2025. Safety 5/5. Quality 3/5. Tags: qgis, map-compare

**OpenTopography Point Elevation API** | https://opentopography.org/blog/new-point-elevation-api-opentopography
Elevation for a lat/lon from COP30/90, SRTM, NASADEM, USGS 10 m, ArcticDEM etc. with vertical CRS metadata. Price: free key, daily limits. Date: 17 Aug 2026. Safety 5/5. Quality 4/5. Tags: elevation, dem, api

**UpToWhere** | https://uptowhere.com
Browser viewshed and line-of-sight calculator on 30 m terrain. Price: free. Safety 3/5 (operator and dataset unnamed). Quality 3/5. Tags: viewshed, terrain

**DeFlock** | https://deflock.org | https://github.com/FoggedLens/deflock
Crowdsourced OSM-based map of automated license plate readers with type and facing direction; iOS app. Price: free, MIT. Date: Nov 2024, heavy 2025 traction (refused Flock's cease-and-desist). Safety 5/5. Quality 4/5 (camera map, not a plate lookup). Tags: alpr, surveillance-map

**Surveillance under Surveillance** | https://sunders.uber.space
Map of CCTV from OSM man_made=surveillance tags with type/mount/direction. Price: free. Safety 5/5. Quality 3/5 (patchy). Tags: cctv, surveillance-map

**CamForge** | https://github.com/SoCloseSociety/camforge
Self-hosted map of 7,000+ public traffic/weather/marine cameras with connectors (Caltrans, TfL, Windy, US 511), MediaMTX relay, local Ollama vision descriptions, scope-gated Shodan module. Price: free, MIT. Date: 2026, 1 commit. Safety 3/5 (keep OSINT_AUTHORIZED_SCOPES empty unless authorized; Claude fallback sends frames out unless on Ollama). Quality 2/5 (brand new). Tags: webcams, self-host, ai-vision

**Video Wall (The OSINT Newsletter)** | https://github.com/The-OSINT-Newsletter/videowall
Tile YouTube live streams with a Leaflet camera map. Price: free, MIT. Date: 2026. Safety 4/5. Quality 2/5. Tags: webcams, monitoring

**Open-Meteo Historical Weather API** | https://open-meteo.com/en/docs/historical-weather-api
Hourly reanalysis weather (ERA5 from 1940, 9 km IFS from 2017, CERRA Europe) for chronolocation checks. Price: free non-commercial. Safety 5/5. Quality 4/5 (modelled, not station data; 9-25 km cells). Tags: weather-history, chronolocation

## 8. Infrastructure, domains, network, threat intel

**Censys Platform + CenQL + cencli** | https://platform.censys.io | https://docs.censys.com/docs/platform-search
Rebuilt search over hosts, web properties, certificates; 64 KB body search (2026); AI Investigations beta (paid). Price: free account with basic visibility; credit packs from $100; tiers contact-sales. Date: 20 Feb 2025. Safety 4/5. Quality 5/5 (legacy free search shrinking). Tags: internet-scan, certificates, freemium

**Shodan 2025 feature wave + InternetDB** | https://www.shodan.io | https://book.shodan.io/release-notes/2025/ | https://internetdb.shodan.io
Advanced Search, Whois on hosts, Timeline, has_vuln/asset filters, HTTP-hash and open-directory filters, DNSDB data, Parquet bulk datasets, Trends; InternetDB keyless free IP lookup. Price: freemium; InternetDB free non-commercial. Safety 4/5. Quality 5/5. Tags: internet-scan, favicon-hash, bulk-data

**Modat Magnify** | https://magnify.modat.io
Dutch internet-scan engine ("Device DNA", 6,000+ device profiles), host history, banner-hash search, native Passive DNS (Jun 2026), MCP (May 2026), unified query language (Aug 2026). Price: free tier; EUR 20/60/400 per month tiers. Date: launched 13 Mar 2025. Safety 4/5 (young EU vendor; scanner opt-out exists). Quality 4/5. Tags: internet-scan, new-entrant, passive-dns, mcp

**Validin** | https://www.validin.com
DNS history and infra pivots (A/NS/cert/favicon/host-response, 6+ years), lookalikes, YARA on responses; the standard 2025 CTI pivot tool. Price: Community free (10 queries/day); Pro $399/mo; Enterprise from $20k/yr. Safety 4/5. Quality 5/5. Tags: dns-history, pivoting

**Silent Push Community Edition** | https://www.silentpush.com/community-app
Total View risk, active + historical PADNS, WHOIS history, Web Scanner, Context Graph pivots, .onion-to-clearweb linking; 6.1 (Sep 2026) added Chrome extension and MCP. Price: free CE 100 queries/month "not for production"; enterprise. Safety 4/5 (CISA-listed free service). Quality 4/5. Tags: passive-dns, whois-history, pivoting

**Hunt.io** | https://hunt.io
C2 detection, AttackCapture open directories, HuntSQL, IOC Hunter. Price: no free plan; Researcher $199/mo; Starter $499/mo. Safety 4/5. Quality 4/5. Tags: c2-hunting, paid

**Driftnet (SecurityScorecard)** | https://driftnet.io
3,500+ ports incl. IPv6, 1B+ hostnames, reverse RWHOIS by name/phone/address, all CT logs, searchable JARM, favicons for every site, on-demand scans. Price: free Community Account by application for researchers. Safety 4/5. Quality 4/5. Tags: internet-scan, jarm, reverse-whois

**ODIN (Cyble)** | https://search.odin.io
Hosts, CVEs, exposed buckets and files; CLI, SDKs. Price: unverified (historically free tier). Safety 3/5 (exposed-file index is ethically sensitive). Quality 3/5. Tags: internet-scan, exposed-buckets

**Netlas** | https://app.netlas.io
Internet intel search (hosts, domains, certs, panels); subfinder source. Price: freemium. Safety 4/5. Quality 4/5. Tags: internet-scan

**Criminal IP (AI Spera)** | https://www.criminalip.io
Korean TI search engine: IP/domain with pDNS history, abuse, scanner activity. Price: freemium. Safety 3/5 (data residency Seoul). Quality 3/5. Tags: ip-reputation

**LeakIX** | https://leakix.net
Search engine for exposed services and leaked data found during scanning; API key now required as subfinder source. Price: unverified. Safety 2/5 (indexes actual leak content; legal gray). Quality 3/5. Tags: exposed-services, gray-area

**OWASP Amass v5** | https://github.com/owasp-amass/amass
Major rewrite on Open Asset Model with graph Asset DB, Neo4j, REST engine API. Price: free, Apache-2.0. Date: v5.0.0 Aug 2025; v5.1.1 Apr 2026 (inferred); 15.4k stars. Safety 5/5 (breaking change from v4). Quality 5/5. Tags: subdomain-enum, asset-graph

**ProjectDiscovery subfinder 2.11-2.16** | https://github.com/projectdiscovery/subfinder
Passive subdomain enum; added MerkleMap, Profundis, THC, Reconeer, URLScan, Sub.md sources; removed Facebook CT. Price: free, MIT. Date: Dec 2025 to Aug 2026 (inferred). Safety 5/5. Quality 5/5. Tags: subdomain-enum, passive

**ProjectDiscovery urlfinder** | https://github.com/projectdiscovery/urlfinder
Passive URL discovery from archives/search engines, no target traffic. Price: free, MIT. Date: Dec 2024, trending Sep 2026. Safety 5/5. Quality 4/5. Tags: passive-urls

**ProjectDiscovery passive set (alterx, dnsx, tlsx, asnmap, cdncheck, uncover, chaos-client, pdtm, vulnx)** | https://projectdiscovery.io/open-source
Price: free, MIT. Safety 5/5 (naabu/nuclei excluded as active). Quality 5/5. Tags: recon-toolchain

**BBOT 3.0 (Black Lantern Security)** | https://github.com/blacklanternsecurity/bbot
Recursive OSINT/attack-surface automation with presets, DNS mutation, YARA, screenshots, Neo4j/Postgres/Splunk outputs; de facto SpiderFoot successor. Price: free, AGPL-3.0. Date: 3.0 current; ~10.4k stars. Safety 4/5 (use passive presets; AGPL). Quality 5/5. Tags: recon-automation, framework

**WayTrace** | https://github.com/thomashousset/WayTrace | https://waytrace.org
Rebuilds domain history from Wayback snapshots only: emails, subdomains, tech, keys across ~45 categories with first/last seen; zero target traffic. Price: free, MIT. Date: Oct 2026; 53 stars. Safety 4/5 (self-host for sensitive targets). Quality 3/5 (new). Tags: wayback, passive-history, new

**DNSDumpster (HackerTarget)** | https://dnsdumpster.com
Free domain DNS recon; API/membership added. Safety 5/5. Quality 4/5. Tags: dns-recon

**MerkleMap** | https://merklemap.com
Fast CT-based subdomain/cert search, Live Domains streaming API, CLI; subfinder source Dec 2025. Price: freemium. Safety 4/5. Quality 4/5. Tags: certificate-transparency

**certstream-server-go** | https://github.com/d-Rickyy-b/certstream-server-go
Self-hosted CT stream server (CaliDog replacement), Debian-packaged. Price: free, MIT. Date: pushed Apr 2026. Safety 5/5. Quality 4/5. Tags: certificate-transparency, self-hosted

**RDAP ecosystem (ICANN Lookup, rdap.org, rdap.rcode3.com)** | https://lookup.icann.org/en | https://rdap.org | https://rdap.rcode3.com
Post-WHOIS registration lookups; rcode3 catalogs 47 client tools. Price: free. Date: WHOIS sunset 28 Jan 2025. Safety 5/5. Quality 5/5 (registrant data largely redacted post-GDPR; nonpublic via ICANN RDRS). Tags: rdap, whois

**IPinfo Lite** | https://ipinfo.io/lite
Free unlimited country + ASN API and downloadable MMDB/CSV/Parquet. Price: free, CC BY-SA 4.0. Date: 6 May 2025. Safety 5/5. Quality 4/5. Tags: ip-geolocation, asn, offline-db

**ipapi.is** | https://ipapi.is
Hosting/datacenter, VPN/proxy/Tor, abuser, bogon flags; bulk 100 IPs; self-hostable. Price: free 1,000 req/day; credits from $1. Safety 4/5 (honest about weak residential-proxy detection). Quality 4/5. Tags: ip-reputation, vpn-detection

**Spur** | https://spur.us
Residential proxy/VPN/datacenter and AI-bot attribution. Price: trial; pricing unverified. Safety 4/5. Quality 4/5. Tags: proxy-detection, attribution

**bgp.tools** | https://bgp.tools
BGP/ASN/prefix explorer, looking glass, RPKI/IRR monitoring. Price: free web; paid API. Safety 5/5. Quality 5/5. Tags: bgp, asn

**JA4+ (FoxIO) + ja4db** | https://github.com/FoxIO-LLC/ja4 | https://ja4db.com
TLS/HTTP/TCP/SSH fingerprint suite replacing JA3/JARM; Wireshark/Zeek/Suricata support. Price: JA4 BSD-3; other methods FoxIO License 1.1 (free internal/academic). Date: Security Onion support Mar 2026; 2.1k stars. Safety 5/5. Quality 5/5. Tags: tls-fingerprint, pivoting

**Favicon Hash Generator (kmsec.uk)** | https://favicon-hash.kmsec.uk
Shodan-format MurmurHash3 favicon hash from URL or file; JSON API. Price: free. Safety 4/5 (use file-upload path for sensitive targets). Quality 4/5. Tags: favicon-hash

**urlscan.io** | https://urlscan.io
2025: cross-origin iframe capture, QR decoding, visual labels, custom JS for Live Scanning (Pro). Price: free public scans; Pro paid. Safety 4/5 (public scans leak targets; use unlisted/private). Quality 5/5. Tags: url-scanner, phishing

**Cloudflare Radar URL Scanner** | https://radar.cloudflare.com/scan
Free scanner with shareable reports, search by hash/ASN/IP, unlisted mode, API and MCP. Price: free. Safety 4/5. Quality 4/5. Tags: url-scanner, mcp

**ANY.RUN** | https://any.run
Interactive sandbox, TI Lookup, feeds. Price: free (PUBLIC submissions); Hunter/Enterprise private. Safety 3/5 on free tier (never upload sensitive samples). Quality 5/5. Tags: sandbox, malware

**abuse.ch Hunting Platform + Auth-Key** | https://hunting.abuse.ch
One query across URLhaus, MalwareBazaar, ThreatFox, YARAify plus Sandnet, IPintel, ProxyCheck; false-positive list. Price: free; Auth-Key mandatory since 30 Jun 2025 (two linked social identities). Date: 11 Mar 2025. Safety 4/5 (governance "undergoing significant changes"). Quality 5/5. Tags: ioc, malware-samples

**Pulsedive** | https://pulsedive.com
IOC search/scan/enrichment, Explore query language, STIX/TAXII feeds. Price: free; Pro $29/mo non-commercial. Safety 4/5. Quality 4/5. Tags: ioc-enrichment

**OpenCTI (Filigran)** | https://github.com/OpenCTI-Platform/opencti
Self-hosted STIX2 CTI knowledge platform. Price: Community Apache-2.0; Enterprise separate. Date: 6.x 2025-2026; 9.9k stars. Safety 5/5 (heavy stack). Quality 5/5. Tags: tip, stix, self-hosted

**enthec/webappanalyzer** | https://github.com/enthec/webappanalyzer
Open continuation of Wappalyzer fingerprints after Wappalyzer went closed. Price: free, GPL-3.0. Safety 5/5. Quality 4/5. Tags: tech-profiling

**Web-Check (Lissy93)** | https://github.com/Lissy93/web-check | https://web-check.xyz
One-page site profiler (DNS, TLS chain, headers, cookies, tech, ports, archives, screenshot). Price: free, MIT. Date: updated through 2026; 34.7k stars. Safety 4/5 (hosted demo is third-party; ports/traceroute touch target, self-host and disable). Quality 4/5. Tags: site-profiler

**Kingfisher (MongoDB)** | https://github.com/mongodb/kingfisher
Rust secret scanner (Nosey Parker fork), 700+ rules, Tree-sitter parsing, live validation of found secrets. Price: free, Apache-2.0. Date: 16 Jun 2025. Safety 4/5 (validation makes live calls with found creds; authorized assets only). Quality 4/5. Tags: secret-scanning, new

**TruffleHog v3** | https://github.com/trufflesecurity/trufflehog
800+ secret types with verification; 2025 CVE-2025-41390 fix, SARIF, S3 filters. Price: free, AGPL-3.0. Safety 4/5 (update past the CVE). Quality 5/5. Tags: secret-scanning

**Gitleaks (maintenance) + Betterleaks** | https://github.com/gitleaks/gitleaks | https://github.com/Betterleaks/betterleaks
Gitleaks now security-patches only; original team moved to Betterleaks. Price: free, MIT. Date: Betterleaks 2026; ~2.2k stars. Safety 4/5 (watch for confusingly named forks). Quality 4/5 / 3/5. Tags: secret-scanning, successor

**Grayhatwarfare** | https://buckets.grayhatwarfare.com
Index of public S3 buckets/files. Price: freemium. Safety 2/5 (viewing listings is passive; downloading others' files may be unlawful). Quality 4/5. Tags: cloud-buckets, gray-area

**checkdmarc** | https://github.com/domainaware/checkdmarc
SPF/DMARC/BIMI/MX/DANE/DNSSEC/MTA-STS/TLS-RPT validator, JSON. Price: free, Apache-2.0. Safety 5/5 (single maintainer). Quality 4/5. Tags: spf, dmarc

**dnstwist** | https://github.com/elceef/dnstwist
Lookalike-domain permutations with registration checks, fuzzy HTML and screenshot hashes, rogue MX. Price: free, Apache-2.0. Date: continuous; 5.7k stars. Safety 5/5. Quality 5/5. Tags: typosquat, phishing

## 9. Verification, archiving, media forensics, browser tooling

Standing caveat for AI-media detectors: WITNESS TRIED benchmark (Jul 2025) found tools unreliable in 36% of real cases; NewsGuard (May 2026, 45 images) found tools disagreed on 35/45 tests; OpenFake (Sep 2025) found older detectors caught ~14% of Grok 2 and ~9% of Midjourney 6 images. Text detectors: no credible 2025-26 study improves on the sub-80% accuracy and high non-native-speaker false-positive findings. Treat every detector as one weak signal.

**Bellingcat Auto Archiver v1.2.x** | https://github.com/bellingcat/auto-archiver
Archives URLs (social, video, images, pages) from Sheets/CLI/API/web UI to WACZ/screenshots/media with hash and timestamp enrichers, perceptual-hash dedup, deletion detection (v1.2.0 Jan 2026), Ghostarchive enricher (Apr 2026), health reports (Sep 2026). Price: free, open source. Safety 4/5 (needs sock-puppet creds for IG/Telegram; your deployment security). Quality 5/5. Tags: archiving, chain-of-custody, wacz

**Browsertrix (Webrecorder)** | https://webrecorder.net/browsertrix/
Browser-based crawler for whole-site/scheduled captures incl. logged-in content, signed WACZ, crawl QA; Sep 2026 rate-limit detection. Price: hosted $30/$60/$120 per month; self-host free. Safety 4/5 (hosted captures live on Webrecorder servers). Quality 5/5. Tags: archiving, signed-capture

**ArchiveWeb.page + ReplayWeb.page** | https://archiveweb.page
Extension/desktop records exactly what you browse to WARC/WACZ; offline replay. Price: free, open source. Date: Conifer successor (Conifer read-only May 2026). Safety 5/5 (local). Quality 4/5. Tags: archiving, local-capture

**ArchiveBox v0.9** | https://archivebox.io | https://github.com/ArchiveBox/ArchiveBox/releases
Rewrite (Sep 2026): PostgreSQL, native apps on all platforms, Personas (cookie profiles), abx-dl CLI, file-hash plugin, TLSNotary signing for verifiable captures. Price: free, MIT. Safety 4/5 (back up before upgrade; Personas reuse cookies; expect bugs from release churn). Quality 4/5. Tags: archiving, self-hosted, tlsnotary

**SingleFile** | https://github.com/gildas-lormeau/SingleFile
Faithful single-HTML page saves, batch, optional SHA-256 blockchain anchoring; CLI. Price: free, AGPL-3.0; ~22k stars. Safety 5/5. Quality 4/5. Tags: capture, local

**Web Archives extension (dessant) v7.3.x** | https://github.com/dessant/web-archives
Lookup archived copies across Wayback, Archive.today, Perma.cc, Ghostarchive, Software Heritage etc. Price: free, GPL-3.0 (Safari paid). Date: Jun 2026 (Memento removed after shutdown). Safety 5/5. Quality 4/5. Tags: archives-lookup, extension

**Ghostarchive** | https://ghostarchive.org
Free on-demand snapshots plus limited video; Auto Archiver enricher Apr 2026. Safety 2/5 (anonymous operator, no retention guarantees). Quality 3/5 (secondary record only). Tags: archiving

**Perma.cc (Harvard Law)** | https://perma.cc
Citation-grade captures. Price: 10 free; free for academics/courts; from $10/mo. Safety 5/5. Quality 4/5. Tags: archiving, legal-citation

**Hunchly 2.0 v2.6.3 (now Maltego)** | https://hunch.ly
Captures every page in an investigation with per-item hashes, offline copies, case reporting. Price: paid annual; bundled in Maltego Entry/Professional. Date: updated Aug 2026; acquired May 2025. Safety 4/5 (local storage, closed source; licensing in flux post-acquisition). Quality 5/5. Tags: evidence-capture, hashing

**Forensic OSINT v3.7.2** | https://www.forensicosint.com
Full-page scrolling capture, video/social capture, hashing, digitally signed PDF reports, Subject Dossier (Elite), Elite Assisted Capture. Price: free tier; Essential/ELITE; Assisted Capture $1,699/yr intro. Date: updated 15 Oct 2026. Safety 3/5 (default stores captures in vendor Azure US cloud unless on-prem; handles PII/auth per store disclosure; closed). Quality 4/5. Tags: evidence-capture, signed-reports, cloud

**Ubikron (ex Vortimo / OSINT-Tool) v1.4.2** | https://www.ubikron.com
Chrome workbench: records pages, infinite-scroll capture, entity extraction, Epieos/IntelX enrichment, OCR, AI assistant, reports. Price: not stated. Date: Sep 2026; 1,000 users. Safety 3/5 (third attempt by same company after two discontinued predecessors; enrichment and AI send data out; closed). Quality 3/5. Tags: workbench, entity-extraction

**Aperture OSINT Workbench v4.3.0 (Firefox)** | https://github.com/petstuk/Aperture-OSINT-Workbench
Classifies pasted indicators locally, runs playbooks across VT/Shodan/AbuseIPDB/urlscan/crt.sh/RDAP, cases with notes/timeline/graph, exports. Price: free, MIT. Date: Sep 2026; 58 users. Safety 4/5 (on-device, no telemetry; broad permissions). Quality 3/5. Tags: extension, indicator-lookup, case-mgmt

**IntelHub v6.0.2 (Firefox)** | https://github.com/tomsec8/IntelHub
Local OSINT workstation extension with lookups, case builder, graph export, privacy hardening (cookie cleanup, WebRTC protection, proxy). Price: free, MIT. Date: Oct 2026; ~100 users. Safety 3/5 (heavy permissions incl. proxy settings; review code). Quality 3/5. Tags: extension, opsec

**Mitaka v2.10.1** | https://github.com/ninoseki/mitaka
Right-click IOC lookup across VT, urlscan, Censys, Shodan; refangs IOCs. Price: free, open source. Date: Aug 2026; 10k users. Safety 5/5. Quality 4/5. Tags: extension, ioc-lookup

**Trace Labs OSINT VM (2025.12 / 2026.05 / 2026.07 / 2026.10)** | https://github.com/tracelabs/tlosint-vm/releases
Pre-built OSINT VM; 2026.05 moved base to Debian 13, added Obsidian with templates, owlculus case mgmt, Undercover Mode; ARM64 build. Price: free, open source. Safety 4/5 (no built-in anonymization; bundles some dormant upstream tools like SpiderFoot). Quality 4/5. Tags: osint-vm, distro

**Forensically (29a.ch) with C2PA** | https://29a.ch/photo-forensics/
Client-side image forensics (ELA, clone, noise, metadata) plus C2PA manifest reading (12 Apr 2025); CSP blocks outbound requests. Price: free. Safety 5/5. Quality 5/5 (author warns signatures do not equal trustworthiness). Tags: image-forensics, c2pa, client-side

**Content Credentials Verify (CAI/Adobe)** | https://verify.contentauthenticity.org
Displays and validates C2PA manifests; Content Credentials 2.3 published 2026. Price: free. Safety 4/5 (upload to Adobe infra). Quality 4/5 (absence proves nothing; screenshots strip credentials). Tags: c2pa, provenance

**C2PA Content Credentials Chrome extension (Digimarc) v0.2.0** | https://chromewebstore.google.com/detail/c2pa-content-credentials/mjkaocdlpjmphfkjndocehcdhbigaafp
Checks page media for C2PA manifests, overlays CR pin, raw JSON, watermark recovery. Price: free. Date: May 2026. Safety 4/5. Quality 3/5. Tags: c2pa, extension

**Exify (Firefox) v2.1.33** | https://addons.mozilla.org/firefox/addon/exify
Hover EXIF/IPTC/XMP overlay, GPS to place, histogram, C2PA badge. Price: free (closed license on open libs). Date: Sep 2026. Safety 4/5. Quality 4/5. Tags: exif, c2pa, extension

**c2patool / c2pa-rs (CAI SDK)** | https://opensource.contentauthenticity.org/docs/c2patool/
CLI/SDK to inspect, validate, sign C2PA manifests. Price: free, open source. Safety 5/5. Quality 4/5. Tags: c2pa, cli

**InVID-WeVerify / vera.ai plugin v0.93** | https://weverify.eu/verification-plugin/
Journalist verification toolbox: keyframes, magnifier, metadata, forensic filters, OCR, fact-check search; registered users get synthetic-image detector, deepfake tab, Hiya voice-clone detector, geolocalizer, C2PA, WACZ archiving. Price: free; advanced tools gated to verified journalists/researchers. Date: 28 Jul 2026; 100k users. Safety 4/5 (media goes to CERTH/AFP/partner servers). Quality 5/5. Tags: verification, keyframes, ai-detection

**Hiya Deepfake Voice Detector** | https://blog.hiya.com/hiyas-new-chrome-extension-identifies-deepfakes
Samples playing audio, returns real-vs-AI voice score; engine inside InVID. Price: free. Date: Nov 2024, wide 2025 adoption. Safety 3/5 (audio to Hiya cloud; "99%" claim untested independently). Quality 3/5. Tags: audio-deepfake, extension

**Hive AI Detector + API** | https://chromewebstore.google.com/detail/hive-ai-detector/cmeikcgfecnhojcbfapbmpbjgllklcbi | https://thehive.ai/apis/ai-generated-content-classification
Right-click AI-likelihood score for image/video/audio/text. Price: extension free; API $6/1,000 images. Date: extension v0.0.10 Jan 2025, stale since. Safety 3/5 (content to Hive). Quality 3/5 (NewsGuard: 0% false positives but 73% catch rate on heavy edits; adversarial evasion shown). Tags: ai-image-detection

**Google SynthID Detector / Gemini verification** | https://blog.google/technology/ai/ai-image-verification-gemini-app/
SynthID portal (May 2025, waitlist) and Gemini "Was this created with Google AI?" (20 Nov 2025). Price: free. Safety 4/5. Quality 3/5 (detects only Google's watermark). Tags: watermark, synthid

**TrueMedia (Georgetown MDI)** | https://www.truemedia.org
Multi-detector deepfake analysis from URL/upload; revived Apr 2025, Georgetown Dec 2025, beta 2026. Price: free, open source. Safety 4/5. Quality 3/5 (beta; no published accuracy). Tags: deepfake-detection, academic

**DeepFake-o-meter v2.0 (U Buffalo)** | http://zinc.cse.buffalo.edu/ubmdfl/deep-o-meter/home_login
18 open detectors with per-detector probabilities. Price: free, 30/day. Safety 4/5 (uploads retained for research). Quality 3/5. Tags: deepfake-detection, academic

**Reality Defender free API** | https://www.realitydefender.com/insights/reality-defender-launches-free-access-to-deepfake-detection-api
50 free detections/month, image and audio, SDKs. Date: 31 Jul 2025. Safety 3/5 (vendor cloud; no quantitative accuracy published). Quality 3/5. Tags: deepfake-detection, api

**OpenFake dataset + Arena** | https://huggingface.co/datasets/ComplexDataLab/OpenFake | https://huggingface.co/spaces/CDL-AMLRT/OpenFakeArena
~3M real + ~963k synthetic images from current generators; Arena lets you try to fool a live detector. Price: free. Date: 11 Sep 2025. Safety 5/5. Quality 4/5 (benchmark, not verdict tool). Tags: dataset, benchmark

**AI or Not / Sightengine / ZeroGPT** | aiornot.com, sightengine.com, zerogpt.com (unverified)
Upload-based AI-image classifiers. Price: freemium. Safety 3/5. Quality 2/5 (NewsGuard May 2026: AI or Not flagged 87% of lightly edited real photos; Sightengine missed 67% of heavy edits; ZeroGPT 20% false positives on real photos). Tags: ai-image-detection

**TELLTALE (The OSINT Vault)** | https://theosintvault.io/telltale
Client-side text review for machine-writing patterns, zero-width characters, unsupported claims; part of a free toolset by a licensed investigator. Price: free. Date: updated Oct 2026. Safety 5/5. Quality 3/5 (heuristics, not validated). Tags: text-analysis, client-side

**RevEye / Search by Image extensions** | via https://www.journalism.co.uk/21-osint-browser-extensions-to-help-your-investigations/
Multi-engine reverse-image launchers (Google, Bing, Yandex, TinEye, Baidu). Price: free. Safety 4/5 (image uploaded to each engine). Quality 4/5. Tags: reverse-image

**Distill Web Monitor** | https://chromewebstore.google.com/detail/distill-web-monitor/inlikjemeeknofckkjolnjbpehgadgge
Browser-local page/section monitoring; paid cloud. Safety 4/5. Quality 4/5. Tags: change-monitoring

**Visualping** | https://visualping.io
Cloud monitor with before/after screenshots and AI summaries. Price: free 5 pages; from $10/mo. Safety 4/5. Quality 4/5. Tags: change-monitoring

**changedetection.io** (self-hosted, open source; 2025-26 release details unverified). Safety 5/5 expected. Tags: change-monitoring

**Indicator (indicator.media)** | https://indicator.media
Silverman/Mantzarlis outlet (May 2025): free weekly briefing, OSINT Navigator, paywalled annual tools-of-the-year list. Safety 5/5. Quality 5/5 as curation. Tags: newsletter, curation

**WITNESS Deepfakes Rapid Response Force** | https://www.gen-ai.witness.org/deepfakes-rapid-response-force/
Escalation path for high-stakes suspected deepfakes (expert multi-tool analysis). Not software. Quality 5/5. Tags: escalation

**Fieldwork.news tool security ratings** | https://fieldwork.news/tools/bellingcat-auto-archiver/
Editorial security ratings of journalism tools. Safety 5/5. Quality 3/5 (editorial, not audit). Tags: triage

**Firefox Multi-Account Containers** | https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/
Per-persona cookie isolation. Price: free, Mozilla. Safety 5/5. Quality 5/5. Tags: opsec, sock-puppet

**User-Agent Switcher and Manager** | https://chromewebstore.google.com/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg
Per-site UA with scheduled randomization. Price: free, open source. Safety 4/5. Quality 4/5. Tags: opsec

## 10. Frameworks, link analysis, case management, directories

**Maltego Graph (CE and paid) + Search + Monitor** | https://www.maltego.com/pricing-plans/
Standard link-analysis platform; browser-based Graph "available soon"; Hunchly bundled since May 2025. Price: Basic €0 (200 credits/mo); Basic+ free for gov/org email; Entry €3,000/yr (vetted); Professional €7,500/yr; Enterprise custom. Safety 4/5 (closed; Data Pass credits route through Maltego). Quality 5/5. Tags: link-analysis, commercial, freemium

**OpenGraph Intel (OGI)** | https://ogi.khas.app | https://github.com/khashashin/ogi
Open-source self-hostable Maltego-style graph workspace: entities, transforms (~20), provenance/evidence snippets, shared investigations, AI Investigator worker. Price: free, AGPL-3.0. Date: beta Apr 2026; 315 stars, CI on PRs. Safety 4/5 (hosted instance uses Supabase; self-host for cases). Quality 3/5 (early, breaking changes expected). Tags: link-analysis, self-hosted, beta

**Gephi Lite** | https://gephi.org/lite/
Browser Gephi: import GEXF/GraphML/CSV, layouts, metrics, export; optional Gist save. Price: free, GPL-3.0. Date: 1.0 publicity 2025. Safety 5/5 (Gists are public by default). Quality 4/5. Tags: graph, network-analysis

**CRADLE (Prodaft)** | https://github.com/prodaft/cradle
Collaborative CTI notes with auto-linked entities, relationship viz, access control, reports. Price: free, MIT. Date: active 2025; 342 stars. Safety 4/5 (demo ships admin:admin). Quality 4/5. Tags: case-mgmt, notes, cti

**CaseBandit** | https://casebandit.com
Local-first offline investigation notebook: evidence, graph, timeline, map, collection log, audit ledger, exports to PDF/HTML/JSON/Obsidian; Pro/Teams coming. Price: free (1 active case); Pro/Teams waitlist. Date: 2026 beta, France. Safety 3/5 (app closed source; only verifier open; zero-knowledge sync unaudited). Quality 3/5. Tags: case-mgmt, local-first, beta

**Osintracker v2** | https://www.osintracker.com (unverified live)
Free browser-based tracker: entities, links, graph, timeline, tasks; browser-local storage. Safety 3/5 (export regularly; verify current hosting). Quality 3/5. Tags: case-mgmt, free

**Obsidian OSINT Templates (resistec)** | https://github.com/resistec/obsidian-osint-templates
Templater entity templates for an interlinked case vault; Trace Labs VM now ships Obsidian. Price: MIT. Date: Jul 2024, static; 182 stars. Safety 4/5 (Templater runs JS). Quality 3/5. Tags: notes, obsidian

**Trace Labs OSINT VM** - see section 9.

**Osmedeus** | https://github.com/j3ssie/osmedeus (unverified live)
Workflow engine for custom recon pipelines, distributed scanning. Price: open source. Safety 4/5 (noisy). Quality 4/5. Tags: recon, workflow

**reconFTW** | https://github.com/six2dez/reconftw (unverified live)
Chains 50+ recon tools. Price: open source. Safety 4/5 (use passive flags). Quality 4/5. Tags: recon, bug-bounty

**SpiderFoot (status)** | https://github.com/smicallef/spiderfoot
No commits since Nov 2023; HX went to Intel 471. Quality 2/5 going forward. Use BBOT, OpenOSINT, OGI.

**OSINTall** | https://github.com/AnonymousSOC/OSINTall
CLI/TUI bundle (domain, username/email/phone, breaches, buckets, EXIF, dorking, Maltego export). Price: MIT. Date: 2026; 0 stars, 10 commits. Safety 1/5 (installer wants root; update path runs git reset --hard then re-runs installer; anonymous author). Quality 1/5. Tags: framework, caution

**OBSIDIAN (nadiee567-lgtm)** | https://github.com/nadiee567-lgtm/obsidian
Keyless-first recon framework, 104 transforms, graph, correlation rules, Tor routing, optional local AI. Price: PolyForm Noncommercial. Date: 2026; 0 stars, self-described learning project. Safety 2/5 (zero independent review; includes stealer-log lookups). Quality 2/5. Tags: framework, unvetted

**Bellingcat Online Investigations Toolkit** | https://bellingcat.gitbook.io/toolkit | https://github.com/bellingcat/toolkit
Community-maintained directory with cost, difficulty, tracker warnings and ethics per tool; "New Tools" page. Price: free. Date: Jun 2026 drive; pushed Sep 2026. Safety 5/5. Quality 5/5. Tags: directory, vetted

**The OSINT Rack** | https://osintrack.com
Filterable directory of 547 resources with date-added. Price: free. Date: through 16 Oct 2026. Safety 3/5 (anonymous operator; paid vendor "technical review" is a conflict of interest). Quality 3/5. Tags: directory

**Max Intel tools page** | https://maxintel.org/osint-tools.html
Directory of 90+ repos/APIs plus offline in-browser utilities (Evidence Logger with SHA-256 chain, FOIA tracker, Report Builder); flags abandoned tools. Price: free. Date: Oct 2026. Safety 4/5. Quality 3/5 (date-added, not release date). Tags: directory, offline-utilities

**OSINT Field Notes (Benjamin Strick)** | https://osintfieldnotes.substack.com
Monthly tradecraft notes since Nov 2025. Safety 5/5. Quality 5/5. Tags: newsletter

**GIJN Toolbox** | https://gijn.org/stories/toolbox-geolocation-deportation-data-collaboration/
NICAR 2026 toolbox. Safety 5/5. Quality 5/5. Tags: curation

## 11. Dark web and Tor research

**Robin** - see section 1.

**darkdump** | https://github.com/josh0xA/darkdump
Queries six onion search engines (Ahmia default), optional scraping for emails/metadata/docs, Ahmia abuse-blacklist filter; terminal or local web UI. Price: free, MIT. Date: v3 2025; 73 commits. Safety 3/5 (use a VM and Tor; blacklist reduces but does not eliminate exposure). Quality 3/5. Tags: dark-web, tor, cli

**TorBot (OWASP)** | https://github.com/DedSecInside/TorBot
.onion crawler building link trees, liveness, titles; TorBot Analyst AI with local Ollama default; desktop app. Price: GPL. Date: AI analyst 2025-2026; 4.8k stars. Safety 4/5 (local-LLM default). Quality 4/5. Tags: dark-web, crawler, owasp

**Ahmia** | https://ahmia.fi | https://github.com/ahmia/ahmia-site
Filtered open-source Tor/I2P search engine, Tor Project-endorsed, public abuse blacklist. Price: free. Safety 4/5 (clearnet queries visible to operators). Quality 4/5. Tags: dark-web, search-engine

**IACA Dark Web Investigation Support** | https://iaca-darkweb-tools.com
Netherlands anti-crime academy portal: 106 monitored Tor engines with uptime checks, dictionary, manual, ransomware feeds (Ransomware.live, RansomLook). Price: free, "nothing logged". Safety 4/5 (claim unverifiable; links include marketplaces for reference). Quality 4/5. Tags: dark-web, directory, training

**deepdarkCTI** | https://github.com/fastfire/deepdarkCTI
Continuously updated source lists (Telegram channels, forums, leak sites, stealer markets, actor handles). Price: GPL-3.0. Date: 3,589 commits; 7.3k stars. Safety 3/5 (points to criminal infra; isolated environment only). Quality 5/5. Tags: dark-web, cti, source-list

**OnionSearch (status)** | https://github.com/megadose/OnionSearch
No recent activity; several engines dead. Quality 2/5. Use darkdump or Robin.

## 12. Cryptocurrency tracing

**MetaSleuth (BlockSec)** | https://metasleuth.io
Visual fund-flow tracing across BTC, ETH, BSC, TRON, Solana, L2s; 600M+ labels; CEX/mixer path surfacing; alerts; shareable canvases; Labels/Risk APIs. Price: freemium. Safety 4/5 (closed; shared canvases are public links). Quality 5/5. Tags: crypto, tracing, multichain

**Arkham Intelligence** | https://platform.arkhamintelligence.com (fetch failed; unverified live)
Entity-labelled explorer and visualizer, alerts, Intel Exchange deanonymization bounties. Price: free with account; Ultra paid. Safety 3/5 (Intel Exchange is an ethical/legal gray zone). Quality 4/5. Tags: crypto, entity-labels

**GraphSense (Iknaio)** | https://graphsense.org
Open-source cryptoasset analytics (BTC, BCH, LTC, ZEC, ETH, TRON), REST API, TagPacks, Maltego transform; hosted on request. Price: MIT; hosted paid. Date: updated Sep 2026. Safety 5/5. Quality 4/5 (self-host is heavy: Spark + Cassandra + full nodes). Tags: crypto, open-source, self-hosted

**Breadcrumbs (status)** | https://www.breadcrumbs.app
Did not respond during research; 2025 reports suggest service changes. Verify before relying on it. Quality 2/5 pending.

**Free explorers set (from aaarghhh curated list)** | https://github.com/aaarghhh/awesome_osint_blockchain_analysis
Blockchair https://blockchair.com, 3xpl https://3xpl.com, Bitquery https://www.bitquery.io, Cielo https://app.cielo.finance, Ward Graph https://wardgraph.com, re:doubt https://redoubt.online (open-source TON), TrackEnn https://github.com/kennbroorg/trackenn (open-source ETH tracing). Safety 4/5 (avoid anything requiring a wallet connect, or use a burner). Quality 3-4/5. Tags: crypto, explorers

## 13. Corporate registries, sanctions, public records, lobbying, leaks

**OCCRP Aleph Pro** | https://aleph.occrp.org
Investigative data platform (registries, leaks, courts, procurement, sanctions) re-platformed as hosted SaaS 15 Dec 2025. Price: public instance free; nonprofit newsrooms free (1 TB); others tiered. Safety 5/5 (OCCRP states it does not access user uploads; new stack's open-source status unconfirmed). Quality 5/5. Tags: corporate-records, leaks, journalism

**OpenSanctions + yente** | https://www.opensanctions.org | https://www.opensanctions.org/changelog
Consolidated sanctions/PEP/watchlist/ownership graph with match/search API; 2025-26: PEP influence levels, logic-v2 matching, explanations field, prepaid credit bundles (Sep 2026), ofac matcher Jan 2027, yente needs Elasticsearch 9 by Jan 2027. Price: bulk data CC BY-NC 4.0; free API keys for journalists/nonprofits/academics; for-profit licensed. Safety 5/5. Quality 5/5 (note for CrowdCase, SPC: an SPC is a for-profit form, so check with OpenSanctions whether the public-benefit exemption applies before commercial use). Tags: sanctions, pep, kyb, api

**Moov Watchman** | https://hub.docker.com/r/moov/watchman | https://github.com/moov-io/watchman
Open-source sanctions screening server: OFAC SDN, US CSL, EU, UK OFSI; fuzzy API, web UI, webhooks. Price: Apache-2.0. Date: v1.2.2 Oct 2026. Safety 5/5. Quality 4/5 (government lists only; you refresh lists; EU list needs account). Tags: sanctions, self-hosted

**OpenScreening (status)** | https://www.openownership.org/en/publications/openscreening/
Beneficial ownership + sanctions graph in Linkurious; hosted demo appears retired/moved. Quality 2/5 (replicate with OpenSanctions graph dataset + Gephi Lite/OGI). Tags: beneficial-ownership

**OpenCorporates** | https://opencorporates.com
200M+ companies; officers/filings require free registration since Aug 2023; public-benefit users free; commercial licensed. Safety 4/5 (searches tied to identity; no scraping). Quality 5/5. Tags: corporate-registry

**Castellum.AI** | https://castellum.ai
Sanctions/export-control/PEP/adverse-media screening, bulk 2,000 names, audit PDFs; free check status unverified. Price: paid. Safety 4/5. Quality 4/5. Tags: sanctions, screening

**Sayari** | https://sayari.com (unverified)
Corporate ownership and trade data. Price: paid. Safety 4/5. Quality 4/5. Tags: corporate, trade-data

**CourtListener RECAP Search Alerts + MCP (Free Law Project)** | https://www.courtlistener.com | https://free.law/2025/06/18/recap-search-alerts-for-pacer/
Saved searches over RECAP/PACER filings email on new matches; official MCP server (search, docket alerts, citations, document reading). Price: 5 free daily alerts; membership $10 to $100/mo for more. Date: 18 Jun 2025. Safety 5/5 (RECAP extension uploads documents you buy to the public archive, by design). Quality 5/5. Tags: court-records, pacer, alerts, mcp

**DocumentCloud redesign + MuckRock API v2** | https://www.documentcloud.org | https://muckrock.com/news/archives/2025/jan/13/release-notes-introducing-the-new-documentcloud-and-version-2-of-the-muckrock-api
Rebuilt DocumentCloud, FOIA API v2, add-ons (OCR, entity extraction), IPFS uploader. Price: free for verified journalists/researchers; MuckRock requests paid. Date: 13 Jan 2025. Safety 4/5 (uploads public unless set private; add-ons may call third-party AI). Quality 5/5. Tags: documents, foia

**OpenLobby** | https://www.openlobby.us
Free no-login search over 726k+ Senate LDA filings cross-referenced with contracts, Medicare spending, workforce; revolving-door tracker, foreign lobbying, downloads. Price: free. Date: data through Q2 2026. Safety 4/5 (independent operator; cite underlying filings, not its editorial scores). Quality 4/5. Tags: lobbying, public-records

**LobbyingData.com** | https://lobbyingdata.com (unverified live)
Daily LDA filings dashboard. Price: free per launch. Quality 3/5. Tags: lobbying

**Library of Leaks (DDoSecrets)** | https://search.libraryofleaks.org
Aleph-based full-text search over millions of leaked documents; Reserved collection requires vetting + hardware MFA. Price: free. Date: Dec 2024, traction 2025. Safety 3/5 (hacked material; handling/publication obligations vary; document provenance carefully). Quality 5/5. Tags: leaks, documents, journalism

**ICIJ Datashare** | https://datashare.icij.org | https://github.com/ICIJ/datashare-docs
Self-hosted document search: Elasticsearch, Tika, Tesseract OCR, NER, tagging, plugins; laptop to cluster. Price: free, open source. Safety 5/5 (local-first). Quality 5/5. Tags: documents, ocr, ner, self-hosted

**Platform ad libraries (2025 landscape)**: Meta https://www.facebook.com/ads/library, Google https://adstransparency.google.com, TikTok https://library.tiktok.com, LinkedIn https://www.linkedin.com/ad-library/home, Snap https://snap.com/en-US/political-ads
Free. Meta/Google stopped EU political ads late 2025, so EU political data is historical; retention windows are short (Google commercial ~30 days), archive immediately. Safety 5/5. Quality 4/5. Tags: ad-library, influence-ops

**Information Laundromat (ASD/GMF)** | https://informationlaundromat.com
Compares a site's content and infrastructure (analytics IDs, hosting, templates) to find related/copycat outlets. Price: free, open source. Date: 2024, wider adoption 2025. Safety 5/5. Quality 4/5 (lead generator; false positives on shared commodity infra). Tags: influence-ops, website-attribution

---

## Excluded or flagged (do not use, or use only with legal review)

Combolist/stealer-log reveal marketplaces (LeakRadar-style), Snusbase-class resellers, Telegram "lookup bots", BreachDirectory/Leak-Lookup/LeakPeek-class dump engines; WhatsApp/Apple-ID checker wrapper repos; "GeoSpy" clone sites; linkedin-osint-toolkit (stores LinkedIn password, advertises anti-detection); Discord "OSINT" repos bundling token tools; cord.cat and skopio.io (no operator named, unverified); commercial "cheater finder" dating services; Unifuncs/U Deep Research (no company details); Oceanir, GeoAxis, GeoInfer, GeoZip/Pinzy/GeoSnap (vendor cross-marketing only).

## Gaps (search budget ran out before verification; worth a follow-up pass)

Chinese-jurisdiction engines (FOFA, ZoomEye web, Quake, Hunter.how); Team Cymru Scout, Spamhaus, MS Defender TI, DomainTools, WhoisXML, SecurityTrails; cloud_enum/S3Scanner, Nosey Parker, grep.app; Discord tooling; dating/gaming beyond Steam/Minecraft; Kali 2025.x OSINT metapackage, Tsurugi, CSI Linux; yt-dlp/cobalt status; Junkipedia, Meedan Check; Kasm/Mullvad Browser; Flightradar24 API terms, Planet Insights Platform; legal license-plate/vehicle lookups (DVLA, NHTSA vPIC, PlatesMania), Regrid property; Cosmograph; LobbyView/OpenSecrets/USAspending; UniCourt/Trellis; Castrick Clues; DorkGPT, PeopleGPT/Juicebox; Indicator's paywalled "OSINT 2025 tools of the year" list.
