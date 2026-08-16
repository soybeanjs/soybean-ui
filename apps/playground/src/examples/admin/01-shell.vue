<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { SAppLayout, SAppLogo, SAppMenu, SAppBreadcrumb, SAppPageHeader, SAppFooter } from '@soybeanjs/admin';
import type { AppLayoutMode, AppMenuData } from '@soybeanjs/admin';
import { SSelect, SButton, SButtonIcon, SButtonGroup, SToggleGroup, SToggleGroupItem } from '@soybeanjs/ui';
import type { LayoutVariant, SelectOptionData, ThemeSize } from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';

const isMobile = useMediaQuery('(max-width: 768px)');

const variant = shallowRef<LayoutVariant>('sidebar');
const variants: SelectOptionData<LayoutVariant>[] = [
  { label: 'sidebar', value: 'sidebar' },
  { label: 'floating', value: 'floating' },
  { label: 'inset', value: 'inset' }
];

const mode = shallowRef<AppLayoutMode>('vertical');

const size = shallowRef<ThemeSize>('md');

const selectedKey = ref<string | undefined>('dashboard');
const open = ref(true);

function toggleSider() {
  open.value = !open.value;
}

const menus: AppMenuData[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard'
  },
  {
    key: 'system',
    label: 'System',
    icon: 'lucide:settings',
    badge: '3',
    children: [
      { key: 'users', label: 'Users', icon: 'lucide:users' },
      { key: 'roles', label: 'Roles', icon: 'lucide:shield' },
      {
        key: 'menus',
        label: 'Menus',
        icon: 'lucide:list-tree',
        children: [
          { key: 'menus-overview', label: 'Overview', icon: 'lucide:eye' },
          { key: 'menus-config', label: 'Config', icon: 'lucide:sliders-horizontal' }
        ]
      }
    ]
  },
  {
    key: 'docs',
    label: 'Docs',
    icon: 'lucide:files',
    children: [
      { key: 'vue', label: 'Vue', icon: 'logos:vue' },
      { key: 'vite', label: 'Vite', icon: 'logos:vitejs' }
    ]
  }
];

const breadcrumbs = [
  { label: 'Components', value: 'components', icon: 'lucide:box' },
  { label: 'Admin', value: 'admin', icon: 'lucide:command' }
];

// 对齐 soybean-admin header/sider 的 logo 与折叠按钮分布：
// - vertical：logo 在侧栏顶部，header 只有折叠按钮
// - rail 模式（vertical-mix / vertical-hybrid）：logo 缩进 rail 顶部（AppMenu #top）
// - 顶部菜单模式（horizontal / top-sidebar / top-header）：logo 在 header
// - vertical-hybrid 且当前一级分支为叶子：sider 收缩为 0，logo 回到 header
const railModes: AppLayoutMode[] = ['vertical-mix', 'vertical-hybrid'];

const isRailMode = computed(() => railModes.includes(mode.value));

function containsKey(menu: AppMenuData, key?: string): boolean {
  if (!key) return false;
  if (menu.key === key) return true;
  return Boolean(menu.children?.some(child => containsKey(child, key)));
}

// 当前选中项所属的一级分支是否有子菜单（决定 hybrid 模式 sider 是否收缩为 0）
const activeFirstLevel = computed(() => menus.find(menu => containsKey(menu, selectedKey.value)));

const hasSecondLevel = computed(() => Boolean(activeFirstLevel.value?.children?.length));

const showHeaderLogo = computed(
  () =>
    mode.value === 'horizontal' ||
    mode.value === 'top-sidebar' ||
    mode.value === 'top-header' ||
    (mode.value === 'vertical-hybrid' && !hasSecondLevel.value)
);

// 树形菜单侧栏（vertical / top-header）没有自带折叠按钮，由 header 的 toggler
// 控制；rail 模式使用自带折叠按钮；top-header 在分支为叶子时 sider 已收缩，无需 toggler
const showMenuToggler = computed(
  () => mode.value === 'vertical' || (mode.value === 'top-header' && hasSecondLevel.value)
);
</script>

<template>
  <div class="space-y-4 h-full">
    <div class="flex-y-center flex-wrap justify-between gap-4">
      <SToggleGroup v-model="mode" size="sm">
        <SToggleGroupItem value="vertical">vertical</SToggleGroupItem>
        <SToggleGroupItem value="vertical-mix">vertical-mix</SToggleGroupItem>
        <SToggleGroupItem value="vertical-hybrid">vertical-hybrid</SToggleGroupItem>
        <SToggleGroupItem value="horizontal">horizontal</SToggleGroupItem>
        <SToggleGroupItem value="top-sidebar">top-sidebar</SToggleGroupItem>
        <SToggleGroupItem value="top-header">top-header</SToggleGroupItem>
      </SToggleGroup>

      <div class="flex-y-center flex-wrap justify-end gap-4">
        <SButtonGroup>
          <SButton variant="pure" class="cursor-default">variant</SButton>
          <SSelect v-model="variant" :items="variants" placeholder="Select variant" :ui="{ trigger: 'w-30' }" />
        </SButtonGroup>
        <SButtonGroup>
          <SButton variant="pure" class="cursor-default">size</SButton>
          <SSelect v-model="size" :items="themeSizeOptions" placeholder="Select size" :ui="{ trigger: 'w-30' }" />
        </SButtonGroup>
      </div>
    </div>

    <div class="h-130 w-full rounded-md border border-solid border-border overflow-hidden">
      <SAppLayout
        v-model:open="open"
        :variant="variant"
        :mode="mode"
        :size="size"
        :is-mobile="isMobile"
        :ui="{
          header: 'bg-background border-b border-border',
          tab: 'bg-background border-b border-border',
          content: 'px-4 bg-background',
          footer: 'bg-background border-t border-border'
        }"
      >
        <template #sidebar>
          <div class="flex h-full flex-col">
            <SAppLogo
              v-if="mode === 'vertical'"
              title="Admin"
              logo="lucide:command"
              :show-title="open"
              class="h-12 shrink-0"
            />
            <div id="app-sider-menu" class="h-full min-h-0" :class="mode === 'vertical' ? 'flex-1' : ''" />
          </div>
        </template>

        <template #header>
          <div class="flex h-full w-full items-center gap-2 px-4">
            <SAppLogo
              v-if="showHeaderLogo"
              title="Admin"
              logo="lucide:command"
              :show-title="mode !== 'top-sidebar'"
              class="shrink-0"
            />
            <SButtonIcon
              v-if="showMenuToggler"
              :icon="open ? 'lucide:panel-left-close' : 'lucide:panel-left-open'"
              variant="ghost"
              aria-label="Toggle sidebar"
              data-test="toggle-sider"
              @click="toggleSider"
            />
            <div id="app-header-menu" class="flex h-full min-w-0 flex-1 items-stretch" />
            <SAppBreadcrumb v-if="mode !== 'horizontal'" :items="breadcrumbs" class="hidden sm:flex" />
            <div class="ms-auto flex items-center gap-2">
              <SButtonIcon icon="lucide:search" variant="ghost" />
              <SButtonIcon icon="lucide:bell" variant="ghost" />
            </div>
          </div>
        </template>

        <template #tab>
          <div class="flex-y-center h-full px-4">
            <span class="text-sm text-muted-foreground">Multi Tab Bar</span>
          </div>
        </template>

        <SAppMenu
          :data="menus"
          :selected-key="selectedKey"
          @update:selected-key="selectedKey = $event"
          @select="selectedKey = $event"
        >
          <template v-if="isRailMode" #top>
            <SAppLogo logo="lucide:command" :show-title="false" class="h-12 w-full shrink-0" />
          </template>
        </SAppMenu>

        <div class="flex h-full flex-col gap-4">
          <SAppPageHeader title="Dashboard" description="A runnable admin shell built with @soybeanjs/admin" show-back>
            <SButton color="primary" icon="lucide:plus">New</SButton>
          </SAppPageHeader>
          <div class="grid flex-1 grid-cols-3 gap-4">
            <div v-for="i in 3" :key="i" class="rounded-md border border-solid border-border p-4">
              <p class="font-medium">Card {{ i }}</p>
              <p class="mt-2 text-sm text-muted-foreground">This is content placeholder.</p>
            </div>
          </div>
        </div>

        <template #footer>
          <SAppFooter text="Powered by @soybeanjs/admin" show-copyright />
        </template>
      </SAppLayout>
    </div>
  </div>
</template>
