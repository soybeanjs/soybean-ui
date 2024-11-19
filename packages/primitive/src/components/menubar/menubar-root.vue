<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useCollection, useDirection, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { provideMenubarRootContext } from './context';
import type { MenubarRootProps } from './types';

defineOptions({
  name: 'MenubarRoot'
});

const props = withDefaults(defineProps<MenubarRootProps>(), {
  loop: false
});

const { forwardRef } = useForwardExpose();
const { CollectionSlot } = useCollection({ key: 'Menubar', isProvider: true });

const modelValue = defineModel<string>({ default: props.defaultValue ?? '' });

const currentTabStopId = ref<string | null>(null);

const { dir: propDir, loop } = toRefs(props);
const dir = useDirection(propDir);

provideMenubarRootContext({
  modelValue,
  dir,
  loop,
  onMenuOpen: value => {
    modelValue.value = value;
    currentTabStopId.value = value;
  },
  onMenuClose: () => {
    modelValue.value = '';
  },
  onMenuToggle: value => {
    modelValue.value = modelValue.value ? '' : value;
    // `openMenuOpen` and `onMenuToggle` are called exclusively so we
    // need to update the id in either case.
    currentTabStopId.value = value;
  }
});
</script>

<template>
  <CollectionSlot>
    <RovingFocusGroup
      v-model:current-tab-stop-id="currentTabStopId"
      orientation="horizontal"
      :loop="loop"
      :dir="dir"
      as-child
    >
      <Primitive :ref="forwardRef" role="menubar">
        <slot :model-value="modelValue" />
      </Primitive>
    </RovingFocusGroup>
  </CollectionSlot>
</template>
