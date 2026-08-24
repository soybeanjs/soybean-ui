<script setup lang="ts">
import PopperV2Root from './popper-v2-root.vue';
import type { PopperV2OpenChangeReason, PopperV2SubEmits, PopperV2SubProps, PopperV2SubSlots } from './types';

defineOptions({
  name: 'PopperV2Sub',
  inheritAttrs: false
});

const props = withDefaults(defineProps<PopperV2SubProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false
});

const emit = defineEmits<PopperV2SubEmits>();

defineSlots<PopperV2SubSlots>();

function onOpenChange(value: boolean, reason: PopperV2OpenChangeReason) {
  emit('update:open', value, reason);
}
</script>

<template>
  <PopperV2Root v-slot="slotProps" v-bind="props" @update:open="onOpenChange">
    <slot v-bind="slotProps" />
  </PopperV2Root>
</template>
