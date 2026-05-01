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
const { disabled, readonly } = useRangeCalendarRootContext('RangeCalendarGrid');

const disabledAttr = computed(() => (disabled.value ? true : undefined));
const readonlyAttr = computed(() => (readonly.value ? true : undefined));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-disabled="disabledAttr"
    :aria-readonly="readonlyAttr"
    :class="cls"
    :data-disabled="disabledAttr ? '' : undefined"
    :data-readonly="readonlyAttr ? '' : undefined"
    data-slot="grid"
    role="application"
    tabindex="-1"
  >
    <slot />
  </Primitive>
</template>
