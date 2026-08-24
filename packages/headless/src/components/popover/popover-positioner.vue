<script setup lang="ts">
import { usePopperV2RootContext } from '../popper-v2/context';
import { useForwardListeners, useHideOthers } from '../../composables';
import { PopperV2Positioner } from '../popper-v2';
import type { PopoverPositionerProps, PopoverPositionerEmits } from './types';

defineOptions({
  name: 'PopoverPositioner'
});

const props = defineProps<PopoverPositionerProps>();

const emit = defineEmits<PopoverPositionerEmits>();

const listeners = useForwardListeners(emit);

const { modal, positionerElement } = usePopperV2RootContext('PopoverPositioner');

// The dialog domain hides the background context while a modal popover is open.
useHideOthers(positionerElement, modal);
</script>

<template>
  <PopperV2Positioner v-bind="props" data-soybean-popover-positioner v-on="listeners">
    <slot />
  </PopperV2Positioner>
</template>
