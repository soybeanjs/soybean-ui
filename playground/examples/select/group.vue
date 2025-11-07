<script setup lang="ts">
import { SCard, SSelect } from '@ui';
import type { SelectOptionData } from '@ui';

const fruits = ['apple', 'banana', 'cherry', 'orange', 'pear', 'plum', 'strawberry', 'watermelon'];

const vegetables = ['carrot', 'potato', 'onion', 'garlic', 'tomato', 'lettuce', 'broccoli', 'cauliflower'];

const groups: SelectOptionData[] = [
  {
    label: 'Fruits',
    items: fruits.map(fruit => ({ label: fruit, value: fruit }))
  },
  {
    label: 'Vegetables',
    items: vegetables.map(vegetable => ({ label: vegetable, value: vegetable }))
  }
];
</script>

<template>
  <SCard title="Group">
    <div class="w-60 lt-sm:w-auto">
      <SSelect
        :items="groups"
        :value-props="{ placeholder: 'Please select a fruit or vegetable' }"
        @update:model-value="console.log"
      />
    </div>
  </SCard>
</template>
