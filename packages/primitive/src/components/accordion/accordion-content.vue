<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { CollapsibleContent } from '../collapsible';
import { injectAccordionItemContext, injectAccordionRootContext } from './context';
import type { AccordionContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionContent'
});

const { class: className } = defineProps<AccordionContentPropsWithPrimitive>();

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
    :class="className"
    :as
    :as-child
    :force-mount
    :aria-labelledby="triggerId"
    :data-orientation="orientation"
    :data-state
    :data-disabled
    style="
      --soybean-accordion-content-width: var(--soybean-collapsible-content-width);
      --soybean-accordion-content-height: var(--soybean-collapsible-content-height);
    "
    @content-found="handleContentFound"
  >
    <slot />
  </CollapsibleContent>
</template>
