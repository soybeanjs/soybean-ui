<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from '../ToggleGroup';

import { ToggleGroupRoot } from '../toggle-group';
import { useEmitAsProps, useForwardExpose } from '../../composables';
import { injectToolbarRootContext } from './toolbar-root.vue';

export type ToolbarToggleGroupEmits = ToggleGroupRootEmits;

export interface ToolbarToggleGroupProps extends ToggleGroupRootProps {}

const props = defineProps<ToolbarToggleGroupProps>();
const emit = defineEmits<ToolbarToggleGroupEmits>();

const rootContext = injectToolbarRootContext();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <ToggleGroupRoot
    v-bind="{ ...props, ...emitAsProps }"
    :data-orientation="rootContext.orientation.value"
    :dir="rootContext.dir.value"
    :roving-focus="false"
  >
    <slot />
  </ToggleGroupRoot>
</template>
