<script setup lang="ts">
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useForwardExpose } from '../../composables';
import { MenuSub } from '../menu';
import type { MenubarSubEmits, MenubarSubProps } from './types';

defineOptions({
  name: 'MenubarSub'
});

const props = withDefaults(defineProps<MenubarSubProps>(), {
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
