<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoBottomSheetBasic from './basic.vue';
import DemoBottomSheetNested from './nested.vue';
</script>

<template>
  <SCard title="Bottom Sheet" split :ui="{ content: 'flex-c gap-4' }">
    <DemoBottomSheetBasic />
    <DemoBottomSheetNested />
  </SCard>
</template>
