import { computed, toValue } from 'vue';
import type { ComputedRef, CSSProperties, MaybeRefOrGetter } from 'vue';
import {
  findActiveInLevel,
  findActivePath,
  flattenFirstLevelItems,
  isFirstLevelBackwardExpandKey,
  isPaneBoundaryKey,
  toVisibleOptions
} from './shared';
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

/**
 * Pane-level handlers that hand focus back to the rail item owning the pane.
 *
 * `onPaneKeydown` (bubble phase) catches the horizontal backward key at the
 * TreeMenu boundary: the menu consumes it for collapsing branches and only
 * lets it through once the pane's top level is reached.
 *
 * `onPaneKeydownCapture` (capture phase) catches the same key on the first
 * visible item of panes whose own roaming swallows it (horizontal TreeNav), so
 * the fallback triggers only once roaming is at its start.
 */
export function useSplitNavPaneFallback(activeItem: ComputedRef<SplitNavOptionData | undefined>) {
  const { dir, railItemElements } = useSplitNavRootContext('useSplitNavPaneFallback');

  function fallbackToOwner(event: KeyboardEvent) {
    event.preventDefault();

    const ownerValue = activeItem.value?.value;
    if (!ownerValue) return;

    railItemElements.get(ownerValue)?.focus();
  }

  function onPaneKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) return;
    if (!isFirstLevelBackwardExpandKey(event.key, 'vertical', dir.value)) return;

    const target = event.target;
    if (!(target instanceof HTMLElement) || !target.closest('[data-soybean-tree-menu-root]')) return;

    fallbackToOwner(event);
  }

  function onPaneKeydownCapture(event: KeyboardEvent) {
    const paneElement = event.currentTarget as HTMLElement;

    if (isPaneBoundaryKey(event, paneElement, key => isFirstLevelBackwardExpandKey(key, 'vertical', dir.value))) {
      fallbackToOwner(event);
    }
  }

  return {
    onPaneKeydown,
    onPaneKeydownCapture
  };
}
