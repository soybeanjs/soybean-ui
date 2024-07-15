<script setup lang="ts" generic="T extends AccordionItemData = AccordionItemData">
import { computed } from 'vue';
import { AccordionRoot, useForwardPropsEmits } from 'radix-vue';
import type { AccordionRootEmits, AccordionRootProps } from 'radix-vue';
import SuAccordionItem from './accordion-item.vue';
import SuAccordionTrigger from './accordion-trigger.vue';
import SuAccordionContent from './accordion-content.vue';
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
  name: 'SuAccordion'
});
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <SuAccordionItem v-for="item in items" :key="item.value" v-bind="item">
      <SuAccordionTrigger>
        <slot name="trigger" :item="item">{{ item.title }}</slot>
      </SuAccordionTrigger>
      <SuAccordionContent>
        <slot name="trigger" :item="item">{{ item.content }}</slot>
      </SuAccordionContent>
    </SuAccordionItem>
  </AccordionRoot>
</template>

<style scoped></style>
