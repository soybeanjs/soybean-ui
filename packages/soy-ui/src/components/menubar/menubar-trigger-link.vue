<script setup lang="ts">
import { computed } from 'vue';
import { MenubarTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, menubarVariants } from '@soybean-ui/variants';
import { SLink } from '../link';
import type { MenubarTriggerLinkProps } from './types';

defineOptions({
  name: 'SMenubarTriggerLink'
});

const { class: cls, size, disabled, ...delegatedProps } = defineProps<MenubarTriggerLinkProps>();

const forwardedLinkProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { triggerLink } = menubarVariants({ size });

  return cn(triggerLink(), cls);
});
</script>

<template>
  <MenubarTrigger as-child :disabled="disabled">
    <SLink v-bind="forwardedLinkProps" :class="mergedCls">
      <slot />
    </SLink>
  </MenubarTrigger>
</template>
