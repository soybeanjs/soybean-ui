<script setup lang="ts" generic="T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '@soybeanjs/headless';
import { ToolbarToggleItem } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { toolbarToggleItemVariants } from './variants';
import type { ToolbarToggleItemProps } from './types';

defineOptions({
  name: 'SToolbarToggleItem'
});

const props = defineProps<ToolbarToggleItemProps<T>>();

const forwardedProps = useOmitProps(props, ['class']);

const cls = computed(() => cn(toolbarToggleItemVariants(), props.class));
</script>

<template>
  <ToolbarToggleItem v-bind="forwardedProps" :class="cls">
    <slot />
  </ToolbarToggleItem>
</template>
