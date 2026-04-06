<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoColorSliderBasic from './basic.vue';
</script>

<template>
  <SCard title="ColorSlider" split :ui="{ content: 'flex-c gap-4' }">
    <DemoColorSliderBasic />
  </SCard>
</template>
