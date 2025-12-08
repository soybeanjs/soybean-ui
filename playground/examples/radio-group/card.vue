<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SRadioCardGroup } from '@soybeanjs/ui';
import type { RadioCardGroupOptionData } from '@soybeanjs/ui';

const selected = ref<string>('apple');

const items: RadioCardGroupOptionData<string>[] = [
  { icon: 'lucide:apple', value: 'apple', label: 'Apple', description: 'This is an apple' },
  { icon: 'hugeicons:orange', value: 'orange', label: 'Orange', description: 'This is an orange' },
  { icon: 'lucide:banana', value: 'banana', label: 'Banana', description: 'This is a banana' },
  { icon: 'lucide:grape', value: 'grape', label: 'Grape', description: 'This is a grape' }
];
</script>

<template>
  <SCard title="Card Group" :ui="{ content: 'flex-c gap-3' }">
    <SRadioCardGroup v-model="selected" :items="items" color="destructive" shape="rounded" />
  </SCard>
</template>
