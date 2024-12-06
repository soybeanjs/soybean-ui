<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { Content, useData, useRoute } from 'vitepress';
import type { DefaultTheme } from 'vitepress/theme';
import { SCollapsibleContent, SCollapsibleRoot, SCollapsibleTrigger } from '@soybean-ui/vue';
import { flatten } from '../../../shared';
import DocsTopbar from './docs-topbar.vue';
import DocsSidebar from './docs-sidebar.vue';

defineOptions({
  name: 'Docs'
});

const route = useRoute();
const { path } = toRefs(route);

const { theme } = useData();

const sidebar = computed(() => theme.value.sidebar as DefaultTheme.SidebarItem[]);
const activeSection = computed(() =>
  sidebar.value.find(section =>
    flatten(section.items ?? [], 'items')?.find(item => item.link === path.value.replace('.html', ''))
  )
);
</script>

<template>
  <div class="w-full">
    <div class="pointer-events-none absolute inset-0 left-0 top-0 z-0 h-max w-full flex justify-center overflow-hidden">
      <div class="w-[108rem] flex flex-none justify-end">
        <img class="max-w-none w-[90rem] flex-none" decoding="async" src="/new-bg.png" alt="backdrop" />
      </div>
    </div>

    <DocsTopbar />

    <main class="flex">
      <aside
        class="sticky top-[7.25rem] hidden h-full max-h-[calc(100vh-7.25rem)] w-[17rem] flex-shrink-0 overflow-y-auto py-4 pl-4 pr-4 md:block"
      >
        <div v-if="activeSection" class="h-full">
          <DocsSidebar :items="activeSection.items ?? []" />
        </div>
        <div class="h-6 w-full" />
      </aside>

      <div class="flex-1 overflow-x-hidden px-6 py-6 md:px-24 md:py-12">
        <SCollapsibleRoot :key="path" class="mb-4 block xl:hidden">
          <SCollapsibleTrigger
            class="mb-2 border border-muted rounded-lg bg-card px-4 py-2 text-sm data-[state=open]:bg-muted"
          >
            On this page
          </SCollapsibleTrigger>

          <SCollapsibleContent
            class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp ml-4 overflow-hidden"
          >
            <!-- <DocOutline collapsible /> -->
          </SCollapsibleContent>
        </SCollapsibleRoot>

        <div class="mb-2 text-sm text-primary font-bold">
          {{ activeSection?.text }}
        </div>
        <article class="prose prose-stone dark:prose-invert max-w-none w-full">
          <Content />
        </article>

        <!-- <DocFooter v-if="!isExamplePage" /> -->
      </div>

      <!--
 <div
        v-if="!isExamplePage"
        class="hidden xl:flex w-64 flex-shrink-0 py-12 pl-2 sticky top-[7.25rem] overflow-y-auto md:overflow-x-hidden h-[calc(100vh-7.25rem)] flex-c space-y-6 no-scrollbar"
      >
        <DocOutline />
        <DocCommunity />
        <div class="grow" />
        <DocCarbonAds />

        <div class="fixed bottom-0 z-10 w-64 h-12 bg-gradient-to-b from-transparent to-background" />
      </div>
-->
    </main>
  </div>
</template>
