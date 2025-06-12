<script setup lang="ts">
import { computed, defineAsyncComponent, useAttrs } from 'vue';
import { isNuxt } from '@headless/shared';
import { Primitive } from '../primitive';
import type { LinkProps } from './types';

defineOptions({
  name: 'Link',
  inheritAttrs: false
});

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'a',
  external: undefined,
  prefetch: undefined,
  noPrefetch: undefined,
  noRel: undefined,
  viewTransition: undefined,
  replace: undefined,
  disabled: undefined
});

const attrs = useAttrs();

const isExternal = computed(() => {
  if (props.external) {
    return true;
  }

  if (typeof props.to === 'string' && props.to.startsWith('http')) {
    return true;
  }

  if (!props.to && props.href && props.target === '_blank') {
    return true;
  }

  return false;
});

const forwarded = computed(() => ({
  ...attrs,
  ...props,
  to: isExternal.value ? undefined : props.to,
  href: isExternal.value ? props.to || props.href : props.href
}));

const BaseLink = defineAsyncComponent(() => (isNuxt ? import('./nuxt-link.vue') : import('./router-link.vue')));
</script>

<template>
  <Primitive
    v-if="isExternal"
    v-bind="forwarded"
    :aria-disabled="disabled ? 'true' : undefined"
    :role="disabled ? 'link' : undefined"
    :tabindex="disabled ? -1 : undefined"
  >
    <slot />
  </Primitive>
  <BaseLink v-else v-bind="forwarded">
    <slot />
  </BaseLink>
</template>
