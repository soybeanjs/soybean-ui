<script setup lang="ts">
import { CollapsibleContent, useForwardProps } from 'radix-vue';
import { cn, collapsibleVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { CollapsibleContentProps } from './types';

defineOptions({
  name: 'SCollapsibleContent'
});

const props = defineProps<CollapsibleContentProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <CollapsibleContent v-bind="forwardedProps" :class="cn(collapsibleVariants(), props.class)">
    <slot />
  </CollapsibleContent>
</template>

<style scoped></style>
