<script setup lang="ts">
import { ref } from 'vue';
import { SCheckbox } from '@soybeanjs/ui';

const checked1 = ref(true);
const checked2 = ref(false);
</script>

<template>
  <div class="flex gap-4">
    <SCheckbox v-model="checked1" label="Checked" />
    <SCheckbox v-model="checked2" label="Unchecked" />
    <SCheckbox label="Disabled Checked" :model-value="true" disabled />
    <SCheckbox label="Disabled Unchecked" :model-value="false" disabled />
  </div>
</template>
