<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger, useForwardPropsEmits } from '@soybean-ui/primitive';
import SCollapsibleContent from './collapsible-content.vue';
import type { CollapsibleEmits, CollapsibleProps } from './types';

defineOptions({
  name: 'SCollapsible'
});

const { contentClass, forceMountContent, ...delegatedProps } = defineProps<CollapsibleProps>();

const emit = defineEmits<CollapsibleEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded">
    <CollapsibleTrigger v-if="$slots.trigger" as-child>
      <slot name="trigger" v-bind="{ open }" />
    </CollapsibleTrigger>
    <slot v-bind="{ open }"></slot>
    <SCollapsibleContent :class="contentClass" :force-mount="forceMountContent">
      <slot name="content" v-bind="{ open }" />
    </SCollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped></style>
