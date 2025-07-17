<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useMenuThemeContext } from './context';
import type { MenuGroupProps } from './types';

defineOptions({
  name: 'MenuGroup'
});

const props = defineProps<MenuGroupProps>();

const themeContext = useMenuThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.group, props.class]);
</script>

<template>
  <Primitive v-bind="props" :class="cls" role="group">
    <slot />
  </Primitive>
</template>
