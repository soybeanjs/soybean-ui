<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoColorPickerBasic from './basic.vue';
import DemoColorPickerOklch from './oklch.vue';
</script>

<template>
  <SCard title="ColorPicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoColorPickerBasic />
    <DemoColorPickerOklch />
  </SCard>
</template>
