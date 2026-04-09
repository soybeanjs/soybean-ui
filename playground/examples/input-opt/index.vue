<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoInputOptBasic from './basic.vue';
import DemoInputOptControlled from './controlled.vue';
import DemoInputOptDisabled from './disabled.vue';
import DemoInputOptSeparator from './separator.vue';
</script>

<template>
  <SCard title="InputOpt" split :ui="{ content: 'flex-c gap-4' }">
    <DemoInputOptBasic />
    <DemoInputOptControlled />
    <DemoInputOptDisabled />
    <DemoInputOptSeparator />
  </SCard>
</template>
