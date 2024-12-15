<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { ComboboxRoot, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { AcceptableValue } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandRootEmits, CommandRootProps } from './types';

defineOptions({
  name: 'SCommandRoot'
});

const { open = true, modelValue, class: cls, ...delegatedProps } = defineProps<CommandRootProps<T>>();

const emit = defineEmits<CommandRootEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { root } = commandVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <ComboboxRoot v-bind="forwarded" :class="mergedCls" :open="open" :model-value="modelValue">
    <slot />
  </ComboboxRoot>
</template>
