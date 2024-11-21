<script setup lang="ts">
import { ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { getDefaultDate } from '../../date';
import type { DateRange, DateValue } from '../../date';
import { useDirection } from '../../composables';
import { PopoverRoot } from '../popover';
import { provideDateRangePickerRootContext } from './context';
import type { DateRangeFieldRootInstance, DateRangePickerRootEmits, DateRangePickerRootProps } from './types';

defineOptions({
  name: 'DateRangePickerRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DateRangePickerRootProps>(), {
  defaultValue: () => ({ start: undefined, end: undefined }),
  defaultOpen: false,
  open: undefined,
  modal: false,
  pagedNavigation: false,
  preventDeselect: false,
  weekStartsOn: 0,
  weekdayFormat: 'narrow',
  fixedWeeks: false,
  numberOfMonths: 1,
  disabled: false,
  readonly: false,
  initialFocus: false,
  placeholder: undefined,
  locale: 'en',
  isDateDisabled: undefined,
  isDateUnavailable: undefined,
  allowNonContiguousRanges: false
});

const emit = defineEmits<DateRangePickerRootEmits>();

const {
  locale,
  disabled,
  readonly,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  preventDeselect,
  isDateDisabled: propsIsDateDisabled,
  isDateUnavailable: propsIsDateUnavailable,
  defaultOpen,
  modal,
  id,
  name,
  required,
  minValue,
  maxValue,
  granularity,
  hideTimeZone,
  hourCycle,
  dir: propsDir,
  allowNonContiguousRanges
} = toRefs(props);

const dir = useDirection(propsDir);

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue ?? { start: undefined, end: undefined },
  passive: (props.modelValue === undefined) as false
}) as Ref<DateRange>;

const defaultDate = getDefaultDate({
  defaultPlaceholder: props.placeholder,
  granularity: props.granularity,
  defaultValue: modelValue.value.start
});

const placeholder = useVModel(props, 'placeholder', emit, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.copy(),
  passive: (props.placeholder === undefined) as false
}) as Ref<DateValue>;

const open = useVModel(props, 'open', emit, {
  defaultValue: defaultOpen.value,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

const dateFieldRef = ref<DateRangeFieldRootInstance | undefined>();

provideDateRangePickerRootContext({
  allowNonContiguousRanges,
  isDateUnavailable: propsIsDateUnavailable.value,
  isDateDisabled: propsIsDateDisabled.value,
  locale,
  disabled,
  pagedNavigation,
  weekStartsOn,
  weekdayFormat,
  fixedWeeks,
  numberOfMonths,
  readonly,
  preventDeselect,
  modelValue,
  placeholder,
  defaultOpen,
  modal,
  open,
  id,
  name,
  required,
  minValue,
  maxValue,
  granularity,
  hideTimeZone,
  hourCycle,
  dateFieldRef,
  dir,
  onStartValueChange(date: DateValue | undefined) {
    emit('update:startValue', date);
  },
  onDateChange(date: DateRange) {
    modelValue.value = { start: date.start?.copy(), end: date.end?.copy() };
  },
  onPlaceholderChange(date: DateValue) {
    placeholder.value = date.copy();
  }
});
</script>

<template>
  <PopoverRoot v-model:open="open" :default-open="defaultOpen" :modal="modal">
    <slot />
  </PopoverRoot>
</template>
