<script setup lang="ts">
import { usePopperRootContext } from '../popper/context';
import { useForwardListeners, useHideOthers } from '../../composables';
import { PopperPositioner } from '../popper';
import type { PopoverPositionerProps, PopoverPositionerEmits } from './types';

defineOptions({
  name: 'PopoverPositioner'
});

const props = defineProps<PopoverPositionerProps>();

const emit = defineEmits<PopoverPositionerEmits>();

const listeners = useForwardListeners(emit);

const { modal, positionerElement } = usePopperRootContext('PopoverPositioner');

// The dialog domain hides the background context while a modal popover is open.
useHideOthers(positionerElement, modal);
</script>

<template>
  <PopperPositioner v-bind="props" data-soybean-popover-positioner v-on="listeners">
    <slot />
  </PopperPositioner>
</template>
