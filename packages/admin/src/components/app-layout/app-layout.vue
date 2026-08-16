<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { SLayout } from '@soybeanjs/ui';
import { appLayoutVariants } from '@/styles/app-layout';
import { provideAppLayoutContext } from '../../composables/use-app-layout-context';
import {
  MIX_MENU_WIDTH,
  RAIL_COLLAPSED_WIDTH,
  RAIL_WIDTH,
  SIDER_COLLAPSED_WIDTH,
  SIDER_WIDTH,
  isRailMode
} from './shared';
import type { AppLayoutProps, AppLayoutEmits, AppLayoutSlots } from './types';

defineOptions({
  name: 'SAppLayout'
});

const props = withDefaults(defineProps<AppLayoutProps>(), {
  mode: 'vertical',
  defaultOpen: true,
  isMobile: undefined,
  mobileBreakpoint: 768,
  size: 'md',
  sidebarVisible: true,
  headerVisible: true,
  tabVisible: true,
  footerVisible: true,
  headerMenuEl: 'app-header-menu',
  siderMenuEl: 'app-sider-menu',
  sidebarWidth: undefined,
  collapsedSidebarWidth: undefined,
  mixMenuWidth: MIX_MENU_WIDTH
});

const emit = defineEmits<AppLayoutEmits>();

defineSlots<AppLayoutSlots>();

const cls = computed(() => appLayoutVariants({ size: props.size }, { root: props.class }));

const baseForwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'mode',
  'isMobile',
  'mobileBreakpoint',
  'headerMenuEl',
  'siderMenuEl',
  'sidebarWidth',
  'collapsedSidebarWidth',
  'mixMenuWidth',
  'open',
  'defaultOpen'
]);

// AppLayout owns the open state (initialized from `defaultOpen`) and passes it
// to the layout as a controlled prop, so the sidebar width and the menu
// collapse stay in sync. We deliberately do NOT forward `props.open` here:
// Vue's type-based prop inference defaults optional boolean props to `false`,
// which would otherwise collapse the sidebar even when `defaultOpen` is true.
const open = ref(props.open === true ? true : props.defaultOpen);

function handleUpdateOpen(value: boolean) {
  open.value = value;
  emit('update:open', value);
}

// Follow an explicit `open` prop when the consumer drives it (e.g. a header
// menu toggle). `props.open` is `false` by default due to the boolean-prop
// inference above, so we only apply updates that arrive after mount.
watch(
  () => props.open,
  value => {
    if (typeof value === 'boolean') {
      open.value = value;
    }
  }
);

// Resolve mobile mode: explicit prop wins, otherwise fall back to viewport width.
const resolvedIsMobile = ref(false);
const mql = ref<MediaQueryList | null>(null);

function updateIsMobile() {
  if (props.isMobile !== undefined) {
    resolvedIsMobile.value = props.isMobile;
    return;
  }

  resolvedIsMobile.value = window.matchMedia(`(max-width: ${props.mobileBreakpoint}px)`).matches;
}

const siderCollapse = computed(() => !open.value);

// Mix state shared with `AppMenu` (see `AppLayoutContextValue`): the pin button
// writes `mixSiderFixed` through the context, and the active menu module
// reports whether its branch renders second-level menus / a pinned drawer so
// the sider width below can adapt, 对齐 soybean-admin `base-layout`.
const mixSiderFixed = ref(false);
const hasSecondLevel = ref(true);
const mixHasDrawer = ref(false);

const railMode = computed(() => isRailMode(props.mode));

// 对齐 soybean-admin `getSiderAndCollapsedWidth`: hybrid/top modes collapse the
// sider to 0 while the active first-level branch is a leaf. The sider DOM stays
// mounted (only its width becomes 0) so `AppMenu` Teleport targets never
// disappear — hiding it via `sidebarVisible` would unmount the target element.
const siderEmpty = computed(
  () => (props.mode === 'vertical-hybrid' || props.mode === 'top-header') && !hasSecondLevel.value
);

function resolveWidth(base: number): number {
  if (siderEmpty.value) {
    return 0;
  }

  return mixHasDrawer.value ? base + props.mixMenuWidth : base;
}

const resolvedSidebarWidth = computed(() =>
  resolveWidth(props.sidebarWidth ?? (railMode.value ? RAIL_WIDTH : SIDER_WIDTH))
);

const resolvedCollapsedWidth = computed(() =>
  resolveWidth(props.collapsedSidebarWidth ?? (railMode.value ? RAIL_COLLAPSED_WIDTH : SIDER_COLLAPSED_WIDTH))
);

// `mode === 'horizontal'` renders the navigation in the header, so the sider is
// unmounted; every other mode keeps it mounted so menu Teleports stay stable.
const siderVisible = computed(() => props.sidebarVisible && props.mode !== 'horizontal');

// An empty sider keeps its `border-e` line at width 0 — drop it through the ui
// slot override until the width grows back.
const resolvedUi = computed(() =>
  siderEmpty.value ? { ...(props.ui as object), sidebarWrapper: ['!border-none', props.ui?.sidebarWrapper] } : props.ui
);

const forwardedProps = computed(() => ({
  ...baseForwardedProps.value,
  sidebarVisible: siderVisible.value,
  sidebarWidth: resolvedSidebarWidth.value,
  collapsedSidebarWidth: resolvedCollapsedWidth.value
}));

provideAppLayoutContext({
  mode: computed(() => props.mode),
  open: computed(() => Boolean(open.value)),
  siderCollapse: computed(() => siderCollapse.value),
  isMobile: computed(() => resolvedIsMobile.value),
  mixSiderFixed,
  hasSecondLevel,
  mixHasDrawer,
  mixMenuWidth: computed(() => props.mixMenuWidth),
  sidebarWidth: resolvedSidebarWidth,
  collapsedSidebarWidth: resolvedCollapsedWidth,
  siderVisible,
  headerMenuEl: computed(() => props.headerMenuEl),
  siderMenuEl: computed(() => props.siderMenuEl)
});

onMounted(() => {
  if (typeof window === 'undefined') {
    return;
  }

  updateIsMobile();
  mql.value = window.matchMedia(`(max-width: ${props.mobileBreakpoint}px)`);
  mql.value?.addEventListener('change', updateIsMobile);
});

onBeforeUnmount(() => {
  mql.value?.removeEventListener('change', updateIsMobile);
});
</script>

<template>
  <SLayout v-bind="forwardedProps" :open="open" :ui="resolvedUi" :class="cls" @update:open="handleUpdateOpen">
    <template #sidebar="slotProps">
      <slot name="sidebar" v-bind="slotProps" />
    </template>
    <template #header>
      <slot name="header" />
    </template>
    <template #tab>
      <slot name="tab" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
    <slot />
  </SLayout>
</template>
