<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import {
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  useOmitForwardProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { MenubarEmits, MenubarProps } from '../types';
import SMenubarRoot from './menubar-root.vue';
import SMenubarMenu from './menubar-menu.vue';

defineOptions({
  name: 'SMenubar'
});

const props = defineProps<MenubarProps<T>>();

const emit = defineEmits<MenubarEmits<T>>();

const propKeys: (keyof MenubarProps<T>)[] = ['size', 'modelValue', 'defaultValue', 'dir', 'loop'];

const forwardedRootProps = usePickForwardProps(props, propKeys);
const forwardedMenuProps = useOmitForwardProps(props, propKeys.concat(['class', 'items']));

const forwardedMenuEmits = useOmitEmitAsProps(emit, ['update:modelValue']);

const forwardedMenu = useCombinedPropsEmits(forwardedMenuProps, forwardedMenuEmits);
</script>

<template>
  <SMenubarRoot
    v-bind="forwardedRootProps"
    :class="props.class || ui?.root"
    :size="size"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <SMenubarMenu v-for="item in items" v-bind="forwardedMenu" :key="String(item.value)" :size="size" :item="item" />
  </SMenubarRoot>
</template>
