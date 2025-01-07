<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitive';
import { SLink } from '../link';
import SButton from './button.vue';
import type { ButtonLinkProps } from './types';

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
