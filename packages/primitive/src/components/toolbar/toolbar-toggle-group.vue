<script setup lang="ts">
import { ToggleGroupRoot } from '../toggle-group';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { ToolbarToggleGroupEmits, ToolbarToggleGroupPropsWithPrimitive } from './types';
import { injectToolbarRootContext } from './context';

defineOptions({
  name: 'ToolbarToggleGroup'
});

const props = defineProps<ToolbarToggleGroupPropsWithPrimitive>();

const emit = defineEmits<ToolbarToggleGroupEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const { orientation, dir } = injectToolbarRootContext();

useForwardExpose();
</script>

<template>
  <ToggleGroupRoot v-bind="forwarded" :data-orientation="orientation" :dir="dir" :roving-focus="false">
    <slot />
  </ToggleGroupRoot>
</template>
