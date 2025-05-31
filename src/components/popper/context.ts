import { shallowRef } from 'vue';
import type { ReferenceElement } from '@floating-ui/vue';
import { useContext } from '../../composables';
import type { PopperContentContextParams } from './types';

export const [providePopperRootContext, usePopperRootContext] = useContext('PopperRoot', () => {
  const anchorElement = shallowRef<ReferenceElement>();

  const onAnchorElementChange = (element: ReferenceElement | undefined) => {
    anchorElement.value = element;
  };

  return {
    anchorElement,
    onAnchorElementChange
  };
});

export const [providePopperContentContext, usePopperContentContext] = useContext(
  'PopperContent',
  (params: PopperContentContextParams) => params
);
