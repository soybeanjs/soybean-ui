<script setup lang="ts" generic="T extends string | string[] = string | string[]">
import { computed } from 'vue';
import { ToggleGroupRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, toggleVariants } from '@soybean-ui/variants';
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from '../types';

defineOptions({
  name: 'SToggleGroupRoot'
});

const { class: cls, size, ...delegatedProps } = defineProps<ToggleGroupRootProps<T>>();

const emit = defineEmits<ToggleGroupRootEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { groupRoot } = toggleVariants({ size });

  return cn(groupRoot(), cls);
});
</script>

<template>
  <ToggleGroupRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </ToggleGroupRoot>
</template>
