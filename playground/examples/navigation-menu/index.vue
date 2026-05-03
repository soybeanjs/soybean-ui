<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoNavigationMenuHorizontal from './horizontal.vue';
import DemoNavigationMenuVertical from './vertical.vue';
import DemoNavigationMenuBasic from './basic.vue';
</script>

<template>
  <SCard title="Navigation Menu" split :ui="{ content: 'flex-c gap-4' }">
    <DemoNavigationMenuBasic />
    <DemoNavigationMenuHorizontal />
    <DemoNavigationMenuVertical />
  </SCard>
</template>
