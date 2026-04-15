<script setup lang="ts" generic="T extends AccordionOptionData = AccordionOptionData, M extends boolean = false">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { AccordionCompact, provideAccordionUi } from '@soybeanjs/headless';
import type { AccordionOptionData } from '@soybeanjs/headless';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants } from '@/theme';
import { accordionVariants } from './variants';
import type { AccordionEmits, AccordionProps, AccordionSlots } from './types';

defineOptions({
  name: 'SAccordion'
});

const props = defineProps<AccordionProps<T, M>>();

const emit = defineEmits<AccordionEmits<M>>();

const slots = defineSlots<AccordionSlots<T, M>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = accordionVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideAccordionUi(ui);
</script>

<template>
  <AccordionCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps as any" />
    </template>
  </AccordionCompact>
</template>
