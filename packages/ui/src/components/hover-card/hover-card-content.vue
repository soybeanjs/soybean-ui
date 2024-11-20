<script setup lang="ts">
import { computed } from 'vue';
import { HoverCardContent, useForwardProps } from '@soybean-ui/primitive';
import { cn, hoverCardVariants } from '@soybean-ui/variants';
import type { HoverCardContentProps } from './types';

defineOptions({
  name: 'SHoverCardContent'
});

const { class: cls, sideOffset = 8, avoidCollisions = true, ...delegatedProps } = defineProps<HoverCardContentProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { content } = hoverCardVariants();

const mergedCls = computed(() => cn(content(), cls));
</script>

<template>
  <HoverCardContent v-bind="forwardedProps" :class="mergedCls" :side-offset :avoid-collisions>
    <slot />
  </HoverCardContent>
</template>
