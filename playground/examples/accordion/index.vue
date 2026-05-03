<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoAccordionSingle from './single.vue';
import DemoAccordionAlwaysOne from './always-one.vue';
import DemoAccordionMultiple from './multiple.vue';
import DemoAccordionCustomIcon from './custom-icon.vue';
import DemoAccordionCustomStyling from './custom-styling.vue';
import DemoAccordionBasic from './basic.vue';
</script>

<template>
  <SCard title="Accordion" split :ui="{ content: 'flex-c gap-4' }">
    <DemoAccordionBasic />
    <DemoAccordionSingle />
    <DemoAccordionAlwaysOne />
    <DemoAccordionMultiple />
    <DemoAccordionCustomIcon />
    <DemoAccordionCustomStyling />
  </SCard>
</template>
