<script setup lang="ts">
import { watchPostEffect } from 'vue';
import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { usePopperRootContext } from './context';
import type { PopperAnchorProps } from './types';

defineOptions({
  name: 'PopperAnchor'
});

const props = defineProps<PopperAnchorProps>();

const [anchorElement, setAnchorElement] = useForwardElement();
const { onAnchorElementChange } = usePopperRootContext('PopperAnchor');

watchPostEffect(() => {
  onAnchorElementChange(props.reference ?? anchorElement.value);
});
</script>

<template>
  <Primitive v-bind="props" :ref="setAnchorElement">
    <slot />
  </Primitive>
</template>
