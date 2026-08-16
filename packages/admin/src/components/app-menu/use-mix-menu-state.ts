import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { AppMenuData } from '../../types';

/**
 * State derived from the full menu tree for hybrid/mix modes.
 *
 * Splits the tree into first-level / second-level / child-level menus and
 * resolves the active first/second level from the selected key (对齐
 * soybean-admin `global-menu/context`). Unlike a purely derived helper, the
 * active keys are writable so clicking a parent switches the visible branch
 * without immediately navigating (navigation happens for leaf nodes only).
 */
export interface AppMixMenuState {
  /** First-level menu nodes (the icon rail). */
  firstLevelMenus: ComputedRef<AppMenuData[]>;
  /** The key of the active first-level item. */
  activeFirstLevelKey: Ref<string | undefined>;
  /** Set the active first-level key (e.g. on click). */
  setActiveFirstLevelKey: (key?: string) => void;
  /** Whether the active first-level item has visible children. */
  isActiveFirstLevelHasChildren: ComputedRef<boolean>;
  /**
   * Select a first-level item.
   *
   * Sets the active first level and returns whether it has children (used to
   * decide between showing the child rail vs. navigating a leaf).
   */
  handleSelectFirstLevel: (key: string) => boolean;
  /** Second-level menu nodes of the active first-level item. */
  secondLevelMenus: ComputedRef<AppMenuData[]>;
  /** The key of the active second-level item. */
  activeSecondLevelKey: Ref<string | undefined>;
  /** Set the active second-level key. */
  setActiveSecondLevelKey: (key?: string) => void;
  /** Whether the active second-level item has children. */
  isActiveSecondLevelHasChildren: ComputedRef<boolean>;
  /**
   * Select a second-level item.
   *
   * Sets the active second level and returns whether it has children.
   */
  handleSelectSecondLevel: (key: string) => boolean;
  /** Third-level menu nodes of the active second-level item. */
  childLevelMenus: ComputedRef<AppMenuData[]>;
}

/**
 * Create mix-menu state from menu data and a selected key.
 *
 * The active first/second level keys are initialized (and re-synced) from the
 * selected key, but can be overridden by user interaction via
 * `handleSelectFirstLevel` / `handleSelectSecondLevel`.
 *
 * @param data - The full menu tree.
 * @param selectedKey - The currently selected (deepest) menu key.
 */
export function useMixMenuState(
  data: ComputedRef<AppMenuData[]>,
  selectedKey: Ref<string | undefined>
): AppMixMenuState {
  const firstLevelMenus = computed(() => data.value.filter(item => !item.hideInMenu));

  const activeFirstLevelKey = ref<string | undefined>(undefined);
  const activeSecondLevelKey = ref<string | undefined>(undefined);

  function setActiveFirstLevelKey(key?: string) {
    activeFirstLevelKey.value = key;
  }

  function setActiveSecondLevelKey(key?: string) {
    activeSecondLevelKey.value = key;
  }

  function deriveActiveKeys() {
    const key = selectedKey.value;

    if (!key) {
      activeFirstLevelKey.value = undefined;
      activeSecondLevelKey.value = undefined;
      return;
    }

    for (const first of firstLevelMenus.value) {
      if (first.key === key || containsKey(first, key)) {
        activeFirstLevelKey.value = first.key;
        activeSecondLevelKey.value = deriveSecondLevelKey(first, key);
        return;
      }
    }

    activeFirstLevelKey.value = undefined;
    activeSecondLevelKey.value = undefined;
  }

  watch(firstLevelMenus, deriveActiveKeys, { immediate: true });
  watch(selectedKey, deriveActiveKeys);

  const activeFirstLevel = computed(() => firstLevelMenus.value.find(item => item.key === activeFirstLevelKey.value));

  const secondLevelMenus = computed(() => activeFirstLevel.value?.children?.filter(child => !child.hideInMenu) ?? []);

  const isActiveFirstLevelHasChildren = computed(() => secondLevelMenus.value.length > 0);

  function handleSelectFirstLevel(key: string): boolean {
    setActiveFirstLevelKey(key);
    return isActiveFirstLevelHasChildren.value;
  }

  const activeSecondLevel = computed(() =>
    secondLevelMenus.value.find(item => item.key === activeSecondLevelKey.value)
  );

  const childLevelMenus = computed(() => activeSecondLevel.value?.children?.filter(child => !child.hideInMenu) ?? []);

  const isActiveSecondLevelHasChildren = computed(() => childLevelMenus.value.length > 0);

  function handleSelectSecondLevel(key: string): boolean {
    setActiveSecondLevelKey(key);
    return isActiveSecondLevelHasChildren.value;
  }

  return {
    firstLevelMenus,
    activeFirstLevelKey,
    setActiveFirstLevelKey,
    isActiveFirstLevelHasChildren,
    handleSelectFirstLevel,
    secondLevelMenus,
    activeSecondLevelKey,
    setActiveSecondLevelKey,
    isActiveSecondLevelHasChildren,
    handleSelectSecondLevel,
    childLevelMenus
  };
}

function containsKey(node: AppMenuData, key: string): boolean {
  return node.children?.some(child => child.key === key || containsKey(child, key)) ?? false;
}

function deriveSecondLevelKey(first: AppMenuData, key: string): string | undefined {
  for (const second of first.children ?? []) {
    if (second.key === key) {
      return second.key;
    }
    if (second.children?.some(child => child.key === key)) {
      return second.key;
    }
  }
  return undefined;
}
