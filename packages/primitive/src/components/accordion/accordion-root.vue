<script setup lang="ts" generic="T extends AcceptableValue | AcceptableValue[], S extends SingleOrMultipleType">
import { toRef, toRefs } from 'vue';
import Primitive from '../primitive/primitive';
import { useDirection, useForwardExpose, useSingleOrMultipleValue } from '../../composables';
import type { AcceptableValue, SingleOrMultipleType } from '../../types';
import { provideAccordionRootContext } from './context';
import type { AccordionRootEmits, AccordionRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'AccordionRoot'
});

const props = withDefaults(defineProps<AccordionRootPropsWithPrimitive<T, S>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
  unmountOnHide: true
});

const emit = defineEmits<AccordionRootEmits<S>>();

const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emit);

const { forwardRef, currentElement: parentElement } = useForwardExpose();

const { dir, disabled, unmountOnHide } = toRefs(props);

const direction = useDirection(dir);

provideAccordionRootContext({
  disabled,
  direction,
  orientation: toRef(() => props.orientation),
  parentElement,
  isSingle,
  collapsible: toRef(() => props.collapsible),
  modelValue,
  changeModelValue,
  unmountOnHide
});
</script>

<template>
  <Primitive :ref="forwardRef" :class="props.class" :as :as-child>
    <slot :model-value="modelValue" />
  </Primitive>
</template>
