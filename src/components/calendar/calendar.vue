<script setup lang="ts" generic="M extends boolean = false">
import { computed } from 'vue';

import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  provideCalendarUi
} from '@soybeanjs/headless/calendar';
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
  <CalendarRoot v-bind="forwardedProps" v-on="listeners">
    <template #default="{ grid, modelValue, weekDays }">
      <CalendarHeader v-bind="headerProps">
        <CalendarPrev v-bind="prevProps">
          <template #default="slotProps">
            <slot name="prev" v-bind="slotProps">
              <Icon class="size-4 rtl:rotate-180" icon="lucide:chevron-left" />
            </slot>
          </template>
        </CalendarPrev>
        <CalendarHeading v-bind="headingProps">
          <template #default="slotProps">
            <slot name="heading" v-bind="slotProps">
              {{ slotProps.headingValue }}
            </slot>
          </template>
        </CalendarHeading>
        <CalendarNext v-bind="nextProps">
          <template #default="slotProps">
            <slot name="next" v-bind="slotProps">
              <Icon class="size-4 rtl:rotate-180" icon="lucide:chevron-right" />
            </slot>
          </template>
        </CalendarNext>
      </CalendarHeader>
      <CalendarGrid v-for="month in grid" :key="month.value.toString()" v-bind="gridProps">
        <CalendarGridHead v-bind="gridHeadProps">
          <CalendarGridRow v-bind="gridRowProps">
            <CalendarHeadCell v-for="(weekDay, index) in weekDays" :key="`${month.value.toString()}-${weekDay}-${index}`" v-bind="headCellProps">
              <slot name="head-cell" :date="month.value" :index="index" :label="weekDay">
                {{ weekDay }}
              </slot>
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody v-bind="gridBodyProps">
          <CalendarGridRow v-for="(week, weekIndex) in month.rows" :key="`${month.value.toString()}-${weekIndex}`" v-bind="gridRowProps">
            <CalendarCell v-for="dateValue in week" :key="dateValue.toString()" :date="dateValue" v-bind="cellProps">
              <CalendarCellTrigger :day="dateValue" :month="month.value" v-bind="cellTriggerProps">
                <template #default="slotProps">
                  <slot
                    name="day"
                    :day="dateValue"
                    :day-value="slotProps.dayValue"
                    :disabled="slotProps.disabled"
                    :month="month.value"
                    :outside-view="slotProps.outsideView"
                    :outside-visible-view="slotProps.outsideVisibleView"
                    :selected="slotProps.selected"
                    :today="slotProps.today"
                    :unavailable="slotProps.unavailable"
                  >
                    {{ slotProps.dayValue }}
                  </slot>
                </template>
              </CalendarCellTrigger>
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
      <slot :model-value="modelValue" />
    </template>
  </CalendarRoot>
</template>
