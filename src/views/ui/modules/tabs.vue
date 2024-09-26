<script setup lang="ts">
import { ref } from 'vue';
import { SCard, Stabs } from 'soybean-ui';
import type { TabsOption } from 'soybean-ui';

const tabValue = ref('1');
const tabValue2 = ref('1');

const tabs = [
  {
    value: '1',
    label: 'Tab 1'
  },
  {
    value: '2',
    label: 'Tab 2'
  },
  {
    value: '3',
    label: 'Tab 3'
  }
] satisfies TabsOption[];

defineOptions({
  name: 'UiTabs'
});
</script>

<template>
  <div class="w-320px lt-sm:w-auto">
    <div class="py-12px text-18px">Default</div>
    <Stabs v-model="tabValue" :options="tabs">
      <template #content="{ value }">
        <SCard>
          <div>The Tab Content: {{ value }}</div>
        </SCard>
      </template>
    </Stabs>
    <div class="py-12px text-18px">Custom Style</div>
    <Stabs v-model="tabValue2" :options="tabs" list-class="border-border border-b bg-transparent rounded-none">
      <template #trigger="{ label, active }">
        <div :class="{ 'text-primary fw-bold': active }">{{ label }}</div>
      </template>
      <template #indicator>
        <div class="absolute bottom-0 h-2px w-full rounded-1 bg-primary"></div>
      </template>
      <template #content="{ value }">
        <div>The Tab Content: {{ value }}</div>
      </template>
    </Stabs>
  </div>
</template>

<style scoped></style>
