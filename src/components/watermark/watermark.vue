<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { WatermarkCompact, provideWatermarkUi } from '@soybeanjs/headless/watermark';
import { watermarkVariants } from '@/styles/watermark';
import type { WatermarkProps } from './types';

defineOptions({
  name: 'SWatermark'
});

const props = defineProps<WatermarkProps>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'fullscreen']);

const ui = computed(() =>
  watermarkVariants(
    {
      fullscreen: props.fullscreen
    },
    props.ui,
    { root: props.class }
  )
);

provideWatermarkUi(ui);
</script>

<template>
  <WatermarkCompact v-bind="forwardedProps">
    <slot />
  </WatermarkCompact>
</template>
