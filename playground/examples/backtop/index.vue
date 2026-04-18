<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoBacktopBasic from './basic.vue';
import DemoBacktopCustomStyling from './custom-styling.vue';
import DemoBacktopDisabled from './disabled.vue';
import DemoBacktopTarget from './target.vue';
</script>

<template>
  <SCard title="Backtop" split :ui="{ content: 'flex-c gap-4' }">
    <DemoBacktopBasic />
    <DemoBacktopTarget />
    <DemoBacktopDisabled />
    <DemoBacktopCustomStyling />
  </SCard>
</template>
