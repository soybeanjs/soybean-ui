<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleContent } from '@soybean-ui/primitives';
import { cn, collapsibleVariants } from '@soybean-ui/variants';
import type { CollapsibleContentProps } from './types';

defineOptions({
  name: 'SCollapsibleContent'
});

const { class: cls, forceMount } = defineProps<CollapsibleContentProps>();

const { content } = collapsibleVariants();

const mergedCls = computed(() => cn(content(), cls));
</script>

<template>
  <CollapsibleContent :class="mergedCls" :force-mount="forceMount">
    <slot />
  </CollapsibleContent>
</template>
