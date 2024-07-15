<script setup lang="ts">
import { computed } from 'vue';
import type { HTMLAttributes } from 'vue';
import { AccordionContent } from 'radix-vue';
import type { AccordionContentProps } from 'radix-vue';
import { cn } from '../../shared';

defineOptions({
  name: 'SuAccordionContent'
});

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionContent
    v-bind="delegatedProps"
    class="overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
  >
    <div :class="cn('pb-4 pt-0', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
