<script setup lang="ts">
import { computed } from 'vue';
import type { LayoutSide } from '@soybeanjs/headless/layout';
import type { SplitNavOptionData } from '@soybeanjs/headless/split-nav';
import type { TreeMenuExpandStrategy } from '@soybeanjs/headless/tree-menu';
import type { ThemeSize } from '@/theme';
import SSplitNav from '../split-nav/split-nav.vue';
import STreeMenu from '../tree-menu/tree-menu.vue';
import STreeNav from '../tree-nav/tree-nav.vue';
import { appShellSkeletons, splitNavCollapsedPaneWidth } from './shared';
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
  /** Whether the sidebar is collapsed. The renderer folds its panes with it. */
  collapsed: boolean;
  /** Collapsed sidebar width in pixels, used by the single-pane `STreeMenu` renderer. */
  collapsedWidth: number;
  /** Expand strategy of the renderers that have one. */
  expandStrategy: TreeMenuExpandStrategy;
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

// The shell-level strategy applies to the renderers that have one; the
// per-renderer `menuProps` entry is spread last so it still wins.
const treeProps = computed(() => ({
  side: props.side,
  expandStrategy: props.expandStrategy,
  ...props.menuProps?.tree
}));

const splitProps = computed(() => ({
  expandStrategy: props.expandStrategy,
  ...props.menuProps?.split
}));

const treeNavProps = computed(() => props.menuProps?.treeNav ?? {});

const treeUi = computed(() => props.menuUi?.tree);

const splitUi = computed(() => props.menuUi?.split);

const treeNavUi = computed(() => props.menuUi?.treeNav);

function handleModelUpdate(value: string) {
  emit('update:modelValue', value);
}

// Both tree renderers report a leaf activation as `update:modelValue`: a branch
// only opens its popup, so the menu never activates a parent.
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
    :items="items"
    :model-value="modelValue"
    :collapsed="collapsed"
    :collapsed-width="collapsedWidth"
    :ui="treeUi"
    @update:model-value="handleTreeSelect"
  />
  <STreeNav
    v-else-if="skeleton.renderer === 'tree-nav'"
    v-bind="treeNavProps"
    :size="size"
    :items="items"
    :model-value="modelValue"
    :ui="treeNavUi"
    @update:model-value="handleTreeSelect"
  />
  <SSplitNav
    v-else
    v-bind="splitProps"
    :size="size"
    :mode="skeleton.splitNavMode"
    :items="items"
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
