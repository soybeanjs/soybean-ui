<script setup lang="ts">
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import type { DateRange, DateValue, SegmentValueObj } from '../../date';
import {
  areAllDaysBetweenValid,
  createContent,
  getDefaultDate,
  getSegmentElements,
  hasTime,
  initializeSegmentValues,
  isBefore,
  isBeforeOrSame,
  isSegmentNavigationKey,
  normalizeDateStep,
  normalizeHourCycle,
  syncSegmentValues
} from '../../date';
import { Primitive } from '../primitive';
import { useDateFormatter, useDirection, useKbd, useLocale, usePrimitiveElement } from '../../composables';
import { VisuallyHidden } from '../visually-hidden';
import { provideDateRangeFieldRootContext } from './context';
import type { DateRangeFieldRootEmits, DateRangeFieldRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'DateRangeFieldRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DateRangeFieldRootPropsWithPrimitive>(), {
  defaultValue: undefined,
  modelValue: undefined,
  disabled: false,
  readonly: false,
  placeholder: undefined,
  isDateUnavailable: undefined
});

const emit = defineEmits<DateRangeFieldRootEmits>();

const {
  disabled,
  readonly,
  isDateUnavailable: propsIsDateUnavailable,
  dir: propDir,
  locale: propLocale
} = toRefs(props);

const locale = useLocale(propLocale);
const dir = useDirection(propDir);

const formatter = useDateFormatter(locale.value, {
  hourCycle: normalizeHourCycle(props.hourCycle)
});
const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
const segmentElements = ref<Set<HTMLElement>>(new Set());

onMounted(() => {
  getSegmentElements(parentElement.value).forEach(item => segmentElements.value.add(item as HTMLElement));
});

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue ?? { start: undefined, end: undefined },
  passive: (props.modelValue === undefined) as false
}) as Ref<DateRange | null>;

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  granularity: props.granularity,
  defaultValue: modelValue.value?.start,
  locale: props.locale
});

const placeholder = useVModel(props, 'placeholder', emit, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false
}) as Ref<DateValue>;

const step = computed(() => normalizeDateStep(props));

const inferredGranularity = computed(() => {
  if (props.granularity) return !hasTime(placeholder.value) ? 'day' : props.granularity;

  return hasTime(placeholder.value) ? 'minute' : 'day';
});

const isStartInvalid = computed(() => {
  if (!modelValue.value?.start) return false;

  if (propsIsDateUnavailable.value?.(modelValue.value.start)) return true;

  if (props.minValue && isBefore(modelValue.value.start, props.minValue)) return true;

  if (props.maxValue && isBefore(props.maxValue, modelValue.value.start)) return true;

  return false;
});

const isEndInvalid = computed(() => {
  if (!modelValue.value?.end) return false;

  if (propsIsDateUnavailable.value?.(modelValue.value.end)) return true;

  if (props.minValue && isBefore(modelValue.value.end, props.minValue)) return true;

  if (props.maxValue && isBefore(props.maxValue, modelValue.value.end)) return true;

  return false;
});

const isInvalid = computed(() => {
  if (isStartInvalid.value || isEndInvalid.value) return true;

  if (!modelValue.value?.start || !modelValue.value?.end) return false;

  if (!isBeforeOrSame(modelValue.value.start, modelValue.value.end)) return true;

  if (propsIsDateUnavailable.value !== undefined) {
    const allValid = areAllDaysBetweenValid(
      modelValue.value.start,
      modelValue.value.end,
      propsIsDateUnavailable.value,
      undefined
    );
    if (!allValid) return true;
  }
  return false;
});

const initialSegments = initializeSegmentValues(inferredGranularity.value);

const startSegmentValues = ref<SegmentValueObj>(
  modelValue.value?.start
    ? { ...syncSegmentValues({ value: modelValue.value.start, formatter }) }
    : { ...initialSegments }
);
const endSegmentValues = ref<SegmentValueObj>(
  modelValue.value?.end ? { ...syncSegmentValues({ value: modelValue.value.end, formatter }) } : { ...initialSegments }
);

const startSegmentContent = computed(() =>
  createContent({
    granularity: inferredGranularity.value,
    dateRef: placeholder.value,
    formatter,
    hideTimeZone: props.hideTimeZone,
    hourCycle: props.hourCycle,
    segmentValues: startSegmentValues.value,
    locale
  })
);

const endSegmentContent = computed(() =>
  createContent({
    granularity: inferredGranularity.value,
    dateRef: placeholder.value,
    formatter,
    hideTimeZone: props.hideTimeZone,
    hourCycle: props.hourCycle,
    segmentValues: endSegmentValues.value,
    locale
  })
);

const segmentContents = computed(() => ({
  start: startSegmentContent.value.arr,
  end: endSegmentContent.value.arr
}));

const editableSegmentContents = computed(() => ({
  start: segmentContents.value.start.filter(({ part }) => part !== 'literal'),
  end: segmentContents.value.end.filter(({ part }) => part !== 'literal')
}));

const startValue = ref(modelValue.value?.start?.copy()) as Ref<DateValue | undefined>;
const endValue = ref(modelValue.value?.end?.copy()) as Ref<DateValue | undefined>;

watch([startValue, endValue], ([_startValue, _endValue]) => {
  modelValue.value = { start: _startValue?.copy(), end: _endValue?.copy() };
});

watch(modelValue, _modelValue => {
  const isStartChanged =
    _modelValue?.start && startValue.value
      ? _modelValue.start.compare(startValue.value) !== 0
      : _modelValue?.start !== startValue.value;
  if (isStartChanged) {
    startValue.value = _modelValue?.start?.copy();
  }

  const isEndChanged =
    _modelValue?.end && endValue.value
      ? _modelValue.end.compare(endValue.value) !== 0
      : _modelValue?.end !== endValue.value;
  if (isEndChanged) {
    endValue.value = _modelValue?.end?.copy();
  }
});

watch([startValue, locale], ([_startValue]) => {
  if (_startValue !== undefined) {
    startSegmentValues.value = { ...syncSegmentValues({ value: _startValue, formatter }) };
  }
  // If segment has null value, means that user modified it, thus do not reset the segmentValues
  else if (Object.values(startSegmentValues.value).every(value => value !== null) && _startValue === undefined) {
    startSegmentValues.value = { ...initialSegments };
  }
});

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
  if (_modelValue && _modelValue.start !== undefined && placeholder.value.compare(_modelValue.start) !== 0) {
    placeholder.value = _modelValue.start.copy();
  }
});

watch([endValue, locale], ([_endValue]) => {
  if (_endValue !== undefined) {
    endSegmentValues.value = { ...syncSegmentValues({ value: _endValue, formatter }) };
  } else if (Object.values(endSegmentValues.value).every(value => value === null)) {
    endSegmentValues.value = { ...initialSegments };
  }
});

const currentFocusedElement = ref<HTMLElement | null>(null);

const currentSegmentIndex = computed(() =>
  Array.from(segmentElements.value).findIndex(
    el =>
      el.getAttribute('data-soybean-date-field-segment') ===
        currentFocusedElement.value?.getAttribute('data-soybean-date-field-segment') &&
      el.getAttribute('data-soybean-date-range-field-segment-type') ===
        currentFocusedElement.value?.getAttribute('data-soybean-date-range-field-segment-type')
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

const value = computed(() => `${modelValue.value?.start?.toString()} - ${modelValue.value?.end?.toString()}`);

const kbd = useKbd();

function handleKeydown(e: KeyboardEvent) {
  if (!isSegmentNavigationKey(e.key)) return;
  if (e.key === kbd.ARROW_LEFT) prevFocusableSegment.value?.focus();
  if (e.key === kbd.ARROW_RIGHT) nextFocusableSegment.value?.focus();
}

function setFocusedElement(el: HTMLElement) {
  currentFocusedElement.value = el;
}

provideDateRangeFieldRootContext({
  isDateUnavailable: propsIsDateUnavailable.value,
  locale,
  startValue,
  endValue,
  placeholder,
  disabled,
  formatter,
  hourCycle: props.hourCycle,
  step,
  readonly,
  segmentValues: { start: startSegmentValues, end: endSegmentValues },
  isInvalid,
  segmentContents: editableSegmentContents,
  elements: segmentElements,
  setFocusedElement,
  focusNext() {
    nextFocusableSegment.value?.focus();
  }
});

defineExpose({
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
    <slot :model-value="modelValue" :segments="segmentContents" />

    <VisuallyHidden
      :id="id"
      as="input"
      feature="focusable"
      tabindex="-1"
      :value="value"
      :name="name"
      :disabled="disabled"
      :required="required"
      @focus="Array.from(segmentElements)?.[0]?.focus()"
    />
  </Primitive>
</template>
