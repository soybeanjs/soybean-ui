<script setup lang="ts">
import { onBeforeUnmount, watchEffect } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { usePopperV2RootContext, usePopperV2Ui } from './context';
import type { PopperV2AnchorProps } from './types';

defineOptions({
  name: 'PopperV2Anchor'
});

const props = defineProps<PopperV2AnchorProps>();

const forwardedProps = useOmitProps(props, ['reference']);

const cls = usePopperV2Ui('anchor');

const { dir, onAnchorElementChange, registerCustomAnchor } = usePopperV2RootContext('PopperV2Anchor');
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
  <Primitive v-bind="forwardedProps" :ref="setAnchorElement" data-soybean-popper-v2-anchor :class="cls" :dir="dir">
    <slot />
  </Primitive>
</template>
