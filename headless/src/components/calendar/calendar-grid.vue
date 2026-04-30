<script setup lang="ts">
import { computed } from 'vue';

import { Primitive } from '../primitive';

import { useCalendarRootContext, useCalendarUi } from './context';
import type { CalendarGridProps } from './types';

defineOptions({
  name: 'CalendarGrid'
});

withDefaults(defineProps<CalendarGridProps>(), {
  as: 'table'
});

const cls = useCalendarUi('grid');
const rootContext = useCalendarRootContext('CalendarGrid');

const disabled = computed(() => (rootContext.disabled.value ? true : undefined));
const readonly = computed(() => (rootContext.readonly.value ? true : undefined));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-disabled="disabled"
    :aria-readonly="readonly"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-readonly="readonly ? '' : undefined"
    data-slot="grid"
    role="application"
    tabindex="-1"
  >
    <slot />
  </Primitive>
</template>
