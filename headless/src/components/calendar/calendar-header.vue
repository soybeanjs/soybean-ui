<script setup lang="ts">
import { Primitive } from '../primitive';
import { useCalendarUi } from './context';
import type { CalendarHeaderProps } from './types';

defineOptions({
  name: 'CalendarHeader'
});

withDefaults(defineProps<CalendarHeaderProps>(), {
  as: 'div'
});

const cls = useCalendarUi('header');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-slot="header">
    <slot />
  </Primitive>
</template>
