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
const rootContext = useDateFieldRootContext('DateFieldInput');

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);
const disabled = computed(() => Boolean(rootContext.disabled.value));
const readonly = computed(() => Boolean(rootContext.readonly.value));

const { attributes, handleSegmentClick, handleSegmentFocusOut, handleSegmentKeydown } = useDateField({
  hasLeftFocus,
  lastKeyZero,
  placeholder: rootContext.placeholder,
  hourCycle: rootContext.hourCycle,
  step: rootContext.step,
  segmentValues: rootContext.segmentValues,
  formatter: rootContext.formatter,
  part: props.part,
  disabled,
  readonly,
  focusNext: rootContext.focusNext,
  modelValue: rootContext.modelValue
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
          rootContext.setFocusedElement(event.target as HTMLElement);
        }
      }
      : {}"
  >
    <slot />
  </Primitive>
</template>
