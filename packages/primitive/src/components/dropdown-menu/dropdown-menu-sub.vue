<script setup lang="ts">
import { MenuSub } from '../menu';
import { useForwardExpose } from '../../composables';
import type { DropdownMenuSubProps } from './types';

defineOptions({
  name: 'DropdownMenuSub'
});

const props = withDefaults(defineProps<DropdownMenuSubProps>(), {
  open: undefined
});

const open = defineModel<boolean>('open', {
  default: props.defaultOpen
});

useForwardExpose();
</script>

<template>
  <MenuSub v-model:open="open">
    <slot :open="open" />
  </MenuSub>
</template>
