<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { CollapsibleContent } from '../collapsible';
import { collapsibleContentCssVars } from '../collapsible/shared';
import { useAccordionItemContext, useAccordionRootContext } from './context';
import { accordionContentCssVars } from './shared';
import type { AccordionContentProps } from './types';

defineOptions({
  name: 'AccordionContent'
});

defineProps<AccordionContentProps>();

const { orientation } = useAccordionRootContext('AccordionContent');
const { triggerId, dataDisabled, dataState } = useAccordionItemContext('AccordionContent');

const style: CSSProperties = {
  [accordionContentCssVars.width]: `var(${collapsibleContentCssVars.width})`,
  [accordionContentCssVars.height]: `var(${collapsibleContentCssVars.height})`
};
</script>

<template>
  <CollapsibleContent
    :as="as"
    :as-child="asChild"
    :force-mount="forceMount"
    role="region"
    :aria-labelledby="triggerId"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    :data-state="dataState"
    :style="style"
  >
    <slot />
  </CollapsibleContent>
</template>
