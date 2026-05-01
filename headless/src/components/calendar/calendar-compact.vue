<script setup lang="ts" generic="M extends boolean = false">
import { useForwardListeners, useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import CalendarRoot from './calendar-root.vue';
import CalendarHeader from './calendar-header.vue';
import CalendarHeading from './calendar-heading.vue';
import CalendarPrev from './calendar-prev.vue';
import CalendarNext from './calendar-next.vue';
import CalendarGrid from './calendar-grid.vue';
import CalendarGridHead from './calendar-grid-head.vue';
import CalendarGridBody from './calendar-grid-body.vue';
import CalendarGridRow from './calendar-grid-row.vue';
import CalendarHeadCell from './calendar-head-cell.vue';
import CalendarCell from './calendar-cell.vue';
import CalendarCellTrigger from './calendar-cell-trigger.vue';
import type { CalendarCompactEmits, CalendarCompactProps, CalendarCompactSlots } from './types';

defineOptions({
  name: 'CalendarCompact'
});

const props = defineProps<CalendarCompactProps<M>>();

const emit = defineEmits<CalendarCompactEmits<M>>();

defineSlots<CalendarCompactSlots<M>>();

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
