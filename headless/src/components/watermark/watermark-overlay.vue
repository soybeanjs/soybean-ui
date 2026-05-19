<script setup lang="ts">
import { useWatermarkRootContext, useWatermarkUi } from './context';
import type { WatermarkOverlayProps } from './types';

defineOptions({
  name: 'WatermarkOverlay'
});

defineProps<WatermarkOverlayProps>();

const cls = useWatermarkUi('overlay');
const { overlayStyle } = useWatermarkRootContext('WatermarkOverlay');
</script>

<template>
  <div v-if="overlayStyle" data-soybean-watermark-overlay :class="cls" :style="overlayStyle" aria-hidden="true" />
</template>
