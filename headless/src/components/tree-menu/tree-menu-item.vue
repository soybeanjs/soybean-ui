<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { provideTreeMenuItemContext, useTreeMenuRootContext, useTreeMenuUi } from './context';
import type { TreeMenuItemProps } from './types';

defineOptions({
  name: 'TreeMenuItem'
});

const props = withDefaults(defineProps<TreeMenuItemProps>(), {
  as: 'li'
});

const { modelValue, expanded, onExpandedToggle, onModelValueChange } = useTreeMenuRootContext('TreeMenuItem');

const cls = useTreeMenuUi('item');

const isActive = computed(() => modelValue.value === props.value);

const isExpanded = computed(() => expanded.value?.includes(props.value));

provideTreeMenuItemContext({
  value: props.value,
  isActive,
  isExpanded,
  onExpandedToggle: () => {
    if (props.disabled) return;
    onExpandedToggle(props.value);
  },
  onActive: () => {
    if (props.disabled) return;
    onModelValueChange(props.value);
  }
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-active="isActive"
  >
    <slot />
  </Primitive>
</template>
