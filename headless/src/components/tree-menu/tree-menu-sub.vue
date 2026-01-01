<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useTreeMenuThemeContext } from './context';
import type { TreeMenuSubProps } from './types';

defineOptions({
  name: 'TreeMenuSub'
});

withDefaults(defineProps<TreeMenuSubProps>(), {
  as: 'ul'
});

const ui = useTreeMenuThemeContext();

const cls = computed(() => ui?.value?.sub);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" role="group">
    <slot />
  </Primitive>
</template>
