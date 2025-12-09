<script setup lang="ts">
import { ref } from 'vue';
import { SRadioCardGroup } from '@soybeanjs/ui';
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
  <div>
    <h3 class="playground-title">Card Group</h3>
    <SRadioCardGroup v-model="selected" :items="items" color="destructive" shape="rounded" />
  </div>
</template>
