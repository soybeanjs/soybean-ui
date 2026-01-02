<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoNavigationMenuHorizontal from './horizontal.vue';
import DemoNavigationMenuVertical from './vertical.vue';
</script>

<template>
  <SCard title="Navigation Menu" split :ui="{ content: 'flex-c gap-4' }">
    <DemoNavigationMenuHorizontal />
    <DemoNavigationMenuVertical />
  </SCard>
</template>
