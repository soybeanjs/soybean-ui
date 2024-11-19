<script setup lang="ts">
import { isEqualDay } from '@internationalized/date';
import type { DateValue } from '../../date';
import DateFieldRoot from '../date-field/date-field-root.vue';
import { injectDatePickerRootContext } from './date-picker-root.vue';

defineOptions({
  name: 'DatePickerField'
});

const rootContext = injectDatePickerRootContext();
</script>

<template>
  <DateFieldRoot
    v-slot="{ segments, modelValue }"
    :ref="rootContext.dateFieldRef"
    :model-value="rootContext.modelValue.value"
    :placeholder="rootContext.placeholder.value"
    v-bind="{
      id: rootContext.id.value,
      name: rootContext.name.value,
      disabled: rootContext.disabled.value,
      minValue: rootContext.minValue.value,
      maxValue: rootContext.maxValue.value,
      readonly: rootContext.readonly.value,
      hourCycle: rootContext.hourCycle.value,
      granularity: rootContext.granularity.value,
      hideTimeZone: rootContext.hideTimeZone.value,
      locale: rootContext.locale.value,
      isDateUnavailable: rootContext.isDateUnavailable,
      required: rootContext.required.value,
      dir: rootContext.dir.value
    }"
    @update:model-value="
      (date: DateValue | undefined) => {
        if (
          date &&
          rootContext.modelValue.value &&
          isEqualDay(rootContext.modelValue.value, date) &&
          date.compare(rootContext.modelValue.value) === 0
        )
          return;
        rootContext.onDateChange(date);
      }
    "
    @update:placeholder="
      (date: DateValue) => {
        if (isEqualDay(rootContext.placeholder.value, date) && date.compare(rootContext.placeholder.value) === 0)
          return;
        rootContext.onPlaceholderChange(date);
      }
    "
  >
    <slot :segments="segments" :model-value="modelValue" />
  </DateFieldRoot>
</template>
