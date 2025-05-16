<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Component } from 'vue';
import { useDark, useStorage } from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import { SButtonIcon, SCard, SConfigProvider, SPopover, SScrollArea, STabs, SToastProvider } from 'soy-ui';
import type { ConfigProviderProps, TabsOptionData, ThemeSize } from 'soy-ui';
import type { ThemeConfigColor } from '@soybean-ui/unocss-preset';
import { kebabCase } from 'es-toolkit';
import { Moon, Sun, SwatchBook } from 'lucide-vue-next';
import ThemeCustomizer from '@/components/theme-customizer.vue';
import DemosRenderer from './components/DemosRenderer.vue';

defineOptions({
  name: 'UiPage'
});

const activeTab = useRouteQuery<string>('tab', 'accordion');

const isDark = useDark();

function toggleDark() {
  isDark.value = !isDark.value;
}

const color = useStorage<ThemeConfigColor>('color', 'default');
const radius = useStorage('radius', 0.5);
const size = useStorage<ThemeSize>('size', 'md');

const configProviderProps = computed<ConfigProviderProps>(() => ({
  theme: {
    color: color.value,
    radius: radius.value
  },
  size: size.value
}));

interface TabConfig extends TabsOptionData {
  demosLoader: () => Promise<Record<string, Component>>;
}

const tabs = ref<TabConfig[]>([]);

onMounted(() => {
  tabs.value = [];
  const demoModules = import.meta.glob('~packages/soy-ui/src/components/**/demos/index.ts');

  const componentTabs: TabConfig[] = [];

  for (const path in demoModules) {
    const match = path.match(/components\/([^/]+)\/demos\/index\.ts$/);
    if (match && match[1]) {
      const componentName = match[1];
      const label = componentName.charAt(0).toUpperCase() + componentName.slice(1);
      componentTabs.push({
        label,
        value: kebabCase(componentName),
        demosLoader: demoModules[path] as () => Promise<Record<string, Component>>
      });
    }
  }

  tabs.value = componentTabs.sort((a, b) => a.label.localeCompare(b.label));

  if (tabs.value.length > 0 && (!activeTab.value || !tabs.value.find(t => t.value === activeTab.value))) {
    activeTab.value = String(tabs.value[0].value);
  }
});
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <SToastProvider>
      <div soybean-drawer-wrapper class="h-full">
        <SCard title="Soybean UI Components" flex-height class="h-full lt-sm:h-auto">
          <template #extra>
            <div>
              <SPopover :ui="{ content: 'z-15' }" side="bottom" align="end">
                <template #trigger>
                  <SButtonIcon size="lg">
                    <SwatchBook />
                  </SButtonIcon>
                </template>
                <ThemeCustomizer v-model:color="color" v-model:radius="radius" v-model:size="size" />
              </SPopover>
              <SButtonIcon size="lg" @click="toggleDark">
                <Sun v-if="isDark" />
                <Moon v-else />
              </SButtonIcon>
            </div>
          </template>
          <STabs
            v-model="activeTab"
            :items="tabs"
            :enable-indicator="false"
            :ui="{
              root: 'h-full',
              list: 'flex-wrap justify-start',
              trigger: 'flex-none'
            }"
          >
            <template #content="{ demosLoader }">
              <SScrollArea class="h-full">
                <div class="p-18px">
                  <DemosRenderer :loader="demosLoader" />
                </div>
              </SScrollArea>
            </template>
          </STabs>
        </SCard>
      </div>
    </SToastProvider>
  </SConfigProvider>
</template>
