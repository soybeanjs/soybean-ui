<script setup lang="ts">
import type { ShallowRef } from 'vue';
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { providePageTabsRootContext, usePageTabsUi } from './context';
import { usePageTabsScroll } from './hooks';
import type { PageTabsRootProps, PageTabsRootEmits } from './types';

defineOptions({
  name: 'PageTabsRoot'
});

const props = withDefaults(defineProps<PageTabsRootProps>(), {
  modelValue: undefined,
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

providePageTabsRootContext({
  ...transformPropsToContext(props, ['middleClickClose']),
  modelValue
});
</script>

<template>
  <div :ref="setRootElement" :class="cls" class="page-tabs-root" @wheel="onWheel">
    <slot />
    <Primitive as="style">{{ css }}</Primitive>
  </div>
</template>
