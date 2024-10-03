<script setup lang="ts">
import SAvatarRoot from './avatar-root.vue';
import SAvatarImage from './avatar-image.vue';
import SAvatarFallback from './avatar-fallback.vue';
import type { AvatarEmits, AvatarProps } from './types';

defineOptions({
  name: 'SAvatar'
});

const { class: rootClass } = defineProps<AvatarProps>();

const emit = defineEmits<AvatarEmits>();
</script>

<template>
  <SAvatarRoot :size :class="rootClass">
    <slot>
      <slot name="image">
        <SAvatarImage
          :class="imageClass"
          :src
          :alt
          :delay-ms
          @loading-status-change="emit('loadingStatusChange', $event)"
        />
      </slot>
      <SAvatarFallback :class="fallbackClass">
        <slot name="fallback">{{ fallbackLabel }}</slot>
      </SAvatarFallback>
    </slot>
  </SAvatarRoot>
</template>

<style scoped></style>
