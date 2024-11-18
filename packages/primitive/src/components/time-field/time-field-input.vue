<script setup lang="ts">
import { computed, ref } from 'vue';
import { Primitive, type PrimitiveProps } from '../primitive';
import type { SegmentPart } from '../../composables/date';
import { useDateField } from '../../composables/date/use-date-field';
import { injectTimeFieldRootContext } from './time-field-root.vue';

export interface TimeFieldInputProps extends PrimitiveProps {
  /** The part of the date to render */
  part: SegmentPart;
}

const props = defineProps<TimeFieldInputProps>();

const rootContext = injectTimeFieldRootContext();

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);

const { handleSegmentClick, handleSegmentKeydown, attributes } = useDateField({
  hasLeftFocus,
  lastKeyZero,
  placeholder: rootContext.placeholder,
  hourCycle: rootContext.hourCycle,
  segmentValues: rootContext.segmentValues,
  formatter: rootContext.formatter,
  part: props.part,
  disabled: rootContext.disabled,
  readonly: rootContext.readonly,
  focusNext: rootContext.focusNext,
  modelValue: rootContext.modelValue
});

const disabled = computed(() => rootContext.disabled.value);
const readonly = computed(() => rootContext.readonly.value);
const isInvalid = computed(() => rootContext.isInvalid.value);
</script>

<template>
  <Primitive
    :as
    :as-child
    v-bind="attributes"
    :contenteditable="disabled || readonly ? false : part !== 'literal'"
    :data-soybean-time-field-segment="part"
    :aria-disabled="disabled ? true : undefined"
    :aria-readonly="readonly ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
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
