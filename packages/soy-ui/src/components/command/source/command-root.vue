<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { ListboxRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandRootEmits, CommandRootProps } from '../types';

defineOptions({
  name: 'SCommandRoot'
});

const { class: cls, size, ...delegatedProps } = defineProps<CommandRootProps<T>>();

const emit = defineEmits<CommandRootEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = commandVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <ListboxRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </ListboxRoot>
</template>
