<script setup lang="ts">
import { computed } from 'vue';
import { ComboboxGroup } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandGroupProps } from './types';

defineOptions({
  name: 'SCommandGroup'
});

const { class: cls } = defineProps<CommandGroupProps>();

const { group } = commandVariants();

const mergedCls = computed(() => cn(group(), cls));
</script>

<template>
  <ComboboxGroup :class="mergedCls">
    <slot />
  </ComboboxGroup>
</template>
