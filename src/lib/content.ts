import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "src/data/content.json");
const INDEX_TS_PATH = path.join(process.cwd(), "src/data/index.ts");

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

export function getContent(): ContentData {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

export function getSection(section: SectionKey): any {
  const content = getContent();
  return content[section];
}

export function updateSection(section: SectionKey, data: any): ContentData {
  const content = getContent();
  content[section] = data;

  // Write to content.json
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");

  // Regenerate index.ts so the frontend picks up changes
  regenerateIndexTS(content);

  return content;
}

export function updateAllContent(data: ContentData): void {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
  regenerateIndexTS(data);
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

function regenerateIndexTS(content: ContentData): void {
  const lines: string[] = [];

  lines.push("// ============================================================");
  lines.push("//  PORTFOLIO CMS \u2014 Edit this file to update your portfolio");
  lines.push("//  No code changes needed anywhere else!");
  lines.push("// ============================================================");
  lines.push("");

  // PERSONAL
  lines.push("// \u2500\u2500 PERSONAL INFO \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const PERSONAL = ${JSON.stringify(content.personal, null, 2)};`);
  lines.push("");

  // EXPERIENCES
  lines.push("// \u2500\u2500 EXPERIENCE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const EXPERIENCES = ${JSON.stringify(content.experiences, null, 2)};`);
  lines.push("");

  // CERTS — restore emoji logos
  lines.push("// \u2500\u2500 CERTIFICATIONS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push("// Set highlight: true for the featured cert (shows larger)");
  const certsWithEmoji = content.certs.map((c: any) => ({
    ...c,
    logo: certLogoToEmoji(c.logo),
  }));
  lines.push(`export const CERTS = ${JSON.stringify(certsWithEmoji, null, 2)};`);
  lines.push("");

  // SKILLS
  lines.push("// \u2500\u2500 SKILLS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push("// color uses hex values for inline styles (avoids Tailwind purge issues)");
  lines.push(`export const SKILLS_DATA = ${JSON.stringify(content.skills, null, 2)};`);
  lines.push("");

  // PROJECTS — restore emoji icons
  lines.push("// \u2500\u2500 PROJECTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  const projectsWithEmoji = content.projects.map((p: any) => ({
    ...p,
    icon: projectIconToEmoji(p.icon),
  }));
  lines.push(`export const PROJECTS = ${JSON.stringify(projectsWithEmoji, null, 2)};`);
  lines.push("");

  // TESTIMONIALS
  lines.push("// \u2500\u2500 TESTIMONIALS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const TESTIMONIALS = ${JSON.stringify(content.testimonials, null, 2)};`);
  lines.push("");

  // EDUCATION
  lines.push("// \u2500\u2500 EDUCATION \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const EDUCATION = ${JSON.stringify(content.education, null, 2)};`);
  lines.push("");

  // ACHIEVEMENTS
  lines.push("// \u2500\u2500 ACHIEVEMENTS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500");
  lines.push(`export const ACHIEVEMENTS = ${JSON.stringify(content.achievements, null, 2)};`);
  lines.push("");

  fs.writeFileSync(INDEX_TS_PATH, lines.join("\n"), "utf-8");
}
