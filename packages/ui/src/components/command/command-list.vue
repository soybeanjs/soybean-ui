<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxContent, useForwardPropsEmits } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandListEmits, CommandListProps } from './types';

defineOptions({
  name: 'SCommandList'
});

const { class: cls, ...delegatedProps } = defineProps<CommandListProps>();

const emit = defineEmits<CommandListEmits>();

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);

const { list } = commandVariants();

const mergedCls = computed(() => cn(list(), cls));
</script>

<template>
  <ComboboxContent v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </ComboboxContent>
</template>
