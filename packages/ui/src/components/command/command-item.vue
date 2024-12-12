<script setup lang="ts" generic="T extends AcceptableValue">
import { computed } from 'vue';
import { ComboboxItem, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { AcceptableValue } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandItemEmits, CommandItemProps } from './types';

defineOptions({
  name: 'SCommandItem'
});

const { class: cls, ...delegatedProps } = defineProps<CommandItemProps<T>>();

const emit = defineEmits<CommandItemEmits>();

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);

const { item } = commandVariants();

const mergedCls = computed(() => cn(item(), cls));
</script>

<template>
  <ComboboxItem v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </ComboboxItem>
</template>
