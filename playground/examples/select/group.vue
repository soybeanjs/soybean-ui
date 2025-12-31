<script setup lang="ts">
import { SSelect } from '@soybeanjs/ui';
import type { SelectOptionData } from '@soybeanjs/ui';

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
  <div>
    <h3 class="playground-title">Group</h3>
    <div class="w-60 lt-md:w-auto">
      <SSelect :items="groups" placeholder="Please select a fruit or vegetable" @update:model-value="console.log" />
    </div>
  </div>
</template>
