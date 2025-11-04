<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useLayoutRootContext, useLayoutThemeContext } from './context';
import type { LayoutTriggerProps } from './types';

defineOptions({
  name: 'LayoutTrigger'
});

const props = defineProps<LayoutTriggerProps>();

const { open, toggleSidebar } = useLayoutRootContext('LayoutTrigger');

const theme = useLayoutThemeContext();

const cls = computed(() => theme?.ui?.value?.trigger);
</script>

<template>
  <Primitive v-bind="props" :class="cls" data-sidebar="trigger" @click="toggleSidebar">
    <slot :open="open" />
  </Primitive>
</template>
