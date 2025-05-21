import { getCurrentInstance, shallowRef } from 'vue';
import type { VNodeRef } from '../types';
import { getElFromTemplateRef } from '../shared';

export function useForwardElement(exposed?: boolean) {
  const elRef = shallowRef<HTMLElement>();
  const instance = getCurrentInstance();

  function setElRef(nodeRef: VNodeRef) {
    const node = getElFromTemplateRef(nodeRef);
    elRef.value = node;

    if (instance?.exposeProxy && exposed) {
      instance.exposeProxy.$el = node;
    }
  }

  return {
    elRef,
    setElRef
  };
}
