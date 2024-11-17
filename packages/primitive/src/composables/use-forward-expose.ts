import { getCurrentInstance } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { usePrimitiveElement } from './use-primitive-element';

export function useForwardExpose<T extends ComponentPublicInstance>() {
  const instance = getCurrentInstance()!;

  const { primitiveElement: currentRef, currentElement } = usePrimitiveElement<T | Element | null>();

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
