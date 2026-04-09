<script setup lang="ts" generic="M extends boolean = false, T extends DefinedValue = string">
import { computed } from 'vue';
import type { DefinedValue } from '@soybeanjs/headless';
import { ToolbarToggleGroup } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { toolbarToggleGroupVariants } from './variants';
import type { ToolbarToggleGroupEmits, ToolbarToggleGroupProps } from './types';

defineOptions({
  name: 'SToolbarToggleGroup'
});

const props = defineProps<ToolbarToggleGroupProps<M, T>>();

const emit = defineEmits<ToolbarToggleGroupEmits<M, T>>();

const forwardedProps = useOmitProps(props, ['class']);
const listeners = useForwardListeners(emit);

const cls = computed(() => cn(toolbarToggleGroupVariants(), props.class));
</script>

<template>
  <ToolbarToggleGroup v-bind="forwardedProps" :class="cls" v-on="listeners">
    <slot />
  </ToolbarToggleGroup>
</template>
