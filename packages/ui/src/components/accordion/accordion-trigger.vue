<script setup lang="ts">
import { computed } from 'vue';
import type { HTMLAttributes } from 'vue';
import { AccordionHeader, AccordionTrigger } from 'radix-vue';
import type { AccordionTriggerProps } from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';
import { cn } from '../../shared';

defineOptions({
  name: 'SuAccordionTrigger'
});

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 bg-transparent',
          props.class
        )
      "
    >
      <slot />
      <slot name="icon">
        <ChevronDown :size="16" class="shrink-0 text-muted-foreground transition-transform duration-200" />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
