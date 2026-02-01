import { computed, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { useForwardElement } from '../../composables';
import type { UsePageTabsOperationOptions } from './types';

export function usePageTabsScroll(activeValue: ShallowRef<string>) {
  const [rootElement, setRootElement] = useForwardElement();

  const centerX = computed(() => (rootElement.value?.offsetWidth ?? 0) / 2);

  const onWheel = (event: WheelEvent) => {
    if (rootElement.value) {
      rootElement.value.scrollLeft += event.deltaY;
    }
  };

  watchEffect(() => {
    if (!rootElement.value || !centerX.value || !activeValue.value) return;

    const activeElement = rootElement.value.querySelector<HTMLElement>(`[data-value="${activeValue.value}"]`);
    if (!activeElement) return;

    const offsetX = activeElement.offsetLeft + activeElement.offsetWidth / 2 - centerX.value;

    rootElement.value.scrollTo({ left: offsetX, behavior: 'smooth' });
  });

  return {
    setRootElement,
    onWheel
  };
}

export function usePageTabsOperation(options: UsePageTabsOperationOptions) {
  const { modelValue, pins, values, beforeClose } = options;

  const isActiveTab = (value: string) => modelValue.value === value;

  const setActiveTab = (value: string) => {
    if (modelValue.value === value) return;

    modelValue.value = value;
  };

  const addTab = (value: string) => {
    if (!values.value.includes(value)) {
      values.value = [...values.value, value];
    }
  };

  const removeTab = (value: string) => {
    const index = values.value.indexOf(value);
    if (index !== -1) {
      values.value = values.value.filter(v => v !== value);
    }
  };

  const isTabPinned = (value: string) => pins.value.includes(value);

  const pinTab = (value: string) => {
    if (!isTabPinned(value)) {
      pins.value = [...pins.value, value];
    }
  };

  const unpinTab = (value: string) => {
    const index = pins.value.indexOf(value);
    if (index !== -1) {
      pins.value = pins.value.filter(v => v !== value);
    }
  };

  const togglePinTab = (value: string) => {
    if (isTabPinned(value)) {
      unpinTab(value);
    } else {
      pinTab(value);
    }
  };

  const canCloseTab = (value: string) => !isTabPinned(value);

  const closeTab = async (value: string, onClose?: () => void) => {
    const closeable = canCloseTab(value);
    if (!closeable) return;

    const beforeCloseResult = await beforeClose?.(value);
    if (beforeCloseResult === false) return;

    const isActive = modelValue.value === value;

    let nextValue: string | undefined;

    if (isActive) {
      const index = values.value.indexOf(value);
      nextValue = values.value[index + 1] ?? values.value[index - 1] ?? undefined;
    }

    removeTab(value);

    if (isActive) {
      modelValue.value = nextValue ?? '';
    }

    onClose?.();
  };

  const canCloseLeftTabs = (value: string) => {
    const current = values.value.indexOf(value);
    if (current <= 0) return false;
    return values.value.slice(0, current).some(tab => canCloseTab(tab));
  };

  const closeLeftTabs = (value: string) => {
    const current = values.value.indexOf(value);
    if (current <= 0) return;

    const leftTabs = values.value.slice(0, current);
    leftTabs.forEach(tab => {
      closeTab(tab);
    });
  };

  const canCloseRightTabs = (value: string) => {
    const current = values.value.indexOf(value);
    if (current === -1 || current >= values.value.length - 1) return false;

    return values.value.slice(current + 1).some(tab => canCloseTab(tab));
  };

  const closeRightTabs = (value: string) => {
    const current = values.value.indexOf(value);
    if (current === -1 || current === values.value.length - 1) return;

    const rightTabs = values.value.slice(current + 1);
    rightTabs.forEach(tab => {
      closeTab(tab);
    });
  };

  const canCloseOtherTabs = (value: string) => values.value.some(tab => tab !== value && canCloseTab(tab));

  const closeOtherTabs = (value: string) => {
    values.value.forEach(tab => {
      if (tab === value) return;
      closeTab(tab);
    });
  };

  const canCloseAllTabs = () => values.value.some(tab => canCloseTab(tab));

  const closeAllTabs = () => {
    values.value.forEach(tab => {
      closeTab(tab);
    });
  };

  return {
    isActiveTab,
    setActiveTab,
    addTab,
    removeTab,
    isTabPinned,
    pinTab,
    unpinTab,
    togglePinTab,
    closeTab,
    closeLeftTabs,
    closeRightTabs,
    closeOtherTabs,
    closeAllTabs,
    canCloseTab,
    canCloseLeftTabs,
    canCloseRightTabs,
    canCloseOtherTabs,
    canCloseAllTabs
  };
}
