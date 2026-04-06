<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoColorSwatchPickerBasic from './basic.vue';
</script>

<template>
  <SCard title="ColorSwatchPicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoColorSwatchPickerBasic />
  </SCard>
</template>
