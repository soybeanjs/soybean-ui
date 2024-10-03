<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuContent, useForwardPropsEmits } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from './types';

defineOptions({
  name: 'SDropdownMenuContent'
});

const { class: cls, sideOffset = 8, ...delegatedProps } = defineProps<DropdownMenuContentProps>();

const emit = defineEmits<DropdownMenuContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { content } = dropdownMenuVariants();

const mergedCls = computed(() => cn(content(), cls));
</script>

<template>
  <DropdownMenuContent v-bind="forwarded" :class="mergedCls" :side-offset>
    <slot />
  </DropdownMenuContent>
</template>

<style scoped></style>
