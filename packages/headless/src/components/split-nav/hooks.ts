import { computed, toValue } from 'vue';
import type { CSSProperties, MaybeRefOrGetter } from 'vue';
import { findActiveInLevel, findActivePath, flattenFirstLevelItems, toVisibleOptions } from './shared';
import { useSplitNavRootContext } from './context';
import type { SplitNavBaseOptionData, SplitNavOptionData } from './types';

/**
 * Derive the first-level list, active item, and child pane items for a SplitNav pane.
 *
 * Pass `items` to override the root tree (used when `DualVerticalPane` is nested
 * under `horizontal-dual-vertical`).
 */
export function useSplitNavDerived<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  items?: MaybeRefOrGetter<SplitNavOptionData<T>[] | undefined>
) {
  const { items: rootItems, modelValue, openPath } = useSplitNavRootContext('useSplitNavDerived');

  const sourceItems = computed(() => {
    const override = toValue(items);

    return toVisibleOptions((override ?? rootItems.value) as SplitNavOptionData<T>[]);
  });

  const firstLevelItems = computed(() => flattenFirstLevelItems(sourceItems.value));

  const selectionPath = computed(() => findActivePath(rootItems.value as SplitNavOptionData<T>[], modelValue.value));

  const activeItem = computed(
    () =>
      findActiveInLevel(firstLevelItems.value, openPath.value) ??
      findActiveInLevel(firstLevelItems.value, selectionPath.value)
  );

  const childItems = computed(() => {
    if (!activeItem.value?.children?.length) {
      return [];
    }

    return toVisibleOptions(activeItem.value.children as SplitNavOptionData<T>[]);
  });

  return {
    sourceItems,
    firstLevelItems,
    selectionPath,
    activeItem,
    childItems
  };
}

/**
 * Collapsed state and layout tokens for the nested TreeMenu pane.
 */
export function useSplitNavTreePane() {
  const { collapsed, collapsedWidth, modelValue, onItemActivate } = useSplitNavRootContext('useSplitNavTreePane');

  const treePaneState = computed(() => (collapsed.value ? 'collapsed' : 'expanded'));

  const treePaneStyle = computed<CSSProperties>(() => ({
    '--soybean-split-nav-tree-collapsed-width': `${(collapsedWidth.value ?? 50) / 16}rem`
  }));

  function handleTreeSelect(value: string) {
    onItemActivate(value);
  }

  function handleCollapsedChange(value: boolean) {
    collapsed.value = value;
  }

  return {
    collapsed,
    collapsedWidth,
    modelValue,
    treePaneState,
    treePaneStyle,
    handleTreeSelect,
    handleCollapsedChange
  };
}
