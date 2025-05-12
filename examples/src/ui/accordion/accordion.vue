<script setup lang="ts">
import DemoAccordionSingle from './single.vue';
import DemoAccordionMultiple from './multiple.vue';
import DemoAccordionCustomStyling from './custom-styling.vue';
import DemoAccordionCustomIcon from './custom-icon.vue';
import DemoAccordionSize from './size.vue';

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
