<script setup lang="ts">
import { useCombinedPropsEmits } from '@soybean-ui/primitives';
import type { AvatarEmits, AvatarProps } from '../types';
import SAvatarRoot from './avatar-root.vue';
import SAvatarImage from './avatar-image.vue';
import SAvatarFallback from './avatar-fallback.vue';

defineOptions({
  name: 'SAvatar'
});

const { class: cls, size, ui, fallbackLabel, ...delegatedImageProps } = defineProps<AvatarProps>();

const emit = defineEmits<AvatarEmits>();

const forwardedImage = useCombinedPropsEmits(delegatedImageProps, emit);
</script>

<template>
  <SAvatarRoot :class="cls || ui?.root" :size="size">
    <slot>
      <slot name="image">
        <SAvatarImage v-bind="forwardedImage" :class="ui?.image" />
      </slot>
      <SAvatarFallback :class="ui?.fallback">
        <slot name="fallback">{{ fallbackLabel }}</slot>
      </SAvatarFallback>
    </slot>
  </SAvatarRoot>
</template>
