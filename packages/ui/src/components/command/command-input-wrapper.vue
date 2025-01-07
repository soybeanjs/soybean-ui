<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandInputWrapperProps } from './types';

defineOptions({
  name: 'SCommandInputWrapper'
});

const { class: cls } = defineProps<CommandInputWrapperProps>();

const { inputWrapper } = commandVariants();

const mergedCls = computed(() => cn(inputWrapper(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="div">
    <slot />
  </Primitive>
</template>
