<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useMenuThemeContext } from './context';
import type { MenuGroupProps } from './types';

defineOptions({
  name: 'MenuGroup'
});

defineProps<MenuGroupProps>();

const themeContext = useMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.group);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" role="group">
    <slot />
  </Primitive>
</template>
