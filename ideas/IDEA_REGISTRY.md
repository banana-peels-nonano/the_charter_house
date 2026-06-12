# Idea Registry — Complete Extraction from This Conversation

Every startup idea, wedge, dataset, thesis, and rejection discussed, in order of appearance. No new ideas added. Status reflects the conversation's final verdict.

---

## Part 1 — The $1B Hunt (first analysis)

### 1.1 Quick kills (crowded categories, eliminated on sight)

| Name | Original thesis | Why promising | Major criticisms | Competitors | Status | Key lesson |
|---|---|---|---|---|---|---|
| Legal AI | AI for legal document work | Lawyers spend 40–60% of time on documents | Saturated; unicorns already crowned; ~4% of YC W26 | Harvey, Legora | Killed (round 1) | A category with named unicorns is closed to a $50k founder |
| AI customer support agents | Autonomous support resolution | Huge labor spend | Sierra at $150M ARR, half the Fortune 50 | Sierra, Decagon | Killed (round 1) | Same |
| AI coding agents | Autonomous software engineering | Largest proven AI spend | Cursor $100M→$2B ARR in 13 months; capital war | Anysphere/Cursor, Cognition/Devin | Killed (round 1) | Never compete where the leader grows faster than you can hire |
| AI SDRs | Automated outbound sales | Universal pain | Saturated; spam arms race | dozens | Killed (round 1) | — |
| Healthcare scribes | Ambient clinical documentation | Clear ROI, burnout crisis | Saturated | Abridge et al. | Killed (round 1) | — |
| Gov-RFP writers | AI proposal drafting for govcon | Painful workflow, WTP | Multiple YC companies per batch | several YC cos | Killed (round 1) | — |
| Meeting notetakers | AI meeting summaries | Universal use case | Commodity; bundled by platforms | many | Killed (round 1) | Features of platforms are not companies |

### 1.2 Finalists (full framework applied, then attacked)

**A. Specialty Insurance MGA Back Office**
- **Thesis:** $200B of specialty premium moves over email; AI agents automate submission intake and claims ops for MGAs/wholesale brokers.
- **Why promising:** ~$15B+ ops spend; fragmented incumbents; document-heavy work AI handles well; insurance attrition (~400k workers) creates staffing gaps.
- **Criticisms:** 18 months late; funded entrants already selling; carriers demand SOC 2/E&O a $50k founder can't show; slow carrier procurement.
- **Competitors:** FurtherAI, Hedge, Avallon, Sprout.ai, PolicyFly.
- **Status:** Eliminated — crowding without a superior wedge.
- **Lesson:** "Fragmented incumbents" isn't enough if the startup layer is already crowded.

**B. AI-Native Freight Audit & Payment**
- **Thesis:** ~20% of freight invoices contain errors; AI audit on contingency pricing displaces ancient incumbents.
- **Why promising:** Contingency revenue; incumbent (Cass) is decades old; clear measurable savings.
- **Criticisms:** Loop raised $50M+ doing exactly this; payment float requires a balance sheet — capital IS the moat, violating the capital constraint.
- **Competitors:** Loop, Cass, AFS, nVision.
- **Status:** Eliminated.
- **Lesson:** Check whether the real moat in a category is capital before entering it undercapitalized.

**C. Medical Claim Denials & Appeals**
- **Thesis:** AI drafts appeals and works denials on contingency; huge waste pool.
- **Why promising:** Strong willingness to pay (% of recovered claims); fragmented providers.
- **Criticisms:** Crowded; payers deploy counter-AI with more data than you (adversarial arms race you lose); long health-system sales cycles.
- **Competitors:** Candid Health, Adonis, many others.
- **Status:** Eliminated.
- **Lesson:** Avoid adversarial markets where the counterparty has more data and also has AI.

**D. RECOUP — The AI Customs Broker (duty drawback wedge)** ⭐ original winner
- **Thesis:** The 2025–26 tariff shock multiplied US duties paid (~$80B → ~$200B/yr). 19 U.S.C. §1313 refunds 99% of duties on goods later exported/destroyed, with a 5-year lookback. Manual incumbents only serve the Fortune 500; AI collapses claim-prep cost so the mid-market becomes serviceable. Enter on 15–20% contingency, then convert the ingested trade data into a recurring compliance platform ("AI customs broker"). Avalara ($8.4B exit) as the platform comp.
- **Why promising:** Hit every constraint: <$50k start (contingency = revenue from deal one, no procurement cycle), dated macro "why now," Berkshire-owned manual incumbents (Charter Brokerage) with no software DNA, statutory 5-year recordkeeping as lock-in, licensing as a tourist filter, public trade data enabling "you are owed $X" outbound.
- **Major criticisms (the YC-partner takedown):** (1) TAM quietly gutted — IEEPA and Section 232 duties are drawback-ineligible, leaving a 301+MFN pool of maybe $3–6B/yr in refunds → industry-wide fee pool under ~$1B; (2) AI commoditizes your own premise — incumbents get the same models for $20/seat; the scarce assets (license, bond, trust, book) are theirs; (3) trust wall fatal for a solo founder asking CFOs for their full trade books; (4) melting ice cube — the lookback is one-time inventory and tariff normalization drains the forward pool; (5) services gravity — recovery success doesn't prove subscription demand; the platform conversion is the real startup with zero evidence; (6) the 7-agent build system optimized the 95% of hours that were never the bottleneck (trust, license, signatures).
- **Competitors:** Charter Brokerage (Berkshire), Comstock, Alliance Drawback (manual incumbents); Flexport (could bundle free); Avalara/Descartes/Thomson Reuters ONESOURCE (compliance software); Gaia Dynamics-class AI entrants.
- **Status:** Fully designed (7-agent execution system, 5-phase plan, $50k budget) then **rejected as a venture investment**. Probabilities assigned: ~12% to $100M, ~2–3% to $1B, ~30% lifestyle business, ~55% dead. Investment verdict: No at pre-traction; $150k conditional on domain co-founder + 3 LOIs + broker partnership + 1 paying subscription customer.
- **Key lessons (these became the next framework):** Founder economics ≠ investor economics — a great business to start can be a bad venture bet. Never build where model progress arms incumbents equally. Demand pools that deplete are not markets. Don't let scarce assets sit in incumbent hands. Contingency revenue = services gravity.
- **Sub-products designed within RECOUP (status: died with it):** post-summary corrections (recover misclassification overpayments), classification SaaS, FTA/USMCA qualification, tariff-engineering simulations, first-sale valuation, CBP audit defense, EU inward-processing relief, duty financing (advances against pending claims), AI entry filing.

---

## Part 2 — The Inverted Framework Round (20 ideas)

**Derived market thesis:** Build complements to model progress, not applications of it. Ask what AI makes *scarce* — verified ground truth, machine-readable access to the offline world, accountability, machine findability/transactability — and build there. Ten filters: AI strengthens the moat; cheaper models help; market grows with AI; recurring day one; no license; solo-buildable MVP; no enterprise sales; payment within 30 days; $10B+ TAM; value rises as models improve.

### 2.1 Quick kills

| Name | Thesis | Why promising | Criticism | Competitors | Status | Lesson |
|---|---|---|---|---|---|---|
| Agent observability/evals | Monitoring + eval infra for agents | Every agent deployment needs it | Crowded; labs bundle free | Braintrust, LangSmith, Arize | Killed | Model providers bundle adjacent devtools |
| RL environments marketplace | Sell training environments to labs | Labs starved for environments | ~5 buyers; enterprise sales; in-housing | Scale-class vendors | Killed | Concentrated buyers fail the distribution filter |
| AI security / prompt-injection testing | Red-team agents as a service | Agentic attack surface exploding | Safety is the labs' core competence; crowded | Lakera et al. | Killed | Don't sell the thing your supplier must build to survive |
| Payment rails for agents | Money movement for agentic commerce | Agents will transact | Stripe/Visa/Mastercard shipped agentic protocols | Stripe, Visa, Mastercard | Killed | You don't out-rail Stripe |
| KYA / agent trust scoring | "Know Your Agent" identity scores | Fraud wave coming | No urgent buyer until regulation; standards bodies decide | — | Killed | Markets that need a crisis to exist can't be timed |
| Prior-auth automation | AI prior-auth for providers | Massive admin waste | Crowded; hospital sales; payer counter-AI | Co:Helm, Anterior et al. | Killed | Adversarial + slow sales = double fail |
| Independent-practice back office | Agent suite for small clinics | Underserved SMB segment | Saturated, churny | many | Killed | — |
| Freight booking/quoting agents | Voice/email agents for freight | Brokers drown in calls | Crowded | HappyRobot, Vooma | Killed | — |
| Deepfake detection / provenance | Authenticate content in AI flood | Obvious societal need | Detection is an arms race you structurally lose; standards owned by Adobe/C2PA | C2PA coalition | Killed | Never bet against the generator improving |
| Expert data networks | Domain experts produce vertical training data | Labs pay enormous sums | Mercor/Scale/Surge own it; lab-concentrated revenue | Mercor, Scale, Surge | Killed | — |
| Memory/context layer for agents | Persistent memory infra | Every agent needs memory | Crowded; providers building native memory | mem0, Zep, Letta | Killed | Native-roadmap features are death zones |
| MCP tool marketplace | App store for agent tools | New distribution channel | Registry layer owned by OpenAI/Anthropic | platform owners | Killed | Total platform dependency |
| AI-native ERP for one trade | Rebuild a blue-collar vertical's system of record | Right thesis on vertical AI | Too big for a solo MVP | ServiceTitan et al. | Killed | Respect the founder constraint, not just the market |
| SMB voice agents | AI phone lines for SMBs | Universal missed-call pain | Most crowded category in AI | hundreds | Killed | — |
| Autonomous RFQ/supplier discovery | Procurement agents for mid-market mfg | Expensive inefficiency | Data moat thin until scale; sales cycles violate 30-day rule | Procure.ai-class | Killed | — |
| Govtech permit-processing AI | AI for municipal permitting backlogs | Real government pain | Sales cycle alone fails the 30-day filter | OpenGov, GovWell | Killed | Govtech sells slowly no matter how good the AI |

### 2.2 Semifinalists

**Agent Identity & Permissions ("Okta for agents")**
- **Thesis:** Agents need identity, scopes, and permissioning infrastructure as they act on systems.
- **Why promising:** Demand grows directly with agent adoption; infrastructure positioning.
- **Criticisms:** Okta, Microsoft, Cloudflare all announced; winners decided by standards politics, not product; the scarce asset (standards) held by incumbents — RECOUP criticism #3 in reverse.
- **Competitors:** Okta, Microsoft Entra, Cloudflare; MCP auth standards.
- **Status:** Semifinal, killed.
- **Lesson:** Standards-governed layers reward consortium members, not startups.

**Job-Shop Quoting Intelligence (manufacturing)**
- **Thesis:** AI quoting for custom-parts job shops; quote→win pricing data compounds into a moat.
- **Why promising:** Real data flywheel; SMB self-serve; recurring SaaS; fast sales.
- **Criticisms:** Paperless Parts is a funded incumbent; TAM caps ~$2–3B — a $300M company, not $10B.
- **Competitors:** Paperless Parts.
- **Status:** Semifinal, killed on TAM.
- **Lesson:** A wonderful small business fails a $10B filter — know which game you're playing.

### 2.3 The three finalists

**F1. Structured-Records Data Utility ("Bloomberg of the offline long tail")** ⭐ round winner
- **Thesis:** AI agents continuously extract, normalize, and archive the public-but-unstructured record layer of the physical economy across ~20,000 fragmented local sources; sell API subscriptions to insurers, lenders, suppliers, proptech, and other companies' AI agents. Construction permits proposed as the initial wedge (later overturned — Part 3).
- **Why promising:** The only candidate satisfying all 10 filters without an asterisk. Model price cuts reduce COGS while agent adoption raises demand (long model progress on both sides of the P&L). The archive cannot be backfilled — time itself is the moat. Comps: Verisk ($40B+), CoStar, FactSet — proof of $10B+ ceilings and 12–20× revenue multiples.
- **Criticisms:** Unglamorous; acquisition grind; value depends on choosing the right record class (Part 3 exists because of this).
- **Competitors (category-level):** Dodge, CoreLogic, ATTOM, Verisk — stale, partial, human-pipeline incumbents.
- **Status:** Ranked #1 of the three finalists; advanced to wedge selection (Part 3).
- **Lesson:** The best AI businesses may be data businesses where AI is the cost structure, not the product.

**F2. Agentic-Commerce Enablement Layer**
- **Thesis:** As buying shifts to AI assistants, merchants need to know how agents see/rank them (monitoring), structure themselves to win (optimization), and transact (hosted agentic storefront — MCP/commerce endpoints). "SEO+Shopify for the agent web."
- **Why promising:** Largest TAM (successor to the $80B SEO/martech complex + transaction take rate); demand is a pure function of AI adoption; Deloitte projects $1T of customer-inertia revenue in play; PLG distribution.
- **Criticisms:** The interface is owned by OpenAI/Google/Anthropic (platform risk — the one flaw the framework was built to exclude); visibility/analytics side crowding fast (Profound et al.); must race to the transaction layer before analytics commoditizes.
- **Competitors:** Profound and AEO startups; Semrush/Ahrefs (legacy); Shopify (checkout side); the model platforms themselves.
- **Status:** Ranked #2. Dormant.
- **Lesson:** Huge TAM doesn't cure platform dependency.

**F3. AI-Work Verification Network ("accountability as a service")**
- **Thesis:** Cheap intelligence makes output abundant and assurance scarce. A network of credentialed experts (CPAs, engineers, clinicians, attorneys) + AI triage reviews and signs off on AI-produced work. Byproduct: the world's best dataset of where AI work fails by domain.
- **Why promising:** Demand grows monotonically with AI capability; model providers structurally can't compete (self-certification isn't credible); two-sided network + failure-mode data flywheel; Big 4 cost structures vulnerable.
- **Criticisms:** Services gravity (RECOUP's disease); two-sided cold start; review liability; most likely to plateau as a $50M business.
- **Competitors:** Big 4 assurance (incumbent), none direct at AI-native form.
- **Status:** Ranked #3. Dormant.
- **Lesson:** Contrarian + defensible doesn't outweigh execution risk for a solo founder.

---

## Part 3 — The Data-Wedge Round (22 datasets for the Structured-Records Utility)

Scored on 9 criteria (acquisition ease, fragmentation, update frequency, commercial value, buyer count, buyer access gap, AI advantage, defensibility, speed to revenue), max 45.

**Structural lesson of the round:** centralized/easy data = no moat (UCC, OSHA, EPA, federal procurement, business registrations all died this way); adversarially obscure data = moat. And the diligence rule: verify crowding before assuming a wedge is open — permits looked open and weren't.

### 3.1 The dethroned favorite

**Construction Permits (33/45)**
- **Thesis:** Nationwide permit extraction from ~20k jurisdictions; sell to insurers, lenders, trades, PE. The original proposed wedge.
- **Why promising:** BuildFax precedent (acquired by Verisk-class buyer) proved insurer WTP; biggest buyer pool; daily updates; high commercial value.
- **Criticisms:** Already taken by an AI-native funded incumbent — Shovels ($7.6M raised, 2,000+ jurisdictions, 180M permits, MRR tripling, SOC 2, acquired ReZone in 2026) — plus Dodge, ConstructConnect, BuildZoom, ATTOM, PermitStack. "Buyers already have access" scored 1/5.
- **Status:** Dethroned as wedge; remains validation that the data-utility model works.
- **Lesson:** Your second-best insight is often someone's existing company. Search before you build.

### 3.2 The winner

**Code Violations / Enforcement Actions (39/45)** ⭐ final wedge
- **Thesis:** The property risk-event layer: code-enforcement actions, habitability complaints, unpermitted-work citations, fire-code failures across ~19k jurisdictions — the same insurer thesis as BuildFax, with nobody occupying it.
- **Why promising:** Adversarially obscure (FOIA, Accela/CityView portals, inconsistent PDFs) = acquisition pain is the moat and LLMs are the solvent; per-property history can't be backfilled; insurers already pay eight figures for property-condition signals (Cape Analytics precedent) that imagery can't see; two-speed monetization — fast cash from real-estate-investor distressed-leads ($100–500/mo) funding slow enterprise book-monitoring deals ($50k–500k/yr); partial coverage sellable (metro-local value); big-city open-data portals (NYC, Chicago, LA) give a sellable dataset in weeks; property-level not person-level → low FCRA risk if ToS bans screening uses.
- **Criticisms:** Insurer sales cycles slow (mitigated by investor revenue); ATTOM markets a partial violations file (verify in diligence); sparse data in small towns (value concentrates in metros).
- **Competitors:** ATTOM (partial/stale); no AI-native national aggregator found.
- **Status:** **Selected wedge.** Immediate plan: extract top ~15 open-data cities, property-keyed event schema, $299/mo investor-leads product inside 30 days.
- **Lesson:** The winning record class is the one the source doesn't want found — obscurity is the moat AI unlocks.

### 3.3 Runners-up and notable evaluations

| Dataset | Score | Thesis | Criticism / Competitors | Status | Lesson |
|---|---|---|---|---|---|
| Zoning/entitlement applications | 37 | Earliest signal in development cycle; council agendas/minutes/videos = maximal AI advantage | Land grab started: InfoScout, PermitPortal, Civic Atlas; Shovels bought ReZone — funded convergence | #2; expansion candidate | Being early-contested beats crowded but loses to empty |
| SLED procurement bids | 36 | AI-native bid aggregation undercutting GovWin ($5–15k/yr, hated) | Bids are published to be found → zero acquisition moat; GovSpend, BidPrime, BidNet exist | #3; cash-flow side wedge only | Data that wants distribution can't be a moat |
| Building inspections | 35 | Property condition events | Hardest acquisition; same buyer as violations | Merged into winner as SKU #2 | — |
| Fire inspections | 33 | Fire-code risk events | Least digitized | Merged into winner | — |
| Civil court records | 33 | Litigation risk data | UniCourt, Trellis funded; FCRA taint | Killed | — |
| Professional licensing + disciplinary actions | 32 | Enforcement events for liability insurers, credentialing | Healthcare credentialing crowded (Verifiable, Medallion); rare-event volume | Sleeper — SKU #3 for same insurance buyers | — |
| Evictions | 30 | Tenant screening signal | FCRA = consumer-reporting regulation → violates no-license rule | Killed | Person-level data for screening drags in regulation |
| Utility interconnection queues | 30 | Energy/data-center development signal | Narrow buyer pool | Honorable mention | — |
| Mechanics liens | 29 | Construction credit signal | Title plants already capture recorded docs; Levelset (Procore) owns workflow | Killed | — |
| Liquor licenses | 29 | New-restaurant-opening leads | Small TAM | Killed | — |
| Health inspections | 28 | Food-safety risk data | Hazel Analytics taken by Ecolab | Killed | — |
| Foreclosure notices | 27 | Distressed-property leads | ATTOM/RealtyTrac; saturated investor-lead market | Killed | — |
| Contractor licenses | 26 | License verification for marketplaces/insurers | State-level = low fragmentation; verification APIs exist | Killed as wedge | — |
| Property deeds/assessor | 26 | Core property data | Industrialized: CoreLogic, First American, ATTOM | Killed | — |
| Tax liens/judgments | 26 | Lending risk signal | Partial existing coverage | Killed | — |
| Federal procurement | 25 | Contract intelligence | Centralized & free (SAM/FPDS) → no moat | Killed | — |
| Environmental permits/violations | 24 | ESG/lender diligence | EPA ECHO centralizes; ESG demand fading | Killed | — |
| Business registrations | 24 | KYB data | Middesk, OpenCorporates own it | Killed | — |
| UCC filings | 23 | Lien/lending data | 50 centralized sources; Wolters Kluwer/CSC resell | Killed | — |
| OSHA violations | 23 | Workers-comp underwriting signal | Federal, centralized, free | Killed (kept as enrichment layer) | — |

---

## Part 4 — Meta-Systems (business concepts that are machines, not startups)

**RECOUP Execution System (7-agent solo-founder org)**
- **Thesis:** A solo founder + Claude Code can run a 10-person-shaped company via 7 file-coordinated agents (chief-of-staff, compliance-researcher, prospect-intel, gtm, pipeline-engineer, product-engineer, claims-qa, + scheduled security-reviewer), founder-routed communication, hard phase gates, and adversarial QA.
- **Why promising:** Made the $50k constraint plausible; agent specs + Day-0 bootstrap were fully production-ready.
- **Criticism:** Optimized the 95% of work-hours that were never the bottleneck (trust, license, signatures).
- **Status:** Designed, then orphaned when RECOUP was rejected. Patterns recycled into THE FORGE.
- **Lesson:** Agent org charts don't fix businesses whose constraint is human trust.

**THE FORGE — Startup Factory**
- **Thesis:** Stop optimizing for the perfect startup; build the machine that discovers, validates, builds, and launches repeatedly. Three laws: real-world signal is the bottleneck; WIP limits are the factory (3 validating / 1 building); every kill must bank an asset. Five agents (scout, analyst, builder, growth, ops), 8-stage gated pipeline, experiment engine with numeric thresholds and Friday kill day, template-first builds, merchant-of-record payments for global sales from India.
- **Why promising:** Converts one founder's time into compounding validation throughput; survives individual idea failures by design.
- **Criticisms (self-imposed design constraints):** Portfolio sprawl and self-deception are the failure modes — hence WIP limits, binary verdicts (inconclusive = fail), one lifetime "one-more-week" per idea, logged overrides.
- **Status:** Fully designed with bootstrap prompt; current operating system going forward.
- **Lesson:** The factory compounds; individual startups are allowed to fail.

---

## Part 5 — Market theses extracted along the way

1. **Vertical beats horizontal** in applied AI; demand concentrates where errors carry legal/financial/safety consequences (legal, health, finance, security).
2. **Contingency/recovery wedges** start cheap but carry services gravity and windfall dynamics; the recurring conversion is the real company and must be proven separately.
3. **Complement, don't substitute:** build what model progress makes *scarce* (ground truth, offline-world access, accountability, machine transactability), never what it makes cheap — otherwise every model release arms your competitors.
4. **Founder economics ≠ investor economics:** capital-light cash-flowing businesses can be great to start and bad to fund.
5. **Archives are the AI-era moat:** historical, continuously collected data cannot be backfilled regardless of model quality; time compounds it.
6. **Acquisition pain is defensibility:** data that is fragmented, obscure, and adversarially hard to gather is exactly where AI economics create durable advantage; data that wants to be found (bids, federal filings) cannot moat.
7. **Person-level data sold for screening triggers FCRA** — property-level data for property decisions stays clean.
8. **Diligence before wedges:** the obvious wedge (permits) was already an AI-native funded company; assume your insight has a cap table until proven otherwise.
