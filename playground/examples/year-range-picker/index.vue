<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoYearRangePickerBasic from './basic.vue';
import DemoYearRangePickerSize from './size.vue';
import DemoYearRangePickerDisabled from './disabled.vue';
import DemoYearRangePickerCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="YearRangePicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoYearRangePickerBasic />
    <DemoYearRangePickerSize />
    <DemoYearRangePickerDisabled />
    <DemoYearRangePickerCustomStyling />
  </SCard>
</template>
