<script setup lang="ts">
import { Primitive } from '../primitive';
import { useCalendarUi } from './context';
import type { CalendarGridBodyProps } from './types';

defineOptions({
  name: 'CalendarGridBody'
});

withDefaults(defineProps<CalendarGridBodyProps>(), {
  as: 'tbody'
});

const cls = useCalendarUi('gridBody');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-slot="grid-body">
    <slot />
  </Primitive>
</template>
