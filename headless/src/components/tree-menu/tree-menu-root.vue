<script setup lang="ts">
import { computed, watch } from 'vue';
import { useControllableState } from '../../composables';
import { provideTreeMenuRootContext, useTreeMenuUi } from './context';
import type { TreeMenuCollapsedState, TreeMenuRootEmits, TreeMenuRootProps } from './types';

defineOptions({
  name: 'TreeMenuRoot'
});

const props = withDefaults(defineProps<TreeMenuRootProps>(), {
  defaultValue: '',
  defaultExpanded: () => [] as string[],
  collapsed: undefined,
  defaultCollapsed: false
});

const emit = defineEmits<TreeMenuRootEmits>();

const cls = useTreeMenuUi('root');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue
);

const expanded = useControllableState(
  () => props.expanded,
  value => {
    emit('update:expanded', value);
  },
  props.defaultExpanded
);

const collapsed = useControllableState(
  () => props.collapsed,
  value => {
    emit('update:collapsed', value);
  },
  props.defaultCollapsed
);

const dataState = computed<TreeMenuCollapsedState>(() => (collapsed.value ? 'collapsed' : 'expanded'));

let backupExpanded: string[] | null = null;

watch(collapsed, value => {
  if (value) {
    backupExpanded = [...(expanded.value ?? [])];
    expanded.value = [];

    return;
  }

  if (backupExpanded?.length) {
    expanded.value = [...backupExpanded];
    backupExpanded = null;
  }
});

provideTreeMenuRootContext({
  modelValue,
  expanded,
  collapsed
});
</script>

<template>
  <div :class="cls" :data-state="dataState">
    <slot />
  </div>
</template>
