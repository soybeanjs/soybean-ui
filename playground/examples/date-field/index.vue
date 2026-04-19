<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';

import DemoDateFieldBasic from './basic.vue';
import DemoDateFieldWithTime from './with-time.vue';
import DemoDateFieldDisabled from './disabled.vue';
import DemoDateFieldCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="DateField" split :ui="{ content: 'flex-c gap-4' }">
    <DemoDateFieldBasic />
    <DemoDateFieldWithTime />
    <DemoDateFieldDisabled />
    <DemoDateFieldCustomStyling />
  </SCard>
</template>
