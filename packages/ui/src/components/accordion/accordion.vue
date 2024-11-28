<script
  setup
  lang="ts"
  generic="
    T extends AccordionItemData = AccordionItemData,
    V extends AcceptableValue | AcceptableValue[] = AcceptableValue | AcceptableValue[],
    E extends SingleOrMultipleType = SingleOrMultipleType
  "
>
import { AccordionRoot, useCombinedPropsEmits, useOmitForwardProps } from '@soybean-ui/primitive';
import type { AcceptableValue, SingleOrMultipleType } from '@soybean-ui/primitive';
import SAccordionItem from './accordion-item.vue';
import SAccordionHeader from './accordion-header.vue';
import SAccordionContent from './accordion-content.vue';
import SAccordionContentBody from './accordion-content-body.vue';
import SAccordionTrigger from './accordion-trigger.vue';
import type { AccordionEmits, AccordionItemData, AccordionProps } from './types';

defineOptions({
  name: 'SAccordion'
});

const props = defineProps<AccordionProps<T, V, E>>();

const emit = defineEmits<AccordionEmits>();

const forwardedRootProps = useOmitForwardProps(props, [
  'items',
  'itemClass',
  'headerClass',
  'triggerClass',
  'triggerIconClass',
  'contentClass',
  'contentBodyClass'
]);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, emit);
</script>

<template>
  <AccordionRoot v-slot="{ modelValue }" v-bind="forwardedRoot">
    <template v-for="item in items" :key="item.value">
      <slot name="item" v-bind="{ modelValue, item }">
        <SAccordionItem v-slot="{ open }" :value="item.value" :disabled="item.disabled" :class="itemClass">
          <SAccordionHeader :class="headerClass">
            <slot name="trigger" v-bind="{ modelValue, open, item }">
              <SAccordionTrigger :class="triggerClass" :trigger-icon-class="triggerIconClass">
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
      </slot>
    </template>
  </AccordionRoot>
</template>
