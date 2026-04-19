<script setup lang="ts">
import { computed } from 'vue';

import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
  provideRangeCalendarUi
} from '@soybeanjs/headless/range-calendar';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';

import { mergeSlotVariants } from '@/theme';

import Icon from '../icon/icon.vue';

import type { RangeCalendarEmits, RangeCalendarProps, RangeCalendarSlots } from './types';
import { rangeCalendarVariants } from './variants';

defineOptions({
  name: 'SRangeCalendar'
});

const props = defineProps<RangeCalendarProps>();

const emit = defineEmits<RangeCalendarEmits>();
defineSlots<RangeCalendarSlots>();

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
  const variants = rangeCalendarVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideRangeCalendarUi(ui);
</script>

<template>
  <RangeCalendarRoot v-bind="forwardedProps" v-on="listeners">
    <template #default="{ grid, modelValue, weekDays }">
      <RangeCalendarHeader v-bind="headerProps">
        <RangeCalendarPrev v-bind="prevProps">
          <template #default="slotProps">
            <slot name="prev" v-bind="slotProps">
              <Icon class="size-4 rtl:rotate-180" icon="lucide:chevron-left" />
            </slot>
          </template>
        </RangeCalendarPrev>
        <RangeCalendarHeading v-bind="headingProps">
          <template #default="slotProps">
            <slot name="heading" v-bind="slotProps">
              {{ slotProps.headingValue }}
            </slot>
          </template>
        </RangeCalendarHeading>
        <RangeCalendarNext v-bind="nextProps">
          <template #default="slotProps">
            <slot name="next" v-bind="slotProps">
              <Icon class="size-4 rtl:rotate-180" icon="lucide:chevron-right" />
            </slot>
          </template>
        </RangeCalendarNext>
      </RangeCalendarHeader>
      <RangeCalendarGrid v-for="month in grid" :key="month.value.toString()" v-bind="gridProps">
        <RangeCalendarGridHead v-bind="gridHeadProps">
          <RangeCalendarGridRow v-bind="gridRowProps">
            <RangeCalendarHeadCell v-for="(weekDay, index) in weekDays" :key="`${month.value.toString()}-${weekDay}-${index}`" v-bind="headCellProps">
              <slot name="head-cell" :date="month.value" :index="index" :label="weekDay">
                {{ weekDay }}
              </slot>
            </RangeCalendarHeadCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridHead>
        <RangeCalendarGridBody v-bind="gridBodyProps">
          <RangeCalendarGridRow v-for="(week, weekIndex) in month.rows" :key="`${month.value.toString()}-${weekIndex}`" v-bind="gridRowProps">
            <RangeCalendarCell v-for="dateValue in week" :key="dateValue.toString()" :date="dateValue" v-bind="cellProps">
              <RangeCalendarCellTrigger :day="dateValue" :month="month.value" v-bind="cellTriggerProps">
                <template #default="slotProps">
                  <slot
                    name="day"
                    :day="dateValue"
                    :day-value="slotProps.dayValue"
                    :disabled="slotProps.disabled"
                    :highlighted="slotProps.highlighted"
                    :highlighted-end="slotProps.highlightedEnd"
                    :highlighted-start="slotProps.highlightedStart"
                    :month="month.value"
                    :outside-view="slotProps.outsideView"
                    :outside-visible-view="slotProps.outsideVisibleView"
                    :selected="slotProps.selected"
                    :selection-end="slotProps.selectionEnd"
                    :selection-start="slotProps.selectionStart"
                    :today="slotProps.today"
                    :unavailable="slotProps.unavailable"
                  >
                    {{ slotProps.dayValue }}
                  </slot>
                </template>
              </RangeCalendarCellTrigger>
            </RangeCalendarCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridBody>
      </RangeCalendarGrid>
      <slot :model-value="modelValue" />
    </template>
  </RangeCalendarRoot>
</template>
