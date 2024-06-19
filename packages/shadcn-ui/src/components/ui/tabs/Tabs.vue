<script setup lang="ts">
import { TabsRoot, useForwardPropsEmits } from 'radix-vue';
import type { TabsRootEmits, TabsRootProps } from 'radix-vue';

const props = defineProps<TabsRootProps>();
const emit = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <TabsRoot v-bind="forwarded">
    <slot />
  </TabsRoot>
</template>
