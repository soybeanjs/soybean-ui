import { refAutoReset } from '@vueuse/shared';
import { getNextMatch } from '../shared';

export function useTypeahead(callback?: (search: string) => void) {
  // Reset `search` 1 second after it was last updated
  const search = refAutoReset('', 1000);

  const handleTypeaheadSearch = (key: string, items: { ref: HTMLElement; value?: any }[]) => {
    search.value += key;

    if (callback) {
      callback(key);
    } else {
      const currentItem = document.activeElement;
      const itemsWithTextValue = items.map(item => ({
        ...item,
        textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ''
      }));
      const currentMatch = itemsWithTextValue.find(item => item.ref === currentItem);
      const values = itemsWithTextValue.map(item => item.textValue);
      const nextMatch = getNextMatch(values, search.value, currentMatch?.textValue);

      const newItem = itemsWithTextValue.find(item => item.textValue === nextMatch);

      if (newItem) (newItem.ref as HTMLElement).focus();
      return newItem?.ref;
    }
  };

  const resetTypeahead = () => {
    search.value = '';
  };

  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
