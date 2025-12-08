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
  <SCard title="Fill: auto" description="TabsList width is controlled by the content width" split>
    <div class="w-320px lt-sm:w-auto">
      <STabs v-model="tabValue" :items="tabs" fill="auto" :ui="{ content: 'p-4 border border-border rounded-1' }">
        <template #content="{ value }">
          <div>The Tab Content: {{ value }}</div>
        </template>
      </STabs>
    </div>
  </SCard>
</template>
