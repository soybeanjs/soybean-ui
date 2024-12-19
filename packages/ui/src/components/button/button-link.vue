<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitive';
import { SButton } from '../button';
import type { ButtonLinkProps } from './types';

defineOptions({
  name: 'SButtonLink'
});

const props = withDefaults(defineProps<ButtonLinkProps>(), {
  variant: 'link',
  target: '_blank',
  rel: 'noopener noreferrer'
});

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SButton v-bind="forwardedProps" as="a">
    <slot />
  </SButton>
</template>
