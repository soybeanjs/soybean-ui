<script setup lang="ts">
import { computed } from 'vue';
import Primitive from '../primitive/primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarNextPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarNext'
});

const { class: className, as = 'button', nextPage } = defineProps<CalendarNextPropsWithPrimitive>();

const { disabled, nextPage: nextPageFn, isNextButtonDisabled } = injectCalendarRootContext();

const dataDisabled = computed(() => disabled.value || isNextButtonDisabled(nextPage));

function handleClick() {
  nextPageFn(nextPage);
}
</script>

<template>
  <Primitive
    :class="className"
    :as
    :as-child
    aria-label="Next page"
    :type="as === 'button' ? 'button' : undefined"
    :aria-disabled="disabled || undefined"
    :data-disabled="dataDisabled || undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>Next page</slot>
  </Primitive>
</template>
