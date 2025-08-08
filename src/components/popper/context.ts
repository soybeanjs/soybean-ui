import { computed, shallowRef } from 'vue';
import type { ReferenceElement } from '@floating-ui/vue';
import { useContext } from '../../composables';
import { provideArrowThemeContext } from '../arrow/context';
import type { PopoverThemeContextParams, PopperContentContextParams } from './types';

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

export const [providePopoverThemeContext, usePopoverThemeContext] = useContext(
  'PopoverTheme',
  (params: PopoverThemeContextParams) => {
    const arrowCls = computed(() => params.ui.value.arrow);

    provideArrowThemeContext(arrowCls);

    return params;
  }
);
