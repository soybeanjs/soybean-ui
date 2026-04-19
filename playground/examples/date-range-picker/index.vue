<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import BasicExample from './basic.vue';
import DisabledExample from './disabled.vue';
import SizeExample from './size.vue';
import CustomStylingExample from './custom-styling.vue';
</script>

<template>
  <SCard title="DateRangePicker" split :ui="{ content: 'flex-c gap-4' }">
    <BasicExample />
    <DisabledExample />
    <SizeExample />
    <CustomStylingExample />
  </SCard>
</template>
