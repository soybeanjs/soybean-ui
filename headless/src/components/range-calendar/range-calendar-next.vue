<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarNextProps } from './types';

defineOptions({
  name: 'RangeCalendarNext'
});

const props = withDefaults(defineProps<RangeCalendarNextProps>(), {
  as: 'button',
  nextPage: undefined
});

defineSlots<{
  default?: (props: { disabled: boolean }) => any;
}>();

const cls = useRangeCalendarUi('next');
const { disabled: rootDisabled, isNextButtonDisabled, nextPage } = useRangeCalendarRootContext('RangeCalendarNext');

const disabled = computed(() => rootDisabled.value || isNextButtonDisabled(props.nextPage));

const onClick = () => {
  if (disabled.value) {
    return;
  }

  nextPage(props.nextPage);
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
    aria-label="Next page"
    data-slot="next"
    @click="onClick"
  >
    <slot :disabled="disabled">Next page</slot>
  </Primitive>
</template>
