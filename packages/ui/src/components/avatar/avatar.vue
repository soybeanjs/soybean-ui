<script setup lang="ts">
import { useEmitAsProps } from 'radix-vue';
import type { AvatarImageEmits } from 'radix-vue';
import SAvatarRoot from './avatar-root.vue';
import SAvatarImage from './avatar-image.vue';
import SAvatarFallback from './avatar-fallback.vue';
import type { AvatarProps } from './types';

defineOptions({
  name: 'SAvatar'
});

const props = defineProps<AvatarProps>();

const emit = defineEmits<AvatarImageEmits>();

const emitAsProps = useEmitAsProps(emit);
</script>

<template>
  <SAvatarRoot :as="as" :as-child="asChild" :size="size" :class="props.class">
    <slot>
      <slot name="image">
        <SAvatarImage :class="imageClass" :src="src" :alt="alt" :delay-ms="delayMs" v-bind="emitAsProps" />
      </slot>
      <SAvatarFallback :class="fallbackClass">
        <slot name="fallback">{{ fallbackLabel }}</slot>
      </SAvatarFallback>
    </slot>
  </SAvatarRoot>
</template>

<style scoped></style>
