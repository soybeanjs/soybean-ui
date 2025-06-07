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
import { useForwardListeners, useOmitProps } from '@/composables';
import type { AcceptableValue, SingleOrMultipleType } from '@/types';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  provideAccordionThemeContext
} from '@/components/accordion';
import { Slot } from '@/components/slot';
import { cn } from '../../theme/merge';
import { accordionVariants } from '../../variants/accordion';
import type { AccordionEmits, AccordionItemData, AccordionProps } from './types';

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
  const { root, item, header, trigger, content, triggerLeadingIcon, triggerIcon } = accordionVariants({
    size: props.size
  });

  return {
    root: cn(root(), props.ui?.root),
    item: cn(item(), props.ui?.item),
    header: cn(header(), props.ui?.header),
    trigger: cn(trigger(), props.ui?.trigger),
    content: cn(content(), props.ui?.content),
    triggerLeadingIcon: cn(triggerLeadingIcon(), props.ui?.triggerLeadingIcon),
    triggerIcon: cn(triggerIcon(), props.ui?.triggerIcon)
  };
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
                  <slot name="leading-icon" :item="item" :model-value="modelValue" :open="open" />
                </Slot>
              </slot>
              <slot name="title" :item="item" :model-value="modelValue" :open="open">{{ item.title }}</slot>
              <Slot :class="ui.triggerIcon">
                <slot name="trigger-icon" :item="item" :model-value="modelValue" :open="open" />
              </Slot>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent v-bind="props.contentProps">
            <slot name="content" :item="item" :model-value="modelValue" :open="open">{{ item.description }}</slot>
          </AccordionContent>
        </AccordionItem>
      </slot>
    </template>
  </AccordionRoot>
</template>
