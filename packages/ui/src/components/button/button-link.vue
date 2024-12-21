<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitive';
import { SLink } from '../link';
import SButton from './button.vue';
import type { ButtonLinkProps } from './types';

defineOptions({
  name: 'SButtonLink'
});

const props = withDefaults(defineProps<ButtonLinkProps>(), {
  variant: 'link'
});

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SButton v-bind="forwardedProps" as-child>
    <SLink>
      <slot />
    </SLink>
  </SButton>
</template>
