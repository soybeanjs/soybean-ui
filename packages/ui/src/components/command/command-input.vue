<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxInput, useForwardProps } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandInputProps } from './types';

defineOptions({
  name: 'SCommandInput'
});

const { class: cls, autoFocus = true, ...delegatedProps } = defineProps<CommandInputProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { input } = commandVariants();

const mergedCls = computed(() => cn(input(), cls));
</script>

<template>
  <ComboboxInput v-bind="forwardedProps" :class="mergedCls" :auto-focus="autoFocus" />
</template>
