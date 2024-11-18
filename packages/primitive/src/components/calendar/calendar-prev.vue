<script setup lang="ts">
import { computed } from 'vue';
import Primitive from '../primitive/primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarPrevPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarPrev'
});

const { class: className, as = 'button', prevPage } = defineProps<CalendarPrevPropsWithPrimitive>();

const { disabled, prevPage: prevPageFn, isPrevButtonDisabled } = injectCalendarRootContext();

const tag = computed(() => (as === 'button' ? 'button' : undefined));

const dataDisabled = computed(() => disabled.value || isPrevButtonDisabled(prevPage));

function handleClick() {
  prevPageFn(prevPage);
}
</script>

<template>
  <Primitive
    aria-label="Previous page"
    :class="className"
    :as
    :as-child
    :type="tag"
    :aria-disabled="disabled || undefined"
    :data-disabled="dataDisabled || undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>Prev page</slot>
  </Primitive>
</template>
