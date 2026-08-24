<script setup lang="ts">
import { PopperV2Anchor } from '../popper-v2';
import type { PopoverAnchorProps } from './types';

defineOptions({
  name: 'PopoverAnchor'
});

const props = defineProps<PopoverAnchorProps>();
</script>

<template>
  <PopperV2Anchor v-bind="props" data-soybean-popover-anchor>
    <slot />
  </PopperV2Anchor>
</template>
