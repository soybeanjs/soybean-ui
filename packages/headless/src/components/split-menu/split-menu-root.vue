<script setup lang="ts">
import { computed } from 'vue';
import { useDirection } from '../config-provider/context';
import { useControllableState, useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import { provideSplitMenuRootContext, useSplitMenuUi } from './context';
import type { SplitMenuRootEmits, SplitMenuRootProps } from './types';

defineOptions({
  name: 'SplitMenuRoot'
});

const props = withDefaults(defineProps<SplitMenuRootProps>(), {
  mode: 'dual-vertical',
  defaultValue: '',
  defaultCollapsed: false
});

const emit = defineEmits<SplitMenuRootEmits>();

const cls = useSplitMenuUi('root');

const forwardedProps = useOmitProps(props, [
  'class',
  'mode',
  'modelValue',
  'defaultValue',
  'collapsed',
  'defaultCollapsed',
  'dir'
]);

const mode = computed(() => props.mode);

const dir = useDirection(props.dir);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue
);

const collapsed = useControllableState(
  () => props.collapsed,
  value => {
    emit('update:collapsed', value);
  },
  props.defaultCollapsed
);

const collapsedValue = computed(() => collapsed.value);

provideSplitMenuRootContext({
  mode,
  modelValue,
  collapsed: collapsedValue,
  dir
});
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :as="as"
    :as-child="asChild"
    data-soybean-split-menu-root
    :class="cls"
    :data-mode="mode"
    :data-state="collapsed ? 'collapsed' : 'expanded'"
    :dir="dir"
  >
    <slot :model-value="modelValue" />
  </Primitive>
</template>
