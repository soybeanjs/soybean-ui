<script setup lang="ts">
import { useOmitProps } from '../../composables';
import type { WatermarkCompactProps } from './types';
import WatermarkOverlay from './watermark-overlay.vue';
import WatermarkRoot from './watermark-root.vue';

defineOptions({
  name: 'WatermarkCompact'
});

const props = defineProps<WatermarkCompactProps>();

const forwardedProps = useOmitProps(props, ['overlayProps']);
</script>

<template>
  <WatermarkRoot v-bind="forwardedProps">
    <slot />
    <WatermarkOverlay v-bind="overlayProps" />
  </WatermarkRoot>
</template>
