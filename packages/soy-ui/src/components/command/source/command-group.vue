<script setup lang="ts">
import { computed } from 'vue';
import { ListboxGroup } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandGroupProps } from '../types';

defineOptions({
  name: 'SCommandGroup'
});

const { class: cls } = defineProps<CommandGroupProps>();

const { group } = commandVariants();

const mergedCls = computed(() => cn(group(), cls));
</script>

<template>
  <ListboxGroup :class="mergedCls">
    <slot />
  </ListboxGroup>
</template>
