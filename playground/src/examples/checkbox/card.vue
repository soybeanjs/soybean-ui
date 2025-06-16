<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SCheckboxCard } from '@ui';
import type { CheckedState } from '@ui';

const model = ref<CheckedState | null>(null);
</script>

<template>
  <SCard title="Checkbox Card">
    <SCheckboxCard v-model="model" icon="lucide:swatch-book" label="Label" description="this is a description" />
  </SCard>
</template>
