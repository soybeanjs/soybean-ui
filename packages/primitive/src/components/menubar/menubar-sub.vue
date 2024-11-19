<script setup lang="ts">
import { MenuSub } from '../menu';
import { useForwardExpose } from '../../composables';
import type { MenubarSubPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarSub'
});

const props = defineProps<MenubarSubPropsWithPrimitive>();

useForwardExpose();

const open = defineModel<boolean>('open', {
  default: props.defaultOpen ?? false
});
</script>

<template>
  <MenuSub v-model:open="open">
    <slot :open="open" />
  </MenuSub>
</template>
