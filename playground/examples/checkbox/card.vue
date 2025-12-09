<script setup lang="ts">
import { ref } from 'vue';
import { SCheckboxCard } from '@soybeanjs/ui';
import type { CheckedState } from '@soybeanjs/ui';

const model = ref<CheckedState | null>(null);
</script>

<template>
  <div>
    <h3 class="playground-title">Checkbox Card</h3>
    <SCheckboxCard
      v-model="model"
      color="carbon"
      icon="lucide:swatch-book"
      label="Label"
      description="this is a description"
    />
  </div>
</template>
