<script setup lang="ts">
import { SSelect } from '@soybean-ui/vue';
import type { SelectGroupOption, SelectOption, ThemeSize } from '@soybean-ui/vue';

defineOptions({
  name: 'UiSelect'
});

const fruits: SelectOption[] = createFruititems();

const fruits2: SelectOption[] = fruits.map(fruit => ({ ...fruit, separator: fruit.value === 'orange' }));

const fruits3: SelectOption[] = fruits.map(fruit => ({ ...fruit, disabled: fruit.value === 'banana' }));

function createFruititems() {
  const opts: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'orange', label: 'Orange' },
    { value: 'pear', label: 'Pear' },
    { value: 'plum', label: 'Plum' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' }
  ];

  return opts;
}

const items: (SelectOption | SelectGroupOption)[] = [
  {
    label: 'Group 1',
    items: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ]
  },
  {
    label: 'Group 2',
    items: [
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' }
    ]
  }
];

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
</script>

<template>
  <div class="w-240px lt-sm:w-auto">
    <div class="py-12px text-18px">Default</div>
    <SSelect :items="fruits" placeholder="Please select a fruit" />
    <div class="py-12px text-18px">With default value</div>
    <SSelect :items="fruits" placeholder="Please select a fruit" default-value="cherry" />
    <div class="py-12px text-18px">With all separator</div>
    <SSelect :items="fruits" placeholder="Please select a fruit" separator />
    <div class="py-12px text-18px">With item separator</div>
    <SSelect :items="fruits2" placeholder="Please select a fruit" />
    <div class="py-12px text-18px">Disabled select</div>
    <SSelect :items="fruits" placeholder="Please select a fruit" disabled />
    <div class="py-12px text-18px">Disabled option</div>
    <SSelect :items="fruits3" placeholder="Please select a fruit" />
    <div class="py-12px text-18px">Group Option</div>
    <SSelect :items="items" placeholder="Please Select" />
    <div class="py-12px text-18px">Size</div>
    <div class="flex flex-wrap gap-12px">
      <SSelect v-for="size in sizes" :key="size" :items="fruits" placeholder="Please select a fruit" :size="size" />
    </div>
  </div>
</template>
