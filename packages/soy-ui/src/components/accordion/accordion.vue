<script
  setup
  lang="ts"
  generic="
    T extends AccordionItemData = AccordionItemData,
    V extends string | string[] = string | string[],
    E extends SingleOrMultipleType = SingleOrMultipleType
  "
>
import { AccordionRoot, useCombinedPropsEmits, useOmitForwardProps } from '@soybean-ui/primitives';
import type { SingleOrMultipleType } from '@soybean-ui/primitives';
import SAccordionItem from './accordion-item.vue';
import SAccordionHeader from './accordion-header.vue';
import SAccordionContent from './accordion-content.vue';
import SAccordionTrigger from './accordion-trigger.vue';
import type { AccordionEmits, AccordionItemData, AccordionProps } from './types';

defineOptions({
  name: 'SAccordion'
});

const props = defineProps<AccordionProps<T, V>>();

const emit = defineEmits<AccordionEmits<E>>();

const forwardedRootProps = useOmitForwardProps(props, ['class', 'size', 'ui', 'items']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, emit);
</script>

<template>
  <AccordionRoot v-slot="{ modelValue }" v-bind="forwardedRoot" :class="props.class || ui?.root">
    <template v-for="item in items" :key="item.value">
      <slot name="item" v-bind="{ modelValue, item }">
        <SAccordionItem v-slot="{ open }" :value="item.value" :disabled="item.disabled" :class="ui?.item">
          <SAccordionHeader :class="ui?.header">
            <slot name="trigger" v-bind="{ modelValue, open, item }">
              <SAccordionTrigger :class="ui?.trigger" :size="size" :trigger-icon-class="ui?.triggerIcon">
                <slot name="triggerContent" v-bind="{ modelValue, open, item }">{{ item.title }}</slot>
                <template #icon>
                  <slot name="triggerIcon" v-bind="{ modelValue, open, item }" />
                </template>
              </SAccordionTrigger>
            </slot>
          </SAccordionHeader>
          <SAccordionContent :class="ui?.content" :size="size">
            <slot name="content" v-bind="{ modelValue, open, item }">{{ item.content }}</slot>
          </SAccordionContent>
        </SAccordionItem>
      </slot>
    </template>
  </AccordionRoot>
</template>
