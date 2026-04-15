<script setup lang="ts">
import { useAccordionItemContext, useAccordionRootContext, useAccordionUi } from './context';
import type { AccordionHeaderProps } from './types';

defineOptions({
  name: 'AccordionHeader'
});

defineProps<AccordionHeaderProps>();

const cls = useAccordionUi('header');

const { orientation } = useAccordionRootContext('AccordionHeader');
const { dataDisabled, dataState } = useAccordionItemContext('AccordionHeader');
</script>

<template>
  <div
    :class="cls"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    :data-state="dataState"
    data-slot="header"
  >
    <slot />
  </div>
</template>
