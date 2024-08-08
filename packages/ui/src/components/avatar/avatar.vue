<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'radix-vue';
import type { AvatarImageEmits } from 'radix-vue';
import SAvatarRoot from './avatar-root.vue';
import SAvatarImage from './avatar-image.vue';
import SAvatarFallback from './avatar-fallback.vue';
import type { AvatarProps } from './types';

defineOptions({
  name: 'SAvatar'
});

const props = defineProps<AvatarProps>();

const delegatedProps = reactiveOmit(props, ['imageProps', 'fallbackProps']);

const forwardedProps = useForwardProps(delegatedProps);

const emit = defineEmits<AvatarImageEmits>();
</script>

<template>
  <SAvatarRoot v-bind="forwardedProps">
    <slot>
      <slot name="image">
        <SAvatarImage
          v-if="imageProps"
          v-bind="imageProps"
          @loading-status-change="emit('loadingStatusChange', $event)"
        />
      </slot>
      <SAvatarFallback v-bind="fallbackProps">
        <slot name="fallback" />
      </SAvatarFallback>
    </slot>
  </SAvatarRoot>
</template>

<style scoped></style>
