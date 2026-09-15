<script setup lang="ts">
import { computed } from 'vue';
import type { LayoutSide } from '@soybeanjs/headless/layout';
import type { SplitNavOptionData } from '@soybeanjs/headless/split-nav';
import type { ThemeSize } from '@/theme';
import SNavMenu from '../nav-menu/nav-menu.vue';
import SSplitNav from '../split-nav/split-nav.vue';
import STreeMenu from '../tree-menu/tree-menu.vue';
import { appShellSkeletons, filterVisibleMenuItems, splitNavCollapsedPaneWidth } from './shared';
import type { AppShellMenuItem, AppShellMenuProps, AppShellMenuUi, AppShellMode } from './types';

defineOptions({
  name: 'AppShellMenu'
});

interface Props {
  /** Shell mode the menu renders for. */
  mode: AppShellMode;
  /** Visual size forwarded to the renderer. */
  size: ThemeSize;
  /** Menu tree rendered by the renderer. */
  items: AppShellMenuItem[];
  /** Active leaf value. */
  modelValue: string | undefined;
  /** Side the sidebar is placed on. */
  side: LayoutSide;
  /** Whether the sidebar is collapsed. */
  collapsed: boolean;
  /** Collapsed sidebar width in pixels, used by the nested tree renderer. */
  collapsedWidth: number;
  /**
   * Structural classes the shell applies to the nested pane: an overlay while
   * the collapsed sidebar still shows it, or a hide rule when it is suppressed.
   */
  paneClass: string | undefined;
  /** Mount target of the horizontal pane, when the mode teleports it. */
  headerMountId: string | undefined;
  /** Mount target of the vertical pane, when the mode teleports it. */
  sidebarMountId: string | undefined;
  /** Per-renderer props. */
  menuProps: AppShellMenuProps | undefined;
  /** Per-renderer slot classes. */
  menuUi: AppShellMenuUi | undefined;
}

const props = defineProps<Props>();

interface Emits {
  'update:modelValue': [value: string];
  select: [key: string, event?: Event];
  open: [item: AppShellMenuItem, event?: Event];
}

const emit = defineEmits<Emits>();

const skeleton = computed(() => appShellSkeletons[props.mode]);

// Hidden options are dropped for every renderer: the tree-based ones filter
// internally, `SNavMenu` does not, and doing it once keeps `hidden` uniform.
const visibleItems = computed(() => filterVisibleMenuItems(props.items));

const treeProps = computed(() => ({ side: props.side, ...props.menuProps?.tree }));

const splitProps = computed(() => props.menuProps?.split ?? {});

const navProps = computed(() => props.menuProps?.nav ?? {});

const treeUi = computed(() => props.menuUi?.tree);

const splitUi = computed(() => ({ subVertical: props.paneClass, ...props.menuUi?.split }));

const navUi = computed(() => props.menuUi?.nav);

function handleModelUpdate(value: string) {
  emit('update:modelValue', value);
}

function handleTreeSelect(value: string) {
  emit('update:modelValue', value);
  emit('select', value);
}

function handleSplitSelect(key: string, event?: Event) {
  emit('select', key, event);
}

function handleSplitOpen(item: SplitNavOptionData<AppShellMenuItem>, event?: Event) {
  emit('open', item, event);
}
</script>

<template>
  <STreeMenu
    v-if="skeleton.renderer === 'tree'"
    v-bind="treeProps"
    :size="size"
    :items="visibleItems"
    :model-value="modelValue"
    :collapsed="collapsed"
    :collapsed-width="collapsedWidth"
    :ui="treeUi"
    @update:model-value="handleTreeSelect"
  />
  <SNavMenu
    v-else-if="skeleton.renderer === 'nav'"
    v-bind="navProps"
    :size="size"
    :items="visibleItems"
    :model-value="modelValue"
    :ui="navUi"
    @update:model-value="handleModelUpdate"
  />
  <SSplitNav
    v-else
    v-bind="splitProps"
    :size="size"
    :mode="skeleton.splitNavMode"
    :items="visibleItems"
    :model-value="modelValue"
    :collapsed="collapsed"
    :collapsed-width="splitNavCollapsedPaneWidth"
    :horizontal-mounted-id="headerMountId"
    :vertical-mounted-id="sidebarMountId"
    :ui="splitUi"
    @update:model-value="handleModelUpdate"
    @select="handleSplitSelect"
    @open="handleSplitOpen"
  />
</template>
