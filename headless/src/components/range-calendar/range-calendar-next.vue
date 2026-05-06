<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarNextProps } from './types';

defineOptions({
  name: 'RangeCalendarNext'
});

const props = defineProps<RangeCalendarNextProps>();

const cls = useRangeCalendarUi('next');
const { disabled: rootDisabled, isNextButtonDisabled, nextPage } = useRangeCalendarRootContext('RangeCalendarNext');

const disabled = computed(() => rootDisabled.value || isNextButtonDisabled(props.nextPage) || props.disabled);

const onClick = () => {
  nextPage(props.nextPage);
};
</script>

<template>
  <Button v-bind="props" :class="cls" :disabled="disabled" aria-label="Next page" data-slot="next" @click="onClick">
    <slot :disabled="disabled">Next page</slot>
  </Button>
</template>
