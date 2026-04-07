<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoColorSwatchPickerBasic from './basic.vue';
import DemoColorSwatchPickerShape from './shape.vue';
</script>

<template>
  <SCard title="ColorSwatchPicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoColorSwatchPickerBasic />
    <DemoColorSwatchPickerShape />
  </SCard>
</template>
