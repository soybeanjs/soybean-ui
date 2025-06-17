<script setup lang="ts">
import { computed, ref } from 'vue';
import { SCard, SCheckbox, SCheckboxCardGroup } from '@ui';
import type { CheckboxCardGroupOptionData, CheckedState } from '@ui';

const selected = ref<string[]>(['apple', 'orange']);

const items: CheckboxCardGroupOptionData<string>[] = [
  { icon: 'lucide:apple', value: 'apple', label: 'Apple' },
  { icon: 'hugeicons:orange', value: 'orange', label: 'Orange' },
  { icon: 'lucide:banana', value: 'banana', label: 'Banana' },
  { icon: 'lucide:grape', value: 'grape', label: 'Grape' }
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
  <SCard title="Card Group" :ui="{ content: 'flex-c gap-3' }">
    <SCheckbox v-model="checked" color="warning">Check All</SCheckbox>
    <SCheckboxCardGroup v-model="selected" :items="items" color="warning" />
  </SCard>
</template>
