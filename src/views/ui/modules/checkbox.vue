<script setup lang="ts">
import { computed, ref } from 'vue';
import { SCheckbox, SCheckboxGroup } from 'soy-ui';
import type { CheckboxGroupItem, CheckedState, ThemeColor, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'UiCheckbox'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'secondary', 'accent'];

const sizeChecked = ref<CheckedState>('indeterminate');

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const checks = ref<string[]>(['1']);
const items = createCheckboxItems();

const checks2 = ref<string[]>(['1']);
const items2 = createCheckboxItems();

const checks3 = ref<string[]>([]);
const items3 = createCheckboxItems();
const checked = computed<CheckedState>({
  get() {
    if (checks3.value.length === 0) return false;

    if (checks3.value.length === items3.length) return true;

    return 'indeterminate';
  },
  set(value) {
    checks3.value = value === true ? items3.map(item => item.value) : [];
  }
});

function createCheckboxItems() {
  return [
    { label: 'A', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' }
  ] satisfies CheckboxGroupItem[];
}
</script>

<template>
  <div class="py-12px text-18px">Color</div>
  <div class="flex flex-wrap gap-12px">
    <SCheckbox v-for="color in colors" :key="color" :color="color" :label="color" />
  </div>
  <div class="py-12px text-18px">Size</div>
  <div class="flex flex-wrap gap-12px">
    <SCheckbox v-for="size in sizes" :key="size" v-model="sizeChecked" :size="size" :label="size" />
  </div>
  <div class="py-12px text-18px">Group</div>
  <SCheckboxGroup v-model="checks" :items="items" />
  <div class="py-12px text-18px">Orientation: Vertical</div>
  <SCheckboxGroup v-model="checks2" orientation="vertical" :items="items2" />
  <div class="py-12px text-18px">Indeterminate</div>
  <SCheckbox v-model="checked" label="Check All" />
  <SCheckboxGroup v-model="checks3" :items="items3" class="mt-12px" />
  <div class="py-12px text-18px">Disabled</div>
  <SCheckboxGroup :default-value="['2']" :items="items" disabled />
</template>
