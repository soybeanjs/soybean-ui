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
import type { SingleOrMultipleType } from '../../types';
import SAccordionItem from './accordion-item.vue';
import SAccordionHeader from './accordion-header.vue';
import SAccordionTrigger from './accordion-trigger.vue';
import SAccordionContent from './accordion-content.vue';
import SAccordionContentBody from './accordion-content-body.vue';
import type { AccordionItemData, AccordionProps } from './types';

defineOptions({
  name: 'SAccordion'
});

const props = defineProps<AccordionProps<T, V, E>>();

const emit = defineEmits<AccordionRootEmits>();

const delegatedProps = computedOmit(props, [
  'items',
  'itemClass',
  'headerClass',
  'triggerClass',
  'contentClass',
  'contentBodyClass'
]);

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <AccordionRoot v-slot="{ modelValue }" v-bind="forwarded">
    <template v-for="item in items" :key="item.value">
      <SAccordionItem v-slot="{ open }" :value="item.value" :disabled="item.disabled">
        <SAccordionHeader :class="headerClass">
          <slot name="trigger" v-bind="{ modelValue, open, item }">
            <SAccordionTrigger :class="triggerClass">
              <slot name="triggerContent" v-bind="{ modelValue, open, item }">{{ item.title }}</slot>
              <template #icon>
                <slot name="triggerIcon" v-bind="{ modelValue, open, item }" />
              </template>
            </SAccordionTrigger>
          </slot>
        </SAccordionHeader>
        <SAccordionContent :class="contentClass">
          <SAccordionContentBody :class="contentBodyClass">
            <slot name="content" v-bind="{ modelValue, open, item }">{{ item.content }}</slot>
          </SAccordionContentBody>
        </SAccordionContent>
      </SAccordionItem>
    </template>
  </AccordionRoot>
</template>

<style scoped></style>
