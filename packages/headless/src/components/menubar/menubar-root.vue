<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { toContext } from '../../shared';
import { useControllableState, useForwardElement, useOmitProps } from '../../composables';
import { providePopperDelayGroup } from '../popper';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { provideMenubarCollectionContext, provideMenubarRootContext, useMenubarUi } from './context';
import type { MenubarRootProps, MenubarRootEmits } from './types';

defineOptions({
  name: 'MenubarRoot'
});

const props = withDefaults(defineProps<MenubarRootProps>(), {
  loop: false,
  modelValue: undefined,
  trigger: 'click',
  delayDuration: 150,
  skipDelayDuration: 300
});

const emit = defineEmits<MenubarRootEmits>();

const cls = useMenubarUi('root');

const forwardedProps = useOmitProps(props, [
  'class',
  'modelValue',
  'defaultValue',
  'dir',
  'loop',
  'trigger',
  'delayDuration',
  'skipDelayDuration'
]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  props.defaultValue ?? ''
);

const currentTabStopId = shallowRef<string | null>(null);

// Sibling menus share one skip-delay window (the FloatingDelayGroup pattern): while a menu is
// open — or within `skipDelayDuration` after the last one closed — hovering another trigger
// opens it instantly instead of after `delayDuration`.
providePopperDelayGroup({
  skipDelayDuration: computed(() => props.skipDelayDuration)
});

provideMenubarRootContext({
  modelValue,
  currentTabStopId,
  ...toContext(props, ['dir', 'loop', 'trigger', 'delayDuration', 'skipDelayDuration'])
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
      data-soybean-menubar-root
      :class="cls"
      role="menubar"
      :dir="dir"
    >
      <slot :model-value="modelValue" />
    </Primitive>
  </RovingFocusGroup>
</template>
