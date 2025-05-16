<script setup lang="ts">
import { SCard, SSelect } from 'soy-ui';
import type { SelectGroupOptionData, SelectOptionData } from 'soy-ui';

defineOptions({
  name: 'DemoSelect'
});

const fruits: SelectOptionData[] = createFruitItems();

const fruits2: SelectOptionData[] = fruits.map(fruit => ({ ...fruit, separator: fruit.value === 'orange' }));

const fruits3: SelectOptionData[] = fruits.map(fruit => ({ ...fruit, disabled: fruit.value === 'banana' }));

function createFruitItems() {
  const opts: SelectOptionData[] = [
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

const items: SelectGroupOptionData[] = [
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
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Default" split>
      <div class="w-240px lt-sm:w-auto">
        <SSelect :items="fruits" placeholder="Please select a fruit" />
      </div>
    </SCard>
    <SCard title="With default value" split>
      <div class="w-240px lt-sm:w-auto">
        <SSelect :items="fruits" placeholder="Please select a fruit" default-value="cherry" />
      </div>
    </SCard>
    <SCard title="With all separator" split>
      <div class="w-240px lt-sm:w-auto">
        <SSelect :items="fruits" placeholder="Please select a fruit" separator />
      </div>
    </SCard>
    <SCard title="With item separator" split>
      <div class="w-240px lt-sm:w-auto">
        <SSelect :items="fruits2" placeholder="Please select a fruit" />
      </div>
    </SCard>
    <SCard title="Disabled select" split>
      <div class="w-240px lt-sm:w-auto">
        <SSelect :items="fruits" placeholder="Please select a fruit" disabled />
      </div>
    </SCard>
    <SCard title="Disabled option" split>
      <div class="w-240px lt-sm:w-auto">
        <SSelect :items="fruits3" placeholder="Please select a fruit" />
      </div>
    </SCard>
    <SCard title="Group Option" split>
      <div class="w-240px lt-sm:w-auto">
        <SSelect :items="items" placeholder="Please Select" />
      </div>
    </SCard>
  </div>
</template>
