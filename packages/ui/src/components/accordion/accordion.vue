<script setup lang="ts" generic="T extends AccordionItemData = AccordionItemData">
import { computed } from 'vue';
import { AccordionRoot, useForwardPropsEmits } from 'radix-vue';
import type { AccordionRootEmits, AccordionRootProps } from 'radix-vue';
import SAccordionItem from './accordion-item.vue';
import SAccordionTrigger from './accordion-trigger.vue';
import SAccordionContent from './accordion-content.vue';
import type { AccordionItemData } from './types';

interface AccordionProps extends AccordionRootProps {
  items: T[];
}

const props = defineProps<AccordionProps>();
const emit = defineEmits<AccordionRootEmits>();

const delegatedProps = computed(() => {
  const { items: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);

defineOptions({
  name: 'SAccordion'
});
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <SAccordionItem v-for="item in items" :key="item.value" v-bind="item">
      <SAccordionTrigger>
        <slot name="trigger" :item="item">{{ item.title }}</slot>
      </SAccordionTrigger>
      <SAccordionContent>
        <slot name="trigger" :item="item">{{ item.content }}</slot>
      </SAccordionContent>
    </SAccordionItem>
  </AccordionRoot>
</template>

<style scoped></style>
