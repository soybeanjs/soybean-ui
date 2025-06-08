<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners } from '../../composables';
import { MenuSubContent } from '../menu';
import { popperCssVars } from '../popper/shared';
import { dropdownMenuCssVars } from './shared';
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from './types';

defineOptions({
  name: 'DropdownMenuSubContent'
});

const props = defineProps<DropdownMenuSubContentProps>();

const emit = defineEmits<DropdownMenuSubContentEmits>();

const listeners = useForwardListeners(emit);

const style = computed<Record<string, string>>(() => ({
  [dropdownMenuCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [dropdownMenuCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [dropdownMenuCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [dropdownMenuCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [dropdownMenuCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
}));
</script>

<template>
  <MenuSubContent v-bind="props" :style="style" v-on="listeners">
    <slot />
  </MenuSubContent>
</template>
