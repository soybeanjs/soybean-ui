<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuSubContent, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { DropdownMenuSubContentEmits } from '@soybean-ui/primitive';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuSubContentProps } from './types';

defineOptions({
  name: 'SDropdownMenuSubContent'
});

const { class: cls, ...delegatedProps } = defineProps<DropdownMenuSubContentProps>();

const emit = defineEmits<DropdownMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { subContent } = dropdownMenuVariants();

const mergedCls = computed(() => cn(subContent(), cls));
</script>

<template>
  <DropdownMenuSubContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </DropdownMenuSubContent>
</template>

<style scoped></style>
