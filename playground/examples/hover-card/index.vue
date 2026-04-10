<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoHoverCardBasic from './basic.vue';
import DemoHoverCardCustomStyling from './custom-styling.vue';
import DemoHoverCardDelay from './delay.vue';
</script>

<template>
  <SCard title="HoverCard" split :ui="{ content: 'flex-c gap-4' }">
    <DemoHoverCardBasic />
    <DemoHoverCardDelay />
    <DemoHoverCardCustomStyling />
  </SCard>
</template>
