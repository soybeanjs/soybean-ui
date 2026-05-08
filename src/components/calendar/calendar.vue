<script setup lang="ts" generic="M extends boolean = false">
import { computed } from 'vue';
import { CalendarCompact, provideCalendarUi } from '@soybeanjs/headless/calendar';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeBaseVariants, mergeSlotVariants, miniSizeMap } from '@/theme';
import { buttonIconVariants } from '../button/variants';
import Icon from '../icon/icon.vue';
import SSelect from '../select/select.vue';
import { calendarVariants } from './variants';
import type { CalendarEmits, CalendarProps, CalendarSlots } from './types';

defineOptions({
  name: 'SCalendar'
});

const props = defineProps<CalendarProps<M>>();

const emit = defineEmits<CalendarEmits<M>>();

defineSlots<CalendarSlots<M>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const baseVariants = calendarVariants({
    size: props.size
  });

  const variants = mergeBaseVariants(baseVariants, {
    prev: buttonIconVariants({
      size: props.size,
      variant: 'pure'
    }),
    next: buttonIconVariants({
      size: props.size,
      variant: 'pure'
    })
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

const miniSize = computed(() => miniSizeMap[props.size || 'md']);

provideCalendarUi(ui);
</script>

<template>
  <CalendarCompact v-bind="forwardedProps" v-on="listeners">
    <template #prev="slotProps">
      <slot name="prev" v-bind="slotProps">
        <Icon icon="lucide:chevron-left" />
      </slot>
    </template>
    <template v-if="$slots.heading" #heading="slotProps">
      <slot name="heading" v-bind="slotProps" />
    </template>
    <template v-else #heading="{ monthOptions, yearOptions, selectedMonth, selectedYear, onMonthChange, onYearChange }">
      <SSelect
        :size="miniSize"
        :disabled="disabled"
        :clearable="false"
        :items="monthOptions"
        :model-value="selectedMonth"
        :trigger-props="{ 'aria-label': 'Select month' }"
        :ui="{ trigger: 'w-fit' }"
        @update:model-value="onMonthChange"
      />
      <SSelect
        :size="miniSize"
        :disabled="disabled"
        :clearable="false"
        :items="yearOptions"
        :model-value="selectedYear"
        :trigger-props="{ 'aria-label': 'Select year' }"
        :ui="{ popup: 'max-h-72', trigger: 'w-fit' }"
        @update:model-value="onYearChange"
      />
    </template>
    <template #next="slotProps">
      <slot name="next" v-bind="slotProps">
        <Icon icon="lucide:chevron-right" />
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
