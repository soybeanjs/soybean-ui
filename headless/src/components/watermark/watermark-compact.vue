<script setup lang="ts">
import { useOmitProps } from '../../composables';
import WatermarkOverlay from './watermark-overlay.vue';
import WatermarkRoot from './watermark-root.vue';
import type { WatermarkCompactProps } from './types';

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
