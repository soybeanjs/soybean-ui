<script setup lang="ts" generic="M extends boolean = false">
import { computed } from 'vue';

import { CalendarCompact, provideCalendarUi } from '@soybeanjs/headless/calendar';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import type { CalendarEmits, CalendarProps, CalendarSlots } from './types';
import { calendarVariants } from './variants';

defineOptions({
  name: 'SCalendar'
});

const props = defineProps<CalendarProps<M>>();

const emit = defineEmits<CalendarEmits<M>>();
defineSlots<CalendarSlots<M>>();

const forwardedProps = useOmitProps(props, [
  'cellProps',
  'cellTriggerProps',
  'class',
  'gridBodyProps',
  'gridHeadProps',
  'gridProps',
  'gridRowProps',
  'headCellProps',
  'headerProps',
  'headingProps',
  'nextProps',
  'prevProps',
  'size',
  'ui'
]);
const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = calendarVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideCalendarUi(ui);
</script>

<template>
  <CalendarCompact
    v-bind="{
      ...forwardedProps,
      cellProps,
      cellTriggerProps,
      gridBodyProps,
      gridHeadProps,
      gridProps,
      gridRowProps,
      headCellProps,
      headerProps,
      headingProps,
      nextProps,
      prevProps
    }"
    v-on="listeners"
  >
    <template #prev="slotProps">
      <slot name="prev" v-bind="slotProps">
        <Icon class="size-4 rtl:rotate-180" icon="lucide:chevron-left" />
      </slot>
    </template>
    <template #heading="slotProps">
      <slot name="heading" v-bind="slotProps">
        {{ slotProps.headingValue }}
      </slot>
    </template>
    <template #next="slotProps">
      <slot name="next" v-bind="slotProps">
        <Icon class="size-4 rtl:rotate-180" icon="lucide:chevron-right" />
      </slot>
    </template>
    <template #head-cell="slotProps">
      <slot name="head-cell" v-bind="slotProps">
        {{ slotProps.label }}
      </slot>
    </template>
    <template #day="slotProps">
      <slot name="day" v-bind="slotProps">
        {{ slotProps.dayValue }}
      </slot>
    </template>
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </CalendarCompact>
</template>
