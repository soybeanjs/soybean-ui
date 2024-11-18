<script setup lang="ts">
import Primitive from '../primitive/primitive';
import type { MenuLabelPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuLabel'
});

const { class: className, as = 'div' } = defineProps<MenuLabelPropsWithPrimitive>();
</script>

<template>
  <Primitive :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
