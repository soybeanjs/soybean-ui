import { computed, watchEffect, nextTick } from 'vue';
import type { ShallowRef } from 'vue';
import { useForwardElement } from '../../composables';

export function usePageTabsScroll(activeValue: ShallowRef<string>) {
  const [rootElement, setRootElement] = useForwardElement();

  const centerX = computed(() => (rootElement.value?.offsetWidth ?? 0) / 2);

  const onWheel = (event: WheelEvent) => {
    if (rootElement.value) {
      rootElement.value.scrollLeft += event.deltaY;
    }
  };

  watchEffect(async () => {
    if (!rootElement.value || !centerX.value || !activeValue.value) return;

    await nextTick();

    const activeElement = rootElement.value.querySelector<HTMLElement>(`[data-value="${activeValue.value}"]`);
    if (!activeElement) return;

    const offsetX = activeElement.offsetLeft + activeElement.offsetWidth / 2 - centerX.value;

    rootElement.value.scrollTo({ left: offsetX, behavior: 'smooth' });
  });

  return {
    setRootElement,
    onWheel
  };
}
