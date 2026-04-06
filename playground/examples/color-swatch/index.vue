<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoColorSwatchBasic from './basic.vue';
</script>

<template>
  <SCard title="ColorSwatch" split :ui="{ content: 'flex-c gap-4' }">
    <DemoColorSwatchBasic />
  </SCard>
</template>
