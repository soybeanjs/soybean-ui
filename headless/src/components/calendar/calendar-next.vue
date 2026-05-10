<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/button.vue';
import { useCalendarRootContext, useCalendarUi } from './context';
import { useLocaleMessages } from '../../locale';
import type { CalendarNextProps } from './types';

defineOptions({
  name: 'CalendarNext'
});

const props = defineProps<CalendarNextProps>();

const cls = useCalendarUi('next');
const { disabled: rootDisabled, isNextButtonDisabled, nextPage } = useCalendarRootContext('CalendarNext');
const messages = useLocaleMessages();

const disabled = computed(() => rootDisabled.value || isNextButtonDisabled(props.nextPage) || props.disabled);

const onClick = () => {
  nextPage(props.nextPage);
};
</script>

<template>
  <Button
    v-bind="props"
    data-soybean-calendar-next
    :class="cls"
    :disabled="disabled"
    :aria-label="messages.calendar.nextPage"
    @click="onClick"
  >
    <slot :disabled="disabled">{{ messages.calendar.nextPage }}</slot>
  </Button>
</template>
