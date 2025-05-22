<script setup lang="ts" generic="T extends AcceptableValue | AcceptableValue[], S extends SingleOrMultipleType">
import { useTemplateRef } from 'vue';
import { useDirection, useSingleOrMultipleValue } from '../../composables';
import { transformPropsToContext } from '../../shared';
import type { AcceptableValue, SingleOrMultipleType } from '../../types';
import { provideAccordionRootContext } from './context';
import type { AccordionRootEmits, AccordionRootProps } from './types';

const props = defineProps<AccordionRootProps<T, S>>();

const emit = defineEmits<AccordionRootEmits>();

const rootElement = useTemplateRef('root');

const { modelValue, isSingle, toggleModelValue } = useSingleOrMultipleValue(props, emit);

const direction = useDirection(() => props.dir);

provideAccordionRootContext({
  rootElement,
  modelValue,
  isSingle,
  toggleModelValue,
  direction,
  ...transformPropsToContext(props, ['collapsible', 'disabled', 'orientation', 'unmountOnHide'])
});
</script>

<template>
  <div ref="root" :class="props.class">
    <slot :model-value="modelValue as T" />
  </div>
</template>
