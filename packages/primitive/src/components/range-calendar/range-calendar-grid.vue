<script setup lang="ts">
import { computed } from 'vue';
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';
import { injectRangeCalendarRootContext } from './range-calendar-root.vue';

export interface RangeCalendarGridProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarGridProps>(), { as: 'table' });

const rootContext = injectRangeCalendarRootContext();

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
