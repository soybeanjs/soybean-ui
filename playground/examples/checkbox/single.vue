<script setup lang="ts">
import { ref } from 'vue';
import { SCheckbox } from '@soybeanjs/ui';
import type { CheckedState } from '@soybeanjs/ui';

const checked = ref<CheckedState | null>(null);
</script>

<template>
  <div>
    <h3 class="playground-title">Single</h3>
    <div class="flex gap-3">
      <SCheckbox v-model="checked" :label="checked ? 'Checked' : 'Unchecked'" />
      <SCheckbox default-value="indeterminate" label="Indeterminate" />
    </div>
  </div>
</template>
