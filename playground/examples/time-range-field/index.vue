<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoTimeRangeFieldBasic from './basic.vue';
import DemoTimeRangeFieldSeconds from './seconds.vue';
import DemoTimeRangeFieldDisabled from './disabled.vue';
import DemoTimeRangeFieldCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="TimeRangeField" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTimeRangeFieldBasic />
    <DemoTimeRangeFieldSeconds />
    <DemoTimeRangeFieldDisabled />
    <DemoTimeRangeFieldCustomStyling />
  </SCard>
</template>
