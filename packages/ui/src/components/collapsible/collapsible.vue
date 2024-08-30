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
  <CollapsibleRoot v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps"></slot>
    <SCollapsibleContent :class="contentClass" :force-mount="forceMountContent">
      <slot name="content" v-bind="slotProps" />
    </SCollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped></style>
