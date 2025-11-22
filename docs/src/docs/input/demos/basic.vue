<script setup lang="ts">
import { ref } from 'vue';
import { SInput } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <div class="max-w-sm space-y-4">
    <SInput v-model="value" placeholder="Basic input" />
    <SInput v-model="value" placeholder="Clearable input" clearable />
    <SInput v-model="value" placeholder="With icon">
      <template #leading>
        <div class="i-ph-user-bold text-gray-400" />
      </template>
    </SInput>
  </div>
</template>
