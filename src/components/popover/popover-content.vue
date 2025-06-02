<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useHideOthers, usePresence } from '../../composables';
import { useDialogContentListeners } from '../dialog/shared';
import { usePopoverRootContext } from './context';
import PopoverContentImpl from './popover-content-impl.vue';
import type { PopoverContentEmits, PopoverContentProps } from './types';

defineOptions({
  name: 'PopoverContent'
});

const props = defineProps<PopoverContentProps>();

const emit = defineEmits<PopoverContentEmits>();

const { contentElement, open, modal, triggerElement } = usePopoverRootContext('PopoverContent');

useHideOthers(contentElement, modal);

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const trapFocus = computed(() => modal.value && open.value);

const listeners = useDialogContentListeners({
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
    v-on="listeners"
  >
    <slot />
  </PopoverContentImpl>
</template>
