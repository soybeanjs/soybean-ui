<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { ListboxItem, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandItemEmits, CommandItemProps } from '../types';

defineOptions({
  name: 'SCommandItem'
});

const { class: cls, size, ...delegatedProps } = defineProps<CommandItemProps<T>>();

const emit = defineEmits<CommandItemEmits<T>>();

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { item } = commandVariants({ size });

  return cn(item(), cls);
});
</script>

<template>
  <ListboxItem v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </ListboxItem>
</template>
