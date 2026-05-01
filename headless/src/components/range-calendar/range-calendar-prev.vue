<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarPrevProps } from './types';

defineOptions({
  name: 'RangeCalendarPrev'
});

const props = withDefaults(defineProps<RangeCalendarPrevProps>(), {
  as: 'button',
  prevPage: undefined
});

defineSlots<{
  default?: (props: { disabled: boolean }) => any;
}>();

const cls = useRangeCalendarUi('prev');
const { disabled: rootDisabled, isPrevButtonDisabled, prevPage } = useRangeCalendarRootContext('RangeCalendarPrev');

const disabled = computed(() => rootDisabled.value || isPrevButtonDisabled(props.prevPage));

const onClick = () => {
  if (disabled.value) {
    return;
  }

  prevPage(props.prevPage);
};
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-disabled="as === 'button' ? undefined : disabled || undefined"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :type="as === 'button' ? 'button' : undefined"
    aria-label="Previous page"
    data-slot="prev"
    @click="onClick"
  >
    <slot :disabled="disabled">Prev page</slot>
  </Primitive>
</template>
