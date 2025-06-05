<script setup lang="ts">
import { Primitive } from '../primitive';
import type { MenuGroupProps } from './types';

defineOptions({
  name: 'MenuGroup'
});

const props = defineProps<MenuGroupProps>();
</script>

<template>
  <Primitive v-bind="props" role="group">
    <slot />
  </Primitive>
</template>
