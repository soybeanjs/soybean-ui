<script setup lang="ts">
import { computed, ref } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ImageRoot, provideImageUi } from '@soybeanjs/headless/image';
import { imageVariants } from '@/styles/image';
import { SIcon } from '../icon';
import { SSpinner } from '../spinner';
import SImagePreview from './image-preview.vue';
import type { ImageProps } from './types';

defineOptions({
  name: 'SImage'
});

const props = withDefaults(defineProps<ImageProps>(), {
  src: undefined,
  alt: '',
  fallback: undefined,
  loading: 'eager',
  fit: 'cover',
  preview: false,
  rounded: false,
  dir: undefined
});

const forwardedProps = useOmitProps(props, ['class', 'ui', 'fit', 'rounded', 'previewSrc']);

const ui = computed(() => imageVariants({ fit: props.fit, rounded: props.rounded }, props.ui, { root: props.class }));

provideImageUi(ui);

const previewOpen = ref(false);
</script>

<template>
  <ImageRoot v-bind="forwardedProps" @preview="previewOpen = true">
    <template #placeholder>
      <slot name="placeholder">
        <div :class="ui.placeholder">
          <SSpinner class="size-5" />
        </div>
      </slot>
    </template>
    <template #error>
      <slot name="error">
        <div :class="ui.error">
          <SIcon icon="lucide:image-off" class="size-5" />
        </div>
      </slot>
    </template>
    <template #mask>
      <slot name="mask">
        <div :class="ui.mask">
          <SIcon icon="lucide:zoom-in" class="size-5" />
        </div>
      </slot>
    </template>
  </ImageRoot>
  <SImagePreview v-if="preview" v-model:open="previewOpen" :src="previewSrc ?? src" :alt="alt" />
</template>
