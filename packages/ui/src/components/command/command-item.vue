<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxItem, useForwardPropsEmits } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandItemEmits, CommandItemProps } from './types';

defineOptions({
  name: 'SCommandItem'
});

const { class: cls, ...delegatedProps } = defineProps<CommandItemProps>();

const emit = defineEmits<CommandItemEmits>();

const forwardedProps = useForwardPropsEmits(delegatedProps, emit);

const { item } = commandVariants();

const mergedCls = computed(() => cn(item(), cls));
</script>

<template>
  <ComboboxItem v-bind="forwardedProps" :class="mergedCls" />
</template>
