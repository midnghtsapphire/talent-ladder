import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("revvel-standards baseline", () => {
  it("includes required documentation files", () => {
    const requiredFiles = [
      "README.md",
      "CHANGELOG.md",
      "DEPLOYMENT_GUIDE.md",
      "GO_TO_MARKET.md",
      "BRAND_GUIDELINES.md",
      "SECURITY.md",
      "ASSETS_INVENTORY.md",
      "ARTIFACTS.md",
      "scripts/test-baseline.js",
      "scripts/build-baseline.js",
    ];

    requiredFiles.forEach((file) => {
      expect(existsSync(join(process.cwd(), file))).toBe(true);
    });
  });

  it("exposes baseline npm scripts", () => {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), "package.json"), "utf8")
    );

    expect(packageJson.scripts["test:baseline"]).toBe("node scripts/test-baseline.js");
    expect(packageJson.scripts["build:baseline"]).toBe("node scripts/build-baseline.js");
  });

  it("uses production website metadata instead of template placeholders", () => {
    const indexHtml = readFileSync(join(process.cwd(), "index.html"), "utf8");

    expect(indexHtml).toContain("Talent Ladder");
    expect(indexHtml).toContain('name="description"');
    expect(indexHtml).toContain('property="og:title"');
    expect(indexHtml).toContain('property="og:image" content="/og-image.svg"');
    expect(indexHtml).toContain('name="twitter:image" content="/og-image.svg"');
    expect(indexHtml).not.toContain("Lovable App");
    expect(indexHtml).not.toContain("Lovable Generated Project");
  });
});
