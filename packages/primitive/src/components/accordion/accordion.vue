<script
  setup
  lang="ts"
  generic="
    T extends AccordionItemData = AccordionItemData,
    V extends AcceptableValue | AcceptableValue[] = AcceptableValue | AcceptableValue[],
    E extends SingleOrMultipleType = SingleOrMultipleType
  "
>
import { useCombinedPropsEmits, useOmitForwardProps } from '../../composables';
import type { AcceptableValue, SingleOrMultipleType } from '../../types';
import { Slot } from '../primitive';
import AccordionRoot from './accordion-root.vue';
import AccordionItem from './accordion-item.vue';
import AccordionHeader from './accordion-header.vue';
import AccordionTrigger from './accordion-trigger.vue';
import AccordionContent from './accordion-content.vue';
import type { AccordionEmits, AccordionItemData, AccordionProps } from './types';

defineOptions({
  name: 'Accordion'
});

const props = defineProps<AccordionProps<T, V, E>>();

const emit = defineEmits<AccordionEmits>();

const forwardedRootProps = useOmitForwardProps(props, [
  'items',
  'itemClass',
  'headerClass',
  'triggerClass',
  'triggerIconClass',
  'contentClass'
]);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, emit);
</script>

<template>
  <AccordionRoot v-slot="{ modelValue }" v-bind="forwardedRoot">
    <template v-for="item in items" :key="item.value">
      <slot name="item" v-bind="{ modelValue, item }">
        <AccordionItem v-slot="{ open }" :value="item.value" :disabled="item.disabled" :class="itemClass">
          <AccordionHeader :class="headerClass">
            <slot name="trigger" v-bind="{ modelValue, open, item }">
              <AccordionTrigger :class="triggerClass">
                <slot name="triggerContent" v-bind="{ modelValue, open, item }">{{ item.title }}</slot>
                <template #icon>
                  <Slot :class="triggerIconClass">
                    <slot name="triggerIcon" v-bind="{ modelValue, open, item }" />
                  </Slot>
                </template>
              </AccordionTrigger>
            </slot>
          </AccordionHeader>
          <AccordionContent :class="contentClass">
            <slot name="content" v-bind="{ modelValue, open, item }">{{ item.content }}</slot>
          </AccordionContent>
        </AccordionItem>
      </slot>
    </template>
  </AccordionRoot>
</template>
