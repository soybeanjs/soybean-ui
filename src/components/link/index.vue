<script setup lang="ts" generic="CustomProp extends boolean = false">
import { defineAsyncComponent } from 'vue';
import { isNuxt } from '@headless/shared';
import type { LinkProps } from './types';

const props = defineProps<LinkProps<CustomProp>>();

const BaseLink = defineAsyncComponent(async () => {
  if (isNuxt) {
    const { defineNuxtLink } = await import('nuxt/app');

    return defineNuxtLink({
      componentName: 'NuxtLink'
    });
  }

  const { RouterLink } = await import('vue-router');

  return RouterLink;
});
</script>

<template>
  <BaseLink v-bind="props">
    <slot />
  </BaseLink>
</template>
