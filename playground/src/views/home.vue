<script setup lang="ts">
import { onMounted, shallowRef, watch, watchPostEffect } from 'vue';
import type { Component } from 'vue';
import { SButtonIcon, SButtonLink, SCard, SIcon, SPopover, STabs } from '@ui';
import type { TabsOptionData } from '@ui';
import { toKebabCase, toPascalCase } from '@headless/shared';
import ThemeCustomizer from '../components/theme-customizer.vue';
import ThemeSchemaToggler from '../components/theme-schema-toggler.vue';
import { useTheme } from '../theme';

const { color, radius, size } = useTheme('HomePage');

const activeTab = shallowRef('');

interface TabConfig extends TabsOptionData<string> {
  component: () => Promise<Record<string, Component>>;
}

const tabs = getTabs();

const loadedComponent = shallowRef<Component | null>(null);

function getTabs() {
  const componentTabs: TabConfig[] = [];
  const demoModules = import.meta.glob('../examples/**/index.vue');

  // eslint-disable-next-line guard-for-in
  for (const path in demoModules) {
    const match = path.match(/examples\/([^/]+)\/index\.vue$/);
    if (match && match[1]) {
      const componentName = match[1];
      const label = toPascalCase(componentName);
      componentTabs.push({
        label,
        value: toKebabCase(componentName),
        component: demoModules[path] as () => Promise<Record<string, Component>>
      });
    }
  }

  return componentTabs.sort((a, b) => a.label.localeCompare(b.label));
}

// for nuxt
function getQuery() {
  const query = location.search
    ?.split('?')?.[1]
    ?.split('&')
    ?.reduce(
      (acc, item) => {
        const [key, value] = item.split('=');
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );

  return query || {};
}

function updateUrl() {
  const query = getQuery();
  const newUrl = new URL(location.href);
  const search = new URLSearchParams(query);
  search.delete('tab');
  search.append('tab', activeTab.value);
  newUrl.search = search.toString();
  history.replaceState({}, '', newUrl.toString());
}

function initTab() {
  const query = getQuery();
  activeTab.value = query.tab || 'accordion';
}

watchPostEffect(async () => {
  const tab = tabs.find(t => t.value === activeTab.value);
  if (tab) {
    const mod = await tab.component();
    loadedComponent.value = mod.default || mod;
  }
});

watch(activeTab, () => {
  updateUrl();
});

onMounted(() => {
  initTab();
});
</script>

<template>
  <div class="h-full p-4">
    <SCard title="SoybeanHeadless" class="h-full">
      <template #extra>
        <div class="flex items-center gap-3">
          <SPopover :ui="{ content: 'z-15' }" placement="bottom-end">
            <template #trigger>
              <SButtonIcon icon="lucide:swatch-book" size="lg" />
            </template>
            <ThemeCustomizer v-model:color="color" v-model:radius="radius" v-model:size="size" />
          </SPopover>
          <SButtonLink
            size="lg"
            variant="ghost"
            color="accent"
            shape="square"
            fit-content
            href="https://github.com/soybean-ui/soybean-headless"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SIcon icon="lucide:github" />
          </SButtonLink>
          <ThemeSchemaToggler />
        </div>
      </template>
      <STabs
        v-model="activeTab"
        :items="tabs"
        :enable-indicator="false"
        :ui="{
          root: 'h-full',
          list: 'grid grid-cols-10 gap-y-1 lt-sm:grid-cols-3 lt-md:grid-cols-6 lt-lg:grid-cols-8',
          content: 'overflow-auto'
        }"
      >
        <template #content>
          <Suspense>
            <template #default>
              <component :is="loadedComponent" v-if="loadedComponent" class="h-full" />
            </template>
            <template #fallback>
              <div class="text-center text-gray-400">Loading...</div>
            </template>
          </Suspense>
        </template>
      </STabs>
    </SCard>
  </div>
</template>
