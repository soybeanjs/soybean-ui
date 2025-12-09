<script setup lang="ts">
import { computed, ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from '@soybeanjs/ui';
import type { CheckboxGroupOptionData, CheckedState } from '@soybeanjs/ui';

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
  <div>
    <h3 class="playground-title">Group</h3>
    <div class="flex flex-col gap-4">
      <SCheckbox v-model="checked">Check All</SCheckbox>
      <SCheckboxGroup v-model="selected" :items="items" />
    </div>
  </div>
</template>
