<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoColorFieldBasic from './basic.vue';
</script>

<template>
  <SCard title="ColorField" split :ui="{ content: 'flex-c gap-4' }">
    <DemoColorFieldBasic />
  </SCard>
</template>
