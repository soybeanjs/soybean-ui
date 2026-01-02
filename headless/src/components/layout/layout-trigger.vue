<script setup lang="ts">
import { Primitive } from '../primitive';
import { useLayoutRootContext, useLayoutUi } from './context';
import type { LayoutTriggerProps } from './types';

defineOptions({
  name: 'LayoutTrigger'
});

defineProps<LayoutTriggerProps>();

const { open, toggleSidebar } = useLayoutRootContext('LayoutTrigger');

const cls = useLayoutUi('trigger');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-sidebar="trigger" @click="toggleSidebar">
    <slot :open="open" />
  </Primitive>
</template>
