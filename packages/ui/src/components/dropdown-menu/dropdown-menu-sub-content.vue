<script setup lang="ts">
import { DropdownMenuSubContent, useForwardPropsEmits } from 'radix-vue';
import type { DropdownMenuSubContentEmits } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { DropdownMenuSubContentProps } from './types';

defineOptions({
  name: 'SDropdownMenuSubContent'
});

const props = defineProps<DropdownMenuSubContentProps>();

const emit = defineEmits<DropdownMenuSubContentEmits>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { subContent } = dropdownMenuVariants();
</script>

<template>
  <DropdownMenuSubContent v-bind="forwarded" :class="cn(subContent(), props.class)">
    <slot />
  </DropdownMenuSubContent>
</template>

<style scoped></style>
