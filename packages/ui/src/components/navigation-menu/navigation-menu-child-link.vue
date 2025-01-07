<script setup lang="ts">
import { computed } from 'vue';
import { NavigationMenuLink, useForwardProps } from '@soybean-ui/primitives';
import type { NavigationMenuLinkEmits } from '@soybean-ui/primitives';
import { cn, navigationMenuVariants } from '@soybean-ui/variants';
import { SLink } from '../link';
import type { NavigationMenuChildLinkProps } from './types';

defineOptions({
  name: 'SNavigationMenuChildLink'
});

const { class: cls, active, ...delegatedProps } = defineProps<NavigationMenuChildLinkProps>();

const emit = defineEmits<NavigationMenuLinkEmits>();

const forwardedLinkProps = useForwardProps(delegatedProps);

const { childLink } = navigationMenuVariants();

const mergedCls = computed(() => cn(childLink(), cls));
</script>

<template>
  <NavigationMenuLink :class="mergedCls" :active="active" as-child @select="emit('select', $event)">
    <SLink v-bind="forwardedLinkProps">
      <slot />
    </SLink>
  </NavigationMenuLink>
</template>
