<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoBottomSheetBase from './base.vue';
import DemoBottomSheetNested from './nested.vue';
</script>

<template>
  <SCard title="Bottom Sheet" split :ui="{ content: 'flex-c gap-4' }">
    <DemoBottomSheetBase />
    <DemoBottomSheetNested />
  </SCard>
</template>
