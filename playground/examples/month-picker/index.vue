<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoMonthPickerBasic from './basic.vue';
import DemoMonthPickerSize from './size.vue';
import DemoMonthPickerDisabled from './disabled.vue';
import DemoMonthPickerCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="MonthPicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoMonthPickerBasic />
    <DemoMonthPickerSize />
    <DemoMonthPickerDisabled />
    <DemoMonthPickerCustomStyling />
  </SCard>
</template>
