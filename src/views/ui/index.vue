<script setup lang="ts">
import type { Component } from 'vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@su/shadcn-ui';
import AccordionDemo from './accordion.vue';
import AlertDemo from './alert.vue';

defineOptions({
  name: 'UiPage'
});

type TabKey = 'accordion' | 'alert';

interface TabConfig {
  key: TabKey;
  label: string;
  component: Component;
}

const tabs: TabConfig[] = [
  {
    key: 'accordion',
    label: 'Accordion',
    component: AccordionDemo
  },
  {
    key: 'alert',
    label: 'Alert',
    component: AlertDemo
  }
];
</script>

<template>
  <div>
    <NCard title="UI示例" :bordered="false" size="small" class="card-wrapper">
      <div class="text-center text-18px fw-700">SoybeanUnify</div>
      <Tabs default-value="accordion" class="w-full">
        <TabsList>
          <TabsTrigger v-for="tab in tabs" :key="tab.key" :value="tab.key">{{ tab.label }}</TabsTrigger>
        </TabsList>
        <TabsContent v-for="tab in tabs" :key="tab.key" :value="tab.key">
          <component :is="tab.component" />
        </TabsContent>
      </Tabs>
    </NCard>
  </div>
</template>

<style scoped></style>
