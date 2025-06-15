<script setup lang="ts">
import { SCard } from '@ui';
import DemoAccordionSingle from './single.vue';
import DemoAccordionMultiple from './multiple.vue';
import DemoAccordionSize from './size.vue';
import DemoAccordionCustomIcon from './custom-icon.vue';
import DemoAccordionCustomStyling from './custom-styling.vue';
</script>

<template>
  <SCard title="Accordion" split :ui="{ content: 'flex-c gap-3' }">
    <DemoAccordionSingle />
    <DemoAccordionMultiple />
    <DemoAccordionSize />
    <DemoAccordionCustomIcon />
    <DemoAccordionCustomStyling />
  </SCard>
</template>
