<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import {
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { MenuOptionData } from '../menu/types';
import SMenubarRoot from './menubar-root.vue';
import SMenubarMenu from './menubar-menu.vue';
import type { MenubarEmits, MenubarProps } from './types';

defineOptions({
  name: 'SMenubar'
});

const props = defineProps<MenubarProps<T>>();

const emit = defineEmits<MenubarEmits<T>>();

const propKeys: (keyof MenubarProps<T>)[] = ['class', 'modelValue', 'defaultValue', 'dir', 'loop'];

const forwardedRootProps = usePickForwardProps(props, propKeys);
const forwardedMenuProps = useOmitForwardProps(props, propKeys.concat(['items']));

const forwardedMenuEmits = useOmitEmitAsProps(emit, ['update:modelValue']);

const forwardedMenu = useCombinedPropsEmits(forwardedMenuProps, forwardedMenuEmits);
</script>

<template>
  <SMenubarRoot v-bind="forwardedRootProps" @update:model-value="emit('update:modelValue', $event)">
    <SMenubarMenu v-for="item in items" v-bind="forwardedMenu" :key="String(item.value)" :item="item" />
  </SMenubarRoot>
</template>
