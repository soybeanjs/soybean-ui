<script setup lang="ts">
import { computed } from 'vue';

import { Primitive } from '../primitive';

import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarGridProps } from './types';

defineOptions({
  name: 'RangeCalendarGrid'
});

withDefaults(defineProps<RangeCalendarGridProps>(), {
  as: 'table'
});

const cls = useRangeCalendarUi('grid');
const rootContext = useRangeCalendarRootContext('RangeCalendarGrid');

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
