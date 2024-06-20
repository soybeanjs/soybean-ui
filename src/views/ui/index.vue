<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import type { Component } from 'vue';
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '@su/shadcn-ui';

defineOptions({
  name: 'UiPage'
});

interface TabConfig {
  key: string;
  label: string;
  component: Component;
}

function getTabs() {
  const tabs: TabConfig[] = [];

  const files = import.meta.glob('./modules/*.vue');
  Object.entries(files).forEach(item => {
    const [filePath, value] = item;
    const key = filePath.replace('./modules/', '').replace('.vue', '');

    tabs.push({
      key,
      label: key,
      component: defineAsyncComponent(value as any)
    });
  });

  return tabs;
}

const tabs = getTabs();
</script>

<template>
  <div class="p-16px">
    <Card>
      <CardHeader>
        <CardTitle>UI Components</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="pb-16px text-center text-18px fw-700">SoybeanUnify</div>
        <Tabs default-value="accordion" class="w-full">
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
