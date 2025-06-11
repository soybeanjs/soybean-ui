<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import { useFormControl, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { VisuallyHiddenInput } from '../visually-hidden';
import { handleSelect } from './shared';
import type { RadioEmits, RadioPropsWithPrimitive } from './types';

defineOptions({
  name: 'Radio',
  inheritAttrs: false
});

const props = withDefaults(defineProps<RadioPropsWithPrimitive>(), {
  disabled: false,
  checked: undefined,
  as: 'button'
});

const emit = defineEmits<RadioEmits>();

const checked = useVModel(props, 'checked', emit, {
  passive: (props.checked === undefined) as false
});

const { value } = toRefs(props);
const { forwardRef, currentElement: triggerElement } = useForwardExpose();
const isFormControl = useFormControl(triggerElement);

const ariaLabel = computed(() =>
  props.id && triggerElement.value
    ? ((document.querySelector(`[for="${props.id}"]`) as HTMLLabelElement)?.textContent ?? props.value)
    : undefined
);

function handleClick(event: MouseEvent) {
  if (props.disabled) return;

  handleSelect(event, props.value, ev => {
    emit('select', ev);
    if (ev?.defaultPrevented) return;

    checked.value = true;
    if (isFormControl.value) {
      // if radio is in a form, stop propagation from the button so that we only propagate
      // one click event (from the input). We propagate changes from an input so that native
      // form validation works and form events reflect radio updates.
      ev.stopPropagation();
    }
  });
}
</script>

<template>
  <Primitive
    v-bind="$attrs"
    :id="id"
    :ref="forwardRef"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    role="radio"
    :type="as === 'button' ? 'button' : undefined"
    :aria-checked="checked"
    :aria-label="ariaLabel"
    :disabled="disabled ? '' : undefined"
    :data-state="checked ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :value="value"
    :required="required"
    :name="name"
    @click.stop="handleClick"
  >
    <slot :checked="checked" />

    <VisuallyHiddenInput
      v-if="isFormControl && name"
      type="radio"
      tabindex="-1"
      :value="value"
      :checked="!!checked"
      :name="name"
      :disabled="disabled"
      :required="required"
    />
  </Primitive>
</template>
