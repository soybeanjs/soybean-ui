<script
  setup
  lang="ts"
  generic="T extends AccordionItemData = AccordionItemData, V extends string | string[] = string | string[]"
>
import { AccordionRoot, useCombinedPropsEmits, useOmitForwardProps } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import SAccordionItem from './accordion-item.vue';
import SAccordionHeader from './accordion-header.vue';
import SAccordionContent from './accordion-content.vue';
import SAccordionContentBody from './accordion-content-body.vue';
import SAccordionTrigger from './accordion-trigger.vue';
import type { AccordionEmits, AccordionItemData, AccordionProps } from './types';

defineOptions({
  name: 'SAccordion'
});

const props = defineProps<AccordionProps<T, V>>();

const emit = defineEmits<AccordionEmits>();

const forwardedRootProps = useOmitForwardProps(props, ['items', 'ui']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, emit);

function getOpenState(isSingle: boolean, modelValue?: AcceptableValue | AcceptableValue[], value?: string) {
  return isSingle ? value === modelValue : Array.isArray(modelValue) && modelValue.includes(value as AcceptableValue);
}
</script>

<template>
  <AccordionRoot v-slot="{ modelValue, isSingle }" v-bind="forwardedRoot">
    <template v-for="item in items" :key="item.value">
      <slot name="item" v-bind="{ modelValue, item, open: getOpenState(isSingle, modelValue, item.value) }">
        <SAccordionItem v-slot="{ open }" :value="item.value" :disabled="item.disabled" :class="ui?.item">
          <SAccordionHeader :class="ui?.header">
            <slot name="trigger" v-bind="{ modelValue, open, item }">
              <SAccordionTrigger :class="ui?.trigger" :trigger-icon-class="ui?.triggerIcon">
                <slot name="triggerContent" v-bind="{ modelValue, open, item }">{{ item.title }}</slot>
                <template #icon>
                  <slot name="triggerIcon" v-bind="{ modelValue, open, item }" />
                </template>
              </SAccordionTrigger>
            </slot>
          </SAccordionHeader>
          <SAccordionContent :class="ui?.content">
            <SAccordionContentBody :class="ui?.contentBody">
              <slot name="content" v-bind="{ modelValue, open, item }">{{ item.content }}</slot>
            </SAccordionContentBody>
          </SAccordionContent>
        </SAccordionItem>
      </slot>
    </template>
  </AccordionRoot>
</template>
