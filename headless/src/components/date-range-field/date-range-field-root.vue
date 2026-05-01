<script setup lang="ts">
import { computed, nextTick, onMounted, shallowRef, watch } from 'vue';
import { useControllableState, useForwardElement } from '../../composables';
import {
  createContent,
  getDefaultDate,
  getInputType,
  getSegmentElements,
  hasTime,
  initializeSegmentValues,
  isBefore,
  normalizeDateStep,
  normalizeHourCycle,
  normalizeInputValue,
  syncSegmentValues,
  useDateFormatter
} from '../../date';
import type { DateRange, DateValue, SegmentPart } from '../../date';
import { isNullish } from '../../shared';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { VisuallyHidden } from '../visually-hidden';
import { provideDateRangeFieldRootContext, useDateRangeFieldUi } from './context';
import type { DateRangeFieldRootEmits, DateRangeFieldRootProps } from './types';

defineOptions({
  name: 'DateRangeFieldRoot'
});

const props = withDefaults(defineProps<DateRangeFieldRootProps>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  isDateUnavailable: undefined,
  hideTimeZone: false,
  hourCycle: undefined,
  granularity: undefined,
  step: undefined,
  startName: undefined,
  endName: undefined
});

const emit = defineEmits<DateRangeFieldRootEmits>();

defineSlots<{
  default?: (props: {
    modelValue: { start?: DateValue; end?: DateValue };
    startSegments: { part: SegmentPart; value: string }[];
    endSegments: { part: SegmentPart; value: string }[];
    isInvalid: boolean;
  }) => any;
}>();

const cls = useDateRangeFieldUi('root');
const [rootElement, setRootElement] = useForwardElement();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value, {
  hourCycle: normalizeHourCycle(props.hourCycle)
});

const modelValue = useControllableState<DateRange>(
  () => props.modelValue as DateRange,
  value => {
    emit('update:modelValue', value);
    emit('update:startValue', value.start);
    emit('update:endValue', value.end);
  },
  props.defaultValue ?? {}
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value.start,
  granularity: props.granularity,
  locale: props.locale
});

const placeholder = useControllableState<DateValue>(
  () => props.placeholder as DateValue,
  value => emit('update:placeholder', value),
  props.defaultPlaceholder ?? defaultDate.copy()
);

const step = computed(() => normalizeDateStep(props));
const inferredGranularity = computed(() => {
  if (props.granularity) {
    return hasTime(placeholder.value) ? props.granularity : 'day';
  }

  return hasTime(placeholder.value) ? 'minute' : 'day';
});

const isInvalid = computed(() => {
  const { start, end } = modelValue.value;

  if (start && end && isBefore(end, start)) {
    return true;
  }

  if (start) {
    if (props.isDateUnavailable?.(start)) {
      return true;
    }

    if (props.minValue && isBefore(start, props.minValue)) {
      return true;
    }

    if (props.maxValue && isBefore(props.maxValue, start)) {
      return true;
    }
  }

  if (end) {
    if (props.isDateUnavailable?.(end)) {
      return true;
    }

    if (props.minValue && isBefore(end, props.minValue)) {
      return true;
    }

    if (props.maxValue && isBefore(props.maxValue, end)) {
      return true;
    }
  }

  return false;
});

const startSegmentValues = shallowRef(
  modelValue.value.start
    ? { ...syncSegmentValues({ value: modelValue.value.start, formatter }) }
    : { ...initializeSegmentValues(inferredGranularity.value) }
);

const endSegmentValues = shallowRef(
  modelValue.value.end
    ? { ...syncSegmentValues({ value: modelValue.value.end, formatter }) }
    : { ...initializeSegmentValues(inferredGranularity.value) }
);

const startSegmentContents = computed(
  () =>
    createContent({
      granularity: inferredGranularity.value,
      dateRef: placeholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: startSegmentValues.value,
      locale
    }).arr
);

const endSegmentContents = computed(
  () =>
    createContent({
      granularity: inferredGranularity.value,
      dateRef: placeholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: endSegmentValues.value,
      locale
    }).arr
);

const startSegmentElements = shallowRef<HTMLElement[]>([]);
const endSegmentElements = shallowRef<HTMLElement[]>([]);
const focusedElement = shallowRef<HTMLElement | null>(null);
const focusedType = shallowRef<'start' | 'end'>('start');

const refreshSegmentElements = () => {
  if (!rootElement.value) {
    return;
  }

  const startContainer = rootElement.value.querySelector('[data-date-range-field-part="start"]');
  const endContainer = rootElement.value.querySelector('[data-date-range-field-part="end"]');

  if (startContainer) {
    startSegmentElements.value = getSegmentElements(startContainer as HTMLElement) as HTMLElement[];
  }

  if (endContainer) {
    endSegmentElements.value = getSegmentElements(endContainer as HTMLElement) as HTMLElement[];
  }
};

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
  }

  nextTick(refreshSegmentElements);
});

watch(
  () => modelValue.value.start,
  value => {
    if (!isNullish(value) && placeholder.value.compare(value) !== 0) {
      placeholder.value = value.copy();
    }
  }
);

watch([() => modelValue.value.start, locale, inferredGranularity], ([value]) => {
  if (!isNullish(value)) {
    startSegmentValues.value = { ...syncSegmentValues({ value, formatter }) };
    return;
  }

  if (Object.values(startSegmentValues.value).every(item => item !== null)) {
    startSegmentValues.value = { ...initializeSegmentValues(inferredGranularity.value) };
  }
});

watch([() => modelValue.value.end, locale, inferredGranularity], ([value]) => {
  if (!isNullish(value)) {
    endSegmentValues.value = { ...syncSegmentValues({ value, formatter }) };
    return;
  }

  if (Object.values(endSegmentValues.value).every(item => item !== null)) {
    endSegmentValues.value = { ...initializeSegmentValues(inferredGranularity.value) };
  }
});

const currentSegmentIndex = computed(() => {
  const elements = focusedType.value === 'start' ? startSegmentElements.value : endSegmentElements.value;

  return elements.findIndex(
    element =>
      element.getAttribute('data-soybean-date-field-segment') ===
      focusedElement.value?.getAttribute('data-soybean-date-field-segment')
  );
});

const moveFocus = (type: 'start' | 'end', direction: 'next' | 'prev') => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const delta = direction === 'next' ? sign : -sign;
  const elements = type === 'start' ? startSegmentElements.value : endSegmentElements.value;
  const nextIndex = currentSegmentIndex.value + delta;

  if (nextIndex >= 0 && nextIndex < elements.length) {
    elements[nextIndex]?.focus();
  } else if (direction === 'next' && type === 'start' && endSegmentElements.value.length > 0) {
    focusedType.value = 'end';
    endSegmentElements.value[0]?.focus();
  } else if (direction === 'prev' && type === 'end' && startSegmentElements.value.length > 0) {
    focusedType.value = 'start';
    startSegmentElements.value[startSegmentElements.value.length - 1]?.focus();
  }
};

const inputType = computed(() => getInputType(inferredGranularity.value));
const startInputValue = computed(() => normalizeInputValue(modelValue.value.start, inferredGranularity.value));
const endInputValue = computed(() => normalizeInputValue(modelValue.value.end, inferredGranularity.value));
const inputMaxValue = computed(() =>
  props.maxValue ? normalizeInputValue(props.maxValue, inferredGranularity.value) : undefined
);
const inputMinValue = computed(() =>
  props.minValue ? normalizeInputValue(props.minValue, inferredGranularity.value) : undefined
);

const handleRootKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return;
  }

  event.preventDefault();
  moveFocus(focusedType.value, event.key === 'ArrowRight' ? 'next' : 'prev');
};

provideDateRangeFieldRootContext({
  locale,
  dir,
  modelValue,
  placeholder,
  isDateUnavailable: props.isDateUnavailable,
  isInvalid,
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly),
  formatter,
  hourCycle: props.hourCycle,
  step,
  startSegmentValues,
  endSegmentValues,
  startSegmentContents,
  endSegmentContents,
  startInputType: inputType,
  endInputType: inputType,
  startInputValue,
  endInputValue,
  inputMaxValue,
  inputMinValue,
  startElements: startSegmentElements,
  endElements: endSegmentElements,
  focusedType,
  focusNext(type: 'start' | 'end') {
    moveFocus(type, 'next');
  },
  setFocusedElement(element: HTMLElement, type: 'start' | 'end') {
    focusedElement.value = element;
    focusedType.value = type;
  }
});

onMounted(refreshSegmentElements);
</script>

<template>
  <Primitive
    :ref="setRootElement"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :dir="dir"
    data-slot="root"
    role="group"
    @keydown="handleRootKeydown"
  >
    <slot
      :end-segments="endSegmentContents"
      :is-invalid="isInvalid"
      :model-value="modelValue"
      :start-segments="startSegmentContents"
    />

    <VisuallyHidden
      :id="id"
      as="input"
      feature="focusable"
      :type="inputType"
      tabindex="-1"
      :value="startInputValue"
      :name="startName || name"
      :disabled="disabled"
      :required="required"
      :max="inputMaxValue"
      :min="inputMinValue"
      @focus="startSegmentElements[0]?.focus()"
    />

    <VisuallyHidden
      as="input"
      feature="focusable"
      :type="inputType"
      tabindex="-1"
      :value="endInputValue"
      :name="endName"
      :disabled="disabled"
      :required="required"
      :max="inputMaxValue"
      :min="inputMinValue"
      @focus="endSegmentElements[0]?.focus()"
    />
  </Primitive>
</template>
