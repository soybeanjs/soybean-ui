import { computed, getCurrentInstance, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { unrefElement } from '@vueuse/core';
import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core';

export function useForwardExpose<T extends ComponentPublicInstance>() {
  const instance = getCurrentInstance()!;

  const currentRef = ref<Element | T | null>();
  const currentElement = computed<HTMLElement>(() => {
    // $el could be text/comment for non-single root normal or text root, thus we retrieve the nextElementSibling

    return ['#text', '#comment'].includes((currentRef.value as ComponentPublicInstance)?.$el.nodeName)
      ? (currentRef.value as ComponentPublicInstance)?.$el.nextElementSibling
      : unrefElement(currentRef as MaybeComputedElementRef<MaybeElement>);
  });

  // Do give us credit if you reference our code
  // localExpose should only be assigned once else will create infinite loop
  const localExpose: Record<string, any> | null = { ...instance.exposed };
  const ret: Record<string, any> = {};

  // retrieve props for current instance
  for (const key in instance.props) {
    Object.defineProperty(ret, key, {
      enumerable: true,
      configurable: true,
      get: () => instance.props[key]
    });
  }

  // retrieve default exposed value
  if (Object.keys(localExpose).length > 0) {
    for (const key in localExpose) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        configurable: true,
        get: () => localExpose![key]
      });
    }
  }

  // retrieve original first root element
  Object.defineProperty(ret, '$el', {
    enumerable: true,
    configurable: true,
    get: () => instance.vnode.el
  });
  instance.exposed = ret;

  function forwardRef(el: Element | T | null) {
    currentRef.value = el;

    if (el instanceof Element || !el) return;

    // retrieve the forwarded element
    Object.defineProperty(ret, '$el', {
      enumerable: true,
      configurable: true,
      get: () => el.$el
    });

    instance.exposed = ret;
  }

  return { forwardRef, currentRef, currentElement };
}
