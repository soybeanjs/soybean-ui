<script setup lang="ts">
import { useAccordionUi } from './context';
import type { AccordionDescriptionProps } from './types';

defineOptions({
  name: 'AccordionDescription'
});

defineProps<AccordionDescriptionProps>();

const cls = useAccordionUi('description');
</script>

<template>
  <p :class="cls" data-slot="description">
    <slot />
  </p>
</template>
