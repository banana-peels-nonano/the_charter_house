import { describe, expect, it } from "vitest";
import {
  extractCandidateLessons,
  extractRecommendations,
  mergeLessons,
  normalizeLessonText,
  parseLessons,
  renderKnowledgeBase,
  renderLessonsBlock,
  updateLessonsFile,
  type Lesson,
} from "./lessons.js";

const sampleLessons: Lesson[] = [
  { id: 1, category: "Customer", date: "2026-06-01", text: "Customers discuss pain but rarely pay to solve it.", source: "idea-a" },
  { id: 2, category: "Moat", date: "2026-06-02", text: "Thin wrappers over foundation models have no moat." },
];

describe("extractCandidateLessons", () => {
  it("extracts well-formed LESSON lines", () => {
    const report = [
      "## Section 11 — New Lessons Generated",
      "LESSON [Customer]: People say yes in interviews and no at checkout.",
      "LESSON [AI Risk]: Per-token margins erode as model prices fall.",
    ].join("\n");
    const { lessons, skipped } = extractCandidateLessons(report);
    expect(lessons).toEqual([
      { category: "Customer", text: "People say yes in interviews and no at checkout." },
      { category: "AI Risk", text: "Per-token margins erode as model prices fall." },
    ]);
    expect(skipped).toEqual([]);
  });

  it("matches categories case-insensitively", () => {
    const { lessons } = extractCandidateLessons("LESSON [founder psychology]: Sunk cost keeps bad ideas alive.");
    expect(lessons[0].category).toBe("Founder Psychology");
  });

  it("reports unknown categories as skipped instead of miscategorizing", () => {
    const { lessons, skipped } = extractCandidateLessons("LESSON [Vibes]: Trust the vibes.");
    expect(lessons).toEqual([]);
    expect(skipped).toHaveLength(1);
  });

  it("ignores prose that merely mentions lessons", () => {
    const { lessons } = extractCandidateLessons("The lesson here is that LESSON formatting matters.");
    expect(lessons).toEqual([]);
  });
});

describe("extractRecommendations", () => {
  it("extracts RECOMMENDATION lines", () => {
    const report = [
      "RECOMMENDATION: Add a platform-dependence score to every analysis.",
      "Some prose in between.",
      "RECOMMENDATION: Track time-to-first-dollar estimates against reality.",
    ].join("\n");
    expect(extractRecommendations(report)).toEqual([
      "Add a platform-dependence score to every analysis.",
      "Track time-to-first-dollar estimates against reality.",
    ]);
  });

  it("returns an empty list when the section is omitted", () => {
    expect(extractRecommendations("no recommendations here")).toEqual([]);
  });
});

describe("parse/render round trip", () => {
  it("renders lessons grouped by category and parses them back identically", () => {
    const block = renderLessonsBlock(sampleLessons);
    expect(parseLessons(block)).toEqual(sampleLessons);
  });

  it("renders a placeholder when there are no lessons", () => {
    const block = renderLessonsBlock([]);
    expect(block).toContain("_(no lessons yet)_");
    expect(parseLessons(block)).toEqual([]);
  });

  it("parses only inside the marker block when markers exist", () => {
    const file = [
      "# Lessons",
      "",
      "- [L99] 2026-01-01 — A stray bullet outside the block.",
      "",
      renderLessonsBlock(sampleLessons),
      "",
    ].join("\n");
    expect(parseLessons(file)).toHaveLength(2);
  });
});

describe("mergeLessons", () => {
  it("appends new lessons with sequential ids, date, and source", () => {
    const { lessons, added } = mergeLessons(
      sampleLessons,
      [{ category: "Pricing", text: "Anchor pricing to value, not cost." }],
      "2026-06-12",
      "idea-b",
    );
    expect(added).toEqual([
      { id: 3, category: "Pricing", date: "2026-06-12", text: "Anchor pricing to value, not cost.", source: "idea-b" },
    ]);
    expect(lessons).toHaveLength(3);
  });

  it("skips duplicates ignoring case and punctuation", () => {
    const { added } = mergeLessons(
      sampleLessons,
      [{ category: "Customer", text: "Customers discuss pain, but RARELY pay to solve it!!" }],
      "2026-06-12",
      "idea-b",
    );
    expect(added).toEqual([]);
  });

  it("dedupes within the same batch", () => {
    const { added } = mergeLessons(
      [],
      [
        { category: "Sales", text: "Long sales cycles kill solo founders." },
        { category: "Sales", text: "Long sales cycles kill solo founders." },
      ],
      "2026-06-12",
      "idea-b",
    );
    expect(added).toHaveLength(1);
  });

  it("never mutates or removes existing lessons", () => {
    const { lessons } = mergeLessons(sampleLessons, [], "2026-06-12", "idea-b");
    expect(lessons).toEqual(sampleLessons);
  });
});

describe("updateLessonsFile", () => {
  it("replaces the marker block and preserves surrounding content", () => {
    const file = [
      "# Lessons",
      "",
      "My own freeform notes stay untouched.",
      "",
      renderLessonsBlock([]),
      "",
      "A trailing note.",
    ].join("\n");
    const { content, added } = updateLessonsFile(
      file,
      [{ category: "Moat", text: "Distribution beats product quality." }],
      "2026-06-12",
      "idea-c",
    );
    expect(added).toHaveLength(1);
    expect(content).toContain("My own freeform notes stay untouched.");
    expect(content).toContain("A trailing note.");
    expect(content).toContain("- [L1] 2026-06-12 — Distribution beats product quality. _(from: idea-c)_");
    expect(content.match(/lessons:start/g)).toHaveLength(1);
  });

  it("appends a block when no markers exist", () => {
    const { content } = updateLessonsFile(
      "# Lessons\n",
      [{ category: "Execution", text: "Ship before polishing." }],
      "2026-06-12",
      "idea-c",
    );
    expect(content).toContain("<!-- lessons:start -->");
    expect(content).toContain("## Execution");
  });

  it("is idempotent for the same candidates", () => {
    const first = updateLessonsFile(
      "# Lessons\n",
      [{ category: "Execution", text: "Ship before polishing." }],
      "2026-06-12",
      "idea-c",
    );
    const second = updateLessonsFile(
      first.content,
      [{ category: "Execution", text: "Ship before polishing." }],
      "2026-06-13",
      "idea-d",
    );
    expect(second.added).toEqual([]);
    expect(second.content).toBe(first.content);
  });
});

describe("renderKnowledgeBase", () => {
  it("lists lessons by category with their ids", () => {
    const kb = renderKnowledgeBase(sampleLessons);
    expect(kb).toContain("Customer:");
    expect(kb).toContain("- Lesson #1 (2026-06-01): Customers discuss pain but rarely pay to solve it.");
    expect(kb).toContain("Moat:");
  });

  it("says so when there are no lessons", () => {
    expect(renderKnowledgeBase([])).toContain("No prior lessons");
  });
});

describe("normalizeLessonText", () => {
  it("ignores case, punctuation, and extra whitespace", () => {
    expect(normalizeLessonText("  Trust, but VERIFY!  ")).toBe(
      normalizeLessonText("trust but verify"),
    );
  });
});
