<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Primitive } from '../primitive';
import type { LinkProps } from './types';

const props = withDefaults(defineProps<LinkProps>(), {
  to: '',
  external: undefined,
  prefetch: undefined,
  noPrefetch: undefined,
  noRel: undefined,
  viewTransition: undefined,
  replace: undefined,
  disabled: undefined
});
</script>

<template>
  <RouterLink
    v-slot="{ isActive, href, navigate }"
    v-bind="props"
    :aria-disabled="disabled ? 'true' : undefined"
    :role="disabled ? 'link' : undefined"
    :tabindex="disabled ? -1 : undefined"
  >
    <template v-if="custom">
      <Primitive v-bind="props" :class="isActive ? activeClass : inactiveClass" :href="href" @click="navigate">
        <slot />
      </Primitive>
    </template>
    <slot v-else />
  </RouterLink>
</template>
