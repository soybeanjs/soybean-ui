<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { isEqualDay, isSameDay } from '@internationalized/date';
import { getDefaultDate } from '../../date';
import type { DateValue } from '../../date';
import { useDirection } from '../../composables';
import PopoverRoot from '../popover/popover-root.vue';
import { provideDatePickerRootContext } from './context';
import type { DateFieldInstance, DatePickerRootProps } from './types';

defineOptions({
  name: 'DatePickerRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DatePickerRootProps>(), {
  defaultValue: undefined,
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
  isDateUnavailable: undefined
});

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
  defaultValue,
  dir: propDir
} = toRefs(props);

const dir = useDirection(propDir);

const modelValue = defineModel<DateValue | undefined>('modelValue', {
  default: defaultValue.value
});

const defaultDate = computed(() =>
  getDefaultDate({
    defaultPlaceholder: props.placeholder,
    granularity: props.granularity,
    defaultValue: modelValue.value
  })
);

const placeholder = defineModel<DateValue>('placeholder', {
  default: () => props.defaultPlaceholder ?? defaultDate.value.copy()
});

const open = defineModel<boolean>('open', {
  default: defaultOpen.value
});

const dateFieldRef = ref<DateFieldInstance | undefined>();

provideDatePickerRootContext({
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
  onDateChange(date: DateValue | undefined) {
    if (!date || !modelValue.value) {
      modelValue.value = date;
    } else if (!preventDeselect.value && isSameDay(modelValue.value as DateValue, date)) {
      modelValue.value = undefined;
    } else {
      modelValue.value = date.copy();
    }
  },
  onPlaceholderChange(date: DateValue) {
    if (!isEqualDay(date, placeholder.value)) placeholder.value = date.copy();
  }
});
</script>

<template>
  <PopoverRoot v-model:open="open" :default-open="defaultOpen" :modal="modal">
    <slot />
  </PopoverRoot>
</template>
