<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarNextPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarNext'
});

const props = withDefaults(defineProps<CalendarNextPropsWithPrimitive>(), {
  as: 'button'
});

const { disabled: ctxDisabled, nextPage, isNextButtonDisabled } = injectCalendarRootContext();

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const disabled = computed(() => ctxDisabled.value || isNextButtonDisabled(props.nextPage));

const ariaDisabled = computed(() => disabled.value || undefined);

function handleClick() {
  nextPage(props.nextPage);
}
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :type="tag"
    :aria-disabled="ariaDisabled"
    aria-label="Next page"
    :data-disabled="ariaDisabled"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>Next page</slot>
  </Primitive>
</template>
