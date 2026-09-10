/**
 * 搜索结果的关键词高亮与上下文片段工具。
 *
 * `@ubean/content` 的 `SearchHit` 只提供章节标题、正文和分数，不带命中位置信息，
 * 因此这里基于用户的原始查询词自行计算：
 * - `createMatchSnippet`：截取包含关键词的正文上下文，而不是正文开头的固定长度片段；
 * - `splitHighlight`：把文本切成「命中 / 非命中」片段，供模板渲染高亮。
 */

/** 文本片段；`match` 为 true 表示该片段命中查询词。 */
export interface HighlightSegment {
  text: string;
  match: boolean;
}

/** 片段默认长度（字符），中文混排下约为两行。 */
const DEFAULT_SNIPPET_LENGTH = 120;

/** 转义正则语法字符，保证用户输入（如 `props.type`）按字面量匹配。 */
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 查询词去重并长词优先，无有效词时返回空数组。 */
function toSearchTerms(query: string): string[] {
  const terms = query
    .split(/\s+/u)
    .map(term => term.trim())
    .filter(term => term.length > 0)
    .sort((a, b) => b.length - a.length);

  return [...new Set(terms)];
}

/**
 * 由查询词构造大小写不敏感的匹配正则，无有效词时返回 null。
 * 长词排在前面，避免短词先命中而把长词切碎（如 "auto" 抢在 "autocomplete" 前）。
 */
function createHighlightRegExp(query: string): RegExp | null {
  const terms = toSearchTerms(query);

  if (terms.length === 0) {
    return null;
  }

  return new RegExp(terms.map(escapeRegExp).join('|'), 'giu');
}

/**
 * 把正文压缩为单行，并截取包含首个命中词的上下文片段（超出部分以省略号标记）。
 * 这样搜索结果展示的是关键词周边内容，而不是总是正文开头。
 */
export function createMatchSnippet(text: string, query: string, maxLength = DEFAULT_SNIPPET_LENGTH): string {
  const normalized = text.replace(/\s+/gu, ' ').trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const match = createHighlightRegExp(query)?.exec(normalized) ?? null;

  if (!match) {
    return `${normalized.slice(0, maxLength).trimEnd()}…`;
  }

  const half = Math.floor((maxLength - match[0].length) / 2);
  const start = Math.max(0, Math.min(match.index - half, normalized.length - maxLength));
  const end = Math.min(normalized.length, start + maxLength);

  const prefix = start > 0 ? '…' : '';
  const suffix = end < normalized.length ? '…' : '';

  return `${prefix}${normalized.slice(start, end).trim()}${suffix}`;
}

/** 按命中词把文本切分为高亮片段；无有效查询词或无命中时返回单个非命中片段。 */
export function splitHighlight(text: string, query: string): HighlightSegment[] {
  const pattern = createHighlightRegExp(query);

  if (!pattern || !text) {
    return [{ text, match: false }];
  }

  const segments: HighlightSegment[] = [];
  let cursor = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;

    if (index > cursor) {
      segments.push({ text: text.slice(cursor, index), match: false });
    }

    segments.push({ text: match[0], match: true });
    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), match: false });
  }

  return segments.length > 0 ? segments : [{ text, match: false }];
}
