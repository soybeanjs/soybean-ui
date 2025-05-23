import { getCurrentInstance } from 'vue';
import type { VNodeRef } from '../types';
import { useForwardElement } from './use-forward-element';

/** Expose the element ref to the parent component. */
export function useExposedElement() {
  const instance = getCurrentInstance();
  const { elementRef, setElementRef } = useForwardElement();

  const setExposedElement = (nodeRef: VNodeRef) => {
    setElementRef(nodeRef);

    if (instance?.exposeProxy) {
      instance.exposeProxy.$el = elementRef.value;
    }
  };

  return {
    elementRef,
    setElementRef: setExposedElement
  };
}
