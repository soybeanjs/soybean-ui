<script setup lang="ts">
import { computed } from 'vue';
import { PopperArrow } from '../popper';
import { useMenuThemeContext } from './context';
import type { MenuArrowProps } from './types';

defineOptions({
  name: 'MenuArrow'
});

const props = defineProps<MenuArrowProps>();

const themeContext = useMenuThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.arrow, props.class]);
</script>

<template>
  <PopperArrow v-bind="props" :class="cls">
    <slot />
  </PopperArrow>
</template>
