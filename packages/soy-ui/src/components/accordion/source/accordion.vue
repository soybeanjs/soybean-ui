<script
  setup
  lang="ts"
  generic="
    T extends AccordionItemData = AccordionItemData,
    V extends string | string[] = string | string[],
    E extends SingleOrMultipleType = SingleOrMultipleType
  "
>
import { useCombinedPropsEmits, useOmitForwardProps } from '@soybean-ui/primitives';
import type { SingleOrMultipleType } from '@soybean-ui/primitives';
import type { AccordionEmits, AccordionItemData, AccordionProps } from '../types';
import SAccordionItem from './accordion-item.vue';
import SAccordionHeader from './accordion-header.vue';
import SAccordionContent from './accordion-content.vue';
import SAccordionRoot from './accordion-root.vue';
import SAccordionTrigger from './accordion-trigger.vue';

defineOptions({
  name: 'SAccordion'
});

const props = defineProps<AccordionProps<T, V>>();

const emit = defineEmits<AccordionEmits<E>>();

const forwardedRootProps = useOmitForwardProps(props, ['class', 'size', 'ui', 'items']);

const forwardedRoot = useCombinedPropsEmits(forwardedRootProps, emit);
</script>

<template>
  <SAccordionRoot v-slot="{ modelValue }" v-bind="forwardedRoot" :class="props.class || ui?.root" :size="size">
    <template v-for="item in items" :key="item.value">
      <slot name="item" v-bind="{ modelValue, item }">
        <SAccordionItem v-slot="{ open }" :value="item.value" :disabled="item.disabled" :class="ui?.item">
          <SAccordionHeader :class="ui?.header">
            <SAccordionTrigger :class="ui?.trigger" :size="size" :ui="ui" :title="item.title" :icon="item.icon">
              <template #leading>
                <slot name="trigger-leading" v-bind="{ modelValue, open, item }" />
              </template>
              <slot name="title" v-bind="{ modelValue, open, item }" />
              <template #trailing>
                <slot name="trigger-trailing" v-bind="{ modelValue, open, item }" />
              </template>
              <template #icon>
                <slot name="trigger-icon" v-bind="{ modelValue, open, item }" />
              </template>
            </SAccordionTrigger>
          </SAccordionHeader>
          <SAccordionContent :class="ui?.content" :size="size" :content="item.content">
            <slot name="content" v-bind="{ modelValue, open, item }" />
          </SAccordionContent>
        </SAccordionItem>
      </slot>
    </template>
  </SAccordionRoot>
</template>
