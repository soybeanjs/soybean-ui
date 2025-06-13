<script
  setup
  lang="ts"
  generic="
    T extends AccordionItemData = AccordionItemData,
    V extends AcceptableValue | AcceptableValue[] = AcceptableValue | AcceptableValue[],
    S extends SingleOrMultipleType = SingleOrMultipleType
  "
>
import { computed } from 'vue';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Slot,
  provideAccordionThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import type { AcceptableValue, SingleOrMultipleType } from '@headless';
import { mergeSlotVariants } from '@theme';
import { accordionVariants } from '@variants/accordion';
import Icon from '../icon/icon.vue';
import type { AccordionEmits, AccordionItemData, AccordionProps } from './types';

defineOptions({
  name: 'SAccordion'
});

const props = defineProps<AccordionProps<T, V, S>>();

const emit = defineEmits<AccordionEmits<V>>();

const forwardedProps = useOmitProps(props, [
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

  return mergeSlotVariants(variants, props.ui);
});

provideAccordionThemeContext({
  ui
});
</script>

<template>
  <AccordionRoot v-bind="forwardedProps" v-on="listeners">
    <template v-for="item in props.items" :key="item.value">
      <slot name="item" :item="item" :model-value="modelValue">
        <AccordionItem v-slot="{ open }" v-bind="props.itemProps" :value="item.value" :disabled="item.disabled">
          <AccordionHeader v-bind="props.headerProps">
            <AccordionTrigger v-bind="props.triggerProps">
              <slot name="leading" :item="item" :model-value="modelValue" :open="open">
                <Slot :class="ui.triggerLeadingIcon">
                  <Icon v-if="typeof item.icon === 'string'" :icon="item.icon" />
                  <component :is="item.icon" v-else />
                </Slot>
              </slot>
              <slot name="title" :item="item" :model-value="modelValue" :open="open">{{ item.title }}</slot>
              <Slot :class="ui.triggerIcon">
                <slot name="trigger-icon" :item="item" :model-value="modelValue" :open="open">
                  <Icon icon="lucide:chevron-down" />
                </slot>
              </Slot>
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
