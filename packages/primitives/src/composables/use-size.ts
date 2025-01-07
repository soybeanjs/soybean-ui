import { computed, onMounted, ref } from 'vue';
import { unrefElement } from '@vueuse/core';
import type { MaybeElementRef } from '@vueuse/core';

export function useSize(element: MaybeElementRef) {
  const size = ref<{ width: number; height: number }>();
  const width = computed(() => size.value?.width ?? 0);
  const height = computed(() => size.value?.height ?? 0);

  onMounted(() => {
    const el = unrefElement(element) as HTMLElement;
    if (el) {
      // provide size as early as possible
      size.value = { width: el.offsetWidth, height: el.offsetHeight };

      const resizeObserver = new ResizeObserver(entries => {
        if (!Array.isArray(entries)) return;

        // Since we only observe the one element, we don't need to loop over the
        // array
        if (!entries.length) return;

        const entry = entries[0];
        let w: number;
        let h: number;

        if ('borderBoxSize' in entry) {
          const borderSizeEntry = entry.borderBoxSize;
          // iron out differences between browsers
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          w = borderSize.inlineSize;
          h = borderSize.blockSize;
        } else {
          // for browsers that don't support `borderBoxSize`
          // we calculate it ourselves to get the correct border box.
          w = el.offsetWidth;
          h = el.offsetHeight;
        }

        // temporary disable width/height from resize observer. borderSizeEntry seems to be incorrect
        size.value = { width: w, height: h };
      });

      resizeObserver.observe(el, { box: 'border-box' });

      return () => resizeObserver.unobserve(el);
    }

    // We only want to reset to `undefined` when the element becomes `null`,
    // not if it changes to another element.
    size.value = undefined;
  });

  return {
    width,
    height
  };
}
