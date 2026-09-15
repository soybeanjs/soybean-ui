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
  hasVisibleChild,
  isPageTabsPayload,
  modeHasNestedPane,
  resolveLogoPlacement,
  resolveShellWidths
} from './shared';
import type { AppShellPaneState } from './shared';
import AppShellMenu from './app-shell-menu.vue';
import type { AppShellEmits, AppShellMenuItem, AppShellProps, AppShellSlots } from './types';

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
  modelValue: undefined,
  defaultValue: undefined,
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

const logoPlacement = computed(() => resolveLogoPlacement(props.mode, props.logoPlacement));

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
 * First-level menu whose children fill the nested pane.
 *
 * `SSplitNav` keeps this in its own `openPath`, which is internal, so the shell
 * mirrors it from the `open` event — it has to size the layout around the pane
 * that gets rendered. `SSplitNav` resets its path whenever the model value
 * changes, so the mirror resets on the same signal.
 */
const paneOwnerKey = shallowRef<string>();

watch(
  () => props.modelValue,
  () => {
    paneOwnerKey.value = undefined;
  }
);

const paneOwner = computed(() => findMenuItem(props.items, paneOwnerKey.value) ?? activeTrail.value[0]);

const hasPaneContent = computed(() => hasVisibleChild(paneOwner.value));

const paneState = computed<AppShellPaneState>(() => ({ hasPane: hasPaneContent.value, collapsed: !open.value }));

const shellWidths = computed(() =>
  resolveShellWidths(props.mode, props.size, paneState.value, {
    sidebarWidth: props.layoutProps?.sidebarWidth,
    collapsedSidebarWidth: props.layoutProps?.collapsedSidebarWidth
  })
);

const sidebarWidth = computed(() => shellWidths.value.sidebarWidth);

const collapsedSidebarWidth = computed(() => shellWidths.value.collapsedSidebarWidth);

const menuCollapsedWidth = computed(() => collapsedSidebarWidth.value ?? defaultCollapsedSidebarWidth);

/**
 * Whether the nested pane leaves the flow and overlays the content.
 *
 * A collapsed sidebar keeps only its rail; the pane still has to be reachable,
 * so it anchors next to the rail instead of widening the layout.
 */
const paneOverlay = computed(() => modeHasNestedPane(props.mode) && !open.value && hasPaneContent.value);

/**
 * Whether the nested pane is suppressed entirely.
 *
 * Only when it has nothing to show: a collapsed sidebar with children still
 * renders the pane, as an overlay.
 */
const paneSuppressed = computed(() => modeHasNestedPane(props.mode) && !open.value && !hasPaneContent.value);

const paneClass = computed(() => {
  if (paneOverlay.value) {
    return ui.value.menuOverlay;
  }

  if (paneSuppressed.value) {
    return ui.value.menuPaneHidden;
  }

  return undefined;
});

/**
 * Collapsed state handed to the menu.
 *
 * Nested-pane modes suppress the pane while the sidebar is collapsed; the tree
 * renderers instead collapse the menu itself into its icon rail.
 */
const menuCollapsed = computed(() => (modeHasNestedPane(props.mode) ? paneSuppressed.value : !open.value));

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

const showBreadcrumb = computed(() => props.breadcrumbVisible && breadcrumbItems.value.length > 0);

const showTabs = computed(() => Boolean(props.tabs?.length));

const tabItems = computed(() => props.tabs ?? []);

const showTrigger = computed(() => props.triggerVisible && skeleton.value.sidebarVisible);

function isCurrentCrumb(item: BreadcrumbOptionData) {
  return item.value === currentCrumbValue.value;
}

/**
 * Menus a breadcrumb entry opens: the children of the menu it stands for.
 */
function resolveCrumbMenus(item: BreadcrumbOptionData): MenuOptionData<string>[] {
  const node = findMenuItem(props.items, item.value);

  return (node?.children ?? [])
    .filter(child => !child.hidden)
    .map(child => ({ value: child.value, label: child.label, icon: child.icon, disabled: child.disabled }));
}

function handleMenuModelUpdate(value: string) {
  emit('update:modelValue', value);
}

function handleMenuSelect(key: string, event?: Event) {
  emit('select', key, event);
}

function handleMenuOpen(item: AppShellMenuItem, event?: Event) {
  paneOwnerKey.value = item.value;

  emit('open', item, event);
}

/**
 * Activate a breadcrumb dropdown entry exactly like the menu it stands for:
 * a parent opens its pane, a leaf becomes the active menu.
 */
function handleCrumbSelect(item: MenuOptionData<string>) {
  const node = findMenuItem(props.items, item.value);

  if (node && hasVisibleChild(node)) {
    handleMenuOpen(node);

    return;
  }

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
  <div data-soybean-app-shell :class="ui.root" :data-mode="mode" :data-mobile="Boolean(isMobile)">
    <SLayout
      v-bind="layoutProps"
      v-model:open="open"
      :size="size"
      :side="side"
      :orientation="skeleton.orientation"
      :sidebar-visible="skeleton.sidebarVisible"
      :collapsible="skeleton.collapsible"
      :is-mobile="Boolean(isMobile)"
      :sidebar-width="sidebarWidth"
      :collapsed-sidebar-width="collapsedSidebarWidth"
      :px-to-rem="pxToRem"
      :ui="layoutUi"
    >
      <template #sidebar>
        <div :class="ui.sidebar" data-soybean-app-shell-sidebar>
          <div v-if="slots.logo && logoPlacement === 'sidebar'" :class="ui.logo" data-soybean-app-shell-logo>
            <slot name="logo" :collapsed="!open" placement="sidebar" />
          </div>
          <slot name="sidebar-start" />
          <div
            :class="ui.menuSidebar"
            data-soybean-app-shell-menu-sidebar
            :data-overlay="paneOverlay ? 'true' : undefined"
          >
            <div v-if="sidebarMountId" :id="sidebarMountId" data-soybean-app-shell-mount-vertical />
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
                :collapsed="menuCollapsed"
                :collapsed-width="menuCollapsedWidth"
                :pane-class="paneClass"
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
        </div>
      </template>
      <template #header>
        <div :class="ui.header" data-soybean-app-shell-header>
          <div :class="ui.headerStart">
            <LayoutTrigger v-if="showTrigger" :class="ui.trigger" />
            <slot name="header-start">
              <div v-if="slots.logo && logoPlacement === 'header'" :class="ui.logo" data-soybean-app-shell-logo>
                <slot name="logo" :collapsed="false" placement="header" />
              </div>
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
                    :selected-value="modelValue"
                    @select="handleCrumbSelect"
                  >
                    <template #trigger>
                      <BreadcrumbLink as-child>
                        <button type="button" :class="ui.breadcrumbTrigger" @click.stop>
                          <SIcon v-if="item.icon" :icon="item.icon" />
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
                  :pane-class="undefined"
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
  </div>
</template>
