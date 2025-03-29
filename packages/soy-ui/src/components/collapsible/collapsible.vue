<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger, useForwardPropsEmits } from '@soybean-ui/primitives';
import SCollapsibleContent from './collapsible-content.vue';
import type { CollapsibleEmits, CollapsibleProps } from './types';

defineOptions({
  name: 'SCollapsible'
});

const { class: cls, size, ui, forceMountContent, ...delegatedProps } = defineProps<CollapsibleProps>();

const emit = defineEmits<CollapsibleEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded" :class="cls || ui?.root" :size="size">
    <CollapsibleTrigger v-if="$slots.trigger" as-child :class="ui?.trigger">
      <slot name="trigger" :open="open" />
    </CollapsibleTrigger>
    <slot :open="open" />
    <SCollapsibleContent :class="ui?.content" :force-mount="forceMountContent">
      <slot name="content" :open="open" />
    </SCollapsibleContent>
  </CollapsibleRoot>
</template>
