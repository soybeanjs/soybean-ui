<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SRadioGroup } from '@ui';
import type { RadioGroupOptionData } from '@ui';

const selected = ref<string>('apple');

const items: RadioGroupOptionData<string>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' }
];
</script>

<template>
  <SCard title="Variant: outline">
    <SRadioGroup v-model="selected" :items="items" variant="outline" />
  </SCard>
</template>
