<script setup lang="ts">
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { MenuSub } from '../menu';
import { useForwardExpose } from '../../composables';
import type { MenubarSubEmits, MenubarSubPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarSub'
});

const props = withDefaults(defineProps<MenubarSubPropsWithPrimitive>(), {
  defaultOpen: false
});

const emit = defineEmits<MenubarSubEmits>();

useForwardExpose();

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as false
}) as Ref<boolean>;
</script>

<template>
  <MenuSub v-model:open="open">
    <slot :open="open" />
  </MenuSub>
</template>
