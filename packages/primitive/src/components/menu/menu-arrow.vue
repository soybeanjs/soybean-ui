<script setup lang="ts">
import PopperArrow from '../popper/popper-arrow.vue';
import type { MenuArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuArrow'
});

const props = defineProps<MenuArrowPropsWithPrimitive>();
</script>

<template>
  <PopperArrow v-bind="props">
    <slot />
  </PopperArrow>
</template>
