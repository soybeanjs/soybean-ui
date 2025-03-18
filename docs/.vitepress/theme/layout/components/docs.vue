<script setup lang="ts">
import { Content, useData, useRoute } from 'vitepress';
import type { DefaultTheme } from 'vitepress/theme';
import { computed, toRefs } from 'vue';
import { SCollapsibleContent, SCollapsibleRoot, SCollapsibleTrigger, SSeparator, SToastProvider } from 'soy-ui';
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

const isDocsPage = computed(() => path.value.includes('docs'));
</script>

<template>
  <SToastProvider>
    <div class="w-full">
      <DocsTopbar v-if="isDocsPage" />
      <SSeparator v-else class="sticky top-17 z-10" />

      <main class="flex">
        <aside
          v-if="isDocsPage"
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
            />
          </SCollapsibleRoot>

          <div class="mb-2 text-sm text-primary font-bold">
            {{ activeSection?.text }}
          </div>
          <article class="max-w-none w-full prose prose-stone dark:prose-invert">
            <Content />
          </article>
        </div>
      </main>
    </div>
  </SToastProvider>
</template>
