/**
 * 生成数据的译文查找。
 *
 * `apps/docs/src/generated/{api,changelog}-locales/*.json` 都是以 `descriptionKey`
 * / `summaryKey` 的点号路径逐段嵌套的对象（如
 * `api.generated.buttonprops.members.size`），取值必须逐段下钻——直接
 * `messages[key]` 永远取不到，会静默回退到英文原文。
 *
 * sui 生成 `zh-CN.json`，而站点 locale code 是 `zh`，所以这里同时提供文件名别名映射。
 */
export type GeneratedMessages = Record<string, unknown>;

export const GENERATED_LOCALE_FILES: Record<string, string> = {
  zh: 'zh-CN'
};

export function resolveGeneratedLocaleFileName(locale: string): string {
  return GENERATED_LOCALE_FILES[locale] ?? locale;
}

/**
 * 按 `a.b.c` 路径读取生成译文，缺失或非字符串时返回 null。
 * `path` 允许为 null，便于直接传入数据里的可选 `descriptionKey` / `summaryKey`。
 */
export function readGeneratedMessagePath(messages: GeneratedMessages, path: string | null | undefined): string | null {
  if (!path) {
    return null;
  }

  let current: unknown = messages;

  for (const segment of path.split('.')) {
    if (!current || typeof current !== 'object' || !(segment in current)) {
      return null;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === 'string' ? current : null;
}
