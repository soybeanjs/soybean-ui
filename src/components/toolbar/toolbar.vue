<script setup lang="ts">
import { computed } from 'vue';
import { ToolbarRoot } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { toolbarVariants } from './variants';
import type { ToolbarProps } from './types';

defineOptions({
  name: 'SToolbar'
});

const props = defineProps<ToolbarProps>();

const forwardedProps = useOmitProps(props, ['class']);

const cls = computed(() => cn(toolbarVariants(), props.class));
</script>

<template>
  <ToolbarRoot v-bind="forwardedProps" :class="cls">
    <slot />
  </ToolbarRoot>
</template>
