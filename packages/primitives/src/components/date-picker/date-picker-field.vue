<script setup lang="ts">
import type { DateValue } from '../../date';
import { DateFieldRoot } from '../date-field';
import { injectDatePickerRootContext } from './context';

defineOptions({
  name: 'DatePickerField'
});

const rootContext = injectDatePickerRootContext();

function onUpdateModelValue(date?: DateValue) {
  if (date && rootContext.modelValue.value && date.compare(rootContext.modelValue.value) === 0) return;
  rootContext.onDateChange(date);
}

function onUpdatePlaceholder(date: DateValue) {
  if (date.compare(rootContext.placeholder.value) === 0) return;
  rootContext.onPlaceholderChange(date);
}
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
    @update:model-value="onUpdateModelValue"
    @update:placeholder="onUpdatePlaceholder"
  >
    <slot :segments="segments" :model-value="modelValue" />
  </DateFieldRoot>
</template>
