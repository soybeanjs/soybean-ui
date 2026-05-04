<script setup lang="ts">
import { ref } from 'vue';
import { SRadioGroup } from '@soybeanjs/ui';

const value = ref('option-1');
const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];
</script>

<template>
  <SRadioGroup v-model="value" :items="items" />
</template>
