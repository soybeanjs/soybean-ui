<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarHeadingPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarHeading'
});

const props = withDefaults(defineProps<CalendarHeadingPropsWithPrimitive>(), {
  as: 'div'
});

const { headingValue, disabled } = injectCalendarRootContext();

const dataDisabled = computed(() => (disabled.value ? '' : undefined));
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild" :data-disabled="dataDisabled">
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </Primitive>
</template>
