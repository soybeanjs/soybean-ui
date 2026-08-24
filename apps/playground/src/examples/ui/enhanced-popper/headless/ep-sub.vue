<script setup lang="ts">
import EpRoot from './ep-root.vue';
import type { EpOpenChangeReason, EpSubEmits, EpSubProps, EpSubSlots } from './types';

defineOptions({
  name: 'EpSub',
  inheritAttrs: false
});

const props = withDefaults(defineProps<EpSubProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false
});

const emit = defineEmits<EpSubEmits>();

defineSlots<EpSubSlots>();

function onOpenChange(value: boolean, reason: EpOpenChangeReason) {
  emit('update:open', value, reason);
}
</script>

<template>
  <EpRoot v-slot="slotProps" v-bind="props" @update:open="onOpenChange">
    <slot v-bind="slotProps" />
  </EpRoot>
</template>
