<script setup lang="ts">
import { computed, resolveComponent, useAttrs } from 'vue';
import { useConfigProvider } from '../config-provider/context';
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
  disabled: undefined,
  target: '_blank'
});

const attrs = useAttrs();

const { nuxt } = useConfigProvider('Link');

const LinkComponent = computed(() => {
  if (nuxt.value) {
    return resolveComponent('NuxtLink');
  }
  return resolveComponent('RouterLink');
});

const isHref = computed(() => {
  if (props.external || props.disabled) {
    return true;
  }

  if (typeof props.to === 'string' && props.to.startsWith('http')) {
    return true;
  }

  if (!props.to && props.href) {
    return true;
  }

  return false;
});

const forwardedProps = computed(() => {
  const href = props.to || props.href;

  return {
    ...props,
    ...attrs,
    to: isHref.value ? undefined : href,
    href: !isHref.value && nuxt.value ? undefined : href,
    'data-disabled': props.disabled ? '' : undefined,
    'aria-disabled': props.disabled ? 'true' : undefined,
    role: props.disabled ? 'link' : undefined,
    tabindex: props.disabled ? '-1' : props.tabindex
  };
});

const handleClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
  }
};
</script>

<template>
  <Primitive v-if="isHref" v-bind="forwardedProps" @click="handleClick">
    <slot />
  </Primitive>
  <component :is="LinkComponent" v-else v-bind="forwardedProps" @click="handleClick">
    <slot />
  </component>
</template>
