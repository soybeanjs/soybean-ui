<script setup lang="ts">
import { computed, ref } from 'vue';
import { SCard, SCheckbox, SCheckboxGroup } from '@ui';
import type { CheckboxGroupOptionData, CheckedState } from '@ui';

const selected = ref<string[]>(['apple', 'orange']);

const items: CheckboxGroupOptionData<string>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' }
];

const checked = computed<CheckedState>({
  get() {
    if (selected.value.length === 0) return false;

    if (selected.value.length === items.length) return true;

    return 'indeterminate';
  },
  set(value) {
    selected.value = value === true ? items.map(item => item.value) : [];
  }
});
</script>

<template>
  <SCard title="Group" :ui="{ content: 'flex-c gap-3' }">
    <SCheckbox v-model="checked">Check All</SCheckbox>
    <SCheckboxGroup v-model="selected" :items="items" />
  </SCard>
</template>
