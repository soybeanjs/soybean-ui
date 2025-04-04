<script setup lang="ts">
import { ref } from 'vue';
import { SCard, STabs } from 'soy-ui';
import type { TabsOptionData, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoTabs'
});

const tabValue = ref('1');
const tabValue2 = ref('1');
const tabValue3 = ref('1');

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

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
] satisfies TabsOptionData[];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Horizontal" split>
      <div class="w-320px lt-sm:w-auto">
        <STabs v-model="tabValue" :items="tabs" :ui="{ content: 'p-4 border border-border rounded-1' }">
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
          :ui="{ content: 'p-4 border border-border rounded-1' }"
        >
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
      </div>
    </SCard>
    <SCard title="Fill" split>
      <div class="w-320px lt-sm:w-auto">
        <STabs v-model="tabValue" :items="tabs" fill="full" :ui="{ content: 'p-4 border border-border rounded-1' }">
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="w-480px flex-c gap-4 lt-sm:w-auto">
        <STabs v-for="size in sizes" :key="size" :size="size" default-value="1" :items="tabs">
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
        <STabs v-for="size in sizes" :key="size" :size="size" default-value="1" :items="tabs" orientation="vertical">
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
          :ui="{
            list: 'border-border border-b bg-transparent rounded-none',
            content: 'p-4 border border-border rounded-1',
            indicator: 'absolute bottom-0 h-2px w-full rounded-1 bg-primary'
          }"
        >
          <template #trigger="{ label, active }">
            <div :class="{ 'text-primary fw-bold': active }">{{ label }}</div>
          </template>
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
      </div>
    </SCard>
    <SCard title="Custom Style Vertical" split>
      <div class="w-320px lt-sm:w-auto">
        <STabs
          v-model="tabValue3"
          :items="tabs"
          orientation="vertical"
          class="mt-24px"
          :ui="{
            list: 'border-border border-l bg-transparent rounded-none',
            content: 'p-4 border border-border rounded-1',
            indicator: 'absolute left-0 h-full w-2px rounded-1 bg-primary'
          }"
        >
          <template #trigger="{ label, active }">
            <div :class="{ 'text-primary fw-bold': active }">{{ label }}</div>
          </template>
          <template #content="{ value }">
            <div>The Tab Content: {{ value }}</div>
          </template>
        </STabs>
      </div>
    </SCard>
  </div>
</template>
