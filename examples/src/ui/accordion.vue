<script setup lang="ts">
import {
  DemoAccordionCustomIcon,
  DemoAccordionCustomStyling,
  DemoAccordionMultiple,
  DemoAccordionSingle,
  DemoAccordionSize
} from './accordion';

defineOptions({
  name: 'DemoAccordion'
});
</script>

<template>
  <div class="flex-c gap-4">
    <DemoAccordionSingle />
    <DemoAccordionMultiple />
    <DemoAccordionCustomStyling />
    <DemoAccordionCustomIcon />
    <DemoAccordionSize />
  </div>
</template>
