<script setup lang="ts">
import { computed } from 'vue';
import { ToolbarSeparator } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { toolbarSeparatorVariants } from './variants';
import type { ToolbarSeparatorProps } from './types';

defineOptions({
  name: 'SToolbarSeparator'
});

const props = defineProps<ToolbarSeparatorProps>();

const forwardedProps = useOmitProps(props, ['class']);

const cls = computed(() => cn(toolbarSeparatorVariants(), props.class));
</script>

<template>
  <ToolbarSeparator v-bind="forwardedProps" :class="cls">
    <slot />
  </ToolbarSeparator>
</template>
