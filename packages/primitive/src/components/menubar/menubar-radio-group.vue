<script setup lang="ts">
import { MenuRadioGroup } from '../menu';
import { useEmitAsProps, useForwardExpose } from '../../composables';
import type { MenubarRadioGroupEmits, MenubarRadioGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarRadioGroup'
});

const props = defineProps<MenubarRadioGroupPropsWithPrimitive>();
const emit = defineEmits<MenubarRadioGroupEmits>();

const emitAsProps = useEmitAsProps(emit);
useForwardExpose();
</script>

<template>
  <MenuRadioGroup v-bind="{ ...props, ...emitAsProps }">
    <slot />
  </MenuRadioGroup>
</template>
