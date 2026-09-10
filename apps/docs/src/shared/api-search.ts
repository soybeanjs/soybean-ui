import type { SearchSection } from '@ubean/content';

/**
 * 将生成的组件 API 数据（apps/docs/src/generated/api）并入全文搜索的 sections。
 *
 * 组件文档的 `## API` 由 `<ComponentApi>` 运行时渲染，markdown 正文只含组件标签，
 * 因此 prop / emit 名称、类型与描述无法被 `__search.json` 检索到。这里把 API 成员
 * 转成章节级 SearchSection（title = 组件名 + 成员名，content = 类型 + 描述），
 * 与内容 sections 合并，使「搜组件具体 API」成为可能。章节 id 带 `/zh` 前缀规则，
 * 与内容 sections 的 locale 过滤（isCurrentLocaleHit）保持一致。
 */

const API_KINDS = ['props', 'emits', 'slots'] as const;

type ApiKind = (typeof API_KINDS)[number];

interface ApiMember {
  name: string;
  type: string;
  description?: string;
  descriptionKey?: string;
}

interface ApiKindDef {
  kind?: string;
  members?: ApiMember[];
}

interface ApiFile {
  // 包级汇总索引文件（api 各包的 index.json）的 shape 是 `{ components }`，component/symbols 可能缺失。
  component?: string;
  // symbol 名（如 Button）→ { props, emits, ... }
  symbols?: Record<string, Record<string, ApiKindDef>>;
}

interface ApiLocalesFile {
  /** descriptionKey -> 本地化描述 */
  [key: string]: string;
}

const apiModules = import.meta.glob<{ default: ApiFile }>('../generated/api/*/*.json');
const zhLocaleModules = import.meta.glob<{ default: ApiLocalesFile }>('../generated/api-locales/zh-CN.json');

/** `../generated/api/<pkg>/<name>.json` 的 glob key → 组件文档路由前缀。 */
function routePrefix(path: string): string {
  const pkg = path.split('/').at(-2);

  return pkg === 'ui' ? '/components' : `/${pkg}`;
}

/** 加载懒 glob 的模块值（带容错：单个文件解析失败不阻断整体）。 */
async function loadGlobEntries<T>(
  modules: Record<string, () => Promise<{ default: T }>>
): Promise<Array<{ path: string; data: T }>> {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      try {
        return { path, data: (await loader()).default };
      } catch {
        return null;
      }
    })
  );

  return entries.filter((entry): entry is { path: string; data: T } => entry !== null);
}

/** 英文 API sections（无 locale 前缀的 id）。 */
function buildApiSectionsForLocale(
  files: Array<{ path: string; data: ApiFile }>,
  localePathPrefix: string,
  resolveDescription: (key: string | undefined, fallback: string | undefined) => string
): SearchSection[] {
  return files.flatMap(({ path, data }) => {
    const component = data.component ?? '';
    const symbols = data.symbols ?? {};

    // 跳过包级汇总索引文件（api/*/index.json 的 shape 是 `{ components }`）。
    if (!component || Object.keys(symbols).length === 0) {
      return [];
    }

    const route = `${localePathPrefix}${routePrefix(path)}/${component}`;
    const sections: SearchSection[] = [];

    for (const [symbolName, kinds] of Object.entries(symbols)) {
      for (const kind in kinds) {
        const def = kinds[kind];

        if (!API_KINDS.includes(kind as ApiKind) || !def.members) {
          continue;
        }

        for (const member of def.members) {
          if (!member.name || !member.type) {
            continue;
          }

          const description = resolveDescription(member.descriptionKey, member.description);

          sections.push({
            id: `${route}#api-${kind}-${member.name}`,
            title: `${symbolName} ${member.name} (${kind})`,
            titles: [`${data.component} · API`],
            level: 2,
            content: description
              ? `${member.type.replace(/\s+/gu, ' ')} — ${description}`
              : member.type.replace(/\s+/gu, ' ')
          });
        }
      }
    }

    return sections;
  });
}

/**
 * 组装 useContentSearch 的完整 sections：
 * 服务端内容 sections（`__search.json` 全部 collection）+ 双语言 API sections。
 * 返回后按 id 前缀（`/zh`）由渲染层过滤当前 locale。
 */
export async function loadContentSearchSections(): Promise<SearchSection[]> {
  const [remotePayload, apiEntries, localeEntries] = await Promise.all([
    fetch('/__search.json')
      .then(res => (res.ok ? res.json() : {}))
      .catch(() => ({})),
    loadGlobEntries(apiModules),
    loadGlobEntries(zhLocaleModules)
  ]);

  const contentSections = Object.values(remotePayload).flat() as SearchSection[];
  const zhLocale = localeEntries[0]?.data ?? null;

  const resolve =
    (locale: ApiLocalesFile | null) =>
    (key: string | undefined, fallback: string | undefined): string => {
      if (key && locale?.[key]) {
        return locale[key];
      }

      return fallback ?? '';
    };

  const enApiSections = buildApiSectionsForLocale(apiEntries, '', resolve(null));
  const zhApiSections = buildApiSectionsForLocale(apiEntries, '/zh', resolve(zhLocale));

  return [...contentSections, ...enApiSections, ...zhApiSections];
}
