<script setup lang="ts">
import { ref } from 'vue';
import { SSelect } from '@soybeanjs/ui';

const value = ref('');
const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' }
];
</script>

<template>
  <div class="w-64">
    <SSelect v-model="value" :items="items" placeholder="Select a fruit" />
  </div>
</template>
