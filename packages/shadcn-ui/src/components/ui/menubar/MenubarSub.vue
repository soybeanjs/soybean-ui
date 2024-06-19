<script setup lang="ts">
import { MenubarSub, type MenubarSubEmits, useForwardPropsEmits } from 'radix-vue';

interface MenubarSubRootProps {
  defaultOpen?: boolean;
  open?: boolean;
}

const props = defineProps<MenubarSubRootProps>();
const emit = defineEmits<MenubarSubEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <MenubarSub v-bind="forwarded">
    <slot />
  </MenubarSub>
</template>
