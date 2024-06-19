<script setup lang="ts">
import {
  MenubarRadioGroup,
  type MenubarRadioGroupEmits,
  type MenubarRadioGroupProps,
  useForwardPropsEmits
} from 'radix-vue';

const props = defineProps<MenubarRadioGroupProps>();

const emit = defineEmits<MenubarRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <MenubarRadioGroup v-bind="forwarded">
    <slot />
  </MenubarRadioGroup>
</template>
