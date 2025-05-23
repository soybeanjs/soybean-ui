import { shallowRef } from 'vue';
import { getElFromTemplateRef } from '../shared';
import type { VNodeRef } from '../types';

/**
 * Forward the element ref to the parent component.
 *
 * @returns An object containing the element reference and a function to set the element reference.
 */
export function useForwardElement() {
  const elementRef = shallowRef<HTMLElement>();

  function setElementRef(nodeRef: VNodeRef) {
    const node = getElFromTemplateRef(nodeRef);
    elementRef.value = node;
  }

  return {
    elementRef,
    setElementRef
  };
}
