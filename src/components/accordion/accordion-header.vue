<script setup lang="ts">
import { useAccordionItemContext, useAccordionRootContext } from './context';
import type { AccordionHeaderProps } from './types';

const props = defineProps<AccordionHeaderProps>();

const { orientation } = useAccordionRootContext('AccordionHeader');
const { dataDisabled, dataState } = useAccordionItemContext('AccordionHeader');
</script>

<template>
  <div :class="props.class" :data-disabled="dataDisabled" :data-orientation="orientation" :data-state="dataState">
    <slot />
  </div>
</template>
