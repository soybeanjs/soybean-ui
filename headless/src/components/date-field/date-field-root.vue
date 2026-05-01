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
import type { DateValue, SegmentPart } from '../../date';
import { isNullish } from '../../shared';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { VisuallyHidden } from '../visually-hidden';
import { provideDateFieldRootContext, useDateFieldUi } from './context';
import type { DateFieldRootEmits, DateFieldRootProps } from './types';

defineOptions({
  name: 'DateFieldRoot'
});

const props = withDefaults(defineProps<DateFieldRootProps>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  isDateUnavailable: undefined,
  hideTimeZone: false,
  hourCycle: undefined,
  granularity: undefined,
  step: undefined
});

const emit = defineEmits<DateFieldRootEmits>();

defineSlots<{
  default?: (props: {
    modelValue: DateValue | undefined;
    segments: { part: SegmentPart; value: string }[];
    isInvalid: boolean;
  }) => any;
}>();

const cls = useDateFieldUi('root');
const [rootElement, setRootElement] = useForwardElement();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value, {
  hourCycle: normalizeHourCycle(props.hourCycle)
});

const modelValue = useControllableState<DateValue | undefined>(
  () => props.modelValue,
  value => emit('update:modelValue', value),
  props.defaultValue
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value,
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
  if (!modelValue.value) {
    return false;
  }

  if (props.isDateUnavailable?.(modelValue.value)) {
    return true;
  }

  if (props.minValue && isBefore(modelValue.value, props.minValue)) {
    return true;
  }

  if (props.maxValue && isBefore(props.maxValue, modelValue.value)) {
    return true;
  }

  return false;
});

const segmentValues = shallowRef(
  modelValue.value
    ? { ...syncSegmentValues({ value: modelValue.value, formatter }) }
    : { ...initializeSegmentValues(inferredGranularity.value) }
);

const segmentContents = computed(
  () =>
    createContent({
      granularity: inferredGranularity.value,
      dateRef: placeholder.value,
      formatter,
      hideTimeZone: props.hideTimeZone,
      hourCycle: props.hourCycle,
      segmentValues: segmentValues.value,
      locale
    }).arr
);

const segmentElements = shallowRef<HTMLElement[]>([]);
const focusedElement = shallowRef<HTMLElement | null>(null);

const refreshSegmentElements = () => {
  if (!rootElement.value) {
    return;
  }

  segmentElements.value = getSegmentElements(rootElement.value) as HTMLElement[];
};

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
  }

  nextTick(refreshSegmentElements);
});

watch(modelValue, value => {
  if (!isNullish(value) && placeholder.value.compare(value) !== 0) {
    placeholder.value = value.copy();
  }
});

watch([modelValue, locale, inferredGranularity], ([value]) => {
  if (!isNullish(value)) {
    segmentValues.value = { ...syncSegmentValues({ value, formatter }) };
    return;
  }

  if (Object.values(segmentValues.value).every(item => item !== null)) {
    segmentValues.value = { ...initializeSegmentValues(inferredGranularity.value) };
  }
});

const currentSegmentIndex = computed(() => {
  return segmentElements.value.findIndex(
    element =>
      element.getAttribute('data-soybean-date-field-segment') ===
      focusedElement.value?.getAttribute('data-soybean-date-field-segment')
  );
});

const moveFocus = (direction: 'next' | 'prev') => {
  const sign = dir.value === 'rtl' ? -1 : 1;
  const delta = direction === 'next' ? sign : -sign;
  segmentElements.value[currentSegmentIndex.value + delta]?.focus();
};

const inputType = computed(() => getInputType(inferredGranularity.value));
const inputValue = computed(() => normalizeInputValue(modelValue.value, inferredGranularity.value));
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
  moveFocus(event.key === 'ArrowRight' ? 'next' : 'prev');
};

provideDateFieldRootContext({
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
  segmentValues,
  segmentContents,
  inputType,
  inputValue,
  inputMaxValue,
  inputMinValue,
  elements: segmentElements,
  focusNext() {
    moveFocus('next');
  },
  setFocusedElement(element: HTMLElement) {
    focusedElement.value = element;
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
    <slot :is-invalid="isInvalid" :model-value="modelValue" :segments="segmentContents" />

    <VisuallyHidden
      :id="id"
      as="input"
      feature="focusable"
      :type="inputType"
      tabindex="-1"
      :value="inputValue"
      :name="name"
      :disabled="disabled"
      :required="required"
      :max="inputMaxValue"
      :min="inputMinValue"
      @focus="segmentElements[0]?.focus()"
    />
  </Primitive>
</template>
