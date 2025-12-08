<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoToastBase from './base.vue';
import DemoToastType from './type.vue';
import DemoToastColor from './color.vue';
import DemoToastPosition from './position.vue';
import DemoToastContent from './content.vue';
</script>

<template>
  <SCard title="Toast" :ui="{ content: 'flex-c gap-3' }">
    <DemoToastBase />
    <DemoToastType />
    <DemoToastColor />
    <DemoToastPosition />
    <DemoToastContent />
  </SCard>
</template>
