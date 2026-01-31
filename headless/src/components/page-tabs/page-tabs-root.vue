<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from 'vue';
import type { ShallowRef } from 'vue';
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { providePageTabsRootContext, usePageTabsUi } from './context';
import type { PageTabsRootProps, PageTabsRootEmits } from './types';

defineOptions({
  name: 'PageTabsRoot'
});

const props = withDefaults(defineProps<PageTabsRootProps>(), {
  modelValue: undefined,
  pins: undefined,
  defaultPins: () => [],
  beforeClose: () => true
});

const emit = defineEmits<PageTabsRootEmits>();

const cls = usePageTabsUi('root');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue
);

const pins = useControllableState(
  () => props.pins,
  value => {
    emit('update:pins', value ?? []);
  },
  props.defaultPins
) as ShallowRef<string[]>;

const values = ref<string[]>([]);

const rootRef = useTemplateRef<HTMLDivElement>('rootRef');

const centerX = computed(() => {
  if (rootRef.value) {
    return rootRef.value.offsetWidth / 2;
  }
  return 0;
});

const onWheel = (event: WheelEvent) => {
  if (rootRef.value) {
    rootRef.value.scrollLeft += event.deltaY;
  }
};

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

watchEffect(() => {
  if (!rootRef.value || !centerX.value || !modelValue.value) return;

  const activeElement = rootRef.value.querySelector<HTMLElement>(`[data-value="${modelValue.value}"]`);
  if (!activeElement) return;

  const offsetX = activeElement.offsetLeft + activeElement.offsetWidth / 2 - centerX.value;

  rootRef.value.scrollTo({ left: offsetX, behavior: 'smooth' });
});

providePageTabsRootContext({
  ...transformPropsToContext(props, ['middleClickClose']),
  modelValue,
  pins,
  values,
  beforeClose: props.beforeClose
});
</script>

<template>
  <div ref="rootRef" :class="cls" class="page-tabs-root" @wheel="onWheel">
    <slot />
    <Primitive as="style">{{ css }}</Primitive>
  </div>
</template>
