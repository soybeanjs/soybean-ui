<script setup lang="ts">
import { computed } from 'vue';
import { AvatarFallback, AvatarImage, AvatarRoot, provideAvatarThemeContext } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { avatarVariants } from '@/variants/avatar';
import type { AvatarEmits, AvatarProps } from './types';

defineOptions({
  name: 'SAvatar'
});

const props = defineProps<AvatarProps>();

const emit = defineEmits<AvatarEmits>();

const forwardedProps = useOmitProps(props, ['size', 'ui', 'fallbackLabel', 'imageProps', 'fallbackProps']);

const ui = computed(() => {
  const variants = avatarVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui);
});

provideAvatarThemeContext({
  ui
});

const imageProps = computed(() => ({
  src: props.src,
  ...props.imageProps
}));

const fallbackProps = computed(() => ({
  delayMs: props.delayMs,
  ...props.fallbackProps
}));
</script>

<template>
  <AvatarRoot v-bind="forwardedProps">
    <slot>
      <slot name="image">
        <AvatarImage v-bind="imageProps" @loading-status-change="emit('loadingStatusChange', $event)" />
      </slot>
      <AvatarFallback v-bind="fallbackProps">
        <slot name="fallback">{{ fallbackLabel }}</slot>
      </AvatarFallback>
    </slot>
  </AvatarRoot>
</template>
