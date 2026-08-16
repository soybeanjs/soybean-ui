<script setup lang="ts">
import { computed, watch } from 'vue';
import type { Component } from 'vue';
import { appMenuVariants } from '@/styles/app-menu';
import { useAppLayoutContext } from '../../composables/use-app-layout-context';
import { MIX_MENU_WIDTH, SIDER_COLLAPSED_WIDTH } from '../app-layout/shared';
import type { AppMenuMode } from '../../types';
import HorizontalMenu from './modules/horizontal-menu.vue';
import MixMenu from './modules/mix-menu.vue';
import TopHeaderMenu from './modules/top-header-menu.vue';
import TopSidebarMenu from './modules/top-sidebar-menu.vue';
import VerticalHybridMenu from './modules/vertical-hybrid-menu.vue';
import VerticalMenu from './modules/vertical-menu.vue';
import type { AppMenuProps, AppMenuEmits, AppMenuSlots } from './types';

defineOptions({
  name: 'SAppMenu'
});

const props = withDefaults(defineProps<AppMenuProps>(), {
  mode: undefined,
  selectedKey: undefined,
  defaultSelectedKey: undefined,
  expanded: undefined,
  defaultExpanded: undefined,
  siderCollapse: undefined,
  inverted: false,
  collapsedWidth: undefined,
  mixSiderFixed: undefined,
  mixMenuWidth: undefined,
  autoSelectFirstMenu: true,
  headerMenuEl: undefined,
  siderMenuEl: undefined
});

const emit = defineEmits<AppMenuEmits>();

defineSlots<AppMenuSlots>();

const appLayoutContext = useAppLayoutContext();

const resolvedMode = computed(() => props.mode ?? appLayoutContext?.mode.value ?? 'vertical');

const resolvedCollapsed = computed(() => props.siderCollapse ?? appLayoutContext?.siderCollapse.value ?? false);

const resolvedMixFixed = computed(() => props.mixSiderFixed ?? appLayoutContext?.mixSiderFixed.value ?? false);

const resolvedMixMenuWidth = computed(() => props.mixMenuWidth ?? appLayoutContext?.mixMenuWidth.value ?? MIX_MENU_WIDTH);

// The tree-menu collapse width follows the layout's collapsed sider width so
// the icon column fills the sider exactly (对齐 soybean-admin `collapsedWidth`).
const resolvedCollapsedWidth = computed(
  () => props.collapsedWidth ?? appLayoutContext?.collapsedSidebarWidth.value ?? SIDER_COLLAPSED_WIDTH
);

// Mount targets come from `AppLayout` context (or the explicit prop). When used
// standalone (no context) and no prop is given, the menu renders in place.
const resolvedHeaderMenuEl = computed(() => props.headerMenuEl ?? appLayoutContext?.headerMenuEl.value);

const resolvedSiderMenuEl = computed(() => props.siderMenuEl ?? appLayoutContext?.siderMenuEl.value);

const rootClass = computed(
  () => appMenuVariants({ mode: resolvedMode.value, inverted: props.inverted }, { root: props.class }).root
);

const MENU_MAP: Record<AppMenuMode, Component> = {
  vertical: VerticalMenu,
  'vertical-mix': MixMenu,
  'vertical-hybrid': VerticalHybridMenu,
  horizontal: HorizontalMenu,
  'top-sidebar': TopSidebarMenu,
  'top-header': TopHeaderMenu
};

const menuBranch = computed(() => MENU_MAP[resolvedMode.value]);

// The layout owns the pinned-drawer state so the sider width can follow the
// pin button; the emit still lets consumers persist the value externally.
function handleUpdateMixSiderFixed(value: boolean) {
  if (appLayoutContext && props.mixSiderFixed === undefined) {
    appLayoutContext.mixSiderFixed.value = value;
  }
  emit('update:mixSiderFixed', value);
}

// Sider facts are mode-specific; clear the stale values written by the
// previous mode's module before the new one reports its own.
watch(resolvedMode, () => {
  if (!appLayoutContext) {
    return;
  }
  appLayoutContext.mixHasDrawer.value = false;
  appLayoutContext.hasSecondLevel.value = true;
});
</script>

<template>
  <component
    :is="menuBranch"
    :root-class="rootClass"
    :data="data"
    :selected-key="selectedKey"
    :default-selected-key="defaultSelectedKey"
    :expanded="expanded"
    :default-expanded="defaultExpanded"
    :sider-collapse="resolvedCollapsed"
    :inverted="inverted"
    :collapsed-width="resolvedCollapsedWidth"
    :mix-sider-fixed="resolvedMixFixed"
    :mix-menu-width="resolvedMixMenuWidth"
    :auto-select-first-menu="autoSelectFirstMenu"
    :header-menu-el="resolvedHeaderMenuEl"
    :sider-menu-el="resolvedSiderMenuEl"
    @update:selected-key="emit('update:selectedKey', $event)"
    @update:expanded="emit('update:expanded', $event)"
    @update:sider-collapse="emit('update:siderCollapse', $event)"
    @update:mix-sider-fixed="handleUpdateMixSiderFixed"
    @select="emit('select', $event)"
  >
    <template v-if="$slots.top" #top>
      <slot name="top" />
    </template>
    <template v-if="$slots.bottom" #bottom>
      <slot name="bottom" />
    </template>
  </component>
</template>
