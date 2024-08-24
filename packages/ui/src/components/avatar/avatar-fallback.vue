<script setup lang="ts">
import { AvatarFallback, useForwardProps } from 'radix-vue';
import { avatarVariants, cn } from '@soybean-unify/ui-variants';
import { computedOmit } from '../../shared';
import type { AvatarFallbackProps } from './types';

defineOptions({
  name: 'SAvatarFallback'
});

const props = defineProps<AvatarFallbackProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { fallback } = avatarVariants();
</script>

<template>
  <AvatarFallback v-bind="forwardedProps" :class="cn(fallback(), props.class)">
    <slot></slot>
  </AvatarFallback>
</template>

<style scoped></style>
