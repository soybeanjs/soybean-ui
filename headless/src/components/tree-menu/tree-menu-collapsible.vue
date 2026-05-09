<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../collapsible';
import { useTreeMenuItemContext } from './context';
import type { TreeMenuCollapsibleProps } from './types';

defineOptions({
  name: 'TreeMenuCollapsible'
});

const props = defineProps<TreeMenuCollapsibleProps>();

const { isExpanded, onExpandedToggle } = useTreeMenuItemContext('TreeMenuCollapsible');

const open = computed(() => !props.disabledCollapsible && isExpanded.value);
</script>

<template>
  <CollapsibleRoot :as="as" :open="open" data-slot="collapsibleRoot" @update:open="onExpandedToggle">
    <CollapsibleTrigger as-child data-slot="collapsibleTrigger" :disabled-collapsible="disabledCollapsible">
      <slot name="trigger" />
    </CollapsibleTrigger>
    <slot name="extra" />
    <CollapsibleContent data-slot="collapsibleContent">
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
