<script setup lang="ts" generic="T extends AccordionOptionData = AccordionOptionData, M extends boolean = false">
import { useForwardListeners, useOmitProps } from '../../composables';
import { useAccordionUi } from './context';
import AccordionContent from './accordion-content.vue';
import AccordionHeader from './accordion-header.vue';
import AccordionItem from './accordion-item.vue';
import AccordionRoot from './accordion-root.vue';
import AccordionTrigger from './accordion-trigger.vue';
import Icon from '../_icon/icon.vue';
import type { AccordionCompactProps, AccordionCompactEmits, AccordionCompactSlots, AccordionOptionData } from './types';

defineOptions({
  name: 'AccordionCompact'
});

const props = defineProps<AccordionCompactProps<T, M>>();

const emit = defineEmits<AccordionCompactEmits<M>>();

defineSlots<AccordionCompactSlots<T, M>>();

const forwardedProps = useOmitProps(props, ['items', 'itemProps', 'headerProps', 'triggerProps', 'contentProps']);

const listeners = useForwardListeners(emit);

const ui = useAccordionUi();
</script>

<template>
  <AccordionRoot v-bind="forwardedProps" v-on="listeners">
    <template v-for="(item, index) in items" :key="item.value">
      <slot name="item" :item="item" :index="index" :model-value="modelValue">
        <AccordionItem v-slot="{ open }" v-bind="itemProps" :value="item.value" :disabled="item.disabled">
          <AccordionHeader v-bind="headerProps">
            <AccordionTrigger v-bind="triggerProps">
              <slot name="leading" :item="item" :index="index" :model-value="modelValue" :open="open">
                <Icon :icon="item.icon" :class="ui.triggerLeadingIcon" />
              </slot>
              <slot name="title" :item="item" :index="index" :model-value="modelValue" :open="open">
                {{ item.title }}
              </slot>
              <slot name="trigger-icon" :item="item" :index="index" :model-value="modelValue" :open="open">
                <Icon icon="lucide:chevron-down" :class="ui.triggerIcon" />
              </slot>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent v-bind="contentProps">
            <slot name="content" :item="item" :index="index" :model-value="modelValue" :open="open">
              <p :class="ui.description">{{ item.description }}</p>
            </slot>
          </AccordionContent>
        </AccordionItem>
      </slot>
    </template>
  </AccordionRoot>
</template>
