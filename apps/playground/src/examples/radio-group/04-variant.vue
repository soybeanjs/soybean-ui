<script setup lang="ts">
import { ref } from 'vue';
import { SRadioGroup } from '@soybeanjs/ui';
import type { RadioGroupOptionData } from '@soybeanjs/ui';

const selected = ref<string>('apple');

const items: RadioGroupOptionData<string>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' }
];
</script>

<template>
  <SRadioGroup v-model="selected" :items="items" variant="outline" />
</template>
