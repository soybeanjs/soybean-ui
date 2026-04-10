<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoEmptyBasic from './basic.vue';
import DemoEmptyIcon from './icon.vue';
import DemoEmptySlot from './slot.vue';
import DemoEmptyCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Empty" split :ui="{ content: 'flex-c gap-4' }">
    <DemoEmptyBasic />
    <DemoEmptyIcon />
    <DemoEmptySlot />
    <DemoEmptyCustomStyling />
  </SCard>
</template>
