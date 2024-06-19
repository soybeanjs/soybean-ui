<script setup lang="ts">
import { ContextMenuSub, type ContextMenuSubEmits, type ContextMenuSubProps, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<ContextMenuSubProps>();
const emit = defineEmits<ContextMenuSubEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <ContextMenuSub v-bind="forwarded">
    <slot />
  </ContextMenuSub>
</template>
