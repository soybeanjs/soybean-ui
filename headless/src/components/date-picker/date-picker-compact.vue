<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, usePickProps, useOmitProps } from '../../composables';
import type { DateValue } from '../../date';
import Icon from '../_icon/icon.vue';
import PopoverCompact from '../popover/popover-compact.vue';
import DateFieldCompact from '../date-field/date-field-compact.vue';
import type { DatePickerCompactEmits, DatePickerCompactProps } from './types';

defineOptions({
  name: 'DatePickerCompact'
});

const props = withDefaults(defineProps<DatePickerCompactProps>(), {
  open: undefined
});

const emit = defineEmits<DatePickerCompactEmits>();

const listeners = useForwardListeners(emit);

const popoverProps = usePickProps(props, [
  'open',
  'defaultOpen',
  'modal',
  'disabled',
  'placement',
  'showArrow',
  'portalProps',
  'positionerProps',
  'popupProps',
  'arrowProps',
  'closeProps'
]);

const dateFieldProps = usePickProps(
  props,
  [
    'dir',
    'locale',
    'modelValue',
    'defaultValue',
    'placeholder',
    'defaultPlaceholder',
    'disabled',
    'readonly',
    'maxValue',
    'minValue',
    'isDateUnavailable'
  ],
  computed(() => ({ ...props.dateFieldProps }))
);

const triggerProps = computed(() => ({
  ...props.triggerProps,
  asChild: props.triggerProps?.asChild ?? false
}));

const calendarProps = useOmitProps(props, [
  'open',
  'defaultOpen',
  'modal',
  'placement',
  'showArrow',
  'triggerProps',
  'portalProps',
  'positionerProps',
  'popupProps',
  'arrowProps',
  'closeProps'
]);

const onUpdateModelValue = (value: DateValue | undefined) => {
  emit('update:modelValue', value);
};

const onUpdatePlaceholder = (placeholder: DateValue) => {
  emit('update:placeholder', placeholder);
};
</script>

<template>
  <DateFieldCompact
    v-bind="dateFieldProps"
    data-soybean-date-picker
    @update:model-value="emit('update:modelValue', $event)"
    @update:placeholder="emit('update:placeholder', $event)"
  >
    <template #trailing>
      <PopoverCompact v-bind="popoverProps" :trigger-props="triggerProps" v-on="listeners">
        <template #trigger>
          <Icon icon="lucide:calendar" />
        </template>
        <template #default="{ open, close }">
          <slot
            :open="open"
            :close="close"
            :calendar-props="calendarProps"
            :on-update-model-value="onUpdateModelValue"
            :on-update-placeholder="onUpdatePlaceholder"
          />
        </template>
      </PopoverCompact>
    </template>
  </DateFieldCompact>
</template>
