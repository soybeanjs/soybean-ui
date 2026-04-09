<script setup lang="ts">
import { ref } from 'vue';
import { SStepper } from '@soybeanjs/ui';

const value = ref(2);

const items = [
  { title: 'Draft', description: 'Prepare the content' },
  { title: 'Review', description: 'Discuss with the team' },
  { title: 'Publish', description: 'Ship to production' }
];
</script>

<template>
  <div>
    <h3 class="playground-title">Custom Styling</h3>
    <SStepper
      v-model="value"
      color="success"
      :items="items"
      :ui="{
        root: 'rounded-lg border p-4',
        indicator: 'shadow-sm',
        itemContent: 'gap-1',
        title: 'uppercase tracking-wide'
      }"
    />
  </div>
</template>
