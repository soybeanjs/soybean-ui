<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { useCalendarRootContext, useCalendarUi } from './context';
import type { CalendarNextProps } from './types';

defineOptions({
  name: 'CalendarNext'
});

const props = defineProps<CalendarNextProps>();

const cls = useCalendarUi('next');
const { disabled: rootDisabled, isNextButtonDisabled, nextPage } = useCalendarRootContext('CalendarNext');

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
