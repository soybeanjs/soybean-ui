<script setup lang="ts">
import { computed, shallowRef, useId, watch } from 'vue';
import { useControllableState } from '../../composables';
import { compareYearMonth, getDefaultDate, isMonthBetweenInclusive, toDate, useDateFormatter } from '../../date';
import type { DateRange, DateValue } from '../../date';
import { isNullish } from '../../shared';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideMonthRangePickerRootContext, useMonthRangePickerUi } from './context';
import type { MonthRangePickerRootEmits, MonthRangePickerRootProps } from './types';

defineOptions({
  name: 'MonthRangePickerRoot'
});

const props = withDefaults(defineProps<MonthRangePickerRootProps>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  defaultOpen: false,
  open: undefined,
  modal: false
});

const emit = defineEmits<MonthRangePickerRootEmits>();

defineSlots<{
  default?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
}>();

const cls = useMonthRangePickerUi('root');
const popupId = useId();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value);

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
  locale: props.locale
}).set({ day: 1 });

const placeholder = useControllableState<DateValue>(
  () => props.placeholder as DateValue,
  value => emit('update:placeholder', value),
  props.defaultPlaceholder?.set({ day: 1 }) ?? defaultDate.copy()
);

const open = useControllableState(
  () => props.open,
  value => emit('update:open', value ?? false),
  props.defaultOpen
);

const focusedMonth = shallowRef<DateValue>(
  (modelValue.value.end ?? modelValue.value.start ?? placeholder.value).set({ day: 1 })
);
const hoveredMonth = shallowRef<DateValue | undefined>();

const minValue = computed(() => props.minValue?.set({ day: 1 }));
const maxValue = computed(() => props.maxValue?.set({ day: 1 }));

const sortRange = (start: DateValue, end: DateValue): DateRange => {
  return compareYearMonth(start, end) <= 0
    ? { start: start.copy(), end: end.copy() }
    : { start: end.copy(), end: start.copy() };
};

const isMonthDisabled = (date: DateValue) => {
  if (props.disabled) {
    return true;
  }

  if (minValue.value && compareYearMonth(date, minValue.value) < 0) {
    return true;
  }

  if (maxValue.value && compareYearMonth(date, maxValue.value) > 0) {
    return true;
  }

  return false;
};

const isRangeStart = (date: DateValue) => {
  if (!modelValue.value.start) {
    return false;
  }

  return compareYearMonth(date, modelValue.value.start.set({ day: 1 })) === 0;
};

const isRangeEnd = (date: DateValue) => {
  if (!modelValue.value.end) {
    return false;
  }

  return compareYearMonth(date, modelValue.value.end.set({ day: 1 })) === 0;
};

const isMonthSelected = (date: DateValue) => {
  const { start, end } = modelValue.value;

  if (!start && !end) {
    return false;
  }

  if (start && !end) {
    return compareYearMonth(date, start.set({ day: 1 })) === 0;
  }

  if (start && end) {
    return isMonthBetweenInclusive(date, start.set({ day: 1 }), end.set({ day: 1 }));
  }

  return false;
};

const isMonthHighlighted = (date: DateValue) => {
  const { start, end } = modelValue.value;

  if (!start || end || !hoveredMonth.value) {
    return false;
  }

  const range = sortRange(start.set({ day: 1 }), hoveredMonth.value.set({ day: 1 }));
  return isMonthBetweenInclusive(date, range.start!, range.end!);
};

const isInvalid = computed(() => {
  const { start, end } = modelValue.value;

  if (start && isMonthDisabled(start.set({ day: 1 }))) {
    return true;
  }

  if (end && isMonthDisabled(end.set({ day: 1 }))) {
    return true;
  }

  if (start && end && compareYearMonth(end.set({ day: 1 }), start.set({ day: 1 })) < 0) {
    return true;
  }

  return false;
});

const displayValue = computed(() => {
  const { start, end } = modelValue.value;

  if (start && end) {
    return `${formatter.fullMonthAndYear(toDate(start.set({ day: 1 })))} – ${formatter.fullMonthAndYear(toDate(end.set({ day: 1 })))}`;
  }

  if (start) {
    return `${formatter.fullMonthAndYear(toDate(start.set({ day: 1 })))} – ...`;
  }

  return '';
});

const headingValue = computed(() => formatter.fullYear(toDate(placeholder.value.set({ day: 1 }))));
const hasSelectedRange = computed(() => !isNullish(modelValue.value.start) && !isNullish(modelValue.value.end));

const onPlaceholderChange = (date: DateValue) => {
  const nextDate = date.set({ day: 1 });
  placeholder.value = nextDate.copy();
  focusedMonth.value = nextDate.copy();
};

const onRangeChange = (month: DateValue) => {
  const nextMonth = month.set({ day: 1 });

  if (props.readonly || isMonthDisabled(nextMonth)) {
    return;
  }

  const { start, end } = modelValue.value;

  if (!start || end) {
    modelValue.value = { start: nextMonth.copy(), end: undefined };
    focusedMonth.value = nextMonth.copy();
    hoveredMonth.value = undefined;
    onPlaceholderChange(nextMonth);
    return;
  }

  const nextRange = sortRange(start.set({ day: 1 }), nextMonth);

  modelValue.value = nextRange;
  focusedMonth.value = nextMonth.copy();
  hoveredMonth.value = undefined;
  onPlaceholderChange(nextRange.start!);
  open.value = false;
};

const setFocusedMonth = (date: DateValue) => {
  focusedMonth.value = date.set({ day: 1 }).copy();
};

const setHoveredMonth = (date: DateValue | undefined) => {
  hoveredMonth.value = date?.set({ day: 1 }).copy();
};

const prevPage = () => {
  onPlaceholderChange(placeholder.value.subtract({ years: 1 }));
};

const nextPage = () => {
  onPlaceholderChange(placeholder.value.add({ years: 1 }));
};

const isPrevButtonDisabled = () => {
  if (props.disabled) {
    return true;
  }

  if (!minValue.value) {
    return false;
  }

  const lastMonthOfPrevYear = placeholder.value.subtract({ years: 1 }).set({ month: 12, day: 1 });
  return compareYearMonth(lastMonthOfPrevYear, minValue.value) < 0;
};

const isNextButtonDisabled = () => {
  if (props.disabled) {
    return true;
  }

  if (!maxValue.value) {
    return false;
  }

  const firstMonthOfNextYear = placeholder.value.add({ years: 1 }).set({ month: 1, day: 1 });
  return compareYearMonth(firstMonthOfNextYear, maxValue.value) > 0;
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

    const nextValue = value.set({ day: 1 });

    if (compareYearMonth(placeholder.value, nextValue) !== 0) {
      placeholder.value = nextValue.copy();
    }
  }
);

watch(
  modelValue,
  value => {
    const nextFocusedMonth = value.end ?? value.start ?? placeholder.value;
    focusedMonth.value = nextFocusedMonth.set({ day: 1 }).copy();
  },
  { deep: true }
);

provideMonthRangePickerRootContext({
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
  focusedMonth,
  hoveredMonth,
  minValue,
  maxValue,
  hasSelectedRange,
  onRangeChange,
  onPlaceholderChange,
  isMonthDisabled,
  isMonthSelected,
  isMonthHighlighted,
  isRangeStart,
  isRangeEnd,
  setOpen(value: boolean) {
    open.value = value;
  },
  setFocusedMonth,
  setHoveredMonth,
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
