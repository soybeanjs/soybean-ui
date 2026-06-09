<script setup lang="ts">
import CollapsibleContent from '../collapsible/collapsible-content.vue';
import type { CardContentProps } from './types.js';

defineOptions({
  name: 'CardContent'
});

const props = defineProps<CardContentProps>();
</script>

<template>
  <CollapsibleContent v-bind="props" data-soybean-card-content tabindex="-1">
    <slot />
  </CollapsibleContent>
</template>
