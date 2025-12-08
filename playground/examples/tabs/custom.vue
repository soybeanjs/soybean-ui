<script setup lang="ts">
import { ref } from 'vue';
import { SCard, STabs } from '@soybeanjs/ui';

const tabValue = ref('1');
const tabs = [
  { value: '1', label: 'Tab 1' },
  { value: '2', label: 'Tab 2' },
  { value: '3', label: 'Tab 3' }
];
</script>

<template>
  <SCard title="Custom Style" split :ui="{ content: 'w-80 lt-sm:w-auto' }">
    <STabs
      v-model="tabValue"
      :items="tabs"
      :ui="{
        list: 'border-border border-b-2px bg-transparent rounded-none',
        content: 'p-4 border border-border rounded-1',
        indicatorContent: 'absolute -bottom-2px h-2px w-full rounded-1 bg-primary'
      }"
    >
      <template #trigger="{ label, active }">
        <div :class="{ 'text-primary fw-bold': active }">{{ label }}</div>
      </template>
      <template #content="{ value }">
        <div>The Tab Content: {{ value }}</div>
      </template>
    </STabs>
  </SCard>
  <SCard title="Custom Style Vertical" split :ui="{ content: 'w-80 lt-sm:w-auto' }">
    <STabs
      v-model="tabValue"
      :items="tabs"
      orientation="vertical"
      class="mt-24px"
      :ui="{
        list: 'border-border border-l-2px bg-transparent rounded-none',
        content: 'p-4 border border-border rounded-1',
        indicatorContent: 'absolute -left-2px h-full w-2px rounded-1 bg-primary'
      }"
    >
      <template #trigger="{ label, active }">
        <div :class="{ 'text-primary fw-bold': active }">{{ label }}</div>
      </template>
      <template #content="{ value }">
        <div>The Tab Content: {{ value }}</div>
      </template>
    </STabs>
  </SCard>
</template>
