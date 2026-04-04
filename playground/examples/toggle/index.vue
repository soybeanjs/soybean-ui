<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoToggleBasic from './basic.vue';
import DemoToggleOutline from './outline.vue';
import DemoToggleSize from './size.vue';
import DemoToggleDisabled from './disabled.vue';
</script>

<template>
  <SCard title="Toggle" split :ui="{ content: 'flex-c gap-4' }">
    <DemoToggleBasic />
    <DemoToggleOutline />
    <DemoToggleSize />
    <DemoToggleDisabled />
  </SCard>
</template>
