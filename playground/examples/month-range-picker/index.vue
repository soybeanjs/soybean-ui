<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoMonthRangePickerBasic from './basic.vue';
import DemoMonthRangePickerSize from './size.vue';
import DemoMonthRangePickerDisabled from './disabled.vue';
import DemoMonthRangePickerCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="MonthRangePicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoMonthRangePickerBasic />
    <DemoMonthRangePickerSize />
    <DemoMonthRangePickerDisabled />
    <DemoMonthRangePickerCustomStyling />
  </SCard>
</template>
