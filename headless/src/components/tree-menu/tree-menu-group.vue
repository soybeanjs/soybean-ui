<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useTreeMenuThemeContext } from './context';
import type { TreeMenuGroupProps } from './types';

defineOptions({
  name: 'TreeMenuGroup'
});

withDefaults(defineProps<TreeMenuGroupProps>(), {
  as: 'ul'
});

const ui = useTreeMenuThemeContext();

const cls = computed(() => ui?.value?.group);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" role="group">
    <slot />
  </Primitive>
</template>
