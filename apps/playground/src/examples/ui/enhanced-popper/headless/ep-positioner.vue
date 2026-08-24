<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardListeners, usePresence } from '@soybeanjs/headless/composables';
import { useEpRootContext } from './context';
import EpPositionerImpl from './ep-positioner-impl.vue';
import type { EpPositionerEmits, EpPositionerProps } from './types';

defineOptions({
  name: 'EpPositioner'
});

const props = defineProps<EpPositionerProps>();

const emit = defineEmits<EpPositionerEmits>();

const listeners = useForwardListeners(emit);

const { open, popupElement } = useEpRootContext('EpPositioner');
const isPresent = props.forceMount ? shallowRef(true) : usePresence(popupElement, open);
</script>

<template>
  <EpPositionerImpl v-if="isPresent" v-bind="props" data-soybean-ep-positioner v-on="listeners">
    <slot />
  </EpPositionerImpl>
</template>
