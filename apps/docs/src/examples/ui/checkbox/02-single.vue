<script setup lang="ts">
import { ref } from 'vue';
import { SCheckbox } from '@vean/ui';
import type { CheckedState } from '@vean/ui';

const checked = ref<CheckedState | null>(null);
</script>

<template>
  <div class="flex gap-3">
    <SCheckbox v-model="checked" :label="checked ? 'Checked' : 'Unchecked'" />
    <SCheckbox default-value="indeterminate" label="Indeterminate" />
  </div>
</template>
