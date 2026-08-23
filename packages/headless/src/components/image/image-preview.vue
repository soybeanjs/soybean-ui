<script setup lang="ts">
import { computed, ref, watchEffect, onWatcherCleanup } from 'vue';
import { useBodyScrollLock, useControllableState, useEscapeKeyDown } from '../../composables';
import Portal from '../portal/portal.vue';
import { useImagePreviewUi } from './context';
import type { ImagePreviewEmits, ImagePreviewProps } from './types';

defineOptions({
  name: 'ImagePreview'
});

const props = withDefaults(defineProps<ImagePreviewProps>(), {
  open: undefined,
  defaultOpen: false,
  src: undefined,
  alt: '',
  initialZoom: 1,
  initialRotate: 0,
  dir: undefined
});

const emit = defineEmits<ImagePreviewEmits>();

const rootCls = useImagePreviewUi('root');
const backdropCls = useImagePreviewUi('backdrop');
const imageCls = useImagePreviewUi('image');

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  props.defaultOpen
);

const zoom = ref(props.initialZoom);
const rotateDeg = ref(props.initialRotate);

watchEffect(() => {
  if (open.value) {
    zoom.value = props.initialZoom;
    rotateDeg.value = props.initialRotate;
  }
});

const previewStyle = computed(() => ({
  '--soybean-image-preview-zoom': String(zoom.value),
  '--soybean-image-preview-rotate': `${rotateDeg.value}deg`
}));

function zoomIn() {
  zoom.value = Math.min(zoom.value * 1.25, 4);
}

function zoomOut() {
  zoom.value = Math.max(zoom.value / 1.25, 0.25);
}

function reset() {
  zoom.value = props.initialZoom;
  rotateDeg.value = props.initialRotate;
}

function rotate() {
  rotateDeg.value = (rotateDeg.value + 90) % 360;
}

function close() {
  open.value = false;
}

watchEffect(() => {
  if (open.value) {
    const cleanup = useBodyScrollLock();
    onWatcherCleanup(cleanup);
  }
});

useEscapeKeyDown(
  () => document,
  () => {
    if (open.value) close();
  }
);
</script>

<template>
  <Portal>
    <div
      v-if="open"
      data-soybean-image-preview
      role="dialog"
      aria-modal="true"
      :aria-label="alt || 'Image preview'"
      :dir="dir"
      :style="previewStyle"
      :class="rootCls"
    >
      <div data-soybean-image-preview-backdrop :class="backdropCls" @click="close" />
      <img data-soybean-image-preview-img :src="src" :alt="alt" :class="imageCls" />
      <slot
        name="toolbar"
        :zoom-in="zoomIn"
        :zoom-out="zoomOut"
        :reset="reset"
        :rotate="rotate"
        :close="close"
        :zoom="zoom"
        :rotate-deg="rotateDeg"
      />
    </div>
  </Portal>
</template>
