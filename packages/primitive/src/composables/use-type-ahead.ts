import type { Ref } from 'vue';
import { refAutoReset } from '@vueuse/shared';
import { getNextMatch } from '../shared';

export function useTypeAhead(collections?: Ref<HTMLElement[]>) {
  // Reset `search` 1 second after it was last updated
  const search = refAutoReset('', 1000);

  function handleTypeAheadSearch(key: string, fallback?: HTMLElement[]) {
    if (!collections?.value && !fallback) return;

    search.value += key;
    const items = collections?.value ?? fallback!;
    const currentItem = document.activeElement;
    const currentMatch = items.find(item => item === currentItem)?.textContent?.trim() ?? '';
    const values = items.map(item => item.textContent?.trim() ?? '');
    const nextMatch = getNextMatch(values, search.value, currentMatch);

    const newItem = items.find(item => item.textContent?.trim() === nextMatch);

    if (newItem) (newItem as HTMLElement).focus();
    return newItem;
  }

  function resetTypeAhead() {
    search.value = '';
  }

  return {
    search,
    handleTypeAheadSearch,
    resetTypeAhead
  };
}
