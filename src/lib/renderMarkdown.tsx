import type { ReactNode } from "react";

const INLINE_PATTERN = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const match = remaining.match(INLINE_PATTERN);
    if (!match || match.index === undefined) {
      nodes.push(remaining);
      break;
    }
    if (match.index > 0) nodes.push(remaining.slice(0, match.index));

    if (match[2] !== undefined) nodes.push(<strong key={key++}>{match[2]}</strong>);
    else if (match[3] !== undefined) nodes.push(<em key={key++}>{match[3]}</em>);
    else if (match[4] !== undefined) nodes.push(<code key={key++}>{match[4]}</code>);
    else if (match[5] !== undefined)
      nodes.push(
        <a key={key++} href={match[6]} target="_blank" rel="noopener noreferrer">
          {match[5]}
        </a>
      );

    remaining = remaining.slice(match.index + match[0].length);
  }

  return nodes;
}

// Small dependency-free markdown subset covering what a blog post needs:
// headings, paragraphs, bold/italic/code/links, lists, code blocks,
// blockquotes, horizontal rules. Not a full CommonMark implementation.
export function renderMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre key={key++} className="log-code-block">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = renderInline(headingMatch[2]);
      blocks.push(
        level === 1 ? (
          <h2 key={key++} className="log-heading">
            {text}
          </h2>
        ) : level === 2 ? (
          <h3 key={key++} className="log-heading">
            {text}
          </h3>
        ) : (
          <h4 key={key++} className="log-heading">
            {text}
          </h4>
        )
      );
      i++;
      continue;
    }

    if (line.trim() === "---" || line.trim() === "***") {
      blocks.push(<hr key={key++} className="log-hr" />);
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="log-quote">
          {renderInline(quoteLines.join(" "))}
        </blockquote>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={key++} className="log-list">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="log-list">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^>\s?/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push(
      <p key={key++} className="log-paragraph">
        {renderInline(paraLines.join(" "))}
      </p>
    );
  }

  return blocks;
}
