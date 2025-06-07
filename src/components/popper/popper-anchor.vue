<script setup lang="ts">
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
  onAnchorElementChange(props.reference ?? el);
});
</script>

<template>
  <Primitive v-bind="forwardedProps" :ref="setAnchorElement">
    <slot />
  </Primitive>
</template>
