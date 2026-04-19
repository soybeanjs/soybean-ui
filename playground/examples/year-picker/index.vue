<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoYearPickerBasic from './basic.vue';
import DemoYearPickerSize from './size.vue';
import DemoYearPickerDisabled from './disabled.vue';
import DemoYearPickerCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="YearPicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoYearPickerBasic />
    <DemoYearPickerSize />
    <DemoYearPickerDisabled />
    <DemoYearPickerCustomStyling />
  </SCard>
</template>
