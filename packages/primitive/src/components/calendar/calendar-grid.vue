<script lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './calendar-root.vue';

export interface CalendarGridProps extends PrimitiveProps {}

const props = withDefaults(defineProps<CalendarGridProps>(), { as: 'table' });

const rootContext = injectCalendarRootContext();
const disabled = computed(() => (rootContext.disabled.value ? true : undefined));
const readonly = computed(() => (rootContext.readonly.value ? true : undefined));
</script>

<template>
  <Primitive
    v-bind="props"
    tabindex="-1"
    role="grid"
    :aria-readonly="readonly"
    :aria-disabled="disabled"
    :data-readonly="readonly && ''"
    :data-disabled="disabled && ''"
  >
    <slot />
  </Primitive>
</template>
