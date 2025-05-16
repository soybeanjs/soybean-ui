<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SToggleGroup } from 'soy-ui';
import type { ToggleGroupItemData } from 'soy-ui';

defineOptions({
  name: 'DemoToggleGroup'
});

const value = ref<string>('top');

const multi = ref<string[]>(['top', 'left']);

interface DemoData extends ToggleGroupItemData {
  label: string;
}

const items: DemoData[] = [
  { value: 'top', label: 'Top', disabled: false },
  { value: 'right', label: 'Right', disabled: false },
  { value: 'bottom', label: 'Bottom', disabled: false },
  { value: 'left', label: 'Left', disabled: false }
];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Single" split>
      <SToggleGroup v-model="value" :items="items">
        <template #item="{ label }">{{ label }}</template>
      </SToggleGroup>
    </SCard>
    <SCard title="Multi" split>
      <SToggleGroup v-model="multi" :items="items">
        <template #item="{ label }">{{ label }}</template>
      </SToggleGroup>
    </SCard>
  </div>
</template>
