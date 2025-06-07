<script setup lang="ts" generic="T extends AcceptableValue | AcceptableValue[], S extends SingleOrMultipleType">
import { useTemplateRef } from 'vue';
import { useDirection, useOmitProps, useSingleOrMultipleValue } from '../../composables';
import { transformPropsToContext } from '../../shared';
import type { AcceptableValue, SingleOrMultipleType } from '../../types';
import { provideAccordionRootContext } from './context';
import type { AccordionRootEmits, AccordionRootProps } from './types';

defineOptions({
  name: 'AccordionRoot'
});

const props = withDefaults(defineProps<AccordionRootProps<T, S>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
  unmountOnHide: true
});

const emit = defineEmits<AccordionRootEmits>();

const forwardedProps = useOmitProps(props, ['collapsible', 'disabled', 'orientation', 'unmountOnHide']);

const rootElement = useTemplateRef('rootRef');

const { modelValue, isSingle, toggleModelValue } = useSingleOrMultipleValue(props, value => {
  emit('update:modelValue', value);
});

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
  <div v-bind="forwardedProps" ref="rootRef">
    <slot :model-value="modelValue as T" />
  </div>
</template>
