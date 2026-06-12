# Analyst Agent V1

An adversarial investigator that tries to **kill weak startup ideas before
they consume founder time**. The default assumption is that every idea is
wrong; ideas must earn survival through evidence.

## What it does

1. Reads every `*.md` file in `ideas/` (the folder's `README.md` is ignored)
2. Investigates each idea with Claude (`claude-opus-4-8`) acting as a
   YC-partner / short-seller / PE-diligence hybrid
3. Writes a full report to `experiments/{idea-name}-analysis.md`
4. Updates `PROJECT_STATUS.md` with one line per idea and its verdict

Each report covers: market investigation, moat analysis, a solo-founder
reality check (including India-specific factors), failure analysis (written
*before* success analysis), success analysis, a <7-day / <$100 invalidation
experiment, ARR probability estimates, and a final verdict:

| Verdict | Meaning |
|---|---|
| `KILL` | Fatal flaw found — stop spending time on it |
| `WATCH` | Not viable now; a named future trigger could change that |
| `VALIDATE` | Run the designed experiment before building anything |
| `BUILD` | Evidence already justifies building |

Report length follows complexity, not a template.

## Usage

```sh
npm install                      # once
$env:ANTHROPIC_API_KEY = "sk-ant-..."   # PowerShell (or set it permanently)
npm run analyst
```

Re-running is safe: reports are overwritten with fresh analyses, and the
block in `PROJECT_STATUS.md` (between `<!-- analyst:start -->` and
`<!-- analyst:end -->`) is replaced, not duplicated.

**Cost note:** each idea is one large Claude Opus call (reports can be long).
Expect roughly $0.50–$2 per idea depending on report length.

## Files

- `index.ts` — orchestration: read ideas → call Claude → write reports → update status
- `prompt.ts` — the Analyst's system prompt (mission, agenda, rules)
- `lib.ts` — pure helpers (file discovery, verdict extraction, status updating)
- `lib.test.ts` — tests for the pure helpers (`npm test`)

## Design notes

- The model is instructed to end every report with a literal
  `VERDICT: <KILL|WATCH|VALIDATE|BUILD>` line; `extractVerdict` reads the
  last such line so verdict words used in prose don't confuse it.
- Network/file side effects live in `index.ts`; everything in `lib.ts` is
  deterministic and tested.
- No framework, no queue, no config files — V1 is a single sequential loop.
