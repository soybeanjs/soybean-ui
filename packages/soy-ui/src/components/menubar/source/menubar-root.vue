<script setup lang="ts">
import { computed } from 'vue';
import { MenubarRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menubarVariants } from '@soybean-ui/variants';
import type { MenubarRootEmits, MenubarRootProps } from '../types';

defineOptions({
  name: 'SMenubarRoot'
});

const { class: cls, size, ...delegatedProps } = defineProps<MenubarRootProps>();

const emit = defineEmits<MenubarRootEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = menubarVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <MenubarRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </MenubarRoot>
</template>
