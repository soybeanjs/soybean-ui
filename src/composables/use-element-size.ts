import { computed, onWatcherCleanup, ref, watch } from 'vue';
import type { ShallowRef } from 'vue';
import { isClient } from '../shared';
import type { Size } from '../types';

export function useElementSize(element: ShallowRef<HTMLElement | null | undefined>) {
  const size = ref<Size>({ width: 0, height: 0 });
  const width = computed(() => size.value.width);
  const height = computed(() => size.value.height);
  const isSVG = computed(() => element.value?.namespaceURI?.includes('svg'));

  watch(
    element,
    el => {
      if (!el) return;

      const observer = new ResizeObserver(entries => {
        if (!Array.isArray(entries)) return;
        // Since we only observe the one element, we don't need to loop over the
        // array
        if (!entries.length) return;

        if (isClient && isSVG.value) {
          const rect = el.getBoundingClientRect();
          size.value = {
            width: rect.width,
            height: rect.height
          };
          return;
        }

        const [entry] = entries;

        const boxSize = entry.borderBoxSize;

        const { inlineSize, blockSize }: ResizeObserverSize = Array.isArray(boxSize) ? boxSize[0] : boxSize;

        size.value = {
          width: inlineSize || el.offsetWidth,
          height: blockSize || el.offsetHeight
        };
      });

      observer.observe(el, { box: 'border-box' });

      onWatcherCleanup(() => {
        observer.disconnect();
      });
    },
    {
      immediate: true,
      flush: 'post'
    }
  );

  return {
    width,
    height
  };
}
