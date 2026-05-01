<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { computed, shallowRef, useId, watch } from 'vue';
import { useControllableState } from '../../composables';
import { compareYearMonth, getDefaultDate, toDate, useDateFormatter } from '../../date';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideMonthPickerRootContext, useMonthPickerUi } from './context';
import type { MonthPickerRootEmits, MonthPickerRootProps } from './types';

defineOptions({
  name: 'MonthPickerRoot'
});

const props = withDefaults(defineProps<MonthPickerRootProps>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  defaultOpen: false,
  open: undefined,
  modal: false
});

const emit = defineEmits<MonthPickerRootEmits>();

defineSlots<{
  default?: (props: { modelValue: DateValue | undefined; displayValue: string; open: boolean }) => any;
}>();

const cls = useMonthPickerUi('root');
const popupId = useId();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value);

const modelValue = useControllableState<DateValue | undefined>(
  () => props.modelValue,
  value => emit('update:modelValue', value),
  props.defaultValue
);

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  defaultValue: modelValue.value,
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

const focusedMonth = shallowRef<DateValue>((modelValue.value ?? placeholder.value).set({ day: 1 }));

const minValue = computed(() => props.minValue?.set({ day: 1 }));
const maxValue = computed(() => props.maxValue?.set({ day: 1 }));

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

const isMonthSelected = (date: DateValue) => {
  if (!modelValue.value) {
    return false;
  }

  return compareYearMonth(date, modelValue.value.set({ day: 1 })) === 0;
};

const isInvalid = computed(() => {
  if (!modelValue.value) {
    return false;
  }

  return isMonthDisabled(modelValue.value.set({ day: 1 }));
});

const displayValue = computed(() => {
  if (!modelValue.value) {
    return '';
  }

  return formatter.fullMonthAndYear(toDate(modelValue.value.set({ day: 1 })));
});

const headingValue = computed(() => formatter.fullYear(toDate(placeholder.value.set({ day: 1 }))));

const onPlaceholderChange = (date: DateValue) => {
  const nextDate = date.set({ day: 1 });
  placeholder.value = nextDate.copy();
  focusedMonth.value = nextDate.copy();
};

const onMonthChange = (date: DateValue) => {
  const nextDate = date.set({ day: 1 });

  if (props.readonly || isMonthDisabled(nextDate)) {
    return;
  }

  modelValue.value = nextDate.copy();
  onPlaceholderChange(nextDate);
  open.value = false;
};

const setFocusedMonth = (date: DateValue) => {
  focusedMonth.value = date.set({ day: 1 }).copy();
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

watch(modelValue, value => {
  if (!value) {
    focusedMonth.value = placeholder.value.set({ day: 1 }).copy();
    return;
  }

  const nextValue = value.set({ day: 1 });

  if (compareYearMonth(placeholder.value, nextValue) !== 0) {
    placeholder.value = nextValue.copy();
  }

  focusedMonth.value = nextValue.copy();
});

provideMonthPickerRootContext({
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
  minValue,
  maxValue,
  onMonthChange,
  onPlaceholderChange,
  isMonthDisabled,
  isMonthSelected,
  setOpen(value: boolean) {
    open.value = value;
  },
  setFocusedMonth,
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
