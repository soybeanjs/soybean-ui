<script setup lang="ts">
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import {
  createContent,
  getDefaultDate,
  getSegmentElements,
  hasTime,
  initializeSegmentValues,
  isBefore,
  isSegmentNavigationKey,
  normalizeDateStep,
  normalizeHourCycle,
  syncSegmentValues
} from '../../date';
import type { DateValue, SegmentValueObj } from '../../date';
import { isNullish } from '../../shared';
import { useDateFormatter, useDirection, useKbd, useLocale, usePrimitiveElement } from '../../composables';
import { Primitive } from '../primitive';
import { VisuallyHidden } from '../visually-hidden';
import { provideDateFieldRootContext } from './context';
import type { DateFieldRootEmits, DateFieldRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateFieldRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DateFieldRootPropsWithPrimitive>(), {
  modelValue: undefined,
  defaultValue: undefined,
  disabled: false,
  readonly: false,
  placeholder: undefined,
  isDateUnavailable: undefined
});

const emit = defineEmits<DateFieldRootEmits>();

const {
  disabled,
  readonly,
  isDateUnavailable: propsIsDateUnavailable,
  granularity,
  defaultValue,
  dir: propDir,
  locale: propLocale
} = toRefs(props);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: defaultValue.value,
  passive: (props.modelValue === undefined) as false
}) as Ref<DateValue>;

const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  granularity: granularity.value,
  defaultValue: modelValue.value,
  locale: props.locale
});

const placeholder = useVModel(props, 'placeholder', emit, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false
}) as Ref<DateValue>;

const step = computed(() => normalizeDateStep(props));

const formatter = useDateFormatter(locale.value, {
  hourCycle: normalizeHourCycle(props.hourCycle)
});
const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
const segmentElements = ref<Set<HTMLElement>>(new Set());

onMounted(() => {
  getSegmentElements(parentElement.value).forEach(item => segmentElements.value.add(item as HTMLElement));
});

const inferredGranularity = computed(() => {
  if (props.granularity) return !hasTime(placeholder.value) ? 'day' : props.granularity;

  return hasTime(placeholder.value) ? 'minute' : 'day';
});

const isInvalid = computed(() => {
  if (!modelValue.value) return false;

  if (propsIsDateUnavailable.value?.(modelValue.value)) return true;

  if (props.minValue && isBefore(modelValue.value, props.minValue)) return true;

  if (props.maxValue && isBefore(props.maxValue, modelValue.value)) return true;

  return false;
});

const initialSegments = initializeSegmentValues(inferredGranularity.value);

const segmentValues = ref<SegmentValueObj>(
  modelValue.value ? { ...syncSegmentValues({ value: modelValue.value, formatter }) } : { ...initialSegments }
);

const allSegmentContent = computed(() =>
  createContent({
    granularity: inferredGranularity.value,
    dateRef: placeholder.value,
    formatter,
    hideTimeZone: props.hideTimeZone,
    hourCycle: props.hourCycle,
    segmentValues: segmentValues.value,
    locale
  })
);

const segmentContents = computed(() => allSegmentContent.value.arr);

const editableSegmentContents = computed(() => segmentContents.value.filter(({ part }) => part !== 'literal'));

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
    // Locale changed, so we need to clear the segment elements and re-get them (different order)
    // Get the focusable elements again on the next tick
    nextTick(() => {
      segmentElements.value.clear();
      getSegmentElements(parentElement.value).forEach(item => segmentElements.value.add(item as HTMLElement));
    });
  }
});

watch(modelValue, _modelValue => {
  if (!isNullish(_modelValue) && placeholder.value.compare(_modelValue) !== 0) {
    placeholder.value = _modelValue.copy();
  }
});

watch([modelValue, locale], ([_modelValue]) => {
  if (!isNullish(_modelValue)) {
    segmentValues.value = { ...syncSegmentValues({ value: _modelValue, formatter }) };
  }
  // If segment has null value, means that user modified it, thus do not reset the segmentValues
  else if (Object.values(segmentValues.value).every(value => value !== null) && _modelValue === undefined) {
    segmentValues.value = { ...initialSegments };
  }
});

const currentFocusedElement = ref<HTMLElement | null>(null);

const currentSegmentIndex = computed(() =>
  Array.from(segmentElements.value).findIndex(
    el =>
      el.getAttribute('data-soybean-date-field-segment') ===
      currentFocusedElement.value?.getAttribute('data-soybean-date-field-segment')
  )
);

const nextFocusableSegment = computed(() => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const nextCondition =
    sign < 0 ? currentSegmentIndex.value < 0 : currentSegmentIndex.value > segmentElements.value.size - 1;
  if (nextCondition) return null;
  const segmentToFocus = Array.from(segmentElements.value)[currentSegmentIndex.value + sign];
  return segmentToFocus;
});

const prevFocusableSegment = computed(() => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const prevCondition =
    sign > 0 ? currentSegmentIndex.value < 0 : currentSegmentIndex.value > segmentElements.value.size - 1;
  if (prevCondition) return null;

  const segmentToFocus = Array.from(segmentElements.value)[currentSegmentIndex.value - sign];
  return segmentToFocus;
});

const kbd = useKbd();

function handleKeydown(e: KeyboardEvent) {
  if (!isSegmentNavigationKey(e.key)) return;
  if (e.key === kbd.ARROW_LEFT) prevFocusableSegment.value?.focus();
  if (e.key === kbd.ARROW_RIGHT) nextFocusableSegment.value?.focus();
}

function setFocusedElement(el: HTMLElement) {
  currentFocusedElement.value = el;
}

provideDateFieldRootContext({
  isDateUnavailable: propsIsDateUnavailable.value,
  locale,
  modelValue,
  placeholder,
  disabled,
  formatter,
  hourCycle: props.hourCycle,
  step,
  readonly,
  segmentValues,
  isInvalid,
  segmentContents: editableSegmentContents,
  elements: segmentElements,
  setFocusedElement,
  focusNext() {
    nextFocusableSegment.value?.focus();
  }
});

defineExpose({
  /** Helper to set the focused element inside the DateField */
  setFocusedElement
});
</script>

<template>
  <Primitive
    v-bind="$attrs"
    ref="primitiveElement"
    :class="props.class"
    role="group"
    :aria-disabled="disabled ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :dir="dir"
    @keydown.left.right="handleKeydown"
  >
    <slot :model-value="modelValue" :segments="segmentContents" :is-invalid="isInvalid" />

    <VisuallyHidden
      :id="id"
      as="input"
      feature="focusable"
      tabindex="-1"
      :value="modelValue ? modelValue.toString() : ''"
      :name="name"
      :disabled="disabled"
      :required="required"
      @focus="Array.from(segmentElements)?.[0]?.focus()"
    />
  </Primitive>
</template>
