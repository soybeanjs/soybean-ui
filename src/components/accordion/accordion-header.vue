<script setup lang="ts">
import { useAccordionItemContext, useAccordionRootContext } from './context';
import type { AccordionHeaderProps } from './types';

defineOptions({
  name: 'AccordionHeader'
});

const props = defineProps<AccordionHeaderProps>();

const { orientation } = useAccordionRootContext('AccordionHeader');
const { dataDisabled, dataState } = useAccordionItemContext('AccordionHeader');
</script>

<template>
  <h3 v-bind="props" :data-disabled="dataDisabled" :data-orientation="orientation" :data-state="dataState">
    <slot />
  </h3>
</template>
