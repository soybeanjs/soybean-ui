<script lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from '../ToggleGroup';
</script>

<script setup lang="ts">
import { ToggleGroupRoot } from '../toggle-group';
import { useEmitAsProps, useForwardExpose } from '../../_shared';
import { injectToolbarRootContext } from './toolbar-root.vue';

export type ToolbarToggleGroupEmits = ToggleGroupRootEmits;

export interface ToolbarToggleGroupProps extends ToggleGroupRootProps {}

const props = defineProps<ToolbarToggleGroupProps>();
const emits = defineEmits<ToolbarToggleGroupEmits>();

const rootContext = injectToolbarRootContext();

const emitsAsProps = useEmitAsProps(emits);
useForwardExpose();
</script>

<template>
  <ToggleGroupRoot
    v-bind="{ ...props, ...emitsAsProps }"
    :data-orientation="rootContext.orientation.value"
    :dir="rootContext.dir.value"
    :roving-focus="false"
  >
    <slot />
  </ToggleGroupRoot>
</template>
