<script setup lang="ts">
import { useOmitProps, usePickProps } from '@soybeanjs/headless/composables';
import Link from '../link/link.vue';
import Button from './button.vue';
import type { ButtonLinkProps } from './types';

defineOptions({
  name: 'SButtonLink'
});

const props = withDefaults(defineProps<ButtonLinkProps>(), {
  variant: 'link',
  external: undefined,
  prefetch: undefined,
  noPrefetch: undefined,
  noRel: undefined,
  viewTransition: undefined,
  replace: undefined,
  disabled: undefined
});

const buttonProps = usePickProps(props, ['color', 'size', 'variant', 'shape', 'shadow', 'fitContent']);

const linkProps = useOmitProps(props, ['color', 'size', 'variant', 'shape', 'shadow', 'fitContent']);
</script>

<template>
  <Button v-bind="buttonProps" as-child>
    <Link v-slot="slotProps" v-bind="linkProps">
      <slot v-bind="slotProps" />
    </Link>
  </Button>
</template>
