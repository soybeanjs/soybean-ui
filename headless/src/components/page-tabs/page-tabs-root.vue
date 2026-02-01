<script setup lang="ts">
import type { ShallowRef } from 'vue';
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { providePageTabsRootContext, usePageTabsUi } from './context';
import { usePageTabsScroll } from './hooks';
import type { PageTabsRootProps, PageTabsRootEmits, PageTabsOperations } from './types';

defineOptions({
  name: 'PageTabsRoot'
});

const props = withDefaults(defineProps<PageTabsRootProps>(), {
  modelValue: undefined,
  pins: undefined,
  values: undefined,
  residents: () => [],
  beforeClose: () => true
});

const emit = defineEmits<PageTabsRootEmits>();

const cls = usePageTabsUi('root');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  ''
) as ShallowRef<string>;

const values = useControllableState(
  () => props.values,
  value => {
    emit('update:values', value ?? []);
  },
  []
) as ShallowRef<string[]>;

const pins = useControllableState(
  () => props.pins,
  value => {
    emit('update:pins', value ?? []);
  },
  []
) as ShallowRef<string[]>;

const { setRootElement, onWheel } = usePageTabsScroll(modelValue);

const css = `
.page-tabs-root {
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.page-tabs-root::-webkit-scrollbar {
  display: none;
}
`;

const context = providePageTabsRootContext({
  ...transformPropsToContext(props, ['middleClickClose']),
  modelValue,
  values,
  pins,
  beforeClose: props.beforeClose
});

const operations: PageTabsOperations = context.operations;

defineExpose({
  operations
});
</script>

<template>
  <div :ref="setRootElement" :class="cls" class="page-tabs-root" @wheel="onWheel">
    <slot />
    <Primitive as="style">{{ css }}</Primitive>
  </div>
</template>
