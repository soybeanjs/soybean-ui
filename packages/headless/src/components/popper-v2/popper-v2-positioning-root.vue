<script setup lang="ts">
import { useDirection } from '../config-provider/context';
import { providePopperV2PositioningRootContext } from './context';
import type { PopperV2PositioningRootProps } from './types';

defineOptions({
  name: 'PopperV2PositioningRoot',
  inheritAttrs: false
});

const props = defineProps<PopperV2PositioningRootProps>();

const dir = useDirection(() => props.dir);

providePopperV2PositioningRootContext({ dir });
</script>

<template>
  <slot />
</template>
