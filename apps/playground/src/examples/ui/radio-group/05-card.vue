<script setup lang="ts">
import { ref } from 'vue';
import { SRadioGroupCard } from '@soybeanjs/ui';
import type { RadioGroupCardOptionData } from '@soybeanjs/ui';

const selected = ref<string>('apple');

const items: RadioGroupCardOptionData<string>[] = [
  { icon: 'lucide:apple', value: 'apple', label: 'Apple', description: 'This is an apple' },
  { icon: 'hugeicons:orange', value: 'orange', label: 'Orange', description: 'This is an orange' },
  { icon: 'lucide:banana', value: 'banana', label: 'Banana', description: 'This is a banana' },
  { icon: 'lucide:grape', value: 'grape', label: 'Grape', description: 'This is a grape' }
];
</script>

<template>
  <SRadioGroupCard v-model="selected" :items="items" color="destructive" shape="rounded" />
</template>
