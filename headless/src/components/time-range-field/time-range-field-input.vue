<script setup lang="ts">
import type { TimeValue } from '../../date';

import { computed, ref } from 'vue';

import { useDateField } from '../../date';
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
const rootContext = useTimeRangeFieldRootContext('TimeRangeFieldInput');

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);
const disabled = computed(() => Boolean(rootContext.disabled.value));
const readonly = computed(() => Boolean(rootContext.readonly.value));

const segmentValues = computed(() => {
  return props.type === 'start' ? rootContext.startSegmentValues.value : rootContext.endSegmentValues.value;
});

const { attributes, handleSegmentClick, handleSegmentFocusOut, handleSegmentKeydown } = useDateField({
  hasLeftFocus,
  lastKeyZero,
  placeholder: rootContext.placeholder,
  hourCycle: rootContext.hourCycle,
  step: rootContext.step,
  segmentValues,
  formatter: rootContext.formatter,
  part: props.part,
  disabled,
  readonly,
  focusNext: () => rootContext.focusNext(props.type),
  modelValue: computed({
    get: () => props.type === 'start' ? rootContext.modelValue.value.start : rootContext.modelValue.value.end,
    set: (value: TimeValue | undefined) => {
      if (props.type === 'start') {
        rootContext.modelValue.value = { ...rootContext.modelValue.value, start: value };
      } else {
        rootContext.modelValue.value = { ...rootContext.modelValue.value, end: value };
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
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="attributes"
    :aria-disabled="disabled ? true : undefined"
    :aria-invalid="rootContext.isInvalid ? true : undefined"
    :aria-readonly="readonly || part === 'timeZoneName' ? true : undefined"
    :class="cls"
    :contenteditable="contentEditable"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="rootContext.isInvalid ? '' : undefined"
    :data-readonly="readonly || part === 'timeZoneName' ? '' : undefined"
    :data-segment="part"
    :data-soybean-date-field-segment="part"
    data-slot="input"
    v-on="part !== 'literal'
      ? {
        mousedown: handleSegmentClick,
        keydown: handleSegmentKeydown,
        focusout: () => {
          hasLeftFocus = true;
          handleSegmentFocusOut();
        },
        focusin: (event: FocusEvent) => {
          rootContext.setFocusedElement(event.target as HTMLElement, type);
        }
      }
      : {}"
  >
    <slot />
  </Primitive>
</template>
