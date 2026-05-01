<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDateField } from '../../date';
import type { TimeValue } from '../../date';
import { Primitive } from '../primitive';
import { useTimeRangeFieldRootContext, useTimeRangeFieldUi } from './context';
import type { TimeRangeFieldInputProps } from './types';

defineOptions({
  name: 'TimeRangeFieldInput'
});

const props = withDefaults(defineProps<TimeRangeFieldInputProps>(), {
  as: 'span',
  type: 'start'
});

const cls = useTimeRangeFieldUi('input');
const {
  disabled: rootDisabled,
  readonly: rootReadonly,
  placeholder,
  hourCycle,
  step,
  startSegmentValues,
  endSegmentValues,
  formatter,
  focusNext,
  modelValue,
  isInvalid,
  setFocusedElement
} = useTimeRangeFieldRootContext('TimeRangeFieldInput');

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);
const disabled = computed(() => Boolean(rootDisabled.value));
const readonly = computed(() => Boolean(rootReadonly.value));

const segmentValues = computed(() => {
  return props.type === 'start' ? startSegmentValues.value : endSegmentValues.value;
});

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
  focusNext: () => focusNext(props.type),
  modelValue: computed({
    get: () => (props.type === 'start' ? modelValue.value.start : modelValue.value.end),
    set: (value: TimeValue | undefined) => {
      if (props.type === 'start') {
        modelValue.value = { ...modelValue.value, start: value };
      } else {
        modelValue.value = { ...modelValue.value, end: value };
      }
    }
  })
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
      setFocusedElement(event.target as HTMLElement, props.type);
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
