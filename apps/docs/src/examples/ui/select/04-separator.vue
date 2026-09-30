<script setup lang="ts">
import { SSelect } from '@soybeanjs/ui';
import type { SelectOptionData } from '@soybeanjs/ui';

const fruits = ['apple', 'banana', 'cherry', 'orange', 'pear', 'plum', 'strawberry', 'watermelon'];

const items: SelectOptionData[] = fruits.map(fruit => ({
  label: fruit,
  value: fruit,
  separator: fruit === 'cherry'
}));
</script>

<template>
  <div class="flex justify-center w-full">
    <SSelect :items="items" placeholder="Please select a fruit" class="w-60 lt-md:w-auto" />
  </div>
</template>
