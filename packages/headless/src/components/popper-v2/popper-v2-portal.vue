<script setup lang="ts">
import { Portal } from '../portal';
import type { PopperV2PortalProps } from './types';

defineOptions({
  name: 'PopperV2Portal'
});

const props = defineProps<PopperV2PortalProps>();
</script>

<template>
  <Portal v-bind="props">
    <slot />
  </Portal>
</template>
