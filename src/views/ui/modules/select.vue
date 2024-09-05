<script setup lang="ts">
import { SSelect } from 'soybean-ui';
import type { SelectGroupOption, SelectOption, SelectSize } from 'soybean-ui';

defineOptions({
  name: 'UiSelect'
});

const fruits: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' }
];

const fruits2: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', separator: true },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' }
];

const fruits3: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' }
];

const options: (SelectOption | SelectGroupOption)[] = [
  {
    label: 'Group 1',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ]
  },
  {
    label: 'Group 2',
    options: [
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' }
    ]
  }
];

const sizes: SelectSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="w-240px lt-sm:w-auto">
    <div class="py-12px text-18px">Default</div>
    <SSelect :options="fruits" placeholder="Please select a fruit" />
    <div class="py-12px text-18px">With default value</div>
    <SSelect :options="fruits" placeholder="Please select a fruit" default-value="cherry" />
    <div class="py-12px text-18px">With all separator</div>
    <SSelect :options="fruits" placeholder="Please select a fruit" separator />
    <div class="py-12px text-18px">With item separator</div>
    <SSelect :options="fruits2" placeholder="Please select a fruit" />
    <div class="py-12px text-18px">Disabled select</div>
    <SSelect :options="fruits" placeholder="Please select a fruit" disabled />
    <div class="py-12px text-18px">Disabled option</div>
    <SSelect :options="fruits3" placeholder="Please select a fruit" />
    <div class="py-12px text-18px">Group Option</div>
    <SSelect :options="options" placeholder="Please Select" />
    <div class="py-12px text-18px">Size</div>
    <div class="flex flex-wrap gap-12px">
      <SSelect v-for="size in sizes" :key="size" :options="fruits" placeholder="Please select a fruit" :size="size" />
    </div>
  </div>
</template>

<style scoped></style>
