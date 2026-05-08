<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { useCalendarRangeRootContext, useCalendarRangeUi } from './context';
import type { CalendarRangePrevProps } from './types';

defineOptions({
  name: 'CalendarRangePrev'
});

const props = defineProps<CalendarRangePrevProps>();

const cls = useCalendarRangeUi('prev');
const { disabled: rootDisabled, isPrevButtonDisabled, prevPage } = useCalendarRangeRootContext('CalendarRangePrev');

const disabled = computed(() => rootDisabled.value || isPrevButtonDisabled(props.prevPage) || props.disabled);

const onClick = () => {
  prevPage(props.prevPage);
};
</script>

<template>
  <Button v-bind="props" :class="cls" :disabled="disabled" aria-label="Previous page" data-slot="prev" @click="onClick">
    <slot :disabled="disabled">Prev page</slot>
  </Button>
</template>
