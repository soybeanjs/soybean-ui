<script setup lang="ts">
import { Primitive } from '../primitive';
import type { MenuGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuGroup'
});

const props = defineProps<MenuGroupPropsWithPrimitive>();
</script>

<template>
  <Primitive role="group" v-bind="props">
    <slot />
  </Primitive>
</template>
