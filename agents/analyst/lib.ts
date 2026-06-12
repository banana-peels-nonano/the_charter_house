// Pure helpers for the Analyst agent. Everything here is deterministic and
// covered by lib.test.ts; all file/network side effects live in index.ts.
import fs from "node:fs";
import path from "node:path";

export type Verdict = "KILL" | "WATCH" | "VALIDATE" | "BUILD" | "UNKNOWN";

export interface AnalysisEntry {
  name: string;
  verdict: Verdict;
  reportPath: string; // repo-relative, forward slashes
}

/** All idea files in ideas/, excluding the folder's own README. */
export function findIdeaFiles(ideasDir: string): string[] {
  if (!fs.existsSync(ideasDir)) return [];
  return fs
    .readdirSync(ideasDir)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .filter((f) => f.toLowerCase() !== "readme.md")
    .sort()
    .map((f) => path.join(ideasDir, f));
}

/** "ideas/ai-tutor.md" -> "ai-tutor" */
export function ideaNameFromFile(file: string): string {
  return path.basename(file).replace(/\.md$/i, "");
}

export function reportRelativePath(ideaName: string): string {
  return `experiments/${ideaName}-analysis.md`;
}

/**
 * The report must end with "VERDICT: <KILL|WATCH|VALIDATE|BUILD>".
 * Take the last such line so verdict words used in prose don't match.
 */
export function extractVerdict(report: string): Verdict {
  const matches = report.match(/^VERDICT:\s*(KILL|WATCH|VALIDATE|BUILD)\s*$/gim);
  if (!matches || matches.length === 0) return "UNKNOWN";
  const last = matches[matches.length - 1];
  return last.replace(/^VERDICT:\s*/i, "").trim().toUpperCase() as Verdict;
}

const BLOCK_START = "<!-- analyst:start -->";
const BLOCK_END = "<!-- analyst:end -->";

export function renderAnalystBlock(entries: AnalysisEntry[]): string {
  const lines = entries.map(
    (e) => `- **${e.name}** — ${e.verdict} → [analysis](${e.reportPath})`,
  );
  return [
    BLOCK_START,
    "### Idea analyses (written by the Analyst agent)",
    "",
    ...lines,
    BLOCK_END,
  ].join("\n");
}

/**
 * Insert or replace the analyst block in PROJECT_STATUS.md and refresh the
 * "_Last updated_" line. Idempotent: re-running replaces the previous block.
 */
export function updateProjectStatus(
  content: string,
  entries: AnalysisEntry[],
  date: string,
): string {
  const block = renderAnalystBlock(entries);
  let out: string;

  const start = content.indexOf(BLOCK_START);
  const end = content.indexOf(BLOCK_END);
  if (start !== -1 && end !== -1) {
    out = content.slice(0, start) + block + content.slice(end + BLOCK_END.length);
  } else if (/^## Active\s*$/m.test(content)) {
    out = content.replace(/^## Active\s*$/m, (heading) => `${heading}\n\n${block}`);
  } else {
    out = `${content.trimEnd()}\n\n## Active\n\n${block}\n`;
  }

  if (/^_Last updated: .*_\s*$/m.test(out)) {
    out = out.replace(/^_Last updated: .*_\s*$/m, `_Last updated: ${date}_`);
  } else {
    out = `${out.trimEnd()}\n\n_Last updated: ${date}_\n`;
  }
  return out;
}
