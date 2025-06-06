<script setup lang="ts">
import { toRefs } from 'vue';
import { useDirection, useFormControl, useForwardExpose, useSingleOrMultipleValue } from '../../composables';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { VisuallyHiddenInput } from '../visually-hidden';
import { provideToggleGroupRootContext } from './context';
import type { ToggleGroupRootEmits, ToggleGroupRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToggleGroupRoot'
});

const props = withDefaults(defineProps<ToggleGroupRootPropsWithPrimitive>(), {
  loop: true,
  rovingFocus: true,
  disabled: false
});
const emit = defineEmits<ToggleGroupRootEmits>();

const { loop, rovingFocus, disabled, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const { forwardRef, currentElement } = useForwardExpose();

const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emit);
const isFormControl = useFormControl(currentElement);

provideToggleGroupRootContext({
  isSingle,
  modelValue,
  changeModelValue,
  dir,
  orientation: props.orientation,
  loop,
  rovingFocus,
  disabled
});
</script>

<template>
  <component
    :is="rovingFocus ? RovingFocusGroup : Primitive"
    as-child
    :dir="dir"
    :loop="rovingFocus ? loop : undefined"
    :orientation="rovingFocus ? orientation : undefined"
  >
    <Primitive :ref="forwardRef" :class="props.class" :as="as" :as-child="asChild" role="group">
      <slot :model-value="modelValue" />
      <VisuallyHiddenInput v-if="isFormControl && name" :name="name" :required="required" :value="modelValue" />
    </Primitive>
  </component>
</template>
