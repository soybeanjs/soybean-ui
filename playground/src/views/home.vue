<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue';
import type { Component } from 'vue';
import { useDark } from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import { SButtonIcon, SButtonLink, SCard, SIcon, STabs } from '@ui';
import type { TabsOptionData } from '@ui';
import { toKebabCase, toPascalCase } from '@headless/shared';

const activeTab = useRouteQuery<string>('tab', 'accordion');

const isDark = useDark();

function toggleDark() {
  isDark.value = !isDark.value;
}

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

watchEffect(async () => {
  const tab = tabs.find(t => t.value === activeTab.value);
  if (tab) {
    const mod = await tab.component();
    loadedComponent.value = mod.default || mod;
  }
});
</script>

<template>
  <div class="h-full p-4">
    <SCard title="SoybeanHeadless" class="h-full">
      <template #extra>
        <div class="flex items-center gap-2">
          <SButtonLink
            variant="ghost"
            color="accent"
            shape="square"
            href="https://github.com/soybean-ui/soybean-headless"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SIcon icon="lucide:github" size="lg" />
          </SButtonLink>
          <SButtonIcon :icon="isDark ? 'lucide:sun' : 'lucide:moon'" size="lg" @click="toggleDark" />
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
              <component :is="loadedComponent" v-if="loadedComponent" />
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
