import { shallowRef } from 'vue';
import type { ReferenceElement } from '@floating-ui/dom';
import { useContext } from '../../composables';
import type { PopperPositionerContextParams, PopperThemeContextParams } from './types';

export const [providePopperRootContext, usePopperRootContext] = useContext('PopperRoot', () => {
  const popupElement = shallowRef<HTMLElement>();
  const onPopupElementChange = (element: HTMLElement) => {
    popupElement.value = element;
  };

  const anchorElement = shallowRef<ReferenceElement>();
  const onAnchorElementChange = (element: ReferenceElement | undefined) => {
    anchorElement.value = element;
  };

  return {
    popupElement,
    onPopupElementChange,
    anchorElement,
    onAnchorElementChange
  };
});

export const [providePopperPositionerContext, usePopperPositionerContext] = useContext(
  'PopperPositioner',
  (params: PopperPositionerContextParams) => {
    const arrowElement = shallowRef<HTMLElement | null | undefined>(null);

    const onArrowElementChange = (element: HTMLElement | null | undefined) => {
      arrowElement.value = element ?? null;
    };

    return {
      ...params,
      arrowElement,
      onArrowElementChange
    };
  }
);

export const [providePopperThemeContext, usePopperThemeContext] = useContext(
  'PopperTheme',
  (params: PopperThemeContextParams) => params
);
