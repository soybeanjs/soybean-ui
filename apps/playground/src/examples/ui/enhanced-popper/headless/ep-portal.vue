<script setup lang="ts">
import { Portal } from '@soybeanjs/headless/portal';
import type { EpPortalProps } from './types';

defineOptions({
  name: 'EpPortal'
});

const props = defineProps<EpPortalProps>();
</script>

<template>
  <Portal v-bind="props">
    <slot />
  </Portal>
</template>
