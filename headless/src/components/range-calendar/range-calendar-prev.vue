<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { useRangeCalendarRootContext, useRangeCalendarUi } from './context';
import type { RangeCalendarPrevProps } from './types';

defineOptions({
  name: 'RangeCalendarPrev'
});

const props = defineProps<RangeCalendarPrevProps>();

const cls = useRangeCalendarUi('prev');
const { disabled: rootDisabled, isPrevButtonDisabled, prevPage } = useRangeCalendarRootContext('RangeCalendarPrev');

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
