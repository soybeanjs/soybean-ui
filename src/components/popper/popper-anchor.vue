<script setup lang="ts">
import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { usePopperRootContext } from './context';
import type { PopperAnchorProps } from './types';

defineOptions({
  name: 'PopperAnchor'
});

const props = defineProps<PopperAnchorProps>();

const { onAnchorElementChange } = usePopperRootContext('PopperAnchor');
const [_, setAnchorElement] = useForwardElement(el => {
  onAnchorElementChange(props.reference ?? el);
});
</script>

<template>
  <Primitive v-bind="props" :ref="setAnchorElement">
    <slot />
  </Primitive>
</template>
