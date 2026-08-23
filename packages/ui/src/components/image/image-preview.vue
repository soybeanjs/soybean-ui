<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ImagePreview, provideImagePreviewUi } from '@soybeanjs/headless/image';
import type { ImagePreviewEmits } from '@soybeanjs/headless/image';
import { imagePreviewVariants } from '@/styles/image';
import { SIcon } from '../icon';
import type { ImagePreviewProps } from './types';

defineOptions({
  name: 'SImagePreview'
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

const forwardedProps = useOmitProps(props, ['class', 'ui']);

const ui = computed(() => imagePreviewVariants({}, props.ui, { root: props.class }));

provideImagePreviewUi(ui);
</script>

<template>
  <ImagePreview v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <template #toolbar="{ zoomIn, zoomOut, reset, rotate, close }">
      <div :class="ui.toolbar">
        <button type="button" aria-label="Zoom out" :class="ui.toolbarButton" @click="zoomOut">
          <SIcon icon="lucide:zoom-out" class="size-4" />
        </button>
        <button type="button" aria-label="Zoom in" :class="ui.toolbarButton" @click="zoomIn">
          <SIcon icon="lucide:zoom-in" class="size-4" />
        </button>
        <button type="button" aria-label="Rotate" :class="ui.toolbarButton" @click="rotate">
          <SIcon icon="lucide:rotate-cw" class="size-4" />
        </button>
        <button type="button" aria-label="Reset" :class="ui.toolbarButton" @click="reset">
          <SIcon icon="lucide:maximize" class="size-4" />
        </button>
        <button type="button" aria-label="Close" :class="ui.toolbarButton" @click="close">
          <SIcon icon="lucide:x" class="size-4" />
        </button>
      </div>
    </template>
  </ImagePreview>
</template>
