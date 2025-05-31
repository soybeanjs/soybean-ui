<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { usePresence } from '../../composables';
import { useDialogContentEvents } from '../dialog/shared';
import { usePopoverRootContext } from './context';
import PopoverContentImpl from './popover-content-impl.vue';
import type { PopoverContentEmits, PopoverContentProps } from './types';

defineOptions({
  name: 'PopoverContent'
});

const props = defineProps<PopoverContentProps>();

const emit = defineEmits<PopoverContentEmits>();

const { contentElement, open, modal, triggerElement } = usePopoverRootContext('PopoverContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const trapFocus = computed(() => modal.value && open.value);

const events = useDialogContentEvents({
  modal,
  triggerElement,
  emit
});
</script>

<template>
  <PopoverContentImpl
    v-if="isPresent"
    v-bind="props"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="modal"
    v-on="events"
  >
    <slot />
  </PopoverContentImpl>
</template>
