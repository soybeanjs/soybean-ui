<script setup lang="ts">
import { computed } from 'vue';
import { ToggleGroupItem, useForwardProps } from '@soybean-ui/primitives';
import { cn, toggleVariants } from '@soybean-ui/variants';
import type { ToggleGroupItemProps } from '../types';

defineOptions({
  name: 'SToggleGroupItem'
});

const { class: cls, variant, size, ...delegatedProps } = defineProps<ToggleGroupItemProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { toggle } = toggleVariants({ variant, size });

  return cn(toggle(), cls);
});
</script>

<template>
  <ToggleGroupItem v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </ToggleGroupItem>
</template>
