<script setup lang="ts">
import { useDirection } from '../config-provider/context';
import { providePopperRootContext } from './context';
import type { PopperRootProps } from './types';

defineOptions({
  name: 'PopperRoot',
  inheritAttrs: false
});

const props = defineProps<PopperRootProps>();

const dir = useDirection(() => props.dir);

providePopperRootContext({ dir });
</script>

<template>
  <slot />
</template>
