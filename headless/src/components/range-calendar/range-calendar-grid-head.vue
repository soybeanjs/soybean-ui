<script setup lang="ts">
import { Primitive } from '../primitive';
import { useRangeCalendarUi } from './context';
import type { RangeCalendarGridHeadProps } from './types';

defineOptions({
  name: 'RangeCalendarGridHead'
});

withDefaults(defineProps<RangeCalendarGridHeadProps>(), {
  as: 'thead'
});

const cls = useRangeCalendarUi('gridHead');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" aria-hidden="true" data-slot="grid-head">
    <slot />
  </Primitive>
</template>
