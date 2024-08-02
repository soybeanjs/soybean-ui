<script setup lang="ts">
import type { Component } from 'vue';
import { useDark } from '@vueuse/core';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@soybean-unify/shadcn-ui';
import { SButtonIcon } from '@soybean-unify/ui';
import { Moon, Sun } from 'lucide-vue-next';
import UiButton from './modules/button.vue';
import UiAccordion from './modules/accordion.vue';
import UiAlert from './modules/alert.vue';
import UiCard from './modules/card.vue';

defineOptions({
  name: 'UiPage'
});

const isDark = useDark();

function toggleDark() {
  isDark.value = !isDark.value;
}

interface TabConfig {
  key: string;
  label: string;
  component: Component;
}

const tabs: TabConfig[] = [
  {
    key: 'button',
    label: 'Button',
    component: UiButton
  },
  {
    key: 'accordion',
    label: 'Accordion',
    component: UiAccordion
  },
  {
    key: 'alert',
    label: 'Alert',
    component: UiAlert
  },
  {
    key: 'card',
    label: 'Card',
    component: UiCard
  }
];
</script>

<template>
  <div class="h-full p-16px">
    <Card class="h-full flex-col-stretch">
      <CardHeader class="flex flex-row justify-between">
        <CardTitle>UI Components</CardTitle>
        <SButtonIcon size="lg" @click="toggleDark">
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
        </SButtonIcon>
      </CardHeader>
      <CardContent class="flex-1-hidden">
        <Tabs default-value="button" class="h-full flex-col-stretch">
          <TabsList class="w-fit flex-wrap justify-start gap-y-8px">
            <TabsTrigger v-for="tab in tabs" :key="tab.key" class="w-120px" :value="tab.key">
              {{ tab.label }}
            </TabsTrigger>
          </TabsList>
          <TabsContent v-for="tab in tabs" :key="tab.key" :value="tab.key" class="flex-1-hidden">
            <div class="h-full overflow-auto px-12px py-18px">
              <component :is="tab.component" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
