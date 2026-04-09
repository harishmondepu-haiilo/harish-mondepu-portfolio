import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "src/data/content.json");
const INDEX_TS_PATH = path.join(process.cwd(), "src/data/index.ts");

// GitHub API config — used on Vercel where filesystem is read-only
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "harishmondepu-haiilo/harish-mondepu-portfolio";
const GITHUB_CONTENT_PATH = "src/data/content.json";
const GITHUB_INDEX_PATH = "src/data/index.ts";
const IS_VERCEL = !!process.env.VERCEL;

export type ContentData = {
  personal: Record<string, any>;
  experiences: any[];
  certs: any[];
  skills: Record<string, any[]>;
  projects: any[];
  testimonials: any[];
  education: any[];
  achievements: any[];
};

export type SectionKey = keyof ContentData;

const VALID_SECTIONS: SectionKey[] = [
  "personal",
  "experiences",
  "certs",
  "skills",
  "projects",
  "testimonials",
  "education",
  "achievements",
];

export function isValidSection(section: string): section is SectionKey {
  return VALID_SECTIONS.includes(section as SectionKey);
}

// ── GitHub API helpers ──────────────────────────────────────────────────────

async function githubGetFile(filePath: string): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json" }, cache: "no-store" }
  );
  if (!res.ok) throw new Error(`GitHub GET ${filePath}: ${res.status}`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content, sha: data.sha };
}

async function githubUpdateFile(filePath: string, content: string, sha: string, message: string): Promise<void> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json", "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString("base64"),
        sha,
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT ${filePath}: ${res.status} — ${err}`);
  }
}

// ── Read content ────────────────────────────────────────────────────────────

export function getContent(): ContentData {
  // Always read from bundled file — it's the deployed snapshot
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function getContentFresh(): Promise<ContentData> {
  // On Vercel, fetch latest from GitHub to pick up any recent edits
  if (IS_VERCEL && GITHUB_TOKEN) {
    try {
      const { content } = await githubGetFile(GITHUB_CONTENT_PATH);
      return JSON.parse(content);
    } catch {
      // Fallback to bundled file
    }
  }
  return getContent();
}

export function getSection(section: SectionKey): any {
  const content = getContent();
  return content[section];
}

export async function getSectionFresh(section: SectionKey): Promise<any> {
  const content = await getContentFresh();
  return content[section];
}

// ── Write content ───────────────────────────────────────────────────────────

export async function updateSection(section: SectionKey, data: any): Promise<ContentData> {
  if (IS_VERCEL && GITHUB_TOKEN) {
    return updateSectionViaGitHub(section, data);
  }
  return updateSectionLocal(section, data);
}

// Local filesystem (development)
function updateSectionLocal(section: SectionKey, data: any): ContentData {
  const content = getContent();
  content[section] = data;
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
  regenerateIndexTS(content);
  return content;
}

// GitHub API (Vercel production)
async function updateSectionViaGitHub(section: SectionKey, data: any): Promise<ContentData> {
  // 1. Get current content.json from GitHub (latest, not bundled)
  const { content: rawContent, sha: contentSha } = await githubGetFile(GITHUB_CONTENT_PATH);
  const content: ContentData = JSON.parse(rawContent);
  content[section] = data;

  const updatedJson = JSON.stringify(content, null, 2);

  // 2. Get current index.ts SHA
  const { sha: indexSha } = await githubGetFile(GITHUB_INDEX_PATH);

  // 3. Generate new index.ts
  const indexContent = generateIndexTS(content);

  // 4. Commit both files
  await githubUpdateFile(
    GITHUB_CONTENT_PATH,
    updatedJson,
    contentSha,
    `CMS: update ${section}`
  );

  await githubUpdateFile(
    GITHUB_INDEX_PATH,
    indexContent,
    indexSha,
    `CMS: regenerate index.ts for ${section}`
  );

  return content;
}

export async function updateAllContent(data: ContentData): Promise<void> {
  if (IS_VERCEL && GITHUB_TOKEN) {
    const { sha: contentSha } = await githubGetFile(GITHUB_CONTENT_PATH);
    const { sha: indexSha } = await githubGetFile(GITHUB_INDEX_PATH);
    await githubUpdateFile(GITHUB_CONTENT_PATH, JSON.stringify(data, null, 2), contentSha, "CMS: bulk update");
    await githubUpdateFile(GITHUB_INDEX_PATH, generateIndexTS(data), indexSha, "CMS: regenerate index.ts");
  } else {
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
    regenerateIndexTS(data);
  }
}

// ── Emoji maps for certs and projects (JSON stores text keys, TS uses emojis) ──
const CERT_LOGO_MAP: Record<string, string> = {
  gear: "\u2699\uFE0F",
  wrench: "\uD83D\uDD27",
  building: "\uD83C\uDFD7\uFE0F",
  code: "\uD83D\uDC68\u200D\uD83D\uDCBB",
  briefcase: "\uD83D\uDCBC",
  headset: "\uD83C\uDFA7",
  cloud: "\u2601\uFE0F",
  megaphone: "\uD83D\uDCE3",
  bolt: "\uD83D\uDD29",
  robot: "\uD83E\uDD16",
  dollar: "\uD83D\uDCB0",
  lock: "\uD83D\uDD10",
  chart: "\uD83D\uDCCA",
  rocket: "\uD83D\uDE80",
  zap: "\u26A1",
};

const PROJECT_ICON_MAP: Record<string, string> = {
  rocket: "\uD83D\uDE80",
  link: "\uD83D\uDD17",
  tool: "\uD83D\uDEE0",
  lightbulb: "\uD83D\uDCA1",
  cloud: "\u2601\uFE0F",
  hospital: "\uD83C\uDFE5",
};

function certLogoToEmoji(key: string): string {
  return CERT_LOGO_MAP[key] || "\u2B50";
}

function projectIconToEmoji(key: string): string {
  return PROJECT_ICON_MAP[key] || "\uD83D\uDE80";
}

function generateIndexTS(content: ContentData): string {
  const lines: string[] = [];

  lines.push("// ============================================================");
  lines.push("//  PORTFOLIO CMS \u2014 Edit this file to update your portfolio");
  lines.push("//  No code changes needed anywhere else!");
  lines.push("// ============================================================");
  lines.push("");

  lines.push("// \u2500\u2500 PERSONAL INFO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const PERSONAL = ${JSON.stringify(content.personal, null, 2)};`);
  lines.push("");

  lines.push("// \u2500\u2500 EXPERIENCE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const EXPERIENCES = ${JSON.stringify(content.experiences, null, 2)};`);
  lines.push("");

  lines.push("// \u2500\u2500 CERTIFICATIONS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push("// Set highlight: true for the featured cert (shows larger)");
  const certsWithEmoji = content.certs.map((c: any) => ({
    ...c,
    logo: certLogoToEmoji(c.logo),
  }));
  lines.push(`export const CERTS = ${JSON.stringify(certsWithEmoji, null, 2)};`);
  lines.push("");

  lines.push("// \u2500\u2500 SKILLS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push("// color uses hex values for inline styles (avoids Tailwind purge issues)");
  lines.push(`export const SKILLS_DATA = ${JSON.stringify(content.skills, null, 2)};`);
  lines.push("");

  lines.push("// \u2500\u2500 PROJECTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  const projectsWithEmoji = content.projects.map((p: any) => ({
    ...p,
    icon: projectIconToEmoji(p.icon),
  }));
  lines.push(`export const PROJECTS = ${JSON.stringify(projectsWithEmoji, null, 2)};`);
  lines.push("");

  lines.push("// \u2500\u2500 TESTIMONIALS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const TESTIMONIALS = ${JSON.stringify(content.testimonials, null, 2)};`);
  lines.push("");

  lines.push("// \u2500\u2500 EDUCATION \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const EDUCATION = ${JSON.stringify(content.education, null, 2)};`);
  lines.push("");

  lines.push("// \u2500\u2500 ACHIEVEMENTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const ACHIEVEMENTS = ${JSON.stringify(content.achievements, null, 2)};`);
  lines.push("");

  return lines.join("\n");
}

function regenerateIndexTS(content: ContentData): void {
  fs.writeFileSync(INDEX_TS_PATH, generateIndexTS(content), "utf-8");
}
