<script setup lang="ts">
import { AccordionRoot, type AccordionRootEmits, type AccordionRootProps, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<AccordionRootProps>();
const emit = defineEmits<AccordionRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <slot />
  </AccordionRoot>
</template>
