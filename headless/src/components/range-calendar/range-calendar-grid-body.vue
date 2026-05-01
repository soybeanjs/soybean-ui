<script setup lang="ts">
import { Primitive } from '../primitive';
import { useRangeCalendarUi } from './context';
import type { RangeCalendarGridBodyProps } from './types';

defineOptions({
  name: 'RangeCalendarGridBody'
});

withDefaults(defineProps<RangeCalendarGridBodyProps>(), {
  as: 'tbody'
});

const cls = useRangeCalendarUi('gridBody');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-slot="grid-body">
    <slot />
  </Primitive>
</template>
