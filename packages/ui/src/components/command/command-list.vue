<script setup lang="ts">
import { computed } from 'vue';
import { ListboxContent, useForwardProps } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandListProps } from './types';

defineOptions({
  name: 'SCommandList'
});

const { class: cls, ...delegatedProps } = defineProps<CommandListProps>();

const forwarded = useForwardProps(delegatedProps);

const { list } = commandVariants();

const mergedCls = computed(() => cn(list(), cls));
</script>

<template>
  <ListboxContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </ListboxContent>
</template>
