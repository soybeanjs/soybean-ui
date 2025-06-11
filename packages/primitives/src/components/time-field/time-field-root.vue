<script setup lang="ts">
import { computed, nextTick, onMounted, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { Time, getLocalTimeZone, isEqualDay, toCalendarDateTime, today } from '@internationalized/date';
import {
  createContent,
  getDefaultTime,
  getTimeFieldSegmentElements,
  initializeTimeSegmentValues,
  isBefore,
  isSegmentNavigationKey,
  normalizeDateStep,
  normalizeHourCycle,
  syncTimeSegmentValues
} from '../../date';
import type { DateValue, SegmentValueObj, TimeValue } from '../../date';
import { useDateFormatter, useDirection, useKbd, useLocale, usePrimitiveElement } from '../../composables';
import { isNullish } from '../../shared';
import { Primitive } from '../primitive';
import { VisuallyHidden } from '../visually-hidden';
import { provideTimeFieldRootContext } from './context';
import type { TimeFieldRootEmits, TimeFieldRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'TimeFieldRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TimeFieldRootPropsWithPrimitive>(), {
  defaultValue: undefined,
  disabled: false,
  readonly: false,
  placeholder: undefined,
  isDateUnavailable: undefined
});

const emit = defineEmits<TimeFieldRootEmits>();

const {
  disabled,
  readonly,
  granularity,
  defaultValue,
  minValue,
  maxValue,
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

function convertValue(value: TimeValue, date: DateValue = today(getLocalTimeZone())) {
  if (value && 'day' in value) {
    return value;
  }

  return toCalendarDateTime(date, value);
}
const convertedMinValue = computed(() => (minValue.value ? convertValue(minValue.value) : undefined));
const convertedMaxValue = computed(() => (maxValue.value ? convertValue(maxValue.value) : undefined));

onMounted(() => {
  getTimeFieldSegmentElements(parentElement.value).forEach(item => segmentElements.value.add(item as HTMLElement));
});

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: defaultValue.value,
  passive: (props.modelValue === undefined) as false
}) as Ref<TimeValue>;

const convertedModelValue = computed({
  get() {
    if (isNullish(modelValue.value)) {
      return modelValue.value;
    }

    return convertValue(modelValue.value);
  },
  set(newValue) {
    if (newValue) {
      modelValue.value =
        modelValue.value && 'day' in modelValue.value
          ? newValue
          : new Time(newValue.hour, newValue.minute, newValue.second, modelValue.value?.millisecond);
    } else {
      modelValue.value = newValue;
    }
    return newValue;
  }
});

const defaultDate = getDefaultTime({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value
});

const placeholder = useVModel(props, 'placeholder', emit, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false
}) as Ref<TimeValue>;

const step = computed(() => normalizeDateStep(props));

const convertedPlaceholder = computed({
  get() {
    return convertValue(placeholder.value);
  },
  set(newValue) {
    if (newValue)
      placeholder.value =
        'day' in placeholder.value
          ? newValue.copy()
          : new Time(newValue.hour, newValue.minute, newValue.second, placeholder.value?.millisecond);
    return newValue;
  }
});

const inferredGranularity = computed(() => {
  if (granularity.value) return granularity.value;

  return 'minute';
});

const isInvalid = computed(() => {
  if (!modelValue.value) return false;

  if (convertedMinValue.value && isBefore(convertedModelValue.value, convertedMinValue.value)) return true;

  if (convertedMaxValue.value && isBefore(convertedMaxValue.value, convertedModelValue.value)) return true;

  return false;
});

const initialSegments = initializeTimeSegmentValues(inferredGranularity.value);

const segmentValues = ref<SegmentValueObj>(
  modelValue.value
    ? { ...syncTimeSegmentValues({ value: convertedModelValue.value, formatter }) }
    : { ...initialSegments }
);

const allSegmentContent = computed(() =>
  createContent({
    granularity: inferredGranularity.value,
    dateRef: convertedPlaceholder.value,
    formatter,
    hideTimeZone: props.hideTimeZone,
    hourCycle: props.hourCycle,
    segmentValues: segmentValues.value,
    locale,
    isTimeValue: true
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
      getTimeFieldSegmentElements(parentElement.value).forEach(item => segmentElements.value.add(item as HTMLElement));
    });
  }
});

watch(convertedModelValue, _modelValue => {
  if (
    !isNullish(_modelValue) &&
    (!isEqualDay(convertedPlaceholder.value, _modelValue) || convertedPlaceholder.value.compare(_modelValue) !== 0)
  )
    placeholder.value = _modelValue.copy();
});

watch([convertedModelValue, locale], ([_modelValue]) => {
  if (!isNullish(_modelValue)) {
    segmentValues.value = { ...syncTimeSegmentValues({ value: _modelValue, formatter }) };
  } else if (Object.values(segmentValues.value).every(value => value === null) || isNullish(_modelValue)) {
    segmentValues.value = { ...initialSegments };
  }
});

const currentFocusedElement = ref<HTMLElement | null>(null);

const currentSegmentIndex = computed(() =>
  Array.from(segmentElements.value).findIndex(
    el =>
      el.getAttribute('data-soybean-time-field-segment') ===
      currentFocusedElement.value?.getAttribute('data-soybean-time-field-segment')
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

provideTimeFieldRootContext({
  locale,
  modelValue: convertedModelValue,
  placeholder: convertedPlaceholder,
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
    :as="as"
    :as-child="asChild"
    :aria-disabled="disabled ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :dir="dir"
    role="group"
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
