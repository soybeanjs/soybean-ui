<script setup lang="ts">
import { Primitive } from '../primitive';
import { useRangeCalendarUi } from './context';
import type { RangeCalendarHeaderProps } from './types';

defineOptions({
  name: 'RangeCalendarHeader'
});

withDefaults(defineProps<RangeCalendarHeaderProps>(), {
  as: 'div'
});

const cls = useRangeCalendarUi('header');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-slot="header">
    <slot />
  </Primitive>
</template>
