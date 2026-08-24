<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardListeners, usePresence } from '../../composables';
import { usePopperV2RootContext } from './context';
import PopperV2PositionerImpl from './popper-v2-positioner-impl.vue';
import type { PopperV2PositionerEmits, PopperV2PositionerProps } from './types';

defineOptions({
  name: 'PopperV2Positioner'
});

const props = defineProps<PopperV2PositionerProps>();

const emit = defineEmits<PopperV2PositionerEmits>();

const listeners = useForwardListeners(emit);

const { open, popupElement } = usePopperV2RootContext('PopperV2Positioner');
const isPresent = props.forceMount ? shallowRef(true) : usePresence(popupElement, open);
</script>

<template>
  <PopperV2PositionerImpl v-if="isPresent" v-bind="props" data-soybean-popper-v2-positioner v-on="listeners">
    <slot />
  </PopperV2PositionerImpl>
</template>
