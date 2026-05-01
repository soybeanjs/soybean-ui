<script setup lang="ts">
import type { DateValue } from '@internationalized/date';
import { computed, shallowRef, useId, watch } from 'vue';
import { useControllableState } from '../../composables';
import { createYearGrid, getDefaultDate, toDate, useDateFormatter } from '../../date';
import { useDirection, useLocale } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideYearPickerRootContext, useYearPickerUi } from './context';
import type { YearPickerRootEmits, YearPickerRootProps } from './types';

defineOptions({
  name: 'YearPickerRoot'
});

const props = withDefaults(defineProps<YearPickerRootProps>(), {
  defaultValue: undefined,
  defaultPlaceholder: undefined,
  placeholder: undefined,
  disabled: false,
  readonly: false,
  defaultOpen: false,
  open: undefined,
  modal: false
});

const emit = defineEmits<YearPickerRootEmits>();

defineSlots<{
  default?: (props: { modelValue: DateValue | undefined; displayValue: string; open: boolean }) => any;
}>();

const cls = useYearPickerUi('root');
const popupId = useId();

const locale = useLocale(() => props.locale);
const dir = useDirection(() => props.dir);
const formatter = useDateFormatter(locale.value);

const normalizeYearDate = (date: DateValue) => date.set({ month: 1, day: 1 });

const modelValue = useControllableState<DateValue | undefined>(
  () => props.modelValue,
  value => emit('update:modelValue', value),
  props.defaultValue ? normalizeYearDate(props.defaultValue) : undefined
);

const defaultDate = normalizeYearDate(
  getDefaultDate({
    defaultPlaceholder: props.placeholder,
    defaultValue: modelValue.value,
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

const focusedYear = shallowRef<DateValue>(normalizeYearDate(modelValue.value ?? placeholder.value));

const yearGrid = computed(() => createYearGrid({ dateObj: placeholder.value, yearsPerPage: 12, decadeAligned: true }));
const minValue = computed(() => (props.minValue ? normalizeYearDate(props.minValue) : undefined));
const maxValue = computed(() => (props.maxValue ? normalizeYearDate(props.maxValue) : undefined));

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

const isYearSelected = (date: DateValue) => {
  if (!modelValue.value) {
    return false;
  }

  return date.year === modelValue.value.year;
};

const isInvalid = computed(() => {
  if (!modelValue.value) {
    return false;
  }

  return isYearDisabled(normalizeYearDate(modelValue.value));
});

const displayValue = computed(() => {
  if (!modelValue.value) {
    return '';
  }

  return formatter.fullYear(toDate(normalizeYearDate(modelValue.value)));
});

const headingValue = computed(() => {
  const firstYear = yearGrid.value.cells[0];
  const lastYear = yearGrid.value.cells.at(-1);

  if (!firstYear || !lastYear) {
    return '';
  }

  return `${firstYear.year} - ${lastYear.year}`;
});

const onPlaceholderChange = (date: DateValue) => {
  const nextDate = normalizeYearDate(date);
  placeholder.value = nextDate.copy();
  focusedYear.value = nextDate.copy();
};

const onYearChange = (date: DateValue) => {
  const nextDate = normalizeYearDate(date);

  if (props.readonly || isYearDisabled(nextDate)) {
    return;
  }

  modelValue.value = nextDate.copy();
  onPlaceholderChange(nextDate);
  open.value = false;
};

const setFocusedYear = (date: DateValue) => {
  focusedYear.value = normalizeYearDate(date).copy();
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

watch(modelValue, value => {
  if (!value) {
    focusedYear.value = normalizeYearDate(placeholder.value).copy();
    return;
  }

  const nextValue = normalizeYearDate(value);

  if (placeholder.value.year !== nextValue.year) {
    placeholder.value = nextValue.copy();
  }

  focusedYear.value = nextValue.copy();
});

provideYearPickerRootContext({
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
  yearGrid,
  minValue,
  maxValue,
  onYearChange,
  onPlaceholderChange,
  isYearDisabled,
  isYearSelected,
  setOpen(value: boolean) {
    open.value = value;
  },
  setFocusedYear,
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
