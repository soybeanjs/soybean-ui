<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarPrevPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarPrev'
});

const props = withDefaults(defineProps<CalendarPrevPropsWithPrimitive>(), {
  as: 'button'
});

const { disabled: ctxDisabled, prevPage, isPrevButtonDisabled } = injectCalendarRootContext();

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const disabled = computed(() => ctxDisabled.value || isPrevButtonDisabled(props.prevPage));

const ariaDisabled = computed(() => disabled.value || undefined);

function handleClick() {
  prevPage(props.prevPage);
}
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :type="tag"
    :aria-disabled="ariaDisabled"
    aria-label="Previous page"
    :data-disabled="ariaDisabled"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot :disabled="disabled">Prev page</slot>
  </Primitive>
</template>
