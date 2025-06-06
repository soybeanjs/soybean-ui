import { getCurrentInstance } from 'vue';
import type { VNodeRef } from '../types';
import { useForwardElement } from './use-forward-element';

/** Expose the element ref to the parent component. */
export function useExposedElement(callback?: (el: HTMLElement) => void) {
  const instance = getCurrentInstance();
  const [elementRef, setElementRef] = useForwardElement(callback);

  const setExposedElement = (nodeRef: VNodeRef) => {
    setElementRef(nodeRef);

    if (instance?.exposed) {
      instance.exposed.$el = elementRef.value;
    }
  };

  return [elementRef, setExposedElement] as const;
}
