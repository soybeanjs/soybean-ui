<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { PopperCompact, providePopperUi } from '@soybeanjs/headless/popper';
import { popperVariants } from '@/styles/popper';
import type { PopperEmits, PopperProps, PopperSlots } from './types';

defineOptions({
  name: 'SPopper'
});

const props = withDefaults(defineProps<PopperProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: undefined,
  openOnFocus: undefined,
  showArrow: true
});

const emit = defineEmits<PopperEmits>();

defineSlots<PopperSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const ui = computed(() => popperVariants({ size: props.size }, props.ui, { popup: props.class }));

providePopperUi(ui);
</script>

<template>
  <PopperCompact v-bind="forwardedProps" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
  </PopperCompact>
</template>
