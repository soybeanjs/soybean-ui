<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { ShallowRef } from 'vue';
import { useControllableState, useForwardElement, useOmitProps } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { provideMenubarCollectionContext, provideMenubarRootContext, useMenubarUi } from './context';
import type { MenubarRootEmits, MenubarRootProps } from './types';

defineOptions({
  name: 'MenubarRoot'
});

const props = withDefaults(defineProps<MenubarRootProps>(), {
  loop: false,
  modelValue: undefined
});

const emit = defineEmits<MenubarRootEmits>();

const cls = useMenubarUi('root');

const forwardedProps = useOmitProps(props, ['class', 'modelValue', 'defaultValue', 'dir', 'loop']);

const mergedClass = computed(() => [cls.value, props.class]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  props.defaultValue ?? ''
) as ShallowRef<string>;

const currentTabStopId = shallowRef<string | null>(null);

provideMenubarRootContext({
  modelValue,
  currentTabStopId,
  ...transformPropsToContext(props, ['dir', 'loop'])
});

const { onContainerElementChange } = provideMenubarCollectionContext();

const [_, setRootElement] = useForwardElement(onContainerElementChange);
</script>

<template>
  <RovingFocusGroup
    v-model:current-tab-stop-id="currentTabStopId"
    as-child
    orientation="horizontal"
    :dir="dir"
    :loop="loop"
  >
    <Primitive
      v-bind="forwardedProps"
      :ref="setRootElement"
      :as="as"
      :as-child="asChild"
      :class="mergedClass"
      role="menubar"
      :dir="dir"
      data-slot="root"
    >
      <slot :model-value="modelValue" />
    </Primitive>
  </RovingFocusGroup>
</template>
