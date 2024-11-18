<script setup lang="ts">
import { computed } from 'vue';
import Primitive from '../primitive/primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarHeadingPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarHeading'
});

const { class: className, as = 'div' } = defineProps<CalendarHeadingPropsWithPrimitive>();

const { headingValue, disabled } = injectCalendarRootContext();

const dataDisabled = computed(() => (disabled.value ? '' : undefined));
</script>

<template>
  <Primitive :class="className" :as :as-child :data-disabled>
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </Primitive>
</template>
