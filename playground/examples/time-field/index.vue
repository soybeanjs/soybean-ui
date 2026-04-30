<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoTimeFieldBasic from './basic.vue';
import DemoTimeFieldSeconds from './seconds.vue';
import DemoTimeFieldDisabled from './disabled.vue';
import DemoTimeFieldCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="TimeField" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTimeFieldBasic />
    <DemoTimeFieldSeconds />
    <DemoTimeFieldDisabled />
    <DemoTimeFieldCustomStyling />
  </SCard>
</template>
