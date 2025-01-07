<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDateField } from '../../composables';
import { Primitive } from '../primitive';
import { injectTimeFieldRootContext } from './context';
import type { TimeFieldInputPropsWithPrimitive } from './types';

defineOptions({
  name: 'TimeFieldInput'
});

const props = defineProps<TimeFieldInputPropsWithPrimitive>();

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

const onEvents = computed(() => {
  if (props.part !== 'literal') {
    return {
      mousedown: handleSegmentClick,
      keydown: handleSegmentKeydown,
      focusout: () => {
        hasLeftFocus.value = true;
      },
      focusin: (e: FocusEvent) => {
        rootContext.setFocusedElement(e.target as HTMLElement);
      }
    };
  }
  return {};
});
</script>

<template>
  <Primitive
    v-bind="attributes"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :aria-disabled="disabled ? true : undefined"
    :aria-invalid="isInvalid ? true : undefined"
    :aria-readonly="readonly ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :contenteditable="disabled || readonly ? false : part !== 'literal'"
    :data-soybean-time-field-segment="part"
    v-on="onEvents"
  >
    <slot />
  </Primitive>
</template>
