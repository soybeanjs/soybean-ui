<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { PopperRoot } from '../popper';
import type { PopperOpenChangeReason } from '../popper/types';
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

function onUpdateOpen(value: boolean, reason?: PopperOpenChangeReason) {
  emit('update:open', value, reason);
}
</script>

<template>
  <PopperRoot :dir="dir" :modal="false" :open="props.open" :default-open="defaultOpen" @update:open="onUpdateOpen">
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </PopperRoot>
</template>
