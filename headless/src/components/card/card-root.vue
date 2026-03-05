<script setup lang="ts">
import CollapsibleRoot from '../collapsible/collapsible-root.vue';
import type { CardRootProps, CardRootEmits } from './types';

defineOptions({
  name: 'CardRoot'
});

const props = withDefaults(defineProps<CardRootProps>(), {
  open: undefined,
  defaultOpen: true
});

const emit = defineEmits<CardRootEmits>();
</script>

<template>
  <CollapsibleRoot v-bind="props" @update:open="emit('update:open', $event)">
    <slot />
  </CollapsibleRoot>
</template>
