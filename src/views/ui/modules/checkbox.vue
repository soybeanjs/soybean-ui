<script setup lang="ts">
import { computed, ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from '@soybean-unify/ui';
import type { CheckboxCheckedState, CheckboxColor, CheckboxGroupItem } from '@soybean-unify/ui';

defineOptions({
  name: 'UiCheckbox'
});

const colors: CheckboxColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];

const checks = ref<string[]>(['1']);
const items = createCheckboxItems();

const checks2 = ref<string[]>(['1']);
const items2 = createCheckboxItems();

const checks3 = ref<string[]>([]);
const items3 = createCheckboxItems();
const checked = computed<CheckboxCheckedState>({
  get() {
    if (checks3.value.length === 0) return false;

    if (checks3.value.length === items3.length) return true;

    return 'indeterminate';
  },
  set(value) {
    checks3.value = value === true ? items3.map(item => item.value) : [];
  }
});

function createCheckboxItems(): CheckboxGroupItem[] {
  return [
    { label: 'A', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' }
  ];
}
</script>

<template>
  <div class="py-12px text-18px">Default Checkbox</div>
  <SCheckbox label="checkbox" />
  <div class="py-12px text-18px">Checkbox Color</div>
  <div class="flex flex-wrap gap-12px">
    <SCheckbox v-for="color in colors" :key="color" :color="color" label="checkbox" />
  </div>
  <div class="py-12px text-18px">Checkbox Group</div>
  <SCheckboxGroup v-model:values="checks" :items="items" />
  <div class="py-12px text-18px">Checkbox Group Vertical</div>
  <SCheckboxGroup v-model:values="checks2" orientation="vertical" :items="items2" />
  <div class="py-12px text-18px">Indeterminate Checkbox</div>
  <SCheckbox v-model:checked="checked" label="Check All" />
  <SCheckboxGroup v-model:values="checks3" :items="items3" class="mt-12px" />
  <div class="py-12px text-18px">Checkbox Group Disabled</div>
  <SCheckboxGroup :default-values="['2']" :items="items" disabled />
</template>

<style scoped></style>
