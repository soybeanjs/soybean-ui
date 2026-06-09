<script setup lang="ts">
import { SSelect } from '@soybeanjs/ui';
import type { SelectOptionData } from '@soybeanjs/ui';

const fruits = ['apple', 'banana', 'cherry', 'orange', 'pear', 'plum', 'strawberry', 'watermelon'];

const items: SelectOptionData<string>[] = fruits.map(fruit => ({
  label: fruit,
  value: fruit
}));

const defaultFruit: string = 'strawberry';
</script>

<template>
  <SSelect :items="items" :default-value="defaultFruit" placeholder="Please select a fruit" class="w-60 lt-md:w-auto" />
</template>
