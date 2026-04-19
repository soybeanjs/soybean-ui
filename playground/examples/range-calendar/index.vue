<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoRangeCalendarBasic from './basic.vue';
import DemoRangeCalendarTwoMonths from './two-months.vue';
import DemoRangeCalendarDisabled from './disabled.vue';
import DemoRangeCalendarCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="RangeCalendar" split :ui="{ content: 'flex-c gap-4' }">
    <DemoRangeCalendarBasic />
    <DemoRangeCalendarTwoMonths />
    <DemoRangeCalendarDisabled />
    <DemoRangeCalendarCustomStyling />
  </SCard>
</template>
