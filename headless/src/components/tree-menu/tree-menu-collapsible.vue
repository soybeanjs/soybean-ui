<script setup lang="ts">
import { computed } from 'vue';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../collapsible';
import { useTreeMenuItemContext, useTreeMenuUi } from './context';
import type { TreeMenuCollapsibleProps } from './types';

defineOptions({
  name: 'TreeMenuCollapsible'
});

const props = defineProps<TreeMenuCollapsibleProps>();

const { isExpanded, onExpandedToggle } = useTreeMenuItemContext('TreeMenuCollapsible');

const cls = useTreeMenuUi('collapsibleContent');

const open = computed(() => !props.disabledCollapsible && isExpanded.value);
</script>

<template>
  <CollapsibleRoot :as="as" :open="open" @update:open="onExpandedToggle">
    <CollapsibleTrigger as-child :disabled-collapsible="disabledCollapsible">
      <slot name="trigger" />
    </CollapsibleTrigger>
    <slot name="extra" />
    <CollapsibleContent :class="cls">
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
