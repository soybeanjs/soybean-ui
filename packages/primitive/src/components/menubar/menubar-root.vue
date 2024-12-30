<script setup lang="ts">
import { ref, toRefs } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useCollection, useDirection, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { RovingFocusGroup } from '../roving-focus';
import { provideMenubarRootContext } from './context';
import type { MenubarRootEmits, MenubarRootProps } from './types';

defineOptions({
  name: 'MenubarRoot'
});

const props = withDefaults(defineProps<MenubarRootProps>(), {
  defaultValue: '',
  loop: false
});

const emit = defineEmits<MenubarRootEmits>();

const { forwardRef } = useForwardExpose();
const { CollectionSlot } = useCollection({ key: 'Menubar', isProvider: true });

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
}) as Ref<string>;

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
      <Primitive :ref="forwardRef" :class="props.class" role="menubar">
        <slot :model-value="modelValue" />
      </Primitive>
    </RovingFocusGroup>
  </CollectionSlot>
</template>
