<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { ContextMenuSubContent, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { AcceptableValue } from '@soybean-ui/primitive';
import { cn, menuVariants } from '@soybean-ui/variants';
import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from './types';

defineOptions({
  name: 'SContextMenuSubContent'
});

const { class: cls, ...delegatedProps } = defineProps<ContextMenuSubContentProps>();

const emit = defineEmits<ContextMenuSubContentEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { subContent } = menuVariants();

const mergedCls = computed(() => cn(subContent(), cls));
</script>

<template>
  <ContextMenuSubContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </ContextMenuSubContent>
</template>
