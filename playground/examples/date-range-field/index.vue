<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoDateRangeFieldBasic from './basic.vue';
import DemoDateRangeFieldWithTime from './with-time.vue';
import DemoDateRangeFieldDisabled from './disabled.vue';
import DemoDateRangeFieldCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="DateRangeField" split :ui="{ content: 'flex-c gap-4' }">
    <DemoDateRangeFieldBasic />
    <DemoDateRangeFieldWithTime />
    <DemoDateRangeFieldDisabled />
    <DemoDateRangeFieldCustomStyling />
  </SCard>
</template>
