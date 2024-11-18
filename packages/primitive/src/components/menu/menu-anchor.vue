<script setup lang="ts">
import PopperAnchor from '../popper/popper-anchor.vue';
import type { MenuAnchorPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuAnchor'
});

const props = defineProps<MenuAnchorPropsWithPrimitive>();
</script>

<template>
  <PopperAnchor v-bind="props">
    <slot />
  </PopperAnchor>
</template>
