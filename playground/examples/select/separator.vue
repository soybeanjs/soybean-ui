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
  <div>
    <h3 class="playground-title">Separator</h3>
    <div class="w-60 lt-md:w-auto">
      <SSelect :items="items" :value-props="{ placeholder: 'Please select a fruit' }" />
    </div>
  </div>
</template>
