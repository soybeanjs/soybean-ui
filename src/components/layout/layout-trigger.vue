<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useLayoutRootContext, useLayoutThemeContext } from './context';
import type { LayoutTriggerProps } from './types';

defineOptions({
  name: 'LayoutTrigger'
});

defineProps<LayoutTriggerProps>();

const { open, toggleSidebar } = useLayoutRootContext('LayoutTrigger');

const themeContext = useLayoutThemeContext();

const cls = computed(() => themeContext?.ui?.value?.trigger);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" data-sidebar="trigger" @click="toggleSidebar">
    <slot :open="open" />
  </Primitive>
</template>
