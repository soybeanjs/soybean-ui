<script setup lang="ts" generic="T extends AcceptableValue | AcceptableValue[], S extends SingleOrMultipleType">
import { toRefs } from 'vue';
import { useDirection, useForwardExpose, useSingleOrMultipleValue } from '../../composables';
import type { AcceptableValue, SingleOrMultipleType } from '../../types';
import { Primitive } from '../primitive';
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

const emit = defineEmits<AccordionRootEmits<S>>();

const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emit);

const { forwardRef, currentElement: parentElement } = useForwardExpose();

const { dir, disabled, unmountOnHide, orientation, collapsible } = toRefs(props);

const direction = useDirection(dir);

provideAccordionRootContext({
  disabled,
  direction,
  orientation,
  parentElement,
  isSingle,
  collapsible,
  modelValue,
  changeModelValue,
  unmountOnHide
});
</script>

<template>
  <Primitive :ref="forwardRef" :class="props.class" :as="as" :as-child="asChild">
    <slot :model-value="modelValue" />
  </Primitive>
</template>
