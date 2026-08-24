<script setup lang="ts">
import { onBeforeUnmount, watchEffect } from 'vue';
import { useForwardElement, useOmitProps } from '@soybeanjs/headless/composables';
import { Primitive } from '@soybeanjs/headless/primitive';
import { useEpRootContext, useEpUi } from './context';
import type { EpAnchorProps } from './types';

defineOptions({
  name: 'EpAnchor'
});

const props = defineProps<EpAnchorProps>();

const forwardedProps = useOmitProps(props, ['reference']);

const cls = useEpUi('anchor');

const { dir, onAnchorElementChange, registerCustomAnchor } = useEpRootContext('EpAnchor');
const unregister = registerCustomAnchor();
const [_, setAnchorElement] = useForwardElement(el => {
  if (props.reference) return;

  onAnchorElementChange(el);
});

watchEffect(() => {
  if (props.reference) {
    onAnchorElementChange(props.reference);
  }
});

onBeforeUnmount(unregister);
</script>

<template>
  <Primitive v-bind="forwardedProps" :ref="setAnchorElement" data-soybean-ep-anchor :class="cls" :dir="dir">
    <slot />
  </Primitive>
</template>
