import { computed, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { unrefElement } from '@vueuse/core';

export function usePrimitiveElement<T extends ComponentPublicInstance | Element | null = ComponentPublicInstance>() {
  const primitiveElement = ref<T>();

  const currentElement = computed<HTMLElement>(() =>
    ['#text', '#comment'].includes((primitiveElement.value as any)?.$el.nodeName)
      ? (primitiveElement.value as any)?.$el.nextElementSibling
      : unrefElement(primitiveElement as any)
  );

  return {
    primitiveElement,
    currentElement
  };
}
