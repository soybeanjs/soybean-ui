<script setup lang="ts">
import { computed } from 'vue';
import { AvatarFallback, AvatarImage, AvatarRoot, provideAvatarUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { avatarVariants } from '@/variants/avatar';
import type { AvatarEmits, AvatarProps } from './types';

defineOptions({
  name: 'SAvatar'
});

const props = defineProps<AvatarProps>();

const emit = defineEmits<AvatarEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'fallbackLabel', 'imageProps', 'fallbackProps']);

const ui = computed(() => {
  const variants = avatarVariants({ size: props.size });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideAvatarUi(ui);

const imageProps = computed(() => ({
  ...props.imageProps,
  src: props.src
}));

const fallbackProps = computed(() => ({
  ...props.fallbackProps,
  delayMs: props.delayMs
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
