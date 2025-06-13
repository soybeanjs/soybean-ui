<script setup lang="ts">
import { SCard } from '@ui';
import DemoAccordionSingle from './single.vue';
import DemoAccordionSize from './size.vue';
import DemoAccordionCustomIcon from './custom-icon.vue';
import DemoAccordionCustomStyling from './custom-styling.vue';

defineOptions({
  name: 'DemoAccordion'
});
</script>

<template>
  <SCard title="Accordion" split :ui="{ content: 'flex-c gap-3' }">
    <DemoAccordionSingle />
    <DemoAccordionSize />
    <DemoAccordionCustomIcon />
    <DemoAccordionCustomStyling />
  </SCard>
</template>
