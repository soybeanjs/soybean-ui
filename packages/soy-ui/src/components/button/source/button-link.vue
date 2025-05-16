<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitives';
import { SLink } from '../../link';
import type { ButtonLinkProps } from '../types';
import SButton from './button.vue';

defineOptions({
  name: 'SButtonLink'
});

const { variant = 'link', ...delegatedProps } = defineProps<ButtonLinkProps>();

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <SButton v-bind="forwardedProps" as-child :variant="variant">
    <SLink>
      <slot />
    </SLink>
  </SButton>
</template>
