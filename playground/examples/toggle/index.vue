<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoToggleBasic from './basic.vue';
import DemoToggleShape from './shape.vue';
import DemoToggleVariant from './variant.vue';
import DemoToggleSize from './size.vue';
import DemoToggleDisabled from './disabled.vue';
</script>

<template>
  <SCard title="Toggle" split :ui="{ content: 'flex-c gap-4' }">
    <DemoToggleBasic />
    <DemoToggleShape />
    <DemoToggleVariant />
    <DemoToggleSize />
    <DemoToggleDisabled />
  </SCard>
</template>
