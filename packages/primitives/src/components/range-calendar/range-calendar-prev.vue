<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import type { RangeCalendarPrevPropsWithPrimitive } from './types';
import { injectRangeCalendarRootContext } from './context';

defineOptions({
  name: 'RangeCalendarPrev'
});

const props = withDefaults(defineProps<RangeCalendarPrevPropsWithPrimitive>(), {
  as: 'button'
});

const rootContext = injectRangeCalendarRootContext();
const disabled = computed(() => rootContext.disabled.value || rootContext.isPrevButtonDisabled(props.prevPage));
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="Previous page"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="rootContext.prevPage(props.prevPage)"
  >
    <slot :disabled="disabled">Prev page</slot>
  </Primitive>
</template>
