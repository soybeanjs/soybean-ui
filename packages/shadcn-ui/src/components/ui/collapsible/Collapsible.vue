<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits } from 'radix-vue';
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue';

const props = defineProps<CollapsibleRootProps>();
const emit = defineEmits<CollapsibleRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded">
    <slot :open="open" />
  </CollapsibleRoot>
</template>
