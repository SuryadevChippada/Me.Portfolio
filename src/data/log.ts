import { parseFrontmatter, hashColor } from "../lib/frontmatter";

export interface LogEntry {
  slug: string;
  title: string;
  tagline: string;
  date: string;
  labelColor: string;
  coverImage: string | null;
  content: string;
}

// Drop a new .md file in src/content/log/ and it shows up here automatically
// — no other code changes needed. Frontmatter fields: title, tagline, date
// (YYYY-MM-DD), labelColor (optional hex), coverImage (optional path under
// public/covers/log/).
const files = import.meta.glob("../content/log/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const logEntries: LogEntry[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title ?? slug,
      tagline: data.tagline ?? "",
      date: data.date ?? "",
      labelColor: data.labelColor ?? hashColor(slug),
      coverImage: data.coverImage ?? null,
      content,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));
