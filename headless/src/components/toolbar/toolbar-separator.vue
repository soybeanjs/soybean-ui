<script setup lang="ts">
import { computed } from 'vue';
import { SeparatorRoot } from '../separator';
import { useToolbarRootContext } from './context';
import type { ToolbarSeparatorProps } from './types';

defineOptions({
  name: 'ToolbarSeparator'
});

const props = defineProps<ToolbarSeparatorProps>();

const { orientation } = useToolbarRootContext('ToolbarSeparator');

const separatorOrientation = computed(() => (orientation.value === 'horizontal' ? 'vertical' : 'horizontal'));
</script>

<template>
  <SeparatorRoot v-bind="props" :orientation="separatorOrientation">
    <slot />
  </SeparatorRoot>
</template>
