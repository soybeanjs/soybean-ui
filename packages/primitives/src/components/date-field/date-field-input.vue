<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDateField } from '../../composables';
import { Primitive } from '../primitive';
import { injectDateFieldRootContext } from './context';
import type { DateFieldInputPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateFieldInput'
});

const props = defineProps<DateFieldInputPropsWithPrimitive>();

const rootContext = injectDateFieldRootContext();

const hasLeftFocus = ref(true);
const lastKeyZero = ref(false);

const { handleSegmentClick, handleSegmentKeydown, attributes } = useDateField({
  hasLeftFocus,
  lastKeyZero,
  placeholder: rootContext.placeholder,
  hourCycle: rootContext.hourCycle,
  step: rootContext.step,
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
    v-bind="attributes"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :contenteditable="disabled || readonly ? false : part !== 'literal'"
    :data-soybean-date-field-segment="part"
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
