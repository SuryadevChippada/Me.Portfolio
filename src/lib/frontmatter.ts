export interface Frontmatter {
  [key: string]: string;
}

// Minimal frontmatter parser: `key: value` lines between `---` fences.
// No nested structures — that's all a blog post needs.
export function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };

  const [, block, content] = match;
  const data: Frontmatter = {};
  for (const line of block.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, content: content.trim() };
}

const FALLBACK_COLORS = ["#c9622f", "#3f7fb8", "#4d9c7c", "#c9a227", "#8a6fb0", "#b0793f"];

// Deterministic color per slug so posts without an explicit labelColor
// still get a distinct-ish vinyl label instead of all matching.
export function hashColor(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) | 0;
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}
