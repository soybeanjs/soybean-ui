<script setup lang="ts">
import { ref } from 'vue';
import { SToggleGroup } from 'soybean-ui';
import type { ToggleGroupItemData } from 'soybean-ui';

defineOptions({
  name: 'UiToggleGroup'
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
  <div class="w-320px lt-sm:w-auto">
    <div class="py-12px text-18px">Single</div>
    <SToggleGroup v-model="value" :items="items">
      <template #item="{ label }">{{ label }}</template>
    </SToggleGroup>
    <div class="py-12px text-18px">Multi</div>
    <SToggleGroup v-model="multi" :items="items">
      <template #item="{ label }">{{ label }}</template>
    </SToggleGroup>
  </div>
</template>

<style scoped></style>
