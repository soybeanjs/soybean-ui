<script setup lang="ts">
import { Primitive } from '../primitive';
import { useMenuUi } from './context';
import type { MenuGroupProps } from './types';

defineOptions({
  name: 'MenuGroup'
});

defineProps<MenuGroupProps>();

const cls = useMenuUi('group');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" role="group">
    <slot />
  </Primitive>
</template>
