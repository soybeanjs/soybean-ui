import type { Ref } from 'vue';
import { refAutoReset } from '@vueuse/shared';
import { getNextMatch } from '../shared';

const ITEM_TEXT_ATTR = 'data-item-text';

export function useTypeahead(collections?: Ref<HTMLElement[]>) {
  // Reset `search` 1 second after it was last updated
  const search = refAutoReset('', 1000);

  function handleTypeaheadSearch(key: string, fallback?: HTMLElement[]) {
    if (!collections?.value && !fallback) return;

    search.value += key;
    const items = collections?.value ?? fallback!;
    const itemsWithTextValue = items.map(el => ({
      ref: el,
      textValue: (el.querySelector(`[${ITEM_TEXT_ATTR}]`) ?? el).textContent?.trim() ?? ''
    }));
    const currentItem = document.activeElement;
    const currentMatch = itemsWithTextValue.find(item => item.ref === currentItem);
    const values = itemsWithTextValue.map(item => item.textValue);
    const nextMatch = getNextMatch(values, search.value, currentMatch?.textValue);

    const newItem = itemsWithTextValue.find(item => item.textValue === nextMatch);

    if (newItem) {
      (newItem.ref as HTMLElement).focus();
    }

    return newItem?.ref;
  }

  function resetTypeahead() {
    search.value = '';
  }

  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
