<script setup lang="ts">
import { ref } from 'vue';
import { SSwitch } from '@soybeanjs/ui';

const value1 = ref(true);
const value2 = ref(false);
</script>

<template>
  <div class="flex gap-4 items-center">
    <SSwitch v-model="value1" />
    <SSwitch v-model="value2" color="success" />
    <SSwitch :model-value="true" disabled />
    <SSwitch :model-value="false" disabled />
  </div>
</template>
