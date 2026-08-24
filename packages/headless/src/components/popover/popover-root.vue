<script setup lang="ts">
import { PopperV2Root } from '../popper-v2';
import type { PopoverRootProps, PopoverRootEmits } from './types';

defineOptions({
  name: 'PopoverRoot',
  inheritAttrs: false
});

const props = defineProps<PopoverRootProps>();

const emit = defineEmits<PopoverRootEmits>();

function onOpenChange(value: boolean) {
  emit('update:open', value);
}
</script>

<template>
  <PopperV2Root v-slot="slotProps" v-bind="props" @update:open="onOpenChange">
    <slot v-bind="slotProps" />
  </PopperV2Root>
</template>
