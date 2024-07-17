<script
  setup
  lang="ts"
  generic="
    T extends AccordionItemData = AccordionItemData,
    V extends string | string[] = string | string[],
    E extends SingleOrMultipleType = SingleOrMultipleType
  "
>
import { reactiveOmit } from '@vueuse/core';
import { AccordionRoot, useForwardPropsEmits } from 'radix-vue';
import type { AccordionRootEmits } from 'radix-vue';
import SAccordionItem from './accordion-item.vue';
import SAccordionHeader from './accordion-header.vue';
import SAccordionTrigger from './accordion-trigger.vue';
import SAccordionContent from './accordion-content.vue';
import type { AccordionItemData, AccordionProps, SingleOrMultipleType } from './types';

const props = defineProps<AccordionProps<T, V, E>>();
const emit = defineEmits<AccordionRootEmits>();

const delegatedProps = reactiveOmit(props, ['items', 'itemProps', 'headerProps', 'triggerProps', 'contentProps']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

defineOptions({
  name: 'SAccordion'
});
</script>

<template>
  <AccordionRoot v-bind="forwarded">
    <SAccordionItem
      v-for="item in items"
      :key="item.value"
      :disabled="item.disabled"
      :value="item.value"
      v-bind="itemProps"
    >
      <SAccordionHeader v-bind="headerProps">
        <SAccordionTrigger v-bind="triggerProps">
          <slot name="trigger" :item="item">{{ item.title }}</slot>
          <template #icon>
            <slot name="icon" />
          </template>
        </SAccordionTrigger>
      </SAccordionHeader>
      <SAccordionContent v-bind="contentProps">
        <slot name="content" :item="item">{{ item.content }}</slot>
      </SAccordionContent>
    </SAccordionItem>
  </AccordionRoot>
</template>

<style scoped></style>
