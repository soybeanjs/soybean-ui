<script setup lang="ts">
import { computed } from 'vue';
import { MenubarTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, menubarVariants } from '@soybean-ui/variants';
import { SLink } from '../link';
import type { MenubarTriggerLinkProps } from './types';

defineOptions({
  name: 'SMenubarTriggerLink'
});

const { class: cls, disabled, ...delegatedProps } = defineProps<MenubarTriggerLinkProps>();

const forwardedLinkProps = useForwardProps(delegatedProps);

const { triggerLink } = menubarVariants();

const mergedCls = computed(() => cn(triggerLink(), cls));
</script>

<template>
  <MenubarTrigger as-child :disabled="disabled">
    <SLink v-bind="forwardedLinkProps" :class="mergedCls">
      <slot />
    </SLink>
  </MenubarTrigger>
</template>
