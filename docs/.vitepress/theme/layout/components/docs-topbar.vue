<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
import { computed, ref, toRefs, watch } from 'vue';
import { useScroll } from '@vueuse/core';
import { SButton, SScrollArea, SSheet } from 'soy-ui';
import { Icon } from '@iconify/vue';
import { flatten } from '../../../shared';
import type { SidebarItem } from '../../../types';
import DocSidebarItem from './docs-sidebar-item.vue';

defineOptions({
  name: 'DocsTopbar'
});

const { path } = toRefs(useRoute());
const { page, theme } = useData();

const isSidebarOpen = ref(false);
const sidebar = computed(() => theme.value.sidebar as SidebarItem[]);

const sectionTabs = computed(() =>
  sidebar.value.map(val => ({
    label: val.text,
    link: flatten(val.items ?? [], 'items').filter(i => Boolean(i.link))?.[0].link,
    icon: val.icon
  }))
);

const { arrivedState } = useScroll(globalThis.window);
const { top } = toRefs(arrivedState);

watch(path, () => {
  isSidebarOpen.value = false;
});
</script>

<template>
  <div
    class="sticky top-[4.25rem] z-10 h-12 w-full border-y border-muted-foreground/10 px-4 transition-all duration-500"
    :class="[
      top
        ? 'bg-transparent backdrop-blur-0'
        : 'bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80'
    ]"
  >
    <div class="hidden h-full items-center justify-between md:flex">
      <div class="h-full flex items-center">
        <a
          v-for="tab in sectionTabs.filter(i => i.label !== 'Examples')"
          :key="tab.label"
          :href="tab.link"
          :class="{
            '!border-b-primary !text-foreground': `/${page.relativePath}`.includes(
              tab.link?.split('/').slice(0, -1).join('/') ?? ''
            )
          }"
          class="mx-4 h-full inline-flex items-center border-b border-b-transparent py-2 text-sm text-muted-foreground font-semibold hover:border-b-muted hover:text-foreground"
        >
          <Icon v-if="tab.icon" :icon="tab.icon" class="mr-2 text-lg" />
          <span>{{ tab.label }}</span>
        </a>
      </div>

      <div class="h-full flex items-center">
        <a
          v-for="tab in sectionTabs.filter(i => i.label === 'Examples')"
          :key="tab.label"
          :href="tab.link"
          :class="{ '!border-b-primary !text-foreground': page.relativePath.includes(tab.label?.toLowerCase() ?? '') }"
          class="mx-4 h-full inline-flex items-center border-b border-b-transparent py-2 text-sm text-muted-foreground font-semibold hover:border-b-muted hover:text-foreground"
        >
          <Icon v-if="tab.icon" :icon="tab.icon" class="mr-2 text-lg" />
          <span>{{ tab.label }}</span>
        </a>
      </div>
    </div>

    <div class="h-full flex items-center justify-between md:hidden">
      <SSheet v-model:open="isSidebarOpen" title="Sidebar menu" side="left">
        <template #trigger>
          <SButton color="accent" variant="ghost">
            <template #leading>
              <Icon icon="lucide:menu" />
            </template>
            Menu
          </SButton>
        </template>
        <SScrollArea class="h-full px-4 pt-8">
          <div v-for="group in theme.sidebar" :key="group.text" class="mb-4">
            <div class="mb-2 flex items-center">
              <Icon v-if="group.icon" :icon="group.icon" class="mx-2 text-lg" />
              <span class="font-semibold">{{ group.text }}</span>
            </div>

            <template v-for="item in group.items" :key="item.text">
              <ul v-if="item.items?.length" class="mb-6">
                <div class="pb-2 pl-4 text-sm font-bold">
                  {{ item.text }}
                </div>
                <DocSidebarItem v-for="subitem in item.items" :key="subitem.text" :item="subitem" />
              </ul>

              <DocSidebarItem v-else :item="item" />
            </template>
          </div>
          <div class="h-12 w-full" />
        </SScrollArea>
      </SSheet>

      <div class="h-full flex items-center">
        <a
          href="/examples"
          :class="{ '!border-b-primary !font-semibold !text-foreground': page.relativePath.includes('examples') }"
          class="mx-4 h-full inline-flex items-center gap-2 border-b border-b-transparent py-2 text-sm text-muted-foreground font-medium hover:border-b-muted hover:text-foreground"
        >
          <Icon icon="lucide:square-dashed-mouse-pointer" class="text-lg" />
          Examples
        </a>
      </div>
    </div>
  </div>
</template>
