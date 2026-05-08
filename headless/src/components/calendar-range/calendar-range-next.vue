<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { useCalendarRangeRootContext, useCalendarRangeUi } from './context';
import type { CalendarRangeNextProps } from './types';

defineOptions({
  name: 'CalendarRangeNext'
});

const props = defineProps<CalendarRangeNextProps>();

const cls = useCalendarRangeUi('next');
const { disabled: rootDisabled, isNextButtonDisabled, nextPage } = useCalendarRangeRootContext('CalendarRangeNext');

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
