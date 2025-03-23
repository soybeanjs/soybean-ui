<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Component } from 'vue';
import { useDark } from '@vueuse/core';
import { useRouteQuery } from '@vueuse/router';
import { SButtonIcon, SCard, SConfigProvider, SPopover, SScrollArea, STabs, SToastProvider } from 'soy-ui';
import type { ConfigProviderProps, TabsOption } from 'soy-ui';
import * as ExampleComponents from '@soybean-ui/examples';
import type { ThemeConfigColor } from '@soybean-ui/unocss-preset';
import { kebabCase } from 'es-toolkit';
import { Moon, Sun, SwatchBook } from 'lucide-vue-next';
import ThemeCustomize from '@/components/theme-customize.vue';

defineOptions({
  name: 'UiPage'
});

const activeTab = useRouteQuery('tab', 'accordion' as string);

const isDark = useDark();

function toggleDark() {
  isDark.value = !isDark.value;
}

const color = ref<ThemeConfigColor>('default');
const radius = ref(0.5);

const configProviderProps = computed<ConfigProviderProps>(() => ({
  theme: {
    color: color.value,
    radius: radius.value
  }
}));

interface TabConfig extends TabsOption {
  component: Component;
}

const tabs: TabConfig[] = Object.entries(ExampleComponents).map(([key, component]) => ({
  label: key.replace('Demo', ''),
  value: kebabCase(key.replace('Demo', '')),
  component: component as Component
}));
</script>

<template>
  <SConfigProvider v-bind="configProviderProps">
    <SToastProvider>
      <div class="h-full p-16px">
        <SCard title="Soybean UI Components" class="h-full lt-sm:h-auto">
          <template #extra>
            <div>
              <SPopover :ui="{ content: 'z-15' }" side="bottom" align="end">
                <template #trigger>
                  <SButtonIcon size="lg">
                    <SwatchBook />
                  </SButtonIcon>
                </template>
                <ThemeCustomize v-model:color="color" v-model:radius="radius" />
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
              trigger: 'flex-none max-w-120px w-1/3'
            }"
          >
            <template #content="{ component }">
              <SScrollArea class="h-full">
                <div class="p-18px">
                  <component :is="component" />
                </div>
              </SScrollArea>
            </template>
          </STabs>
        </SCard>
      </div>
    </SToastProvider>
  </SConfigProvider>
</template>
