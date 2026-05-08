<script setup lang="ts">
import { Primitive } from '../primitive';
import { useCalendarRangeUi } from './context';
import type { CalendarRangeHeaderProps } from './types';

defineOptions({
  name: 'CalendarRangeHeader'
});

withDefaults(defineProps<CalendarRangeHeaderProps>(), {
  as: 'div'
});

const cls = useCalendarRangeUi('header');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-slot="header">
    <slot />
  </Primitive>
</template>
