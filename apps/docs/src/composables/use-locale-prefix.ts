import { computed } from 'vue';
import { useRoute } from 'vue-router';

/**
 * Locale-aware link prefixing for docs navigation.
 *
 * Menu data uses locale-agnostic paths (`/components/button`); on `/zh/*`
 * pages links must carry the `/zh` prefix so language continuity is kept.
 */
export function useLocalePrefix() {
  const route = useRoute();

  const isZh = computed(() => route.path === '/zh' || route.path.startsWith('/zh/'));

  const localePrefix = computed(() => (isZh.value ? '/zh' : ''));

  /** Prepend the current locale prefix to a locale-agnostic path. */
  function localizedTo(to: string): string {
    if (to.startsWith('/zh')) return to;
    return `${localePrefix.value}${to}`;
  }

  /** Locale-agnostic path (strip the `/zh` prefix), e.g. for section detection. */
  function barePath(path: string): string {
    return path.startsWith('/zh/') ? path.slice(3) : path === '/zh' ? '/' : path;
  }

  return { isZh, localePrefix, localizedTo, barePath };
}
