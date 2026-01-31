import { useContext, useUiContext } from '../../composables';
import type { PageTabsUiSlot, PageTabsRootContextParams, PageTabsItemContextParams } from './types';

export const [providePageTabsRootContext, usePageTabsRootContext] = useContext(
  'PageTabsRoot',
  (params: PageTabsRootContextParams) => {
    const { modelValue, pins, values, ...reset } = params;

    const onModelValueChange = (value: string) => {
      modelValue.value = value;
    };

    const isValueExists = (value: string) => {
      return values.value.includes(value);
    };

    const addTabItem = (value: string) => {
      if (!values.value.includes(value)) {
        values.value.push(value);
      }
    };

    const removeTabItem = (value: string) => {
      const index = values.value.indexOf(value);
      if (index !== -1) {
        values.value.splice(index, 1);
      }
    };

    const onCloseTab = (value: string) => {
      const isActive = modelValue.value === value;

      let nextValue: string | undefined;

      if (isActive) {
        const index = values.value.indexOf(value);
        nextValue = values.value[index + 1] ?? values.value[index - 1] ?? undefined;
      }

      removeTabItem(value);

      if (isActive) {
        modelValue.value = nextValue;
      }
    };

    const onPinTab = (value: string) => {
      if (!pins.value.includes(value)) {
        pins.value = [...pins.value, value];
      }
    };

    const onUnpinTab = (value: string) => {
      const index = pins.value.indexOf(value);
      if (index !== -1) {
        pins.value = pins.value.filter(v => v !== value);
      }
    };

    return {
      modelValue,
      onModelValueChange,
      isValueExists,
      pins,
      addTabItem,
      removeTabItem,
      onCloseTab,
      onPinTab,
      onUnpinTab,
      ...reset
    };
  }
);

export const [providePageTabsItemContext, usePageTabsItemContext] = useContext(
  'PageTabsItem',
  (params: PageTabsItemContextParams) => params
);

export const [providePageTabsUi, usePageTabsUi] = useUiContext<PageTabsUiSlot>('PageTabsUi');
