<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { CollapsibleContent } from '../collapsible';
import { collapsibleContentCssVars } from '../collapsible/shared';
import { useAccordionItemContext, useAccordionRootContext, useAccordionThemeContext } from './context';
import { accordionContentCssVars } from './shared';
import type { AccordionContentProps } from './types';

defineOptions({
  name: 'AccordionContent'
});

const props = defineProps<AccordionContentProps>();

const themeContext = useAccordionThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.content, props.class]);

const { orientation } = useAccordionRootContext('AccordionContent');
const { triggerId, dataDisabled, dataState } = useAccordionItemContext('AccordionContent');

const style = computed<CSSProperties>(() => ({
  [accordionContentCssVars.width]: `var(${collapsibleContentCssVars.width})`,
  [accordionContentCssVars.height]: `var(${collapsibleContentCssVars.height})`
}));
</script>

<template>
  <CollapsibleContent
    v-bind="props"
    :class="cls"
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
