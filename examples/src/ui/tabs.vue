<script setup lang="ts">
import { ref } from 'vue';
import { SCard, STabs } from 'soy-ui';
import type { TabsOption } from 'soy-ui';

const tabValue = ref('1');
const tabValue2 = ref('1');
const tabValue3 = ref('1');

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
  <div class="flex-c gap-4">
    <SCard title="Horizontal" split>
      <div class="w-320px lt-sm:w-auto">
        <STabs v-model="tabValue" :items="tabs" content-class="p-4 border border-border rounded-1">
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
      </div>
    </SCard>
    <SCard title="Vertical" split>
      <div class="w-320px lt-sm:w-auto">
        <STabs
          v-model="tabValue2"
          :items="tabs"
          orientation="vertical"
          content-class="p-4 border border-border rounded-1"
        >
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
      </div>
    </SCard>
    <SCard title="Custom Style" split>
      <div class="w-320px lt-sm:w-auto">
        <STabs
          v-model="tabValue3"
          :items="tabs"
          list-class="border-border border-b bg-transparent rounded-none"
          content-class="p-4 border border-border rounded-1"
        >
          <template #trigger="{ label, active }">
            <div :class="{ 'text-primary fw-bold': active }">{{ label }}</div>
          </template>
          <template #indicator>
            <div class="absolute bottom-0 h-2px w-full rounded-1 bg-primary"></div>
          </template>
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
      </div>
    </SCard>
    <SCard title="Vertical" split>
      <div class="w-320px lt-sm:w-auto">
        <STabs
          v-model="tabValue3"
          :items="tabs"
          orientation="vertical"
          class="mt-24px"
          list-class="border-border border-l bg-transparent rounded-none"
          content-class="p-4 border border-border rounded-1"
        >
          <template #trigger="{ label, active }">
            <div :class="{ 'text-primary fw-bold': active }">{{ label }}</div>
          </template>
          <template #indicator>
            <div class="absolute left-0 h-full w-2px rounded-1 bg-primary"></div>
          </template>
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
      </div>
    </SCard>
  </div>
</template>
