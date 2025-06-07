import { shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import type { ReferenceElement } from '@floating-ui/vue';
import { useContext } from '../../composables';
import type { PopperContentContextParams } from './types';

export const [providePopperRootContext, usePopperRootContext] = useContext('PopperRoot', () => {
  const contentWrapperElement = shallowRef<HTMLElement>();

  const onContentWrapperElementChange = (element: HTMLElement) => {
    contentWrapperElement.value = element;
  };

  const contentWrapperStyle = shallowRef<CSSProperties>({});

  const onContentWrapperStyleChange = (style: CSSProperties) => {
    contentWrapperStyle.value = style;
  };

  const anchorElement = shallowRef<ReferenceElement>();

  const onAnchorElementChange = (element: ReferenceElement | undefined) => {
    anchorElement.value = element;
  };

  return {
    contentWrapperElement,
    onContentWrapperElementChange,
    contentWrapperStyle,
    onContentWrapperStyleChange,
    anchorElement,
    onAnchorElementChange
  };
});

export const [providePopperContentContext, usePopperContentContext] = useContext(
  'PopperContent',
  (params: PopperContentContextParams) => params
);
