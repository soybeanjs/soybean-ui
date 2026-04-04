<script setup lang="ts">
import { shallowRef } from 'vue';
import { SButton, SProgress } from '@soybeanjs/ui';

const value = shallowRef<number | null | undefined>(45);
</script>

<template>
  <div>
    <h3 class="playground-title">State</h3>
    <div class="flex-c gap-3">
      <SProgress v-model="value" />
      <div class="flex flex-wrap gap-2">
        <SButton size="sm" variant="outline" @click="value = undefined">Indeterminate</SButton>
        <SButton size="sm" variant="outline" @click="value = 25">25%</SButton>
        <SButton size="sm" variant="outline" @click="value = 70">70%</SButton>
        <SButton size="sm" variant="outline" @click="value = 100">Complete</SButton>
      </div>
    </div>
  </div>
</template>
