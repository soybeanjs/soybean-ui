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
  disabled: rootDisabled,
  readonly: rootReadonly,
  placeholder,
  hourCycle,
  step,
  segmentValues,
  formatter,
  focusNext,
  modelValue,
  isInvalid,
  setFocusedElement
} = useDateFieldRootContext('DateFieldInput');

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);
const disabled = computed(() => Boolean(rootDisabled.value));
const readonly = computed(() => Boolean(rootReadonly.value));

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
    :aria-disabled="disabled ? true : undefined"
    :aria-invalid="isInvalid ? true : undefined"
    :aria-readonly="readonly || part === 'timeZoneName' ? true : undefined"
    :class="cls"
    :contenteditable="contentEditable"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :data-readonly="readonly || part === 'timeZoneName' ? '' : undefined"
    :data-segment="part"
    :data-soybean-date-field-segment="part"
    data-slot="input"
    v-on="listeners"
  >
    <slot />
  </Primitive>
</template>
