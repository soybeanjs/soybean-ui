<script setup lang="ts">
import CollapsibleContent from '../collapsible/collapsible-content.vue';
import type { CardContentProps } from './types';

defineOptions({
  name: 'CardContent'
});

const props = defineProps<CardContentProps>();
</script>

<template>
  <CollapsibleContent v-bind="props" tabindex="-1">
    <slot />
  </CollapsibleContent>
</template>
