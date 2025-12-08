<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SCheckbox } from '@soybeanjs/ui';
import type { CheckedState } from '@soybeanjs/ui';

const checked = ref<CheckedState | null>(null);
</script>

<template>
  <SCard title="Single" :ui="{ content: 'flex gap-3' }">
    <SCheckbox v-model="checked" :label="checked ? 'Checked' : 'Unchecked'" />
    <SCheckbox default-value="indeterminate" label="Indeterminate" />
  </SCard>
</template>
