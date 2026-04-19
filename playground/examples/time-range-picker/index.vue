<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoTimeRangePickerBasic from './basic.vue';
import DemoTimeRangePickerSize from './size.vue';
import DemoTimeRangePickerDisabled from './disabled.vue';
import DemoTimeRangePickerCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="TimeRangePicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTimeRangePickerBasic />
    <DemoTimeRangePickerSize />
    <DemoTimeRangePickerDisabled />
    <DemoTimeRangePickerCustomStyling />
  </SCard>
</template>
