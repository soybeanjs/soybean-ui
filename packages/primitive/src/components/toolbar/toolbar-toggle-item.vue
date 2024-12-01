<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { ToggleGroupItem } from '../toggle-group';
import ToolbarButton from './toolbar-button.vue';
import type { ToolbarToggleItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToolbarToggleItem'
});

const props = defineProps<ToolbarToggleItemPropsWithPrimitive>();

const { forwardRef } = useForwardExpose();
</script>

<template>
  <ToolbarButton as-child>
    <ToggleGroupItem v-bind="props" :ref="forwardRef">
      <slot />
    </ToggleGroupItem>
  </ToolbarButton>
</template>
