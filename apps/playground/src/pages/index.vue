<script setup lang="ts">
import { shallowRef, ref, watch, watchPostEffect, onMounted, computed } from 'vue';
import type { Component } from 'vue';
import { SButtonIcon, SCard, SLink, STabs, SToggleGroup, SToggleGroupItem, STag } from '@soybeanjs/ui';
import type { TabsOptionData } from '@soybeanjs/ui';
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import { getComponentLibrary } from '../component-libraries';
import DirectionToggler from '../components/direction-toggler.vue';
import LocaleToggler from '../components/locale-toggler.vue';
import ThemeConfigurator from '../components/theme-configurator.vue';

const activeTab = shallowRef('');
const activeLibrary = ref('ui');

interface TabConfig extends TabsOptionData<string> {
  component: () => Promise<Record<string, Component>>;
  library: string;
}

const tabs = getTabs();

const loadedComponent = shallowRef<Component | null>(null);

function getTabs() {
  const componentTabs: TabConfig[] = [];
  const demoModules = import.meta.glob('../examples/**/index.vue');

  for (const path in demoModules) {
    const match = path.match(/examples\/(?:[^/]+\/)?([^/]+)\/index\.vue$/);
    if (match && match[1] && !match[1].startsWith('_')) {
      const componentName = match[1];
      const label = pascalCase(componentName);
      componentTabs.push({
        label,
        value: kebabCase(componentName),
        component: demoModules[path] as () => Promise<Record<string, Component>>,
        library: getComponentLibrary(componentName)
      });
    }
  }

  return componentTabs.sort((a, b) => a.label.localeCompare(b.label));
}

const filteredTabs = computed(() => tabs.filter(tab => tab.library === activeLibrary.value));

const libraryTagLabel = computed(() => {
  const labelByLibrary: Record<string, string> = {
    ui: '@soybeanjs/ui',
    'ui-x': '@soybeanjs/ui-x',
    chart: '@soybeanjs/chart'
  };

  return labelByLibrary[activeLibrary.value] ?? '@soybeanjs/ui';
});

watch(activeLibrary, newLib => {
  const firstTab = tabs.find(t => t.library === newLib);
  if (firstTab) {
    activeTab.value = firstTab.value;
  }
});

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
  if (query.tab) {
    const tab = tabs.find(t => t.value === query.tab);
    if (tab) {
      activeLibrary.value = tab.library;
      activeTab.value = query.tab;
      return;
    }
  }
  const firstTab = tabs.find(t => t.library === activeLibrary.value);
  activeTab.value = firstTab?.value || 'accordion';
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
  <SCard data-soybean-bottom-sheet-scale title="SoybeanUI Playground" class="h-full bg-background">
    <template #extra>
      <div class="flex items-center gap-3">
        <SToggleGroup v-model="activeLibrary" size="sm">
          <SToggleGroupItem value="ui">UI</SToggleGroupItem>
          <SToggleGroupItem value="ui-x">UI-X</SToggleGroupItem>
          <SToggleGroupItem value="chart">Chart</SToggleGroupItem>
        </SToggleGroup>
        <STag :color="activeLibrary === 'ui-x' ? 'primary' : 'carbon'" variant="soft" size="sm" class="font-semibold">
          {{ libraryTagLabel }}
        </STag>
        <SLink href="https://github.com/soybeanjs/soybean-ui">
          <SButtonIcon icon="lucide:github" size="lg" />
        </SLink>
        <DirectionToggler />
        <ThemeConfigurator />
        <SThemeModeSwitch />
        <LocaleToggler />
      </div>
    </template>
    <STabs
      v-model="activeTab"
      :items="filteredTabs"
      :enable-indicator="false"
      :ui="{
        root: 'md:h-full',
        list: 'grid grid-cols-10 gap-y-1 lt-sm:grid-cols-4 lt-md:grid-cols-5 lt-lg:grid-cols-6',
        content: 'overflow-auto'
      }"
    >
      <template #content>
        <Suspense>
          <template #default>
            <component :is="loadedComponent" v-if="loadedComponent" class="md:h-full" />
          </template>
          <template #fallback>
            <div class="text-center text-gray-400">Loading...</div>
          </template>
        </Suspense>
      </template>
    </STabs>
  </SCard>
</template>
