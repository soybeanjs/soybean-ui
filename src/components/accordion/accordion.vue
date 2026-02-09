<script setup lang="ts" generic="T extends AccordionOptionData = AccordionOptionData, M extends boolean = false">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  provideAccordionUi
} from '@soybeanjs/headless';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { accordionVariants } from './variants';
import type { AccordionEmits, AccordionOptionData, AccordionProps } from './types';

defineOptions({
  name: 'SAccordion'
});

const props = defineProps<AccordionProps<T, M>>();

const emit = defineEmits<AccordionEmits<M>>();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'items',
  'itemProps',
  'headerProps',
  'triggerProps',
  'contentProps'
]);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = accordionVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideAccordionUi(ui);
</script>

<template>
  <AccordionRoot v-bind="forwardedProps" v-on="listeners">
    <template v-for="item in props.items" :key="item.value">
      <slot name="item" :item="item" :model-value="modelValue">
        <AccordionItem v-slot="{ open }" v-bind="props.itemProps" :value="item.value" :disabled="item.disabled">
          <AccordionHeader v-bind="props.headerProps">
            <AccordionTrigger v-bind="props.triggerProps">
              <slot name="leading" :item="item" :model-value="modelValue" :open="open">
                <Icon :icon="item.icon" :class="ui.triggerLeadingIcon" />
              </slot>
              <slot name="title" :item="item" :model-value="modelValue" :open="open">{{ item.title }}</slot>
              <slot name="trigger-icon" :item="item" :model-value="modelValue" :open="open">
                <Icon icon="lucide:chevron-down" :class="ui.triggerIcon" />
              </slot>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent v-bind="props.contentProps">
            <slot name="content" :item="item" :model-value="modelValue" :open="open">
              <p :class="ui.description">{{ item.description }}</p>
            </slot>
          </AccordionContent>
        </AccordionItem>
      </slot>
    </template>
  </AccordionRoot>
</template>
