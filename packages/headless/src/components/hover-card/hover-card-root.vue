<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { PopperV2Root } from '../popper-v2';
import type { PopperV2OpenChangeReason } from '../popper-v2/types';
import { provideHoverCardRootContext } from './context';
import type { HoverCardRootProps, HoverCardRootEmits } from './types';

defineOptions({
  name: 'HoverCardRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  defaultOpen: false,
  open: undefined,
  openDelay: 700,
  closeDelay: 300
});

const emit = defineEmits<HoverCardRootEmits>();

provideHoverCardRootContext(transformPropsToContext(props, ['openDelay', 'closeDelay']));

function onUpdateOpen(value: boolean, reason?: PopperV2OpenChangeReason) {
  emit('update:open', value, reason);
}
</script>

<template>
  <PopperV2Root :dir="dir" :modal="false" :open="props.open" :default-open="defaultOpen" @update:open="onUpdateOpen">
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </PopperV2Root>
</template>
