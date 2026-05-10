<script setup lang="ts">
import { useControllableState, usePickProps } from '../../composables';
import { transformPropsToContext } from '../../shared';
import RovingFocusGroup from '../roving-focus/roving-focus-group.vue';
import { providePageTabsRootContext, usePageTabsUi } from './context';
import { usePageTabsScroll } from './hooks';
import type { PageTabsRootProps, PageTabsRootEmits } from './types';

defineOptions({
  name: 'PageTabsRoot'
});

const props = withDefaults(defineProps<PageTabsRootProps>(), {
  modelValue: undefined,
  loop: true
});

const emit = defineEmits<PageTabsRootEmits>();

const cls = usePageTabsUi('root');

const forwardedProps = usePickProps(props, [
  'dir',
  'loop',
  'currentTabStopId',
  'defaultCurrentTabStopId',
  'preventScrollOnEntryFocus'
]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  ''
);

const { setRootElement, onWheel } = usePageTabsScroll(modelValue);

providePageTabsRootContext({
  ...transformPropsToContext(props, ['middleClickClose']),
  modelValue
});
</script>

<template>
  <RovingFocusGroup
    :ref="setRootElement"
    v-bind="forwardedProps"
    data-soybean-page-tabs-root
    :class="cls"
    orientation="horizontal"
    class="soybean-headless-scrollbar-hidden soybean-headless-overflow-y-hidden"
    @wheel="onWheel"
  >
    <slot />
  </RovingFocusGroup>
</template>
