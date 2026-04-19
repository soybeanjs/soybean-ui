const placeholders = {
  en: { year: 'yyyy', month: 'mm', day: 'dd' },
  'zh-CN': { year: '年', month: '月', day: '日' },
  'zh-TW': { year: '年', month: '月', day: '日' }
} as const;

type PlaceholderField = 'year' | 'month' | 'day';
export type SupportedLocale = keyof typeof placeholders;

function resolvePlaceholderLocale(locale: string): SupportedLocale {
  if (locale in placeholders) {
    return locale as SupportedLocale;
  }

  const language = locale.split('-')[0];
  if (language in placeholders) {
    return language as SupportedLocale;
  }

  return 'en';
}

export function getPlaceholder(field: PlaceholderField | 'era' | 'hour' | 'minute' | 'second' | 'dayPeriod', value: string, locale: string) {
  if (field === 'year' || field === 'month' || field === 'day') {
    return placeholders[resolvePlaceholderLocale(locale)][field];
  }

  if (field === 'era' || field === 'dayPeriod') {
    return value;
  }

  return '––';
}
