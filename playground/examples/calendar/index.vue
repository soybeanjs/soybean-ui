<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoCalendarBasic from './basic.vue';
import DemoCalendarMultiple from './multiple.vue';
import DemoCalendarDisabled from './disabled.vue';
import DemoCalendarCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Calendar" split :ui="{ content: 'flex-c gap-4' }">
    <DemoCalendarBasic />
    <DemoCalendarMultiple />
    <DemoCalendarDisabled />
    <DemoCalendarCustomStyling />
  </SCard>
</template>
