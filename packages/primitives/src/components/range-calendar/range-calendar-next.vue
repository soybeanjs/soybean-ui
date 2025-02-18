<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import type { RangeCalendarNextPropsWithPrimitive } from './types';
import { injectRangeCalendarRootContext } from './context';

defineOptions({
  name: 'RangeCalendarNext'
});

const props = withDefaults(defineProps<RangeCalendarNextPropsWithPrimitive>(), {
  as: 'button'
});

const rootContext = injectRangeCalendarRootContext();
const disabled = computed(() => rootContext.disabled.value || rootContext.isNextButtonDisabled(props.nextPage));
</script>

<template>
  <Primitive
    v-bind="props"
    aria-label="Next page"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled || undefined"
    :disabled="disabled"
    @click="rootContext.nextPage(props.nextPage)"
  >
    <slot :disabled="disabled">Next page</slot>
  </Primitive>
</template>
