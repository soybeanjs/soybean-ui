import { computed, unref } from 'vue';
import type { MaybeRef } from 'vue';

export function useFilter(options?: MaybeRef<Intl.CollatorOptions>) {
  const computedOptions = computed(() => unref(options));
  const collator = computed(() => new Intl.Collator('en', { usage: 'search', ...computedOptions.value }));

  function startsWith(string: string, substring: string) {
    if (substring.length === 0) return true;

    const normalizedString = string.normalize('NFC');
    const normalizedSubstring = substring.normalize('NFC');
    return collator.value.compare(normalizedString.slice(0, normalizedSubstring.length), normalizedSubstring) === 0;
  }

  function endsWith(string: string, substring: string) {
    if (substring.length === 0) return true;

    const normalizedString = string.normalize('NFC');
    const normalizedSubstring = substring.normalize('NFC');
    return collator.value.compare(normalizedString.slice(-normalizedSubstring.length), normalizedSubstring) === 0;
  }

  function contains(string: string, substring: string) {
    if (substring.length === 0) return true;

    const normalizedString = string.normalize('NFC');
    const normalizedSubstring = substring.normalize('NFC');

    let scan = 0;
    const sliceLen = normalizedSubstring.length;
    for (; scan + sliceLen <= normalizedString.length; scan++) {
      const normalizedSlice = normalizedString.slice(scan, scan + sliceLen);
      if (collator.value.compare(normalizedSubstring, normalizedSlice) === 0) {
        return true;
      }
    }

    return false;
  }

  return {
    startsWith,
    endsWith,
    contains
  };
}
