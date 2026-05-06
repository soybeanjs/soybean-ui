<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { useCalendarRootContext, useCalendarUi } from './context';
import type { CalendarPrevProps } from './types';

defineOptions({
  name: 'CalendarPrev'
});

const props = defineProps<CalendarPrevProps>();

const cls = useCalendarUi('prev');
const { disabled: rootDisabled, isPrevButtonDisabled, prevPage } = useCalendarRootContext('CalendarPrev');

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
