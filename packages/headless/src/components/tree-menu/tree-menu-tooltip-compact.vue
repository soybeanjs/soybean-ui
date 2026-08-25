<script setup lang="ts">
import { computed } from 'vue';
import { providePopperV2Ui } from '../popper-v2/context';
import { useForwardListeners } from '../../composables';
import TooltipCompact from '../tooltip/tooltip-compact.vue';
import type { TooltipCompactProps, TooltipCompactEmits, TooltipCompactSlots } from '../tooltip/types';
import { useTreeMenuUi } from './context';

defineOptions({
  name: 'TreeMenuTooltipCompact'
});

const props = withDefaults(defineProps<TooltipCompactProps>(), {
  open: undefined,
  defaultOpen: false,
  showArrow: true
});

const emit = defineEmits<TooltipCompactEmits>();

defineSlots<TooltipCompactSlots>();

const listeners = useForwardListeners(emit);

const ui = useTreeMenuUi();

const tooltipUi = computed(() => ({
  positioner: ui.value?.tooltipPositioner,
  popup: ui.value?.tooltipPopup,
  arrow: ui.value?.tooltipArrow
}));

providePopperV2Ui(tooltipUi);
</script>

<template>
  <TooltipCompact v-bind="props" v-on="listeners">
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot></slot>
  </TooltipCompact>
</template>
