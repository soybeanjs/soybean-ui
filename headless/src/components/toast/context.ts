import { shallowRef } from 'vue';
import type { ComputedRef } from 'vue';
import type { ClassValue } from '../../types';
import { useCollection, useContext } from '../../composables';
import type { ToastProviderContextParams, ToastRootContextParams, ToastThemeContextParams } from './types';

export const { provideCollectionContext, useCollectionContext, useCollectionItem } = useCollection('Toast');

export const [provideToastProviderContext, useToastProviderContext] = useContext(
  'ToastProvider',
  (params: ToastProviderContextParams) => {
    const viewportElement = shallowRef<HTMLElement | null>(null);

    const onViewportElementChange = (element: HTMLElement | null) => {
      viewportElement.value = element;
    };

    const isFocusedToastEscapeKeyDownRef = shallowRef(false);
    const isClosePausedRef = shallowRef(false);

    const toastCount = shallowRef(0);

    const onToastAdd = () => {
      toastCount.value++;
    };

    const onToastRemove = () => {
      toastCount.value--;
    };

    return {
      ...params,
      viewportElement,
      onViewportElementChange,
      isFocusedToastEscapeKeyDownRef,
      isClosePausedRef,
      toastCount,
      onToastAdd,
      onToastRemove
    };
  }
);

export const [provideToastRootContext, useToastRootContext] = useContext(
  'ToastRoot',
  (params: ToastRootContextParams) => params
);

export const [provideToastThemeContext, useToastThemeContext] = useContext(
  'ToastTheme',
  (params: ToastThemeContextParams) => params
);

export const [provideToastViewportThemeContext, useToastViewportThemeContext] = useContext(
  'ToastViewportTheme',
  (cls: ComputedRef<ClassValue>) => cls
);
