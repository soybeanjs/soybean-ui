<script setup lang="ts">
import { computed } from 'vue';
import { BadgeContent, BadgeRoot, provideBadgeThemeContext } from '@headless';
import { useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { badgeVariants } from '@variants/badge';
import type { BadgeEmits, BadgeProps } from './types';

defineOptions({
  name: 'SBadge'
});

const props = withDefaults(defineProps<BadgeProps>(), {
  open: undefined
});

const emit = defineEmits<BadgeEmits>();

const forwardedProps = useOmitProps(props, ['color', 'size', 'ui', 'position', 'content', 'contentProps']);

const ui = computed(() => {
  const variants = badgeVariants({
    color: props.color,
    size: props.size,
    position: props.position
  });

  return mergeSlotVariants(variants, props.ui);
});

provideBadgeThemeContext({
  ui
});
</script>

<template>
  <BadgeRoot v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <slot />
    <BadgeContent v-bind="contentProps">
      <slot name="content">{{ content }}</slot>
    </BadgeContent>
  </BadgeRoot>
</template>
