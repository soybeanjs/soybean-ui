<script setup lang="ts">
import Button from '../button/button.vue';
import { useCollapsibleRootContext, useCollapsibleUi } from './context';
import type { CollapsibleTriggerProps } from './types';

defineOptions({
  name: 'CollapsibleTrigger'
});

const props = defineProps<CollapsibleTriggerProps>();

const { open, onOpenToggle, contentId, disabled, dataState } = useCollapsibleRootContext('CollapsibleTrigger');

const cls = useCollapsibleUi('trigger');

const onTriggerClick = () => {
  onOpenToggle();
};
</script>

<template>
  <Button
    v-bind="props"
    :class="cls"
    :disabled="disabled || disabledCollapsible"
    :aria-controls="contentId"
    :aria-expanded="open"
    :data-state="dataState"
    @click="onTriggerClick"
  >
    <slot :open="open" />
  </Button>
</template>
