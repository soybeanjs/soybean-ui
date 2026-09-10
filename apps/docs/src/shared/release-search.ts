import type { SearchSection } from '@ubean/content';
import { getReleaseChangelogDocument } from './generated-changelog';
import type { GeneratedReleaseChangelogVersion } from './generated-changelog';

/**
 * 将生成的 changelog 数据（apps/docs/src/generated/changelog/releases.json）
 * 并入全文搜索的 sections。
 *
 * `/releases` 的正文来自生成数据而不是 markdown，`__search.json` 里没有任何它的
 * 内容。这里按发布版本生成章节级 SearchSection，与内容 sections 合并，使
 * 「搜某个版本改了什么」成为可能。id 带 `/zh` 前缀规则，与内容 sections 的
 * locale 过滤（isCurrentLocaleHit）保持一致。
 *
 * 该页面没有版本级锚点，锚点部分会被 search-document 的 toRoute 丢弃，因此
 * 同一页面的多个版本命中最终会合并成一条结果（保留得分最高者）。
 */

const RELEASES_ROUTE = '/releases';

/** 面包屑文案，与 api-search.ts 的 ` · API` 一样是生成数据侧的固定标签。 */
const RELEASE_CRUMBS: Record<string, string[]> = {
  en: ['Changelog'],
  zh: ['更新日志']
};

const changelogLocaleModules = import.meta.glob<Record<string, unknown>>('../generated/changelog-locales/*.json', {
  eager: true,
  import: 'default'
});

/** sui 生成 `zh-CN.json`，站点 locale code 是 `zh`（与 use-generated-i18n 同一映射）。 */
const GENERATED_LOCALE_FILES: Record<string, string> = {
  zh: 'zh-CN'
};

const localeMessages = Object.fromEntries(
  Object.entries(changelogLocaleModules).map(([path, messages]) => [
    path.match(/([\w-]+)\.json$/u)?.[1] ?? path,
    messages
  ])
) as Record<string, Record<string, unknown>>;

/** 按 `a.b.c` 路径读取生成译文，缺失时返回 null。 */
function readGeneratedText(messages: Record<string, unknown>, key: string | null): string | null {
  if (!key) {
    return null;
  }

  let current: unknown = messages;

  for (const segment of key.split('.')) {
    if (!current || typeof current !== 'object' || !(segment in current)) {
      return null;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === 'string' ? current : null;
}

function resolveGeneratedText(messages: Record<string, unknown>, fallback: string, key: string | null): string {
  return readGeneratedText(messages, key)?.trim() || fallback.trim();
}

/** 版本 → 可检索正文：版本号 + 日期 + 破坏性说明 + 逐条变更（`scope summary`）。 */
function buildReleaseContent(release: GeneratedReleaseChangelogVersion, messages: Record<string, unknown>): string {
  const notes = release.notes.map(note => resolveGeneratedText(messages, note.summary, note.summaryKey));
  const entries = release.entries.map(
    entry => `${entry.scope} ${resolveGeneratedText(messages, entry.summary, entry.summaryKey)}`
  );

  return [release.version, release.date, ...notes, ...entries].join(' ').replace(/\s+/gu, ' ').trim();
}

function buildReleaseSections(releases: GeneratedReleaseChangelogVersion[], locale: string): SearchSection[] {
  const messages = localeMessages[GENERATED_LOCALE_FILES[locale] ?? locale] ?? {};
  const localePathPrefix = locale === 'en' ? '' : `/${locale}`;
  const crumbs = RELEASE_CRUMBS[locale] ?? RELEASE_CRUMBS.en;

  return releases.map(release => ({
    id: `${localePathPrefix}${RELEASES_ROUTE}#${release.version}`,
    title: release.version,
    titles: crumbs,
    level: 1,
    content: buildReleaseContent(release, messages)
  }));
}

/** 双语言 releases sections（en 无前缀、zh 带 `/zh`），由渲染层按 locale 过滤。 */
export function buildReleaseSearchSections(): SearchSection[] {
  const { releases } = getReleaseChangelogDocument();

  return [...buildReleaseSections(releases, 'en'), ...buildReleaseSections(releases, 'zh')];
}
