<script setup lang="ts">
import { computed, shallowRef, useId, watch } from 'vue';
import { useControllableState } from '../../composables';
import { createYearGrid, getDefaultDate, isYearBetweenInclusive, toDate, useDateFormatter } from '../../date';
import type { DateRange, DateValue } from '../../date';
import { isNullish } from '../../shared';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideYearRangePickerRootContext, useYearRangePickerUi } from './context';
import type { YearRangePickerRootEmits, YearRangePickerRootProps } from './types';

defineOptions({
  name: 'YearRangePickerRoot'
});

const props = withDefaults(defineProps<YearRangePickerRootProps>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  defaultOpen: false,
  open: undefined,
  modal: false
});

const emit = defineEmits<YearRangePickerRootEmits>();

defineSlots<{
  default?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
}>();

const cls = useYearRangePickerUi('root');
const popupId = useId();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value);

const normalizeYearDate = (date: DateValue) => date.set({ month: 1, day: 1 });

const modelValue = useControllableState<DateRange>(
  () => props.modelValue as DateRange,
  value => {
    emit('update:modelValue', value);
    emit('update:startValue', value.start);
    emit('update:endValue', value.end);
  },
  props.defaultValue
    ? {
        start: props.defaultValue.start ? normalizeYearDate(props.defaultValue.start) : undefined,
        end: props.defaultValue.end ? normalizeYearDate(props.defaultValue.end) : undefined
      }
    : {}
);

const defaultDate = normalizeYearDate(
  getDefaultDate({
    defaultPlaceholder: props.placeholder,
    defaultValue: modelValue.value.start,
    locale: props.locale
  })
);

const placeholder = useControllableState<DateValue>(
  () => props.placeholder as DateValue,
  value => emit('update:placeholder', value),
  props.defaultPlaceholder ? normalizeYearDate(props.defaultPlaceholder) : defaultDate.copy()
);

const open = useControllableState(
  () => props.open,
  value => emit('update:open', value ?? false),
  props.defaultOpen
);

const focusedYear = shallowRef<DateValue>(
  normalizeYearDate(modelValue.value.end ?? modelValue.value.start ?? placeholder.value)
);
const hoveredYear = shallowRef<DateValue | undefined>();

const yearGrid = computed(() => createYearGrid({ dateObj: placeholder.value, yearsPerPage: 12, decadeAligned: true }));
const minValue = computed(() => (props.minValue ? normalizeYearDate(props.minValue) : undefined));
const maxValue = computed(() => (props.maxValue ? normalizeYearDate(props.maxValue) : undefined));

const sortRange = (start: DateValue, end: DateValue): DateRange => {
  return start.year <= end.year ? { start: start.copy(), end: end.copy() } : { start: end.copy(), end: start.copy() };
};

const isYearDisabled = (date: DateValue) => {
  if (props.disabled) {
    return true;
  }

  if (minValue.value && date.year < minValue.value.year) {
    return true;
  }

  if (maxValue.value && date.year > maxValue.value.year) {
    return true;
  }

  return false;
};

const isRangeStart = (date: DateValue) => {
  if (!modelValue.value.start) {
    return false;
  }

  return date.year === modelValue.value.start.year;
};

const isRangeEnd = (date: DateValue) => {
  if (!modelValue.value.end) {
    return false;
  }

  return date.year === modelValue.value.end.year;
};

const isYearSelected = (date: DateValue) => {
  const { start, end } = modelValue.value;

  if (!start && !end) {
    return false;
  }

  if (start && !end) {
    return date.year === start.year;
  }

  if (start && end) {
    return isYearBetweenInclusive(date, start, end);
  }

  return false;
};

const isYearHighlighted = (date: DateValue) => {
  const { start, end } = modelValue.value;

  if (!start || end || !hoveredYear.value) {
    return false;
  }

  const range = sortRange(start, hoveredYear.value);
  return isYearBetweenInclusive(date, range.start!, range.end!);
};

const isInvalid = computed(() => {
  const { start, end } = modelValue.value;

  if (start && isYearDisabled(start)) {
    return true;
  }

  if (end && isYearDisabled(end)) {
    return true;
  }

  if (start && end && end.year < start.year) {
    return true;
  }

  return false;
});

const displayValue = computed(() => {
  const { start, end } = modelValue.value;

  if (start && end) {
    return `${formatter.fullYear(toDate(start))} – ${formatter.fullYear(toDate(end))}`;
  }

  if (start) {
    return `${formatter.fullYear(toDate(start))} – ...`;
  }

  return '';
});

const headingValue = computed(() => {
  const firstYear = yearGrid.value.cells[0];
  const lastYear = yearGrid.value.cells.at(-1);

  if (!firstYear || !lastYear) {
    return '';
  }

  return `${firstYear.year} - ${lastYear.year}`;
});

const hasSelectedRange = computed(() => !isNullish(modelValue.value.start) && !isNullish(modelValue.value.end));

const onPlaceholderChange = (date: DateValue) => {
  const nextDate = normalizeYearDate(date);
  placeholder.value = nextDate.copy();
  focusedYear.value = nextDate.copy();
};

const onRangeChange = (date: DateValue) => {
  const nextDate = normalizeYearDate(date);

  if (props.readonly || isYearDisabled(nextDate)) {
    return;
  }

  const { start, end } = modelValue.value;

  if (!start || end) {
    modelValue.value = { start: nextDate.copy(), end: undefined };
    focusedYear.value = nextDate.copy();
    hoveredYear.value = undefined;
    onPlaceholderChange(nextDate);
    return;
  }

  const nextRange = sortRange(start, nextDate);

  modelValue.value = nextRange;
  focusedYear.value = nextDate.copy();
  hoveredYear.value = undefined;
  onPlaceholderChange(nextRange.start!);
  open.value = false;
};

const setFocusedYear = (date: DateValue) => {
  focusedYear.value = normalizeYearDate(date).copy();
};

const setHoveredYear = (date: DateValue | undefined) => {
  hoveredYear.value = date ? normalizeYearDate(date).copy() : undefined;
};

const prevPage = () => {
  onPlaceholderChange(placeholder.value.subtract({ years: 12 }));
};

const nextPage = () => {
  onPlaceholderChange(placeholder.value.add({ years: 12 }));
};

const isPrevButtonDisabled = () => {
  if (props.disabled) {
    return true;
  }

  if (!minValue.value) {
    return false;
  }

  const lastYearOfPrevPage = yearGrid.value.cells[0].subtract({ years: 1 });
  return lastYearOfPrevPage.year < minValue.value.year;
};

const isNextButtonDisabled = () => {
  if (props.disabled) {
    return true;
  }

  if (!maxValue.value) {
    return false;
  }

  const firstYearOfNextPage = yearGrid.value.cells.at(-1)?.add({ years: 1 });
  return !firstYearOfNextPage || firstYearOfNextPage.year > maxValue.value.year;
};

watch(locale, value => {
  if (formatter.getLocale() !== value) {
    formatter.setLocale(value);
  }
});

watch(
  () => modelValue.value.start,
  value => {
    if (!value) {
      return;
    }

    if (placeholder.value.year !== value.year) {
      placeholder.value = value.copy();
    }
  }
);

watch(
  modelValue,
  value => {
    const nextFocusedYear = value.end ?? value.start ?? placeholder.value;
    focusedYear.value = nextFocusedYear.copy();
  },
  { deep: true }
);

provideYearRangePickerRootContext({
  locale,
  dir,
  modelValue,
  placeholder,
  isInvalid,
  formatter,
  open,
  popupId,
  displayValue,
  headingValue,
  focusedYear,
  hoveredYear,
  yearGrid,
  minValue,
  maxValue,
  hasSelectedRange,
  onRangeChange,
  onPlaceholderChange,
  isYearDisabled,
  isYearSelected,
  isYearHighlighted,
  isRangeStart,
  isRangeEnd,
  setOpen(value: boolean) {
    open.value = value;
  },
  setFocusedYear,
  setHoveredYear,
  prevPage,
  nextPage,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  disabled: computed(() => props.disabled),
  readonly: computed(() => props.readonly)
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-invalid="isInvalid ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    :dir="dir"
    data-slot="root"
  >
    <slot :display-value="displayValue" :model-value="modelValue" :open="Boolean(open)" />
  </Primitive>
</template>
