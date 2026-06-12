# Analyst Agent V2

An adversarial investigator that tries to **kill weak startup ideas before
they consume founder-years**. The default assumption is that every idea is
wrong; ideas must earn survival through evidence. It answers one question:

> "Should the founder spend the next month of his life on this?"

## What's new in V2: the lessons system

The factory gets smarter after every idea:

1. **Before each analysis** the agent reads `LESSONS.md`, builds a
   categorized knowledge base, and injects it into the Analyst's context.
   The report's Section 1 cites applicable lessons by number
   ("Lesson #17 indicates trust-dependent businesses are difficult...").
2. **After each analysis** the agent extracts the generalizable lessons the
   Analyst produced (Section 11), deduplicates them against everything
   already recorded, timestamps them, and appends them to `LESSONS.md`.
   Within a single run, idea N+1 already sees idea N's lessons.
3. Lessons are classified under fixed categories so `LESSONS.md` never
   becomes unstructured: Customer, Distribution, Sales, Pricing,
   Competition, Moat, Regulation, Execution, Founder Psychology, AI Risk.
4. History is preserved — lessons are only ever added, never edited or
   removed, and content outside the `<!-- lessons:start/end -->` markers is
   untouched.

V2 also adds: **similar companies** research, **repeated risks** (each idea
is compared against all previous analyses and their verdicts), reasoned
**expected value** estimates, and **self-improvement** — when the Analyst
notices recurring weaknesses, its recommendations are collected into
`RECOMMENDATIONS.md` in this folder for you to review and apply.

## What it does per run

1. Reads every `*.md` in `ideas/` (the folder's `README.md` is ignored)
2. For each idea, calls Claude (`claude-opus-4-8`) with the Analyst persona,
   the lessons knowledge base, and a digest of prior verdicts
3. Writes a report to `experiments/{idea-name}-analysis.md` covering:
   relevant historical lessons → market investigation → moat analysis →
   founder reality check (India-specific) → failure analysis (always before
   success) → success analysis → expected value ($1M/$10M/$100M ARR
   probabilities with reasoning) → fastest disproof (<7 days, <$100) →
   similar companies → repeated risks → new lessons → verdict
4. Appends new lessons to `LESSONS.md` and updates `PROJECT_STATUS.md`

| Verdict | Meaning |
|---|---|
| `KILL` | Fatal flaw found — stop spending time on it |
| `WATCH` | Not viable now; a named future trigger could change that |
| `VALIDATE` | Run the designed disproof experiment before building anything |
| `BUILD` | Evidence already justifies building |

Report length follows complexity — no arbitrary word limits.

## Usage

```sh
npm install                      # once
$env:ANTHROPIC_API_KEY = "sk-ant-..."   # PowerShell (or set it permanently)
npm run analyst
```

Re-running is safe and idempotent: reports are overwritten with fresh
analyses, the `PROJECT_STATUS.md` block is replaced (not duplicated), and
already-recorded lessons are never re-added.

**Cost note:** each idea is one large Claude Opus call (reports can be
long). Expect roughly $0.50–$2 per idea depending on report length.

## Files

- `index.ts` — orchestration: lessons in → ideas → Claude → reports → lessons out → status
- `prompt.ts` — the Analyst's system prompt (mission, 11-section agenda, output contracts)
- `lib.ts` — report/status helpers (file discovery, verdict extraction, status updating)
- `lessons.ts` — the lessons system (parse, render, categorize, dedupe, extract)
- `lib.test.ts`, `lessons.test.ts` — tests (`npm test`)
- `RECOMMENDATIONS.md` — created when the Analyst proposes framework improvements

## Machine-readable contracts

The model is instructed to emit three exact formats, all tested:

- `VERDICT: <KILL|WATCH|VALIDATE|BUILD>` — last line of every report;
  the parser takes the last such line so verdict words in prose don't confuse it
- `LESSON [Category]: <text>` — one per new lesson; unknown categories are
  skipped with a warning rather than miscategorized
- `RECOMMENDATION: <text>` — self-improvement proposals, only when recurring
  weaknesses justify them

## Design notes

- Network/file side effects live in `index.ts`; `lib.ts` and `lessons.ts`
  are deterministic and tested.
- Deduplication is a normalized-text match (case, punctuation, and
  whitespace insensitive) against all existing lessons and within each batch.
- No framework, no queue, no config files — V2 is still a single sequential loop.
