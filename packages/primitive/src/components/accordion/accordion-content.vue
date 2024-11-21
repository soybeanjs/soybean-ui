<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { CollapsibleContent } from '../collapsible';
import { injectAccordionItemContext, injectAccordionRootContext } from './context';
import type { AccordionContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionContent'
});

const props = defineProps<AccordionContentPropsWithPrimitive>();

const { orientation, changeModelValue } = injectAccordionRootContext();
const { triggerId, dataState, dataDisabled, value } = injectAccordionItemContext();

function handleContentFound() {
  changeModelValue(value.value);
}

useForwardExpose();
</script>

<template>
  <CollapsibleContent
    role="region"
    :class="props.class"
    :as-child="asChild"
    :force-mount="forceMount"
    :aria-labelledby="triggerId"
    :data-state="dataState"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    style="
      --soybean-accordion-content-width: var(--soybean-collapsible-content-width);
      --soybean-accordion-content-height: var(--soybean-collapsible-content-height);
    "
    @content-found="handleContentFound"
  >
    <slot />
  </CollapsibleContent>
</template>
