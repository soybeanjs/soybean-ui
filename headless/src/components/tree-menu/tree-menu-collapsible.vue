<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../collapsible';
import { useTreeMenuItemContext, useTreeMenuUi } from './context';
import type { TreeMenuCollapsibleProps } from './types';

defineOptions({
  name: 'TreeMenuCollapsible'
});

defineProps<TreeMenuCollapsibleProps>();

const { isExpanded, onExpandedToggle } = useTreeMenuItemContext('TreeMenuCollapsible');

const cls = useTreeMenuUi('collapsibleContent');
</script>

<template>
  <CollapsibleRoot :as="as" :open="isExpanded" @update:open="onExpandedToggle">
    <CollapsibleTrigger as-child :disabled-collapsible="disabledCollapsible">
      <slot name="trigger" />
    </CollapsibleTrigger>
    <slot name="extra" />
    <CollapsibleContent :class="cls">
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
