<script setup lang="ts">
import { DropdownMenuContent, useForwardPropsEmits } from 'radix-vue';
import type { DropdownMenuContentEmits } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { DropdownMenuContentProps } from './types';

defineOptions({
  name: 'SDropdownMenuContent'
});

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  sideOffset: 8
});

const emit = defineEmits<DropdownMenuContentEmits>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { content } = dropdownMenuVariants();
</script>

<template>
  <DropdownMenuContent v-bind="forwarded" :class="cn(content(), props.class)">
    <slot />
  </DropdownMenuContent>
</template>

<style scoped></style>
