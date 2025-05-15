<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { RouterLink } from 'vue-router';
import type { RouterLinkProps } from 'vue-router';
import { usePickForwardProps } from '@soybean-ui/primitives';
import type { LinkProps } from '../types';
import SAnchorLink from './anchor-link.vue';

defineOptions({
  name: 'SLink'
});

const props = withDefaults(defineProps<LinkProps>(), {
  to: undefined
});

function isRouterLink(p: LinkProps): p is RouterLinkProps {
  return Boolean((p as RouterLinkProps).to);
}

const routerLinkProps = usePickForwardProps(props, [
  'class',
  'to',
  'replace',
  'custom',
  'activeClass',
  'exactActiveClass',
  'ariaCurrentValue',
  'viewTransition',
  'disabled'
]) as ComputedRef<RouterLinkProps>;

const anchorLinkProps = usePickForwardProps(props, [
  'class',
  'href',
  'target',
  'rel',
  'referrerPolicy',
  'disabled',
  'onClick',
  'navigate',
  'isExternal'
]);
</script>

<template>
  <RouterLink v-if="isRouterLink(props)" v-bind="routerLinkProps">
    <slot />
  </RouterLink>
  <SAnchorLink v-else v-bind="anchorLinkProps">
    <slot />
  </SAnchorLink>
</template>
