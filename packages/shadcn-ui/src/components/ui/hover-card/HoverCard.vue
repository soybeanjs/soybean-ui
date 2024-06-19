<script setup lang="ts">
import { HoverCardRoot, type HoverCardRootEmits, type HoverCardRootProps, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<HoverCardRootProps>();
const emit = defineEmits<HoverCardRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <HoverCardRoot v-bind="forwarded">
    <slot />
  </HoverCardRoot>
</template>
