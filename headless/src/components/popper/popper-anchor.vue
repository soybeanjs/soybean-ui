<script setup lang="ts">
import { watchEffect } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { usePopperRootContext } from './context';
import type { PopperAnchorProps } from './types';

defineOptions({
  name: 'PopperAnchor'
});

const props = defineProps<PopperAnchorProps>();

const forwardedProps = useOmitProps(props, ['reference']);

const { onAnchorElementChange } = usePopperRootContext('PopperAnchor');
const [_, setAnchorElement] = useForwardElement(el => {
  if (props.reference) return;

  onAnchorElementChange(el);
});

watchEffect(() => {
  if (props.reference) {
    onAnchorElementChange(props.reference);
  }
});
</script>

<template>
  <Primitive v-bind="forwardedProps" :ref="setAnchorElement">
    <slot />
  </Primitive>
</template>
