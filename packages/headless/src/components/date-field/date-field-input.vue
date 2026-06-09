<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDateField } from '../../date';
import { Primitive } from '../primitive';
import { useDateFieldRootContext, useDateFieldUi } from './context';
import type { DateFieldInputProps } from './types';

defineOptions({
  name: 'DateFieldInput'
});

const props = withDefaults(defineProps<DateFieldInputProps>(), {
  as: 'span'
});

const cls = useDateFieldUi('input');
const {
  modelValue,
  disabled,
  readonly,
  placeholder,
  hourCycle,
  step,
  segmentValues,
  formatter,
  isInvalid,
  focusNext,
  setFocusedElement
} = useDateFieldRootContext('DateFieldInput');

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);

const { attributes, handleSegmentClick, handleSegmentFocusOut, handleSegmentKeydown } = useDateField({
  hasLeftFocus,
  lastKeyZero,
  placeholder,
  hourCycle,
  step,
  segmentValues,
  formatter,
  part: props.part,
  disabled,
  readonly,
  focusNext,
  modelValue
});

const contentEditable = computed(() => {
  if (disabled.value || readonly.value) {
    return false;
  }

  return props.part !== 'literal' && props.part !== 'timeZoneName';
});

const listeners = computed(() => {
  if (props.part === 'literal') {
    return {};
  }

  return {
    mousedown: handleSegmentClick,
    keydown: handleSegmentKeydown,
    focusout: () => {
      hasLeftFocus.value = true;
      handleSegmentFocusOut();
    },
    focusin: (event: FocusEvent) => {
      setFocusedElement(event.target as HTMLElement);
    }
  };
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="attributes"
    data-soybean-date-field-input
    :data-soybean-date-field-segment="part"
    :class="cls"
    :aria-disabled="disabled ? true : undefined"
    :aria-invalid="isInvalid ? true : undefined"
    :aria-readonly="readonly || part === 'timeZoneName' ? true : undefined"
    :contenteditable="contentEditable"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :data-readonly="readonly || part === 'timeZoneName' ? '' : undefined"
    :data-segment="part"
    v-on="listeners"
  >
    <slot />
  </Primitive>
</template>
