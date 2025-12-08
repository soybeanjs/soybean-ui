<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SCheckboxCard } from '@soybeanjs/ui';
import type { CheckedState } from '@soybeanjs/ui';

const model = ref<CheckedState | null>(null);
</script>

<template>
  <SCard title="Checkbox Card">
    <SCheckboxCard
      v-model="model"
      color="carbon"
      icon="lucide:swatch-book"
      label="Label"
      description="this is a description"
    />
  </SCard>
</template>
