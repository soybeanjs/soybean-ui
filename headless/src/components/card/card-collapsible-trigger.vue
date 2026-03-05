<script setup lang="ts">
import { CollapsibleTrigger } from '../collapsible';
import type { CardCollapsibleTriggerProps } from './types';

defineOptions({
  name: 'CardCollapsibleTrigger'
});

const props = defineProps<CardCollapsibleTriggerProps>();
</script>

<template>
  <CollapsibleTrigger v-slot="slotProps" v-bind="props">
    <slot v-bind="slotProps" />
  </CollapsibleTrigger>
</template>
