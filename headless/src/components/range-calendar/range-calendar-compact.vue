<script setup lang="ts">
import { useForwardListeners, useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import RangeCalendarRoot from './range-calendar-root.vue';
import RangeCalendarHeader from './range-calendar-header.vue';
import RangeCalendarHeading from './range-calendar-heading.vue';
import RangeCalendarPrev from './range-calendar-prev.vue';
import RangeCalendarNext from './range-calendar-next.vue';
import RangeCalendarGrid from './range-calendar-grid.vue';
import RangeCalendarGridHead from './range-calendar-grid-head.vue';
import RangeCalendarGridBody from './range-calendar-grid-body.vue';
import RangeCalendarGridRow from './range-calendar-grid-row.vue';
import RangeCalendarHeadCell from './range-calendar-head-cell.vue';
import RangeCalendarCell from './range-calendar-cell.vue';
import RangeCalendarCellTrigger from './range-calendar-cell-trigger.vue';
import type { RangeCalendarCompactEmits, RangeCalendarCompactProps, RangeCalendarCompactSlots } from './types';

defineOptions({
  name: 'RangeCalendarCompact'
});

const props = defineProps<RangeCalendarCompactProps>();

const emit = defineEmits<RangeCalendarCompactEmits>();

defineSlots<RangeCalendarCompactSlots>();

const forwardedProps = useOmitProps(props, [
  'headerProps',
  'headingProps',
  'prevProps',
  'nextProps',
  'gridProps',
  'gridHeadProps',
  'gridBodyProps',
  'gridRowProps',
  'headCellProps',
  'cellProps',
  'cellTriggerProps'
]);

const listeners = useForwardListeners(emit);
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
