<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoTimePickerBasic from './basic.vue';
import DemoTimePickerSize from './size.vue';
import DemoTimePickerDisabled from './disabled.vue';
import DemoTimePickerCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="TimePicker" split :ui="{ content: 'flex-c gap-4' }">
    <DemoTimePickerBasic />
    <DemoTimePickerSize />
    <DemoTimePickerDisabled />
    <DemoTimePickerCustomStyling />
  </SCard>
</template>
