<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDateField } from '../../composables';
import { Primitive } from '../primitive';
import { injectDateRangeFieldRootContext } from './context';
import type { DateRangeFieldInputPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangeFieldInput'
});

const props = defineProps<DateRangeFieldInputPropsWithPrimitive>();

const rootContext = injectDateRangeFieldRootContext();

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);

const { handleSegmentClick, handleSegmentKeydown, attributes } = useDateField({
  hasLeftFocus,
  lastKeyZero,
  placeholder: rootContext.placeholder,
  hourCycle: rootContext.hourCycle,
  segmentValues: rootContext.segmentValues[props.type],
  formatter: rootContext.formatter,
  part: props.part,
  disabled: rootContext.disabled,
  readonly: rootContext.readonly,
  focusNext: rootContext.focusNext,
  modelValue: props.type === 'start' ? rootContext.startValue : rootContext.endValue
});

const disabled = computed(() => rootContext.disabled.value);
const readonly = computed(() => rootContext.readonly.value);
const isInvalid = computed(() => rootContext.isInvalid.value);
</script>

<template>
  <Primitive
    v-bind="attributes"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :contenteditable="disabled || readonly ? false : part !== 'literal'"
    :data-soybean-date-field-segment="part"
    :aria-disabled="disabled ? true : undefined"
    :aria-readonly="readonly ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-soybean-date-range-field-segment-type="type"
    :data-invalid="isInvalid ? '' : undefined"
    :aria-invalid="isInvalid ? true : undefined"
    v-on="
      part !== 'literal'
        ? {
            mousedown: handleSegmentClick,
            keydown: handleSegmentKeydown,
            focusout: () => {
              hasLeftFocus = true;
            },
            focusin: (e: FocusEvent) => {
              rootContext.setFocusedElement(e.target as HTMLElement);
            }
          }
        : {}
    "
  >
    <slot />
  </Primitive>
</template>
