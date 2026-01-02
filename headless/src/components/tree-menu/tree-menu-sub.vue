<script setup lang="ts">
import { Primitive } from '../primitive';
import { useTreeMenuUi } from './context';
import type { TreeMenuSubProps } from './types';

defineOptions({
  name: 'TreeMenuSub'
});

withDefaults(defineProps<TreeMenuSubProps>(), {
  as: 'ul'
});

const cls = useTreeMenuUi('sub');
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" role="group">
    <slot />
  </Primitive>
</template>
