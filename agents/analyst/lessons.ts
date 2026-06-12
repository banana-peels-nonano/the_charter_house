// The lessons system: LESSONS.md parsing/serialization, lesson extraction
// from reports, categorization, and deduplication. Pure and deterministic —
// covered by lessons.test.ts. File I/O stays in index.ts.
//
// LESSONS.md format: lessons live between <!-- lessons:start/end --> markers,
// grouped under "## <Category>" headings, one bullet per lesson:
//   - [L7] 2026-06-12 — Lesson text. _(from: idea-name)_
// Content outside the markers is never touched, so history and freeform
// notes are preserved.

export const LESSON_CATEGORIES = [
  "Customer",
  "Distribution",
  "Sales",
  "Pricing",
  "Competition",
  "Moat",
  "Regulation",
  "Execution",
  "Founder Psychology",
  "AI Risk",
] as const;

export type LessonCategory = (typeof LESSON_CATEGORIES)[number];

export interface Lesson {
  id: number;
  category: LessonCategory;
  date: string; // YYYY-MM-DD
  text: string;
  source?: string; // idea name that produced it
}

export interface CandidateLesson {
  category: LessonCategory;
  text: string;
}

const BLOCK_START = "<!-- lessons:start -->";
const BLOCK_END = "<!-- lessons:end -->";

function canonicalCategory(raw: string): LessonCategory | undefined {
  const wanted = raw.trim().toLowerCase();
  return LESSON_CATEGORIES.find((c) => c.toLowerCase() === wanted);
}

/** Used for deduplication: lowercase, strip punctuation, collapse whitespace. */
export function normalizeLessonText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Pull "LESSON [Category]: text" lines out of a report. Lines with an
 * unknown category are returned in `skipped` so the runner can warn instead
 * of silently miscategorizing them.
 */
export function extractCandidateLessons(report: string): {
  lessons: CandidateLesson[];
  skipped: string[];
} {
  const lessons: CandidateLesson[] = [];
  const skipped: string[] = [];
  for (const m of report.matchAll(/^LESSON\s*\[([^\]]+)\]\s*:\s*(.+)$/gim)) {
    const category = canonicalCategory(m[1]);
    const text = m[2].trim();
    if (category && text) lessons.push({ category, text });
    else skipped.push(m[0].trim());
  }
  return { lessons, skipped };
}

/** Pull "RECOMMENDATION: text" self-improvement lines out of a report. */
export function extractRecommendations(report: string): string[] {
  return [...report.matchAll(/^RECOMMENDATION:\s*(.+)$/gim)].map((m) => m[1].trim());
}

const LESSON_LINE =
  /^- \[L(\d+)\] (\d{4}-\d{2}-\d{2}) — (.*?)(?: _\(from: (.+)\)_)?\s*$/;

/** Parse structured lessons from LESSONS.md (the marker block if present). */
export function parseLessons(content: string): Lesson[] {
  const start = content.indexOf(BLOCK_START);
  const end = content.indexOf(BLOCK_END);
  const body =
    start !== -1 && end !== -1
      ? content.slice(start + BLOCK_START.length, end)
      : content;

  const lessons: Lesson[] = [];
  let category: LessonCategory | undefined;
  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^## (.+?)\s*$/);
    if (heading) {
      category = canonicalCategory(heading[1]);
      continue;
    }
    const m = line.match(LESSON_LINE);
    if (m && category) {
      lessons.push({
        id: Number(m[1]),
        category,
        date: m[2],
        text: m[3].trim(),
        source: m[4],
      });
    }
  }
  return lessons;
}

export function renderLessonsBlock(lessons: Lesson[]): string {
  const lines: string[] = [BLOCK_START];
  if (lessons.length === 0) {
    lines.push("_(no lessons yet)_");
  } else {
    for (const category of LESSON_CATEGORIES) {
      const inCategory = lessons.filter((l) => l.category === category);
      if (inCategory.length === 0) continue;
      lines.push(`## ${category}`, "");
      for (const l of inCategory) {
        const from = l.source ? ` _(from: ${l.source})_` : "";
        lines.push(`- [L${l.id}] ${l.date} — ${l.text}${from}`);
      }
      lines.push("");
    }
  }
  lines.push(BLOCK_END);
  return lines.join("\n");
}

/**
 * Add candidates to the existing lessons, skipping duplicates (normalized
 * text match against existing lessons and within the batch). IDs continue
 * the existing sequence; existing lessons are never modified or removed.
 */
export function mergeLessons(
  existing: Lesson[],
  candidates: CandidateLesson[],
  date: string,
  source: string,
): { lessons: Lesson[]; added: Lesson[] } {
  const seen = new Set(existing.map((l) => normalizeLessonText(l.text)));
  let nextId = existing.reduce((max, l) => Math.max(max, l.id), 0) + 1;
  const added: Lesson[] = [];
  for (const c of candidates) {
    const key = normalizeLessonText(c.text);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    added.push({ id: nextId++, category: c.category, date, text: c.text, source });
  }
  return { lessons: [...existing, ...added], added };
}

/**
 * Merge candidates into LESSONS.md content. Replaces the marker block (or
 * appends one); everything outside the markers is preserved byte-for-byte.
 */
export function updateLessonsFile(
  content: string,
  candidates: CandidateLesson[],
  date: string,
  source: string,
): { content: string; added: Lesson[] } {
  const existing = parseLessons(content);
  const { lessons, added } = mergeLessons(existing, candidates, date, source);
  const block = renderLessonsBlock(lessons);

  const start = content.indexOf(BLOCK_START);
  const end = content.indexOf(BLOCK_END);
  const next =
    start !== -1 && end !== -1
      ? content.slice(0, start) + block + content.slice(end + BLOCK_END.length)
      : `${content.trimEnd()}\n\n${block}\n`;
  return { content: next, added };
}

/** Render the knowledge base injected into the Analyst's context. */
export function renderKnowledgeBase(lessons: Lesson[]): string {
  if (lessons.length === 0) {
    return "No prior lessons recorded yet — LESSONS.md is empty. Section 1 should say so.";
  }
  const lines: string[] = [];
  for (const category of LESSON_CATEGORIES) {
    const inCategory = lessons.filter((l) => l.category === category);
    if (inCategory.length === 0) continue;
    lines.push(`${category}:`);
    for (const l of inCategory) {
      lines.push(`- Lesson #${l.id} (${l.date}): ${l.text}`);
    }
  }
  return lines.join("\n");
}
