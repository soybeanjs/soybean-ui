<script setup lang="ts">
import { computed, shallowRef, useId, watch } from 'vue';
import { BreadcrumbLink, BreadcrumbPage } from '@soybeanjs/headless/breadcrumb';
import type { BreadcrumbOptionData } from '@soybeanjs/headless/breadcrumb';
import { useControllableState } from '@soybeanjs/headless/composables';
import { LayoutTrigger } from '@soybeanjs/headless/layout';
import type { LayoutUi } from '@soybeanjs/headless/layout';
import type { MenuOptionData } from '@soybeanjs/headless/menu';
import type {
  PageTabsContextMenuOptionData,
  PageTabsDragEvent,
  PageTabsOptionData
} from '@soybeanjs/headless/page-tabs';
import { resolveSplitNavSidebarColumns } from '@soybeanjs/headless/split-nav';
import { appShellVariants } from '@/styles/app-shell';
import SBreadcrumb from '../breadcrumb/breadcrumb.vue';
import SDropdownMenu from '../dropdown-menu/dropdown-menu.vue';
import SIcon from '../icon/icon.vue';
import SLayout from '../layout/layout.vue';
import SPageTabs from '../page-tabs/page-tabs.vue';
import {
  appShellSkeletons,
  createPxToRem,
  defaultCollapsedSidebarWidth,
  findMenuItem,
  findMenuTrail,
  isPageTabsPayload,
  isSidebarLogoPlacement,
  resolveBrandLayout,
  resolveLogoPlacement,
  resolveShellWidths,
  resolveTriggerLayout,
  toMenuOptions
} from './shared';
import AppShellBrand from './app-shell-brand.vue';
import AppShellMenu from './app-shell-menu.vue';
import type { AppShellProps, AppShellEmits, AppShellMenuItem, AppShellSlots } from './types';

defineOptions({
  name: 'SAppShell'
});

const props = withDefaults(defineProps<AppShellProps>(), {
  size: 'md',
  mode: 'sidebar',
  side: 'left',
  open: undefined,
  defaultOpen: true,
  isMobile: false,
  logoPlacement: 'auto',
  expandStrategy: 'selected',
  modelValue: undefined,
  breadcrumbs: undefined,
  breadcrumbVisible: true,
  tabs: undefined,
  tabValue: undefined,
  triggerVisible: true
});

const emit = defineEmits<AppShellEmits>();

const slots = defineSlots<AppShellSlots>();

const ui = computed(() => appShellVariants({ size: props.size }, props.ui, { root: props.class }));

const skeleton = computed(() => appShellSkeletons[props.mode]);

const brandPlacement = computed(() => resolveLogoPlacement(props.mode, props.logoPlacement));

const pxToRem = computed(() => createPxToRem(props.size));

/**
 * The shell owns the collapse state of its sidebar.
 *
 * The width of the sidebar depends on it (a collapsed sidebar keeps only its
 * rail), and it is handed to `SLayout` as a controlled value so both layers
 * always agree.
 */
const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  props.defaultOpen
);

/** Active menu trail, from the root down to the active item. */
const activeTrail = computed(() => findMenuTrail(props.items, props.modelValue));

/**
 * Path of the parents whose panes `SSplitNav` currently keeps open.
 *
 * The shell sizes the layout around the columns the panes render, and which
 * columns exist depends on this path, so it mirrors the one `SSplitNav` keeps
 * internally: from the `open` event for every parent that opens a pane, from
 * `select` for every leaf that closes them, and reset on the two signals the
 * menu itself rebuilds its path on — a new model value, and a new mode (which
 * re-creates the menu instance).
 */
const openPath = shallowRef<string[]>([]);

watch([() => props.modelValue, () => props.mode], () => {
  openPath.value = [];
});

/**
 * Vertical panes the sidebar shows for the current state.
 *
 * Resolved by the split-nav family so the reserved width and the rendered panes
 * come from one derivation. Modes that render no split pane leave it undefined
 * and keep the layout defaults.
 */
const sidebarColumns = computed(() => {
  const splitNavMode = skeleton.value.splitNavMode;

  if (!splitNavMode) {
    return undefined;
  }

  return resolveSplitNavSidebarColumns({
    mode: splitNavMode,
    items: props.items,
    modelValue: props.modelValue ?? '',
    openPath: openPath.value
  });
});

const shellWidths = computed(() =>
  resolveShellWidths(props.size, sidebarColumns.value, {
    sidebarWidth: props.layoutProps?.sidebarWidth,
    collapsedSidebarWidth: props.layoutProps?.collapsedSidebarWidth
  })
);

/**
 * Cells of the brand region.
 *
 * A sidebar placement aligns the mark and the title to the columns the menu
 * renders; the header placement passes no columns, so both share one row and the
 * title is never hidden.
 */
const brandLayout = computed(() =>
  resolveBrandLayout({
    size: props.size,
    columns: isSidebarLogoPlacement(brandPlacement.value) ? sidebarColumns.value : undefined,
    collapsed: !open.value
  })
);

const sidebarWidth = computed(() => shellWidths.value.sidebarWidth);

const collapsedSidebarWidth = computed(() => shellWidths.value.collapsedSidebarWidth);

const menuCollapsedWidth = computed(() => collapsedSidebarWidth.value ?? defaultCollapsedSidebarWidth);

const layoutProps = computed(() => props.layoutProps ?? {});

const layoutUi = computed<Partial<LayoutUi>>(() => ({
  header: ui.value.layoutHeader,
  tab: ui.value.layoutTab,
  content: ui.value.layoutContent,
  footer: ui.value.layoutFooter,
  ...props.layoutUi
}));

const _shellId = useId();

const headerMountId = computed(() =>
  skeleton.value.mounts.includes('header') ? `soybean-app-shell-header-menu-${_shellId}` : undefined
);

const sidebarMountId = computed(() =>
  skeleton.value.mounts.includes('sidebar') ? `soybean-app-shell-sidebar-menu-${_shellId}` : undefined
);

/**
 * Breadcrumb items: the trailing trail of the active menu, or the given data.
 */
const breadcrumbItems = computed<BreadcrumbOptionData[]>(() => {
  if (props.breadcrumbs) {
    return props.breadcrumbs;
  }

  return activeTrail.value.map(node => ({ value: node.value, label: node.label, icon: node.icon }));
});

const currentCrumbValue = computed(() => breadcrumbItems.value.at(-1)?.value);

const showBreadcrumb = computed(
  () =>
    props.breadcrumbVisible &&
    breadcrumbItems.value.length > 0 &&
    (props.mode === 'sidebar' || props.mode === 'dual-vertical')
);

const showTabs = computed(() => Boolean(props.tabs?.length));

const tabItems = computed(() => props.tabs ?? []);

const showTrigger = computed(() => props.triggerVisible && skeleton.value.sidebarVisible);

/**
 * The trigger moves into the sidebar for the modes whose first level is a top bar.
 *
 * It renders only while the pane column does: that column is the one it collapses,
 * and a sidebar left with nothing but a rail has nothing for it to act on — which
 * is why opening a top-bar branch is what brings the trigger out.
 */
const sidebarTriggerVisible = computed(
  () => showTrigger.value && skeleton.value.triggerPlacement === 'sidebar' && Boolean(sidebarColumns.value?.pane)
);

const headerTriggerVisible = computed(() => showTrigger.value && skeleton.value.triggerPlacement === 'header');

/** Cells of the trigger row: the rail cell carries its divider, the trigger keeps its column. */
const triggerLayout = computed(() => resolveTriggerLayout(props.size, sidebarColumns.value, !open.value));

function isCurrentCrumb(item: BreadcrumbOptionData) {
  return item.value === currentCrumbValue.value;
}

/**
 * Menus a breadcrumb entry opens: the children of the menu it stands for,
 * nested as they are in the menu itself.
 */
function resolveCrumbMenus(item: BreadcrumbOptionData): MenuOptionData<string>[] {
  return toMenuOptions(findMenuItem(props.items, item.value)?.children);
}

function handleMenuModelUpdate(value: string) {
  emit('update:modelValue', value);
}

/**
 * A leaf closes the panes below it.
 *
 * `SSplitNav` rebuilds its open path on every activation, and activating the
 * leaf that is already active leaves the model value untouched — so the mirror
 * has to follow the activation itself, not only the value change. The path of a
 * leaf drops the leaf, exactly like the open path the menu keeps.
 */
function handleMenuSelect(key: string, event?: Event) {
  openPath.value = findMenuTrail(props.items, key)
    .slice(0, -1)
    .map(node => node.value);

  emit('select', key, event);
}

function handleMenuOpen(item: AppShellMenuItem, event?: Event) {
  openPath.value = findMenuTrail(props.items, item.value).map(node => node.value);

  emit('open', item, event);
}

/**
 * Activate a breadcrumb dropdown entry.
 *
 * Entries that have children render as submenus, so only leaves reach here —
 * and they activate exactly like the menu leaf they stand for.
 */
function handleCrumbSelect(item: MenuOptionData<string>) {
  emit('update:modelValue', item.value);
  emit('select', item.value);
}

function handleTabModelUpdate(value: string) {
  emit('update:tabValue', value);
}

function handleTabsUpdate(tabs: PageTabsOptionData[]) {
  emit('update:tabs', tabs);
}

function handleTabClick(payload: PageTabsOptionData | Event) {
  if (!isPageTabsPayload(payload)) {
    return;
  }

  emit('tabClick', payload);
}

function handleTabClose(tab: PageTabsOptionData) {
  emit('tabClose', tab);
}

function handleTabPin(tab: PageTabsOptionData) {
  emit('tabPin', tab);
}

function handleTabContextmenu(payload: PageTabsOptionData | Event) {
  if (!isPageTabsPayload(payload)) {
    return;
  }

  emit('tabContextmenu', payload);
}

function handleTabSelectContextMenu(menu: PageTabsContextMenuOptionData, tab: PageTabsOptionData) {
  emit('tabSelectContextMenu', menu, tab);
}

function handleTabDragStart(tab: PageTabsDragEvent) {
  emit('tabDragStart', tab);
}

function handleTabDragMove(tab: PageTabsDragEvent) {
  emit('tabDragMove', tab);
}

function handleTabDragReorder(tab: PageTabsDragEvent) {
  emit('tabDragReorder', tab);
}

function handleTabDragEnd(tab: PageTabsDragEvent) {
  emit('tabDragEnd', tab);
}

function handleBreadcrumbClick(item: BreadcrumbOptionData) {
  emit('breadcrumbClick', item);
}
</script>

<template>
  <SLayout
    v-bind="layoutProps"
    v-model:open="open"
    data-soybean-app-shell
    :data-mode="mode"
    :size="size"
    :side="side"
    :orientation="skeleton.orientation"
    :sidebar-visible="skeleton.sidebarVisible"
    :collapsible="skeleton.collapsible"
    :is-mobile="isMobile"
    :sidebar-width="sidebarWidth"
    :collapsed-sidebar-width="collapsedSidebarWidth"
    :px-to-rem="pxToRem"
    :ui="layoutUi"
    :class="ui.root"
  >
    <template #sidebar>
      <div :class="ui.sidebar" data-soybean-app-shell-sidebar>
        <AppShellBrand
          v-if="slots.logo && brandPlacement === 'sidebar'"
          :placement="brandPlacement"
          :collapsed="!open"
          :layout="brandLayout"
          :region-class="ui.logo"
          :mark-class="ui.logoMark"
          :title-class="ui.logoTitle"
        >
          <template #logo="slotProps">
            <slot name="logo" v-bind="slotProps" />
          </template>
          <template v-if="slots.title" #title="slotProps">
            <slot name="title" v-bind="slotProps" />
          </template>
        </AppShellBrand>
        <slot name="sidebar-start" />
        <div :class="ui.menuSidebar" data-soybean-app-shell-menu-sidebar>
          <div v-if="sidebarMountId" :id="sidebarMountId" :class="ui.menuMount" data-soybean-app-shell-mount-vertical />
          <slot
            v-if="skeleton.menuPlacement === 'sidebar'"
            name="menu"
            :mode="mode"
            :collapsed="!open"
            :collapsed-width="menuCollapsedWidth"
            :side="side"
            :header-mount-id="headerMountId"
            :sidebar-mount-id="sidebarMountId"
          >
            <AppShellMenu
              :mode="mode"
              :size="size"
              :items="items"
              :model-value="modelValue"
              :side="side"
              :collapsed="!open"
              :collapsed-width="menuCollapsedWidth"
              :expand-strategy="expandStrategy"
              :header-mount-id="headerMountId"
              :sidebar-mount-id="sidebarMountId"
              :menu-props="menuProps"
              :menu-ui="menuUi"
              @update:model-value="handleMenuModelUpdate"
              @select="handleMenuSelect"
              @open="handleMenuOpen"
            />
          </slot>
        </div>
        <slot name="sidebar-end" />
        <AppShellBrand
          v-if="slots.logo && brandPlacement === 'sidebar-bottom'"
          :placement="brandPlacement"
          :collapsed="!open"
          :layout="brandLayout"
          :region-class="ui.logo"
          :mark-class="ui.logoMark"
          :title-class="ui.logoTitle"
        >
          <template #logo="slotProps">
            <slot name="logo" v-bind="slotProps" />
          </template>
          <template v-if="slots.title" #title="slotProps">
            <slot name="title" v-bind="slotProps" />
          </template>
        </AppShellBrand>
        <div v-if="sidebarTriggerVisible" :class="ui.triggerRow" data-soybean-app-shell-trigger-row>
          <div
            v-if="triggerLayout.railWidth !== undefined"
            :class="ui.triggerRail"
            :style="{ width: `${triggerLayout.railWidth}rem` }"
            data-soybean-app-shell-trigger-rail
          />
          <div
            :class="ui.triggerCell"
            :style="triggerLayout.width === undefined ? undefined : { width: `${triggerLayout.width}rem` }"
            :data-centered="triggerLayout.centered ? 'true' : undefined"
            data-soybean-app-shell-trigger-cell
          >
            <LayoutTrigger :class="ui.trigger" />
          </div>
        </div>
      </div>
    </template>
    <template #header>
      <div :class="ui.header" data-soybean-app-shell-header>
        <div :class="ui.headerStart">
          <LayoutTrigger v-if="headerTriggerVisible" :class="ui.trigger" />
          <slot name="header-start">
            <AppShellBrand
              v-if="slots.logo && brandPlacement === 'header'"
              placement="header"
              :collapsed="false"
              :layout="brandLayout"
              :region-class="ui.logo"
              :mark-class="ui.logoMark"
              :title-class="ui.logoTitle"
            >
              <template #logo="slotProps">
                <slot name="logo" v-bind="slotProps" />
              </template>
              <template v-if="slots.title" #title="slotProps">
                <slot name="title" v-bind="slotProps" />
              </template>
            </AppShellBrand>
            <SBreadcrumb
              v-if="showBreadcrumb"
              v-bind="breadcrumbProps"
              :class="ui.breadcrumb"
              :size="size"
              :items="breadcrumbItems"
              :ui="breadcrumbUi"
              @click="handleBreadcrumbClick"
            >
              <template #default="{ item }">
                <SDropdownMenu
                  v-if="!isCurrentCrumb(item) && resolveCrumbMenus(item).length"
                  :size="size"
                  :items="resolveCrumbMenus(item)"
                  trigger="hover"
                  :selected-value="modelValue"
                  @select="handleCrumbSelect"
                >
                  <template #trigger>
                    <BreadcrumbLink as-child>
                      <button type="button" :class="ui.breadcrumbTrigger" @click.stop>
                        <span>{{ item.label }}</span>
                        <SIcon icon="lucide:chevron-down" :class="ui.breadcrumbTriggerIcon" />
                      </button>
                    </BreadcrumbLink>
                  </template>
                </SDropdownMenu>
                <BreadcrumbPage v-else>{{ item.label }}</BreadcrumbPage>
              </template>
            </SBreadcrumb>
          </slot>
        </div>
        <div :class="ui.headerCenter">
          <div v-if="headerMountId" :id="headerMountId" data-soybean-app-shell-mount-horizontal />
          <slot name="header">
            <slot
              v-if="skeleton.menuPlacement === 'header'"
              name="menu"
              :mode="mode"
              :collapsed="false"
              :collapsed-width="menuCollapsedWidth"
              :side="side"
              :header-mount-id="headerMountId"
              :sidebar-mount-id="sidebarMountId"
            >
              <AppShellMenu
                :mode="mode"
                :size="size"
                :items="items"
                :model-value="modelValue"
                :side="side"
                :collapsed="false"
                :collapsed-width="menuCollapsedWidth"
                :expand-strategy="expandStrategy"
                :header-mount-id="headerMountId"
                :sidebar-mount-id="sidebarMountId"
                :menu-props="menuProps"
                :menu-ui="menuUi"
                @update:model-value="handleMenuModelUpdate"
                @select="handleMenuSelect"
                @open="handleMenuOpen"
              />
            </slot>
          </slot>
        </div>
        <div :class="ui.headerEnd">
          <slot name="header-end" />
        </div>
      </div>
    </template>
    <template #tab>
      <div :class="ui.tab" data-soybean-app-shell-tab>
        <slot name="tabs">
          <SPageTabs
            v-if="showTabs"
            v-bind="tabProps"
            :size="size"
            :items="tabItems"
            :model-value="tabValue"
            :ui="tabUi"
            class="h-full grow-1"
            @update:model-value="handleTabModelUpdate"
            @update:items="handleTabsUpdate"
            @click="handleTabClick"
            @close="handleTabClose"
            @pin="handleTabPin"
            @contextmenu="handleTabContextmenu"
            @select-context-menu="handleTabSelectContextMenu"
            @tab-drag-start="handleTabDragStart"
            @tab-drag-move="handleTabDragMove"
            @tab-drag-reorder="handleTabDragReorder"
            @tab-drag-end="handleTabDragEnd"
          />
        </slot>
      </div>
    </template>
    <div :class="ui.content" data-soybean-app-shell-content>
      <slot />
    </div>
    <template #footer>
      <div :class="ui.footer" data-soybean-app-shell-footer>
        <slot name="footer" />
      </div>
    </template>
  </SLayout>
</template>
