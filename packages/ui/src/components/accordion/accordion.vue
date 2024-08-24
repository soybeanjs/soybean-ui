<script
  setup
  lang="ts"
  generic="
    T extends AccordionItemData = AccordionItemData,
    V extends string | string[] = string | string[],
    E extends SingleOrMultipleType = SingleOrMultipleType
  "
>
import { AccordionRoot, useForwardPropsEmits } from 'radix-vue';
import type { AccordionRootEmits } from 'radix-vue';
import { computedOmit } from '../../shared';
import SAccordionItem from './accordion-item.vue';
import SAccordionHeader from './accordion-header.vue';
import SAccordionTrigger from './accordion-trigger.vue';
import SAccordionContent from './accordion-content.vue';
import type { AccordionItemData, AccordionProps, SingleOrMultipleType } from './types';

const props = defineProps<AccordionProps<T, V, E>>();
const emit = defineEmits<AccordionRootEmits>();

const delegatedProps = computedOmit(props, [
  'items',
  'itemProps',
  'headerClass',
  'triggerClass',
  'contentClass',
  'contentBodyClass'
]);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

defineOptions({
  name: 'SAccordion'
});
</script>

<template>
  <AccordionRoot v-slot="rootSlotProps" v-bind="forwarded">
    <template v-for="item in items" :key="item.value">
      <SAccordionItem v-slot="itemSlotProps" :disabled="item.disabled" :value="item.value" v-bind="itemProps">
        <SAccordionHeader :class="headerClass">
          <SAccordionTrigger :class="triggerClass">
            <slot name="trigger" v-bind="{ ...rootSlotProps, ...itemSlotProps, items, item }">{{ item.title }}</slot>
            <template #icon>
              <slot name="icon" v-bind="{ ...rootSlotProps, ...itemSlotProps, items, item }" />
            </template>
          </SAccordionTrigger>
        </SAccordionHeader>
        <SAccordionContent :class="contentClass" :body-class="contentBodyClass">
          <slot name="content" v-bind="{ ...rootSlotProps, ...itemSlotProps, items, item }">{{ item.content }}</slot>
        </SAccordionContent>
      </SAccordionItem>
    </template>
  </AccordionRoot>
</template>

<style scoped></style>
