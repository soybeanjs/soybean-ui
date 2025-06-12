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
  disabled: undefined
});

const attrs = useAttrs();

const { nuxt } = useConfigProvider('Link');

const LinkComponent = computed(() => {
  if (nuxt.value) {
    return resolveComponent('NuxtLink');
  }
  return resolveComponent('RouterLink');
});

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
  href: isExternal.value ? props.to || props.href : props.href,
  ariaDisabled: props.disabled ? 'true' : undefined,
  role: props.disabled ? 'link' : undefined,
  tabindex: props.disabled ? -1 : undefined
}));
</script>

<template>
  <Primitive v-if="isExternal" v-bind="forwarded">
    <slot />
  </Primitive>
  <component :is="LinkComponent" v-else v-slot="slotProps" v-bind="forwarded">
    <template v-if="custom">
      <Primitive
        v-bind="forwarded"
        :class="slotProps?.isActive ? activeClass : inactiveClass"
        :href="slotProps?.href"
        @click="slotProps?.navigate"
      >
        <slot />
      </Primitive>
    </template>
    <slot v-else />
  </component>
</template>
