<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { getDefaultDate } from '../../date';
import type { DateValue } from '../../date';
import { useDirection } from '../../composables';
import { PopoverRoot } from '../popover';
import { provideDatePickerRootContext } from './context';
import type { DateFieldInstance, DatePickerRootEmits, DatePickerRootProps } from './types';

defineOptions({
  name: 'DatePickerRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<DatePickerRootProps>(), {
  defaultValue: undefined,
  modelValue: undefined,
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

const emit = defineEmits<DatePickerRootEmits>();

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

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: defaultValue.value,
  passive: (props.modelValue === undefined) as false
});

const defaultDate = computed(() =>
  getDefaultDate({
    defaultPlaceholder: props.placeholder,
    granularity: props.granularity,
    defaultValue: modelValue.value,
    locale: props.locale
  })
);

const placeholder = useVModel(props, 'placeholder', emit, {
  defaultValue: props.defaultPlaceholder ?? defaultDate.value.copy(),
  passive: (props.placeholder === undefined) as false
}) as Ref<DateValue>;

const open = useVModel(props, 'open', emit, {
  defaultValue: defaultOpen.value,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;

const dateFieldRef = ref<DateFieldInstance | undefined>();

watch(modelValue, value => {
  if (value && value.compare(placeholder.value) !== 0) {
    placeholder.value = value.copy();
  }
});

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
      modelValue.value = date?.copy() ?? undefined;
    } else if (!preventDeselect.value && date && modelValue.value.compare(date) === 0) {
      modelValue.value = undefined;
    } else {
      modelValue.value = date.copy();
    }
  },
  onPlaceholderChange(date: DateValue) {
    if (date.compare(placeholder.value) === 0) {
      placeholder.value = date.copy();
    }
  }
});
</script>

<template>
  <PopoverRoot v-model:open="open" :default-open="defaultOpen" :modal="modal">
    <slot />
  </PopoverRoot>
</template>
