import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import {
  findActiveInLevel,
  findActivePath,
  flattenFirstLevelItems,
  getChildrenOfActive,
  toVisibleOptions
} from './shared';
import { useSplitNavRootContext } from './context';
import type { SplitNavBaseOptionData, SplitNavOptionData } from './types';

/**
 * Derive the first-level list, active item, and child pane items for a SplitNav pane.
 *
 * Pass `items` to override the root tree (used when `DualVerticalMenu` is nested
 * under `horizontal-dual-vertical`).
 */
export function useSplitNavDerived<T extends SplitNavBaseOptionData = SplitNavBaseOptionData>(
  items?: MaybeRefOrGetter<SplitNavOptionData<T>[] | undefined>
) {
  const { items: rootItems, modelValue } = useSplitNavRootContext('useSplitNavDerived');

  const sourceItems = computed(() => {
    const override = toValue(items);

    return toVisibleOptions((override ?? rootItems.value) as SplitNavOptionData<T>[]);
  });

  const firstLevelItems = computed(() => flattenFirstLevelItems(sourceItems.value));

  const activePath = computed(() => findActivePath(rootItems.value as SplitNavOptionData<T>[], modelValue.value));

  const activeItem = computed(() => findActiveInLevel(firstLevelItems.value, activePath.value));

  const childItems = computed(() => getChildrenOfActive(firstLevelItems.value, activePath.value));

  return {
    sourceItems,
    firstLevelItems,
    activePath,
    activeItem,
    childItems
  };
}
