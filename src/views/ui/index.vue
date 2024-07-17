<script setup lang="ts">
import type { Component } from 'vue';
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
import UiButton from './modules/button.vue';
import UiAccordion from './modules/accordion.vue';
import UiAlert from './modules/alert.vue';

defineOptions({
  name: 'UiPage'
});

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
  }
];
</script>

<template>
  <div class="p-16px">
    <Card>
      <CardHeader>
        <CardTitle>UI Components</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="pb-16px text-center text-18px fw-700">SoybeanUnify</div>
        <Tabs default-value="button" class="w-full">
          <TabsList class="h-auto flex-wrap justify-start gap-y-8px">
            <TabsTrigger v-for="tab in tabs" :key="tab.key" class="w-120px" :value="tab.key">
              {{ tab.label }}
            </TabsTrigger>
          </TabsList>
          <TabsContent v-for="tab in tabs" :key="tab.key" :value="tab.key">
            <div class="pt-18px">
              <component :is="tab.component" />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
