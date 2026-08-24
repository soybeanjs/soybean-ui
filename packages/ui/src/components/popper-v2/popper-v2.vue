<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { PopperV2Compact, providePopperV2Ui } from '@soybeanjs/headless/popper-v2';
import { popperV2Variants } from '@/styles/popper-v2';
import type { PopperV2Emits, PopperV2Props, PopperV2Slots } from './types';

defineOptions({
  name: 'SPopperV2'
});

const props = withDefaults(defineProps<PopperV2Props>(), {
  open: undefined,
  defaultOpen: false,
  modal: undefined,
  openOnFocus: undefined,
  showArrow: true
});

const emit = defineEmits<PopperV2Emits>();

defineSlots<PopperV2Slots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);
const listeners = useForwardListeners(emit);

const ui = computed(() => popperV2Variants({ size: props.size }, props.ui, { popup: props.class }));

providePopperV2Ui(ui);
</script>

<template>
  <PopperV2Compact v-bind="forwardedProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>

    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </PopperV2Compact>
</template>
