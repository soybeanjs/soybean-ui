<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ImagePreview, provideImagePreviewUi } from '@soybeanjs/headless/image';
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

const emit = defineEmits<{ 'update:open': [value: boolean] }>();

const forwardedProps = useOmitProps(props, ['class', 'ui']);

const ui = computed(() => imagePreviewVariants({}, props.ui, { root: props.class }));

provideImagePreviewUi(ui);
</script>

<template>
  <ImagePreview v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <template #toolbar="{ zoomIn, zoomOut, reset, rotate, close }">
      <div :class="ui.toolbar">
        <button
          type="button"
          aria-label="Zoom out"
          class="inline-flex size-8 items-center justify-center rounded-full transition-colors-150 hover:bg-white/15"
          @click="zoomOut"
        >
          <SIcon icon="lucide:zoom-out" class="size-4" />
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          class="inline-flex size-8 items-center justify-center rounded-full transition-colors-150 hover:bg-white/15"
          @click="zoomIn"
        >
          <SIcon icon="lucide:zoom-in" class="size-4" />
        </button>
        <button
          type="button"
          aria-label="Rotate"
          class="inline-flex size-8 items-center justify-center rounded-full transition-colors-150 hover:bg-white/15"
          @click="rotate"
        >
          <SIcon icon="lucide:rotate-cw" class="size-4" />
        </button>
        <button
          type="button"
          aria-label="Reset"
          class="inline-flex size-8 items-center justify-center rounded-full transition-colors-150 hover:bg-white/15"
          @click="reset"
        >
          <SIcon icon="lucide:maximize" class="size-4" />
        </button>
        <button
          type="button"
          aria-label="Close"
          class="inline-flex size-8 items-center justify-center rounded-full transition-colors-150 hover:bg-white/15"
          @click="close"
        >
          <SIcon icon="lucide:x" class="size-4" />
        </button>
      </div>
    </template>
  </ImagePreview>
</template>
