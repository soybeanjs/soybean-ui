<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleContent } from 'radix-vue';
import { cn, collapsibleVariants } from '@soybean-ui/variants';
import type { CollapsibleContentProps } from './types';

defineOptions({
  name: 'SCollapsibleContent'
});

const { class: cls, forceMount } = defineProps<CollapsibleContentProps>();

const mergedCls = computed(() => cn(collapsibleVariants(), cls));
</script>

<template>
  <CollapsibleContent :class="mergedCls" :force-mount>
    <slot />
  </CollapsibleContent>
</template>

<style scoped></style>
