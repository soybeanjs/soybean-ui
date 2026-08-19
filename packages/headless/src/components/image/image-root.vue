<script setup lang="ts">
import { computed } from 'vue';
import { useImageLoadingStatus } from '../../composables';
import { useImageUi } from './context';
import type { ImageRootEmits, ImageRootProps } from './types';

defineOptions({
  name: 'ImageRoot'
});

const props = withDefaults(defineProps<ImageRootProps>(), {
  src: undefined,
  alt: '',
  fallback: undefined,
  loading: 'eager',
  preview: false,
  dir: undefined
});

const emit = defineEmits<ImageRootEmits>();

const rootCls = useImageUi('root');
const imageCls = useImageUi('image');

const status = useImageLoadingStatus({ src: () => props.src ?? '' });

const effectiveSrc = computed(() => (status.value === 'error' && props.fallback ? props.fallback : props.src));

function onImageClick() {
  if (props.preview && status.value === 'loaded') emit('preview');
}
</script>

<template>
  <div
    data-soybean-image-root
    :data-status="status"
    :data-preview="preview ? '' : undefined"
    :dir="dir"
    :class="rootCls"
  >
    <img
      v-if="effectiveSrc"
      data-soybean-image
      :src="effectiveSrc"
      :alt="alt"
      :loading="loading"
      :class="imageCls"
      @click="onImageClick"
    />
    <slot v-if="status === 'loading'" name="placeholder" :status="status" />
    <slot v-if="status === 'error' && !fallback" name="error" :status="status" />
    <slot v-if="preview && status === 'loaded'" name="mask" :status="status" />
  </div>
</template>
