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
  if (props.external || props.disabled) {
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

const forwarded = computed(() => {
  let to;
  let href;

  if (props.disabled) {
    to = undefined;
    href = undefined;
  } else if (isExternal.value) {
    to = undefined;
    href = props.to || props.href;
  } else {
    to = props.to;
    href = props.href;
  }

  const baseProps = {
    ...attrs,
    ...props,
    to,
    href,
    'data-disabled': props.disabled ? '' : undefined,
    'aria-disabled': props.disabled ? 'true' : undefined,
    role: props.disabled ? 'link' : undefined,
    tabindex: props.disabled ? -1 : undefined
  };

  return baseProps;
});

const handleClick = (event: Event) => {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
  }
};
</script>

<template>
  <Primitive v-if="isExternal" v-bind="forwarded" @click="handleClick">
    <slot />
  </Primitive>
  <component :is="LinkComponent" v-else v-slot="slotProps" v-bind="forwarded" @click="handleClick">
    <template v-if="custom">
      <Primitive
        v-bind="forwarded"
        :class="slotProps?.isActive ? activeClass : inactiveClass"
        :href="props.disabled ? undefined : slotProps?.href"
        @click="props.disabled ? handleClick : slotProps?.navigate"
      >
        <slot />
      </Primitive>
    </template>
    <slot v-else />
  </component>
</template>
