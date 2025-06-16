<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SCheckbox } from '@ui';
import type { CheckedState } from '@ui';

const checked = ref<CheckedState | null>(null);
</script>

<template>
  <SCard title="Single" :ui="{ content: 'flex gap-3' }">
    <SCheckbox v-model="checked" />
    <SCheckbox default-value="indeterminate" />
  </SCard>
</template>
