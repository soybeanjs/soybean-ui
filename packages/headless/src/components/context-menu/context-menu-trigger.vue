<script setup lang="ts">
import { PopperV2Trigger } from '../popper-v2';
import { useContextMenuRootContext } from './context';
import type { ContextMenuTriggerProps } from './types';

defineOptions({
  name: 'ContextMenuTrigger'
});

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  as: 'span'
});

const { pressOpenDelay } = useContextMenuRootContext('ContextMenuTrigger');
</script>

<template>
  <PopperV2Trigger
    v-bind="props"
    trigger="contextmenu"
    :reference="props.reference ?? undefined"
    :press-open-delay="pressOpenDelay"
    aria-mode="none"
    data-soybean-context-menu-trigger
  >
    <slot />
  </PopperV2Trigger>
</template>
