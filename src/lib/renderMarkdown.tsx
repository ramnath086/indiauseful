import React, { Fragment, type ReactNode } from 'react';

const INLINE_TOKEN = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;

export function renderInlineMarkdown(text: string): ReactNode[] {
  const result: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = INLINE_TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const isExternal = /^https?:\/\//i.test(match[3]);
      const isInternal = match[3].startsWith('/') && !match[3].startsWith('//');
      result.push(
        isExternal || isInternal ? (
          <a
            key={key++}
            href={match[3]}
            className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900"
            {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {match[2]}
          </a>
        ) : match[2]
      );
    } else if (match[4]) {
      result.push(<strong key={key++}>{match[4]}</strong>);
    } else if (match[5]) {
      result.push(
        <code key={key++} className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[0.9em]">
          {match[5]}
        </code>
      );
    } else if (match[6]) {
      result.push(<em key={key++}>{match[6]}</em>);
    }

    lastIndex = INLINE_TOKEN.lastIndex;
  }

  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return result;
}

export function renderMarkdown(content: string): ReactNode[] {
  const blocks = content.trim().split(/\n\s*\n/);

  return blocks.flatMap((block, index) => {
    const lines = block.trim().split('\n').map(line => line.trim()).filter(Boolean);
    if (!lines.length) return [];

    const heading = lines[0].match(/^(#{1,3})\s+(.+)$/);
    if (heading && lines.length === 1) {
      const children = renderInlineMarkdown(heading[2]);
      const className = 'text-xl font-bold text-gray-900 mt-8 mb-2';
      return [
        heading[1].length === 1
          ? <h2 key={index} className={className}>{children}</h2>
          : <h3 key={index} className={className}>{children}</h3>
      ];
    }

    const isUnorderedList = lines.every(line => /^[-*]\s+/.test(line));
    if (isUnorderedList) {
      return [
        <ul key={index} className="list-disc pl-6 space-y-1.5 my-3">
          {lines.map((line, itemIndex) => (
            <li key={itemIndex}>{renderInlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>
          ))}
        </ul>
      ];
    }

    const isOrderedList = lines.every(line => /^\d+\.\s+/.test(line));
    if (isOrderedList) {
      return [
        <ol key={index} className="list-decimal pl-6 space-y-1.5 my-3">
          {lines.map((line, itemIndex) => (
            <li key={itemIndex}>{renderInlineMarkdown(line.replace(/^\d+\.\s+/, ''))}</li>
          ))}
        </ol>
      ];
    }

    return [
      <p key={index}>
        {lines.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {lineIndex > 0 && <br />}
            {renderInlineMarkdown(line)}
          </Fragment>
        ))}
      </p>
    ];
  });
}
