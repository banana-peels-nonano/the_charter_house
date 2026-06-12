import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  extractVerdict,
  findIdeaFiles,
  ideaNameFromFile,
  renderAnalystBlock,
  reportRelativePath,
  updateProjectStatus,
} from "./lib.js";

describe("extractVerdict", () => {
  it("reads the final VERDICT line", () => {
    expect(extractVerdict("...analysis...\n\nVERDICT: KILL")).toBe("KILL");
  });

  it("takes the last verdict line, ignoring verdict words in prose", () => {
    const report =
      "A BUILD verdict would require evidence we do not have.\n" +
      "VERDICT: VALIDATE\n";
    expect(extractVerdict(report)).toBe("VALIDATE");
  });

  it("is case-insensitive and tolerates surrounding whitespace", () => {
    expect(extractVerdict("verdict: watch  \n")).toBe("WATCH");
  });

  it("returns UNKNOWN when no verdict line exists", () => {
    expect(extractVerdict("no conclusion here")).toBe("UNKNOWN");
  });
});

describe("idea file helpers", () => {
  it("derives the idea name from the filename", () => {
    expect(ideaNameFromFile(path.join("ideas", "ai-tutor.md"))).toBe("ai-tutor");
  });

  it("builds the report path in experiments/", () => {
    expect(reportRelativePath("ai-tutor")).toBe("experiments/ai-tutor-analysis.md");
  });
});

describe("findIdeaFiles", () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "analyst-test-"));
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("returns .md files, sorted, excluding README.md", () => {
    fs.writeFileSync(path.join(dir, "zeta.md"), "z");
    fs.writeFileSync(path.join(dir, "alpha.md"), "a");
    fs.writeFileSync(path.join(dir, "README.md"), "readme");
    fs.writeFileSync(path.join(dir, "notes.txt"), "not markdown");
    const names = findIdeaFiles(dir).map((f) => path.basename(f));
    expect(names).toEqual(["alpha.md", "zeta.md"]);
  });

  it("returns an empty list for a missing directory", () => {
    expect(findIdeaFiles(path.join(dir, "does-not-exist"))).toEqual([]);
  });
});

describe("updateProjectStatus", () => {
  const entries = [
    { name: "ai-tutor", verdict: "VALIDATE" as const, reportPath: "experiments/ai-tutor-analysis.md" },
  ];

  const baseStatus = [
    "# Project Status",
    "",
    "## Active",
    "",
    "- (nothing yet)",
    "",
    "## Done",
    "",
    "_Last updated: 2026-01-01_",
    "",
  ].join("\n");

  it("inserts the analyst block under ## Active and refreshes the date", () => {
    const out = updateProjectStatus(baseStatus, entries, "2026-06-12");
    expect(out).toContain("<!-- analyst:start -->");
    expect(out).toContain("**ai-tutor** — VALIDATE");
    expect(out.indexOf("analyst:start")).toBeGreaterThan(out.indexOf("## Active"));
    expect(out.indexOf("analyst:start")).toBeLessThan(out.indexOf("## Done"));
    expect(out).toContain("_Last updated: 2026-06-12_");
    expect(out).not.toContain("_Last updated: 2026-01-01_");
  });

  it("replaces an existing block instead of duplicating it (idempotent)", () => {
    const once = updateProjectStatus(baseStatus, entries, "2026-06-12");
    const newEntries = [
      { name: "ai-tutor", verdict: "KILL" as const, reportPath: "experiments/ai-tutor-analysis.md" },
    ];
    const twice = updateProjectStatus(once, newEntries, "2026-06-13");
    expect(twice.match(/analyst:start/g)).toHaveLength(1);
    expect(twice).toContain("**ai-tutor** — KILL");
    expect(twice).not.toContain("VALIDATE");
  });

  it("appends a section when no ## Active heading exists", () => {
    const out = updateProjectStatus("# Project Status\n", entries, "2026-06-12");
    expect(out).toContain("## Active");
    expect(out).toContain("<!-- analyst:start -->");
    expect(out).toContain("_Last updated: 2026-06-12_");
  });
});

describe("renderAnalystBlock", () => {
  it("renders one line per entry with a link to the report", () => {
    const block = renderAnalystBlock([
      { name: "a", verdict: "KILL", reportPath: "experiments/a-analysis.md" },
      { name: "b", verdict: "BUILD", reportPath: "experiments/b-analysis.md" },
    ]);
    expect(block).toContain("- **a** — KILL → [analysis](experiments/a-analysis.md)");
    expect(block).toContain("- **b** — BUILD → [analysis](experiments/b-analysis.md)");
  });
});
