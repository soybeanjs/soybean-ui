import { computed } from 'vue';
import type { Ref } from 'vue';
import type { MaybePromise } from '@soybeanjs/headless';
import type { PageTabsOptionData, PageTabsState } from './types';

interface UsePageStateOptions<T extends PageTabsOptionData> {
  items: Ref<T[]>;
  modelValue: Ref<string>;
  beforeClose: (value: string) => MaybePromise<boolean | void>;
}

export function usePageTabsState<T extends PageTabsOptionData>(options: UsePageStateOptions<T>) {
  const { items, modelValue } = options;

  const values = computed(() => items.value.map(item => item.value));

  const pinTab = (tab: T, pinned: boolean) => {
    tab.pinned = pinned;
  };

  const removeTab = (value: string) => {
    const index = values.value.indexOf(value);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  };

  const canCloseTab = (value: string) => {
    return !items.value.find(item => item.value === value)?.pinned;
  };

  const closeTab = async (value: string, onClose?: () => void) => {
    if (!canCloseTab(value)) return;

    const closable = await options.beforeClose(value);
    if (closable === false) return;

    const isActive = modelValue.value === value;

    let nextValue: string | undefined;

    if (isActive) {
      const index = values.value.indexOf(value);
      const nextItem = items.value[index + 1] ?? items.value[index - 1] ?? undefined;
      nextValue = nextItem?.value;
    }

    removeTab(value);

    if (isActive) {
      modelValue.value = nextValue ?? '';
    }

    onClose?.();
  };

  const removeTabs = (removed: string[]) => {
    if (removed.length === 0) return;

    const updated = items.value.filter(item => !removed.includes(item.value));

    const hasActive = removed.includes(modelValue.value);

    let nextValue: string | undefined;

    if (hasActive) {
      nextValue = updated[updated.length - 1]?.value;
    }

    items.value = updated;

    if (hasActive) {
      modelValue.value = nextValue ?? '';
    }
  };

  const getLeftClosableTabs = (value: string) => {
    const index = values.value.indexOf(value);
    if (index <= 0) return [];

    return items.value
      .slice(0, index)
      .filter(item => !item.pinned)
      .map(item => item.value);
  };

  const canCloseLeftTabs = (value: string) => getLeftClosableTabs(value).length > 0;
  const closeLeftTabs = (value: string) => {
    if (!canCloseLeftTabs(value)) return;
    const toRemove = getLeftClosableTabs(value);

    removeTabs(toRemove);
  };

  const getRightClosableTabs = (value: string) => {
    const index = values.value.indexOf(value);
    if (index === -1 || index >= values.value.length - 1) return [];

    return items.value
      .slice(index + 1)
      .filter(item => !item.pinned)
      .map(item => item.value);
  };
  const canCloseRightTabs = (value: string) => getRightClosableTabs(value).length > 0;
  const closeRightTabs = (value: string) => {
    if (!canCloseRightTabs(value)) return;
    const toRemove = getRightClosableTabs(value);

    removeTabs(toRemove);
  };

  const getOtherClosableTabs = (value: string) =>
    items.value.filter(item => item.value !== value && !item.pinned).map(item => item.value);

  const canCloseOtherTabs = (value: string) => getOtherClosableTabs(value).length > 0;
  const closeOtherTabs = (value: string) => {
    if (!canCloseOtherTabs(value)) return;
    const toRemove = getOtherClosableTabs(value);

    removeTabs(toRemove);
  };

  const getAllClosableTabs = () => items.value.filter(item => !item.pinned).map(item => item.value);
  const canCloseAllTabs = () => getAllClosableTabs().length > 0;
  const closeAllTabs = () => {
    if (!canCloseAllTabs()) return;
    const toRemove = getAllClosableTabs();

    removeTabs(toRemove);
  };

  const sortTabs = () => {
    const hidePinnedItems: T[] = [];
    const pinnedItems: T[] = [];
    const normalItems: T[] = [];

    items.value.forEach(item => {
      if (item.pinned) {
        if (item.hidePinnedIcon) {
          hidePinnedItems.push(item);
        } else {
          pinnedItems.push(item);
        }
      } else {
        normalItems.push(item);
      }
    });

    const updated = [...hidePinnedItems, ...pinnedItems, ...normalItems];
    const hasChanged = updated.some((item, index) => item.value !== items.value[index].value);

    if (hasChanged) {
      items.value = updated;
    }
  };

  const getState = (tab: T): PageTabsState => {
    const value = tab.value;

    const state: PageTabsState = {
      pin: () => {
        tab.pinned = true;
        sortTabs();
      },
      unpin: () => {
        tab.pinned = false;
        sortTabs();
      },
      closable: canCloseTab(value),
      close: async () => {
        closeTab(value);
      },
      leftClosable: canCloseLeftTabs(value),
      closeLeft: () => {
        closeLeftTabs(value);
      },
      rightClosable: canCloseRightTabs(value),
      closeRight: () => {
        closeRightTabs(value);
      },
      otherClosable: canCloseOtherTabs(value),
      closeOther: () => {
        closeOtherTabs(value);
      },
      allClosable: canCloseAllTabs(),
      closeAll: () => {
        closeAllTabs();
      }
    };

    return state;
  };

  return {
    closeTab,
    pinTab,
    sortTabs,
    getState
  };
}
