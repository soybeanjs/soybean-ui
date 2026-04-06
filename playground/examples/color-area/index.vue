<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoColorAreaBasic from './basic.vue';
import DemoColorAreaOklch from './oklch.vue';
</script>

<template>
  <SCard title="ColorArea" split :ui="{ content: 'flex-c gap-4' }">
    <DemoColorAreaBasic />
    <DemoColorAreaOklch />
  </SCard>
</template>
