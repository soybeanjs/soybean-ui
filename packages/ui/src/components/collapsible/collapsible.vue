<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits } from 'radix-vue';
import type { CollapsibleRootEmits } from 'radix-vue';
import { computedOmit } from '../../shared';
import SCollapsibleContent from './collapsible-content.vue';
import type { CollapsibleProps } from './types';

defineOptions({
  name: 'SCollapsible'
});

const props = defineProps<CollapsibleProps>();

const emit = defineEmits<CollapsibleRootEmits>();

const delegatedProps = computedOmit(props, ['contentClass', 'forceMountContent']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <CollapsibleRoot v-bind="forwarded">
    <slot></slot>
    <SCollapsibleContent :class="contentClass" :force-mount="forceMountContent">
      <slot name="content" />
    </SCollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped></style>
