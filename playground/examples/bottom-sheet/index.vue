<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoBottomSheetBasic from './basic.vue';
import DemoBottomSheetControlled from './controlled.vue';
import DemoBottomSheetHandleOnly from './handle-only.vue';
</script>

<template>
  <SCard title="BottomSheet" split :ui="{ content: 'flex-c gap-4' }">
    <DemoBottomSheetBasic />
    <DemoBottomSheetControlled />
    <DemoBottomSheetHandleOnly />
  </SCard>
</template>
